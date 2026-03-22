import { useEffect, useRef, useState } from "react"

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const down = () => setClicked(true)
    const up = () => setClicked(false)

    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.08
      pos.current.y += (mouse.current.y - pos.current.y) * 0.08

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.current.x - 150}px, ${
          pos.current.y - 150
        }px, 0)`
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className={`fixed pointer-events-none z-[999] 
      w-[300px] h-[300px] rounded-full 
      bg-gradient-to-r from-purple-500/30 via-indigo-500/30 to-cyan-500/30
      blur-[120px] transition-transform duration-150 ${
        clicked ? "scale-90 opacity-70" : "scale-100 opacity-100"
      }`}
    />
  )
}