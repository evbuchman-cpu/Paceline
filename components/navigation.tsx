"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#FFFCF7]/80 backdrop-blur-sm shadow-sm px-4 sm:px-6 lg:px-8">
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
            <a href="#features" className="font-sans text-[#4A5859] hover:text-[#2C5F4D] transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="font-sans text-[#4A5859] hover:text-[#2C5F4D] transition-colors">
              How It Works
            </a>
            <a href="/pricing" className="font-sans text-[#4A5859] hover:text-[#2C5F4D] transition-colors">
              Pricing
            </a>
            <a href="#faq" className="font-sans text-[#4A5859] hover:text-[#2C5F4D] transition-colors">
              FAQ
            </a>
            <Button className="bg-[#C87350] hover:bg-[#A85A3C] text-white font-semibold" asChild>
              <a href="#email-capture">Get Free Race Scheduler</a>
            </Button>
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
              className="block font-sans text-[#4A5859] hover:text-[#2C5F4D]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block font-sans text-[#4A5859] hover:text-[#2C5F4D]"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="/pricing"
              className="block font-sans text-[#4A5859] hover:text-[#2C5F4D]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="block font-sans text-[#4A5859] hover:text-[#2C5F4D]"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <Button className="w-full bg-[#C87350] hover:bg-[#A85A3C] text-white font-semibold" asChild>
              <a href="#email-capture">Get Free Race Scheduler</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
