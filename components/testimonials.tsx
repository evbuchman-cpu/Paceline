import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "I spent 12 hours building a race plan in Excel. Paceline gave me a better one in 10 minutes. Finished Wasatch with a 3.5-hour cutoff buffer. My crew said it was the most organized ultra support they've ever done.",
    author: "Alex Chen",
    race: "Wasatch Front 100",
    result: "28:42 finish time, 3.5-hour cutoff buffer",
    image: "/male-ultrarunner-finish-line.jpg",
  },
  {
    quote:
      "At my first ultra, I barely made the mile-62 cutoff with 8 minutes to spare. This time with Paceline, I had 2+ hours of buffer at every station. The contingency plans saved me when my stomach shut down at mile 50.",
    author: "Sarah Martinez",
    race: "Angeles Crest 100K",
    result: "First-time 100K finisher",
    image: "/female-ultrarunner-finish-line.jpg",
  },
  {
    quote:
      "I've coached 50+ ultrarunners. This is the first tool I've seen that actually handles race-day execution, not just training. I recommend it to all my athletes now.",
    author: "Mike Thompson",
    race: "UESCA Certified Ultra Coach",
    result: "",
    image: "/male-ultra-running-coach.jpg",
  },
]

export function Testimonials() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] mb-4 text-balance">
            What Ultrarunners Are Saying
          </h2>
          <p className="font-serif text-xl text-[#4A5859]">Real runners. Real races. Real results.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C87350] text-[#C87350]" />
                ))}
              </div>
              <blockquote className="font-serif text-[#4A5859] leading-relaxed mb-6">&quot;{testimonial.quote}&quot;</blockquote>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-sans font-semibold text-[#2C5F4D]">{testimonial.author}</p>
                  <p className="font-serif text-sm text-[#4A5859]">{testimonial.race}</p>
                  {testimonial.result && <p className="font-serif text-xs text-[#4A5859] mt-1">{testimonial.result}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="font-sans text-[#4A5859]">
            Join 100+ ultrarunners who&apos;ve trusted Paceline for their goal races
          </p>
        </div>
      </div>
    </section>
  )
}
