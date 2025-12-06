import puppeteer, { Page } from "puppeteer";
import { logger } from "@/lib/logger";

export interface FetchedRaceData {
  url: string;
  title: string;
  content: string;
  fetchedAt: Date;
  success: boolean;
  error?: string;
  pagesFetched?: number;
}

// Keywords that indicate relevant race information pages
const RELEVANT_PAGE_KEYWORDS = [
  "course",
  "aid",
  "station",
  "cutoff",
  "cut-off",
  "logistics",
  "rules",
  "info",
  "details",
  "elevation",
  "profile",
  "map",
  "schedule",
  "crew",
  "pacer",
  "drop-bag",
  "dropbag",
  "gear",
  "checkpoint",
];

/**
 * Extract text content from a page
 */
async function extractPageContent(page: Page): Promise<string> {
  return page.evaluate(() => {
    // Remove script, style, nav, footer, and other non-content elements
    const elementsToRemove = document.querySelectorAll(
      "script, style, nav, footer, header, iframe, noscript, .menu, .navigation, .sidebar, .advertisement, .ads"
    );
    elementsToRemove.forEach((el) => el.remove());

    // Try to find main content areas
    const mainContent =
      document.querySelector("main") ||
      document.querySelector("article") ||
      document.querySelector(".content") ||
      document.querySelector("#content") ||
      document.querySelector(".main") ||
      document.body;

    if (!mainContent) return "";

    // Get text content and clean it up
    let text = mainContent.innerText || mainContent.textContent || "";

    // Clean up whitespace
    text = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join("\n");

    return text;
  });
}

/**
 * Find relevant subpage links on a page
 */
async function findRelevantLinks(page: Page, baseUrl: string): Promise<string[]> {
  const parsedBase = new URL(baseUrl);

  const links = await page.evaluate((keywords: string[]) => {
    const anchors = Array.from(document.querySelectorAll("a[href]"));
    const foundLinks: string[] = [];

    for (const anchor of anchors) {
      const href = anchor.getAttribute("href");
      if (!href) continue;

      // Get the link text and href for keyword matching
      const linkText = (anchor.textContent || "").toLowerCase();
      const hrefLower = href.toLowerCase();

      // Check if link matches any relevant keywords
      const isRelevant = keywords.some(
        (keyword) => linkText.includes(keyword) || hrefLower.includes(keyword)
      );

      if (isRelevant) {
        foundLinks.push(href);
      }
    }

    return foundLinks;
  }, RELEVANT_PAGE_KEYWORDS);

  // Convert relative URLs to absolute and filter to same domain
  const absoluteLinks: string[] = [];
  const seen = new Set<string>();

  for (const link of links) {
    try {
      const absoluteUrl = new URL(link, baseUrl);

      // Only include links from same domain
      if (absoluteUrl.host !== parsedBase.host) continue;

      // Skip anchors, downloads, and non-page links
      if (absoluteUrl.pathname.match(/\.(pdf|jpg|png|gif|zip|gpx)$/i)) continue;

      const normalized = absoluteUrl.origin + absoluteUrl.pathname;
      if (seen.has(normalized)) continue;
      seen.add(normalized);

      absoluteLinks.push(absoluteUrl.href);
    } catch {
      // Invalid URL, skip
    }
  }

  return absoluteLinks;
}

/**
 * Fetch and extract content from a race website
 * Crawls the main page plus relevant subpages
 */
export async function fetchRaceWebsite(url: string): Promise<FetchedRaceData> {
  const startTime = Date.now();
  logger.debug("Fetching race website", { url });

  let browser;
  try {
    // Validate URL
    const parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Invalid URL protocol - must be http or https");
    }

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set a reasonable timeout
    page.setDefaultTimeout(30000);

    // Set user agent to avoid being blocked
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Navigate to the main page
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000
    });

    // Get page title
    const title = await page.title();

    // Extract content from main page
    const mainPageContent = await extractPageContent(page);
    logger.debug("Main page content extracted", { contentLength: mainPageContent.length });

    // Find relevant subpage links
    const relevantLinks = await findRelevantLinks(page, url);
    logger.debug("Found relevant subpages", { subpageCount: relevantLinks.length });

    // Limit to top 5 subpages to avoid timeout
    const linksToFetch = relevantLinks.slice(0, 5);

    // Fetch subpages and collect content
    const allContent: string[] = [`=== MAIN PAGE: ${url} ===\n${mainPageContent}`];
    let pagesFetched = 1;

    for (const subpageUrl of linksToFetch) {
      try {
        await page.goto(subpageUrl, {
          waitUntil: "networkidle2",
          timeout: 15000
        });

        const subpageContent = await extractPageContent(page);
        if (subpageContent.length > 100) { // Only include if substantial content
          allContent.push(`\n=== SUBPAGE: ${subpageUrl} ===\n${subpageContent}`);
          pagesFetched++;
          logger.debug("Subpage content extracted", {
            pageNumber: pagesFetched,
            contentLength: subpageContent.length
          });
        }
      } catch {
        logger.warn("Failed to fetch subpage", { subpageUrl });
        // Continue with other pages
      }
    }

    await browser.close();

    // Combine all content
    let combinedContent = allContent.join("\n\n");

    // Limit total content to avoid token explosion
    // Allow more content since we're fetching multiple pages
    if (combinedContent.length > 25000) {
      combinedContent = combinedContent.substring(0, 25000) + "\n\n[Content truncated...]";
    }

    const fetchTime = Date.now() - startTime;
    logger.info("Website fetched successfully", {
      url,
      contentLength: combinedContent.length,
      pagesFetched,
      fetchTimeMs: fetchTime,
    });

    return {
      url,
      title,
      content: combinedContent,
      fetchedAt: new Date(),
      success: true,
      pagesFetched,
    };
  } catch (error) {
    if (browser) {
      await browser.close();
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logger.error("Failed to fetch website", error, { url });

    return {
      url,
      title: "",
      content: "",
      fetchedAt: new Date(),
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Extract structured race information from fetched content
 * This helps identify key sections like aid stations, cutoffs, etc.
 */
export function extractRaceKeywords(content: string): {
  hasAidStationInfo: boolean;
  hasCutoffInfo: boolean;
  hasElevationInfo: boolean;
  hasCrewInfo: boolean;
  hasDropBagInfo: boolean;
} {
  const lowerContent = content.toLowerCase();

  return {
    hasAidStationInfo:
      lowerContent.includes("aid station") ||
      lowerContent.includes("aid-station") ||
      lowerContent.includes("checkpoint"),
    hasCutoffInfo:
      lowerContent.includes("cutoff") ||
      lowerContent.includes("cut-off") ||
      lowerContent.includes("time limit"),
    hasElevationInfo:
      lowerContent.includes("elevation") ||
      lowerContent.includes("climb") ||
      lowerContent.includes("ascent") ||
      lowerContent.includes("descent"),
    hasCrewInfo:
      lowerContent.includes("crew") ||
      lowerContent.includes("pacer"),
    hasDropBagInfo:
      lowerContent.includes("drop bag") ||
      lowerContent.includes("dropbag") ||
      lowerContent.includes("gear bag"),
  };
}
