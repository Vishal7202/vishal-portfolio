import Container from "../components/Container"

export default function CTA() {
  return (
    <section className="relative py-28 overflow-hidden text-white">

      {/* Deep Base */}
      <div className="absolute inset-0 bg-[#070916]" />

      {/* Center Glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[700px] h-[700px] bg-purple-700/20 blur-[160px] rounded-full" />
      </div>

      <Container>
        <div className="relative z-10">

          <div className="glass rounded-3xl p-12 md:p-16 text-center space-y-10 border border-white/10">

            {/* SMALL LABEL */}
            <p className="text-sm uppercase tracking-[0.4em] text-indigo-400">
              Let’s Build Something Great
            </p>

            {/* MAIN HEADING */}
            <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
              Ready to{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Collaborate
              </span>{" "}
              on Your Next Project?
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
              I’m passionate about building scalable backend systems
              and modern web applications. Let’s connect and
              turn your vision into a production-ready solution.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">

              {/* Contact Button */}
              <a
                href="#contact"
                className="px-8 py-3 rounded-xl font-semibold
                           bg-gradient-to-r from-indigo-600 to-purple-600
                           hover:scale-105 transition duration-300
                           shadow-lg shadow-purple-600/40"
              >
                Get In Touch
              </a>

              {/* Resume Download Button */}
              <a
                href="/Vishal_Resume_Tech.pdf"
                download="Vishal_Kumar_FullStack_Developer_Resume.pdf"
                className="px-8 py-3 rounded-xl font-semibold
                           border border-white/20
                           backdrop-blur-md
                           hover:bg-white/10
                           hover:scale-105
                           transition duration-300"
              >
                Download Resume
              </a>

            </div>

          </div>

        </div>
      </Container>
    </section>
  )
}