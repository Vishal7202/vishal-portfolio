import { useEffect, useRef } from "react"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import Hero from "../sections/Hero"
import About from "../sections/About"
import Skills from "../sections/Skills"
import Experience from "../sections/Experience"
import Projects from "../sections/Projects"
import CTA from "../sections/CTA"
import Education from "../sections/Education"

import ContactForm from "../components/ContactForm"

export default function MainLayout() {
  const containerRef = useRef<HTMLDivElement>(null)

  // ✅ Reveal Animation
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
    )

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -80px 0px"
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // ✅ Parallax Scroll (smooth)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const elements = document.querySelectorAll(".parallax")

      elements.forEach((el) => {
        const speed = 0.08
        const y = scrollY * speed
        ;(el as HTMLElement).style.transform = `translateY(${y}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="overflow-x-hidden text-white">

      <Navbar />

      <main className="relative pt-24">

        <section className="reveal">
          <div className="parallax">
            <Hero />
          </div>
        </section>

        <section className="reveal-left">
          <div className="parallax">
            <About />
          </div>
        </section>

        <section className="reveal-right">
          <div className="parallax">
            <Skills />
          </div>
        </section>

        <section className="reveal-zoom">
          <div className="parallax">
            <Education />
          </div>
        </section>

        <section className="reveal-left">
          <div className="parallax">
            <Experience />
          </div>
        </section>

        <section className="reveal-right">
          <div className="parallax">
            <Projects />
          </div>
        </section>

        <section className="reveal">
          <div className="parallax">
            <CTA />
          </div>
        </section>

        <section
          id="contact"
          className="reveal py-24 px-6 max-w-4xl mx-auto"
        >
          <div className="parallax">

            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4
              bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
              bg-clip-text text-transparent">
                Let’s Work Together
              </h2>

              <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
                Have a project idea, collaboration proposal,
                or just want to say hi? Drop a message and I’ll
                respond as soon as possible.
              </p>
            </div>

            <ContactForm />

          </div>
        </section>

      </main>

      <Footer />

    </div>
  )
}