'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrailMarkerDots } from '@/components/patterns';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: 1,
    title: 'Tell Us About Your Race',
    description:
      'Answer 10 questions about your race, fitness, and crew. No Strava? No problem—we only need what you know. Takes 5 minutes. You can update answers anytime.',
    time: '5 minutes',
  },
  {
    number: 2,
    title: 'We Build Your Plan',
    description:
      'We analyze the course, your fitness, and 90 days of weather data. Then build your 8-section guide: pacing splits for every climb, crew instructions for every aid station, cutoff buffers so you never wonder if you are on pace.',
    time: 'Delivered in 24 hours',
  },
  {
    number: 3,
    title: 'Execute With Confidence',
    description:
      'Download your guide (PDF + printable crew cards). Highlight your 3 toughest sections. Rehearse your aid station routine. Race day? You will know your pace at mile 62 before your crew asks.',
    time: 'Review in 30 minutes',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#2C5F4D] mb-4 text-balance">
            3 Steps. 24 Hours. Race-Ready.
          </h2>
        </div>

        <div className="relative">
          {/* Desktop: Horizontal Layout with Cards */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="hidden lg:grid lg:grid-cols-3 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="relative">
                <Card
                  className="
                    h-full rounded-lg border-2 border-transparent bg-white
                    shadow-[0_2px_12px_rgba(44,95,77,0.12)]
                    hover:shadow-[0_8px_24px_rgba(44,95,77,0.20)]
                    hover:-translate-y-[3px]
                    hover:border-[#2C5F4D]/30
                    transition-all duration-200 ease-out
                  "
                >
                  <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-4">
                    <div className="w-16 h-16 rounded-full bg-[#2C5F4D] text-white font-sans font-bold text-2xl flex items-center justify-center">
                      {step.number}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2 flex flex-col h-full text-center">
                    <h3 className="font-sans font-medium text-xl text-[#2C5F4D] mb-3">
                      {step.title}
                    </h3>
                    <p className="font-serif text-base text-[#4A5859] leading-[1.7] mb-4 flex-grow">
                      {step.description}
                    </p>
                    <div className="mt-auto pt-2">
                      <span className="inline-block px-3 py-1 bg-[#D4B896] text-[#2C5F4D] font-sans font-semibold text-sm rounded">
                        {step.time}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-full translate-x-[calc(1rem-50%)] w-6 h-6 text-[#C87350] z-10" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile: Vertical Layout with Cards */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card
                  className="
                    rounded-lg border-2 border-transparent bg-white
                    shadow-[0_2px_12px_rgba(44,95,77,0.12)]
                  "
                >
                  <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-4">
                    <div className="w-16 h-16 rounded-full bg-[#2C5F4D] text-white font-sans font-bold text-2xl flex items-center justify-center">
                      {step.number}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2 text-center">
                    <h3 className="font-sans font-medium text-xl text-[#2C5F4D] mb-3">
                      {step.title}
                    </h3>
                    <p className="font-serif text-base text-[#4A5859] leading-[1.7] mb-4">
                      {step.description}
                    </p>
                    <span className="inline-block px-3 py-1 bg-[#D4B896] text-[#2C5F4D] font-sans font-semibold text-sm rounded">
                      {step.time}
                    </span>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && <TrailMarkerDots />}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 py-10 px-8 text-center bg-[#F5F1EA] border-2 border-[#2C5F4D] rounded-lg mx-auto max-w-4xl">
          <h3 className="font-sans font-semibold text-3xl text-[#2C5F4D] mb-2">
            From Overwhelmed to Race-Ready in 24 Hours
          </h3>
          <p className="font-serif text-lg text-[#4A5859] mb-6">
            Stop piecing together advice. Get a complete plan tailored to your race.
          </p>
          <a href="#pricing">
            <Button
              size="lg"
              className="bg-[#C87350] hover:bg-[#A85A3C] text-white font-semibold mb-3"
            >
              Get My Race Day Plan
            </Button>
          </a>
          <p className="font-serif text-sm text-[#4A5859]">
            Plans from $29 • Delivered in minutes • 7-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
