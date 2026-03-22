import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa"
import { MdEmail, MdLocationOn } from "react-icons/md"

export default function Footer() {

const scrollToSection = (id: string) => {
const el = document.getElementById(id)
if (!el) return


const offset = 80
const y =
  el.getBoundingClientRect().top +
  window.pageYOffset -
  offset

window.scrollTo({
  top: y,
  behavior: "smooth"
})


}

return ( <footer className="relative pt-16 pb-6">


  {/* Top Divider */}
  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

  <div className="max-w-7xl mx-auto px-6">

    <div className="grid md:grid-cols-4 gap-12 pb-12">

      {/* BRAND */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Vishal.dev
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed">
          MERN Stack Developer focused on scalable backend systems,
          REST APIs, and production-ready web applications.
        </p>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <MdLocationOn />
          Palamau, Jharkhand • Currently in Bhopal
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 pt-2">
          <a
            href="https://github.com/Vishal7202"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/in/vishalkumar7202"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="mailto:vishalkumar7295997202@gmail.com"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <MdEmail />
          </a>
        </div>
      </div>

      {/* NAVIGATION */}
      <div>
        <h4 className="text-sm uppercase tracking-widest text-indigo-400 mb-5">
          Navigate
        </h4>

        <div className="space-y-3 text-gray-400 text-sm">
          {["home", "about", "skills", "education", "experience", "projects", "contact"].map((id) => (
            <div
              key={id}
              onClick={() => scrollToSection(id)}
              className="cursor-pointer hover:text-white transition"
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </div>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div>
        <h4 className="text-sm uppercase tracking-widest text-indigo-400 mb-5">
          Explore
        </h4>

        <div className="space-y-3 text-gray-400 text-sm">

          <div
            onClick={() => scrollToSection("projects")}
            className="cursor-pointer hover:text-white transition"
          >
            View Projects
          </div>

          <a
            href="/Vishal_Resume_Tech.pdf"
            download
            className="block hover:text-white transition"
          >
            Download Resume
          </a>

          <div
            onClick={() => scrollToSection("contact")}
            className="cursor-pointer hover:text-white transition"
          >
            Hire Me
          </div>

        </div>
      </div>

      {/* BACK TO TOP */}
      <div>
        <h4 className="text-sm uppercase tracking-widest text-indigo-400 mb-5">
          Utility
        </h4>

        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3 px-4 py-2 
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     rounded-lg shadow-lg shadow-purple-600/30
                     hover:scale-105 transition"
        >
          <FaArrowUp />
          Back To Top
        </button>

      </div>

    </div>

    {/* Bottom */}
    <div className="pt-6 border-t border-white/10 text-center text-gray-500 text-xs">
      © {new Date().getFullYear()} Vishal Kumar • Built with React, Tailwind & Node.js
    </div>

  </div>
</footer>


)
}
