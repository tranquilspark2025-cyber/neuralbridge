"use client"

import type React from "react"

import Link from "next/link"
import { Logo } from "./logo"
import { MobileMenu } from "./mobile-menu"
import { useEffect, useState } from "react"

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ["about", "services", "projects", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      setActiveSection(current || "")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      className={`fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full transition-all duration-300 ${
        scrolled ? "bg-background/30 backdrop-blur-sm pt-4 md:pt-6" : ""
      }`}
    >
      <header className="flex items-center justify-between container">
        <Link href="/">
          <Logo className="w-[100px] md:w-[120px]" />
        </Link>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
          {["About", "Services", "Projects", "Contact"].map((item) => (
            <Link
              className={`uppercase inline-block font-mono text-sm transition-colors duration-150 ease-out ${
                activeSection === item.toLowerCase()
                  ? "text-primary font-bold"
                  : "text-foreground/60 hover:text-foreground/100"
              }`}
              href={`#${item.toLowerCase()}`}
              key={item}
              onClick={(e) => handleClick(e, item.toLowerCase())}
            >
              {item}
            </Link>
          ))}
        </nav>
        <MobileMenu />
      </header>
    </div>
  )
}
