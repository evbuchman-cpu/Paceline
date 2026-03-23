import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { ProblemSolution } from "@/components/problem-solution"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { LeadMagnet } from "@/components/lead-magnet"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FFFCF7]">
      <Navigation />
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Testimonials />
      <LeadMagnet />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
