"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { sendContactEmail } from "@/app/actions/send-email"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const result = await sendContactEmail(formData)

    setIsLoading(false)

    if (result.success) {
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: "",
      })
    } else {
      setError(result.error || "Failed to send message. Please try again.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="min-h-[80vh] flex items-center justify-center py-20 relative">
        <div className="container text-center">
          <div className="max-w-md mx-auto border border-primary/30 rounded-lg p-12 bg-background/20 backdrop-blur-sm">
            <div className="text-6xl mb-6">✓</div>
            <h3 className="text-2xl font-bold mb-4">Message Sent Successfully!</h3>
            <p className="text-foreground/70">We'll get back to you within 24 hours.</p>
            <Button onClick={() => setIsSubmitted(false)} className="mt-8">
              Send Another Message
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="min-h-[80vh] flex items-center justify-center py-20 relative">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-sentient text-center mb-16">
          Ready to Start Your <i className="font-light">Project</i>?
        </h2>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-center">
              {error}
            </div>
          )}

          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full bg-background/20 border border-border/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors backdrop-blur-sm peer placeholder-transparent disabled:opacity-50"
              placeholder="Name"
            />
            <label
              className={`absolute left-4 transition-all duration-200 text-foreground/60 ${
                formData.name
                  ? "-top-6 text-sm"
                  : "top-3 peer-focus:-top-6 peer-focus:text-sm peer-placeholder-shown:top-3"
              }`}
            >
              Name
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full bg-background/20 border border-border/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors backdrop-blur-sm peer placeholder-transparent disabled:opacity-50"
              placeholder="Email"
            />
            <label
              className={`absolute left-4 transition-all duration-200 text-foreground/60 ${
                formData.email
                  ? "-top-6 text-sm"
                  : "top-3 peer-focus:-top-6 peer-focus:text-sm peer-placeholder-shown:top-3"
              }`}
            >
              Email
            </label>
          </div>

          <div className="relative">
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full bg-background/20 border border-border/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors backdrop-blur-sm disabled:opacity-50"
            >
              <option value="">Select Project Type</option>
              <option value="ai">AI Integration</option>
              <option value="mobile">Mobile App</option>
              <option value="web">Web Application</option>
              <option value="fullstack">Full-Stack Solution</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isLoading}
              rows={5}
              className="w-full bg-background/20 border border-border/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors backdrop-blur-sm peer placeholder-transparent resize-none disabled:opacity-50"
              placeholder="Message"
            />
            <label
              className={`absolute left-4 transition-all duration-200 text-foreground/60 ${
                formData.message
                  ? "-top-6 text-sm"
                  : "top-3 peer-focus:-top-6 peer-focus:text-sm peer-placeholder-shown:top-3"
              }`}
            >
              Message
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "SENDING..." : "[SEND MESSAGE]"}
          </Button>
        </form>
      </div>
    </section>
  )
}
