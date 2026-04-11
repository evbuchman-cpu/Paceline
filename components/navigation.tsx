"use client"

import { useState, useEffect } from "react"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import Image from "next/image"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    await authClient.signOut()
    window.location.href = "/"
  }

  return (
    <nav className={`sticky top-0 z-50 bg-[#FFFCF7]/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 transition-shadow duration-250 ${isScrolled ? "shadow-sm" : ""}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-end gap-1.5">
            {/* Mountain Icon */}
            <Image
              src="/paceline-icon.svg"
              alt="Paceline Icon"
              width={80}
              height={80}
              className="h-11 w-auto"
              priority
            />
            {/* PACELINE Text */}
            <Image
              src="/paceline-text.svg"
              alt="Paceline"
              width={200}
              height={50}
              className="h-9 w-auto"
              priority
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="font-sans text-[#2C5F4D] hover:underline underline-offset-4 decoration-2 transition-all">
              Features
            </a>
            <a href="#how-it-works" className="font-sans text-[#2C5F4D] hover:underline underline-offset-4 decoration-2 transition-all">
              How It Works
            </a>
            <a href="#pricing" className="font-sans text-[#2C5F4D] hover:underline underline-offset-4 decoration-2 transition-all">
              Pricing
            </a>
            <a href="#faq" className="font-sans text-[#2C5F4D] hover:underline underline-offset-4 decoration-2 transition-all">
              FAQ
            </a>

            {!isPending && (
              <>
                {session ? (
                  // Logged in: Show Dashboard + User Menu
                  <>
                    <a href="/dashboard" className="font-sans text-[#2C5F4D] hover:underline underline-offset-4 decoration-2 transition-all">
                      Dashboard
                    </a>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <User className="w-4 h-4" />
                          <span>{session.user.name || session.user.email}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                          <a href="/dashboard">My Guides</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href="/dashboard">Account</a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  // Logged out: Show Sign In + Get Started
                  <>
                    <Button variant="outline" className="font-semibold border-2 border-[#2C5F4D] text-[#2C5F4D] hover:bg-[#2C5F4D] hover:text-white" asChild>
                      <a href="/sign-in">Sign In</a>
                    </Button>
                    <Button className="bg-[#C87350] hover:bg-[#A85A3C] text-white font-semibold" asChild>
                      <a href="#lead-magnet">Your Free DNF Prevention Checklist</a>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#4A5859]" /> : <Menu className="w-6 h-6 text-[#4A5859]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200">
          <div className="px-4 py-4 space-y-4">
            <a
              href="#features"
              className="block font-sans text-[#2C5F4D] hover:underline underline-offset-4 decoration-2 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block font-sans text-[#2C5F4D] hover:underline underline-offset-4 decoration-2 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="block font-sans text-[#2C5F4D] hover:underline underline-offset-4 decoration-2 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="block font-sans text-[#2C5F4D] hover:underline underline-offset-4 decoration-2 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>

            {!isPending && (
              <>
                {session ? (
                  // Logged in: Show Dashboard + Sign Out
                  <>
                    <a
                      href="/dashboard"
                      className="block font-sans text-[#2C5F4D] hover:underline underline-offset-4 decoration-2 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </a>
                    <div className="pt-2 border-t border-stone-200">
                      <p className="text-sm font-sans text-[#4A5859] mb-2">
                        {session.user.name || session.user.email}
                      </p>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          handleSignOut()
                        }}
                      >
                        Sign Out
                      </Button>
                    </div>
                  </>
                ) : (
                  // Logged out: Show Sign In + Get Started
                  <>
                    <Button variant="outline" className="w-full font-semibold border-2 border-[#2C5F4D] text-[#2C5F4D] hover:bg-[#2C5F4D] hover:text-white" asChild>
                      <a href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                        Sign In
                      </a>
                    </Button>
                    <Button className="w-full bg-[#C87350] hover:bg-[#A85A3C] text-white font-semibold" asChild>
                      <a href="#lead-magnet" onClick={() => setMobileMenuOpen(false)}>
                        Your Free DNF Prevention Checklist
                      </a>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
