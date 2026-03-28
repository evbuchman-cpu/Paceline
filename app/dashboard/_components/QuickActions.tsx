"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Gift, HeadphonesIcon, BookOpen } from "lucide-react";

const SAMPLE_PDF_URL = "https://assets.paceline.run/sample-guide.pdf";

function OutlineButton({
  children,
  onClick,
  href,
  external,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}) {
  const cls =
    "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all cursor-pointer select-none";

  const style = {
    borderColor: "#2C5F4D",
    color: "#2C5F4D",
    backgroundColor: "#FFFFFF",
    fontFamily: "Inter, sans-serif",
  };

  const hoverCls = "hover:border-[#C87350] hover:text-[#C87350]";

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${cls} ${hoverCls}`}
        style={style}
      >
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${cls} ${hoverCls}`} style={style}>
      {children}
    </button>
  );
}

export function QuickActions() {
  const [copied, setCopied] = useState(false);

  const handleReferral = async () => {
    const url = `${window.location.origin}?ref=share`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for browsers that block clipboard
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section>
      <div
        className="rounded-xl border p-5"
        style={{ borderColor: "#E8E0D6", backgroundColor: "#FAFAF8" }}
      >
        <div className="flex flex-wrap gap-3">
          <OutlineButton href="/pricing">
            <BookOpen className="w-4 h-4" />
            Buy Another Guide
          </OutlineButton>

          <OutlineButton href={SAMPLE_PDF_URL} external>
            <ExternalLink className="w-4 h-4" />
            View Sample Guide
          </OutlineButton>

          <OutlineButton onClick={handleReferral}>
            <Gift className="w-4 h-4" />
            {copied ? "Link copied!" : "Refer a Friend"}
          </OutlineButton>

          <OutlineButton href="mailto:support@paceline.run">
            <HeadphonesIcon className="w-4 h-4" />
            Contact Support
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}
