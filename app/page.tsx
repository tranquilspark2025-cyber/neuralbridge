"use client"

import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Leva } from "leva"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Leva hidden />
    </>
  )
}
