"use client"

import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const projects = [
    {
      title: "Mindmymind: Discover You",
      description: "Self-discovery and personality app with AI companion that helps you feel truly seen and heard",
      link: "https://apps.apple.com/us/app/mindmymind-discover-you/id6504887915",
      tags: ["iOS", "AI", "Lifestyle", "Self-Discovery"],
      category: "Lifestyle & Wellness App",
    },
    {
      title: "EastNine Workouts & Plans",
      description: "A comprehensive fitness app with personalized workout plans and tracking features for iOS",
      link: "https://appadvice.com/app/eastnine-workouts-plans/1444553946",
      tags: ["iOS", "Fitness", "Workout Plans"],
      category: "Health & Fitness App",
    },
    {
      title: "PureGym",
      description: "Leading gym chain's mobile app for class bookings, member management, and fitness tracking",
      link: "https://apps.apple.com/gb/app/puregym/id588860938",
      tags: ["iOS", "Health & Fitness", "Gym Management"],
      category: "Gym Management Platform",
    },
    {
      title: "MB WAY",
      description: "Portugal's most popular mobile payment solution for secure digital transactions",
      link: "https://apps.apple.com/pt/app/mb-way/id918126133",
      tags: ["iOS", "Finance", "Mobile Payments"],
      category: "Financial Services App",
    },
  ]

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused, projects.length])

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20 relative">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-sentient text-center mb-16">
          Recent <i className="font-light">Success</i> Stories
        </h2>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="min-w-full px-4">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="border border-border/30 rounded-xl overflow-hidden bg-background/20 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                      <div className="p-8 md:p-12">
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                            {project.category}
                          </span>
                          <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-mono border border-primary/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                          View on App Store
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-primary w-8" : "bg-foreground/30"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
