import { useEffect } from "react"

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

  // ✅ Reveal (only bottom-up for smooth feel)
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal")

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
  
  return (
  <div className="flex flex-col min-h-screen overflow-x-hidden text-white">

    <Navbar />

    <main className="flex-grow relative pt-24">

      <section className="reveal">
        <div className="parallax">
          <Hero />
        </div>
      </section>

      <section className="reveal">
        <div className="parallax">
          <About />
        </div>
      </section>

      <section className="reveal">
        <div className="parallax">
          <Skills />
        </div>
      </section>

      <section className="reveal">
        <div className="parallax">
          <Education />
        </div>
      </section>

      <section className="reveal">
        <div className="parallax">
          <Experience />
        </div>
      </section>

      <section className="reveal">
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
    className="reveal py-24 pb-40 px-6 max-w-4xl mx-auto"
  >
        <div className="parallax">
          <ContactForm />
        </div>
      </section>

    </main>

    <Footer />

  </div>
)
}