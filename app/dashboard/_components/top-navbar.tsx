"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import UserProfile from "@/components/user-profile";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Guides", href: "/dashboard/guides" },
  { label: "Get a Guide", href: "/pricing" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardTopNavbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <nav
        className={`sticky top-0 z-50 bg-[#F5F1EA]/90 backdrop-blur-sm px-4 sm:px-6 lg:px-8 transition-shadow duration-200 ${isScrolled ? "shadow-sm" : ""}`}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-end gap-1.5">
            <Image src="/paceline-icon.svg" alt="Paceline Icon" width={80} height={80} className="h-10 w-auto" priority />
            <Image src="/paceline-text.svg" alt="Paceline" width={200} height={50} className="h-8 w-auto" priority />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium transition-all"
                style={{
                  color: pathname === link.href ? "#2C5F4D" : "#4A5859",
                  textDecoration: pathname === link.href ? "underline" : "none",
                  textDecorationThickness: "2px",
                  textUnderlineOffset: "4px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User avatar */}
          <div className="hidden md:flex items-center">
            {session && <UserProfile mini={true} />}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" style={{ color: "#4A5859" }} /> : <Menu className="w-6 h-6" style={{ color: "#4A5859" }} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 space-y-3 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium py-1"
                style={{
                  color: pathname === link.href ? "#2C5F4D" : "#4A5859",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: pathname === link.href ? 600 : 400,
                }}
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <div className="pt-2 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <UserProfile mini={true} />
              </div>
            )}
          </div>
        )}
      </nav>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
