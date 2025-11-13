"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Lightbulb, Target, Zap } from "lucide-react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 relative">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-sentient text-center mb-16">
          Building Tomorrow's <i className="font-light">Technology</i> Today
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16 max-w-5xl mx-auto">
          <div className="flex items-center">
            <p className="text-foreground/80 leading-relaxed text-lg">
              NeuralBridge empowers businesses through innovative software solutions. We specialize in AI integration,
              mobile development, and full-stack applications that drive real results and sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Counter end={5} suffix="+" label="Projects Delivered" isVisible={isVisible} />
            <Counter end={24} suffix="/7" label="Support" isVisible={isVisible} delay={200} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <ValueCard
            icon={<Lightbulb className="w-8 h-8" />}
            title="Innovation"
            description="Cutting-edge solutions using the latest technologies"
          />
          <ValueCard
            icon={<Target className="w-8 h-8" />}
            title="Quality"
            description="Meticulous attention to detail in every project"
          />
          <ValueCard
            icon={<Zap className="w-8 h-8" />}
            title="Speed"
            description="Fast delivery without compromising excellence"
          />
        </div>
      </div>
    </section>
  )
}

function Counter({
  end,
  suffix,
  label,
  isVisible,
  delay = 0,
}: {
  end: number
  suffix: string
  label: string
  isVisible: boolean
  delay?: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const timeout = setTimeout(() => {
      const duration = 2000
      const steps = 60
      const increment = end / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }, delay)

    return () => clearTimeout(timeout)
  }, [isVisible, end, delay])

  return (
    <div className="border border-border/30 rounded-lg p-6 bg-background/20 backdrop-blur-sm">
      <div className="text-3xl font-bold text-primary font-mono">
        {count}
        {suffix}
      </div>
      <div className="text-foreground/60 font-mono text-sm mt-1">{label}</div>
    </div>
  )
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="border border-border/30 rounded-lg p-6 bg-background/20 backdrop-blur-sm hover:bg-background/30 transition-all duration-300 hover:scale-105">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/60 text-sm">{description}</p>
    </div>
  )
}
