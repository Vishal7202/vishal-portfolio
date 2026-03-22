import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("home")

  const navigate = useNavigate()

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 10)

      const sections = ["home", "about", "skills", "education", "contact"]

      sections.forEach((id) => {

        const el = document.getElementById(id)

        if (el) {

          const rect = el.getBoundingClientRect()

          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(id)
          }

        }

      })

    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)

  }, [])

  const handleNavClick = (id: string) => {

    const el = document.getElementById(id)

    if (!el) return

    const navbarHeight = 80

    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight

    window.scrollTo({
      top: y,
      behavior: "smooth"
    })

    setIsOpen(false)

  }

  const linkClass = (id: string) =>
    `relative cursor-pointer transition duration-300 ${
      active === id
        ? "text-white"
        : "text-gray-400 hover:text-indigo-400"
    }`

  return (

<header
className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-500 ${
scrolled
? "bg-[#070916]/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40"
: "bg-[#070916]/90 backdrop-blur-xl"
}`}
>

<div className="max-w-7xl mx-auto px-6">

<div className="flex items-center justify-between h-20">

{/* LOGO */}

<h1
onClick={() => handleNavClick("home")}
className="text-xl font-bold tracking-wide cursor-pointer"
>
<span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
Vishal
</span>
<span className="text-white">.dev</span>
</h1>

{/* DESKTOP MENU */}

<nav className="hidden md:flex items-center gap-10 text-sm font-medium">

{["home", "about", "skills", "education", "contact"].map((id) => (

<span
key={id}
onClick={() => handleNavClick(id)}
className={linkClass(id)}
>

{id.charAt(0).toUpperCase() + id.slice(1)}

<span
className={`absolute -bottom-2 left-0 h-[2px] rounded-full transition-all duration-500 ${
active === id
? "w-full bg-gradient-to-r from-pink-500 to-indigo-500"
: "w-0"
}`}
/>

</span>

))}

{/* RESUME BUTTON */}

<a
href="/Vishal_Resume_Tech.pdf"
download="Vishal_Kumar_Resume.pdf"
className="ml-2 px-4 py-2 rounded-lg border border-indigo-500/30 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/10 transition"
>
Resume
</a>

{/* ADMIN BUTTON */}

<button
onClick={() => navigate("/admin")}
className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold hover:scale-105 transition"
>
Admin
</button>

</nav>

{/* MOBILE MENU BUTTON */}

<button
onClick={() => setIsOpen(!isOpen)}
className="md:hidden relative w-6 h-6"
>

<span
className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${
isOpen ? "rotate-45 top-3" : "top-1"
}`}
/>

<span
className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${
isOpen ? "opacity-0" : "top-3"
}`}
/>

<span
className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${
isOpen ? "-rotate-45 top-3" : "top-5"
}`}
/>

</button>

</div>

</div>

{/* MOBILE MENU */}

{isOpen && (

<div className="md:hidden absolute top-20 left-0 w-full bg-[#070916]/95 backdrop-blur-xl border-t border-white/10">

<div className="px-6 py-8 space-y-8 text-gray-300 text-base">

{["home", "about", "skills", "education", "contact"].map((id) => (

<div
key={id}
onClick={() => handleNavClick(id)}
className="cursor-pointer hover:text-indigo-400 transition"
>
{id.charAt(0).toUpperCase() + id.slice(1)}
</div>

))}

<a
href="/Vishal_Resume_Tech.pdf"
download="Vishal_Kumar_Resume.pdf"
className="block text-indigo-300"
>
Download Resume
</a>

<button
onClick={() => navigate("/admin")}
className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
>
Admin
</button>

</div>

</div>

)}

</header>

)

}