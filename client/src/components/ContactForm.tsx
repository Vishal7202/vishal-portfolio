import { useState } from "react"
import toast from "react-hot-toast"
import { Send } from "lucide-react"

export default function ContactForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (loading) return   // prevents duplicate submit

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill all fields")
      return
    }

    setLoading(true)

    try {

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message")
      }

      toast.success("Message sent successfully 🚀")

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

    } catch (error: any) {

      console.error(error)
      toast.error(error.message || "Server error")

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="w-full max-w-2xl mx-auto">

      <div
        className="p-8 md:p-10 rounded-2xl
        bg-white/5 backdrop-blur
        border border-white/10
        shadow-2xl"
      >

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}

          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg
            bg-white/5 border border-white/10
            text-gray-200 placeholder-gray-400
            focus:outline-none focus:border-indigo-500
            transition"
          />

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg
            bg-white/5 border border-white/10
            text-gray-200 placeholder-gray-400
            focus:outline-none focus:border-indigo-500
            transition"
          />

          {/* SUBJECT */}

          <input
            type="text"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full px-4 py-3 rounded-lg
            bg-white/5 border border-white/10
            text-gray-200 placeholder-gray-400
            focus:outline-none focus:border-indigo-500
            transition"
          />

          {/* MESSAGE */}

          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message..."
            className="w-full px-4 py-3 rounded-lg
            bg-white/5 border border-white/10
            text-gray-200 placeholder-gray-400
            resize-none
            focus:outline-none focus:border-indigo-500
            transition"
          />

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2
            py-3 rounded-lg font-semibold
            bg-gradient-to-r from-indigo-600 to-purple-600
            hover:scale-[1.02] active:scale-[0.98]
            transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed"
          >

            {loading ? (
              "Sending..."
            ) : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}

          </button>

        </form>

      </div>

    </div>
  )
}