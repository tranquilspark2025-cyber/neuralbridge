"use client"

import { Brain, Code, Smartphone } from "lucide-react"
import { useState } from "react"

export function Services() {
  const [expandedService, setExpandedService] = useState<number | null>(null)

  const services = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "AI INTEGRATION",
      description: "Empower your business with next-generation AI solutions",
      details:
        "Transform your business with intelligent automation, natural language processing, and machine learning models tailored to your specific needs.",
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "MOBILE APPS",
      description: "iOS, Android, and cross-platform solutions",
      details:
        "Build beautiful, performant mobile applications that work seamlessly across all devices using React Native and native technologies.",
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "FULL-STACK",
      description: "Scalable backends and web applications",
      details:
        "End-to-end development with modern frameworks, cloud infrastructure, and robust APIs that scale with your business growth.",
    },
  ]

  return (
    <section id="services" className="min-h-screen flex items-center justify-center py-20 relative">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-sentient text-center mb-16">
          How We <i className="font-light">Transform</i> Your Business
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="border border-border/30 rounded-lg p-8 bg-background/20 backdrop-blur-sm hover:bg-background/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setExpandedService(expandedService === index ? null : index)}
            >
              <div className="text-primary mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold font-mono mb-3">{service.title}</h3>
              <p className="text-foreground/70 mb-4">{service.description}</p>
              <button className="text-primary font-mono text-sm hover:underline">Learn More →</button>

              {expandedService === index && (
                <div className="mt-4 pt-4 border-t border-border/30 text-foreground/60 text-sm leading-relaxed">
                  {service.details}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
