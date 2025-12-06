import { Instagram, Facebook } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#2C5F4D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/PaceLine Logo.png"
                alt="Paceline Logo"
                width={150}
                height={40}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <p className="font-serif text-sm text-white/80 leading-relaxed">
              Stop piecing together advice. Start executing with confidence.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="hover:text-[#D4B896] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-[#D4B896] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-sans font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-2 font-serif text-sm">
              <li>
                <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-white/80 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#sample-guide" className="text-white/80 hover:text-white transition-colors">
                  Sample Guides
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/80 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-sans font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2 font-serif text-sm">
              <li>
                <span className="text-white/60">Blog (Coming Soon)</span>
              </li>
              <li>
                <a href="#lead-magnet" className="text-white/80 hover:text-white transition-colors">
                  Strategy Checklist
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#support" className="text-white/80 hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="font-sans font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-2 font-serif text-sm mb-6">
              <p className="text-white/80">
                <a href="mailto:support@paceline.run" className="hover:text-white transition-colors">
                  support@paceline.run
                </a>
              </p>
              <p className="text-white/60 text-xs">24-hour response time</p>
            </div>
            <ul className="space-y-2 font-serif text-sm">
              <li>
                <a href="/privacy-policy" className="text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-white/80 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="text-white/80 hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-serif text-sm text-white/60">© 2025 Paceline. All rights reserved.</p>
          <p className="font-serif text-sm text-white/80">Built for ultrarunners, by an ultrarunner.</p>
        </div>
      </div>
    </footer>
  )
}
