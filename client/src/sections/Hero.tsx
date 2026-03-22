import { useEffect, useRef } from "react"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    const navbarHeight = 80
    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight

    window.scrollTo({
      top: y,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add("opacity-100", "translate-y-0")
    }
  }, [])

  return (
    <section
  id="home"
  className="relative min-h-screen flex items-center py-20"
>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[#070916] -z-10" />
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600/20 blur-[160px] rounded-full animate-pulse -z-10" />
     <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-600/20 blur-[160px] rounded-full animate-pulse -z-10" />

      <div
        ref={heroRef}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full
        opacity-0 translate-y-6 transition-all duration-1000 ease-out"
      >
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* LEFT CONTENT */}
          <div className="text-center md:text-left max-w-xl">

            <p className="text-xs tracking-[0.4em] text-indigo-400 mb-6 uppercase">
              B.Tech CSE • 2026 Graduate
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Hello, I'm{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Vishal Kumar
              </span>
            </h1>

            <h2 className="mt-6 text-xl sm:text-2xl font-semibold text-indigo-300">
              MERN Stack Developer | Backend Focused
            </h2>

            <p className="mt-8 text-gray-400 text-base sm:text-lg leading-relaxed">
              I build secure REST APIs, scalable backend systems, and
              production-ready full-stack web applications using modern
              technologies and clean architecture principles.
            </p>

            {/* TECH STACK TAGS */}

<div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">

  {[
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "TypeScript",
    "Java",
    "Python",
    "REST APIs"
  ].map((tech) => (

    <span
      key={tech}
      className="px-4 py-1.5 text-sm rounded-full 
      bg-white/5 border border-white/10
      text-indigo-300 hover:border-indigo-500/40
      transition duration-300"
    >
      {tech}
    </span>

  ))}

</div>

            {/* PREMIUM BUTTON GROUP */}
            <div className="mt-12 flex flex-wrap items-center gap-5 justify-center md:justify-start">

              {/* Primary */}
              <button
                onClick={() => handleScroll("projects")}
                className="px-8 py-3 rounded-xl font-semibold 
                bg-gradient-to-r from-indigo-600 to-purple-600 
                hover:scale-105 transition duration-300
                shadow-lg shadow-purple-600/30"
              >
                View Projects
              </button>

              {/* Secondary */}
              <button
                onClick={() => handleScroll("contact")}
                className="px-8 py-3 rounded-xl font-semibold 
                border border-white/10 
                hover:bg-white/5 transition duration-300"
              >
                Contact Me
              </button>

              {/* Resume Combined Button */}
              <div className="flex rounded-xl overflow-hidden border border-indigo-500/30 backdrop-blur-md">

                <a
                  href="/Vishal_Resume_Tech.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-indigo-300 hover:bg-indigo-500/10 transition duration-300"
                >
                  View
                </a>

                <div className="w-px bg-indigo-500/30" />

                <a
                  href="/Vishal_Resume_Tech.pdf"
                  download="Vishal_Kumar_FullStack_Developer_Resume.pdf"
                  className="px-6 py-3 text-indigo-300 hover:bg-indigo-500/10 transition duration-300"
                >
                  Download
                </a>

              </div>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center mt-10 md:mt-0">

            <div className="relative">

              {/* Soft Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-2xl scale-110 animate-pulse" />

              <img
                src="/vishal_photo.jpg"
                alt="Vishal Kumar"
                className="relative 
                            w-40 h-40 
                            sm:w-56 sm:h-56 
                            md:w-72 md:h-72 
                            lg:w-80 lg:h-80
                            object-cover rounded-full
                            border border-white/10
                            shadow-2xl"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}