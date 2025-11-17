import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "../components/provider";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Source_Serif_4 } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "RaceWise by Paceline - Personalized Ultramarathon Race Plans",
  description:
    "Stop piecing together fragmented race plans. Get personalized ultramarathon race guides with nutrition timing, pacing splits, and terrain-specific strategies in 24-48 hours.",
  openGraph: {
    title: "RaceWise by Paceline - Personalized Ultramarathon Race Plans",
    description:
      "Stop piecing together fragmented race plans. Get personalized ultramarathon race guides with nutrition timing, pacing splits, and terrain-specific strategies in 24-48 hours.",
    url: "racewise.run",
    siteName: "RaceWise by Paceline",
    images: [
      {
        url: "/gritty-ultrarunner-mid-race-struggle-determination.jpg",
        width: 1200,
        height: 630,
        alt: "Ultrarunner executing race strategy during ultramarathon",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sourceSerif.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          forcedTheme="light"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
