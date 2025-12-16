import { Instagram, Facebook } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#2C5F4D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-end gap-1.5">
              {/* Mountain Icon */}
              <Image
                src="/paceline-icon.svg"
                alt="Paceline Icon"
                width={80}
                height={80}
                className="h-11 w-auto brightness-0 invert"
              />
              {/* PACELINE Text */}
              <Image
                src="/paceline-text.svg"
                alt="Paceline"
                width={200}
                height={50}
                className="h-9 w-auto brightness-0 invert"
              />
            </div>
            <p className="font-serif text-sm text-white/80 leading-relaxed">
              Stop piecing together advice.<br />Start executing with confidence.
            </p>
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
                <a href="#pricing" className="text-white/80 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/80 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-white/80 hover:text-white transition-colors">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-sans font-semibold text-lg mb-4">Legal & Support</h4>
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
