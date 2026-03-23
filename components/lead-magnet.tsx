"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2 } from "lucide-react"

export function LeadMagnet() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.")
      }

      setStatus("success")
      setEmail("")
      setFirstName("")
    } catch (error) {
      setStatus("error")
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="lead-magnet" className="py-16 sm:py-20 bg-[#F5F1EA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold tracking-wider uppercase text-[#C87350] mb-3">
            FREE DOWNLOAD
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2C5F4D] mb-4">
            Not ready to commit? Start here.
          </h2>
          <p className="text-lg text-[#4A5859] max-w-2xl mx-auto">
            Download the Race Day Readiness Checklist — the same frameworks inside every Paceline guide, free.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <CheckCircle2 className="w-12 h-12 text-[#2C5F4D] mx-auto mb-4" />
            <p className="text-lg font-semibold text-[#2C5F4D]">
              ✓ Check your inbox! Your checklist is on its way.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Input
                type="text"
                placeholder="First name (optional)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="text-base"
              />
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#C87350] hover:bg-[#B86640] text-white font-semibold py-3 text-base"
            >
              {isSubmitting ? "Sending..." : "Get Free Checklist"}
            </Button>

            <p className="text-sm text-gray-500 text-center mt-4">
              No spam. Unsubscribe anytime.
            </p>

            {status === "error" && (
              <p className="text-sm text-red-600 text-center mt-4">
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
