import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function AdminLogin() {

const navigate = useNavigate()

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false)


// ✅ already login check
useEffect(() => {

const token = sessionStorage.getItem("admin_token")

if(token){
  navigate("/admin")
}

},[])



const handleSubmit = async (e: React.FormEvent) => {

e.preventDefault()
setLoading(true)

try {

  const res = await fetch("https://vishal-portfolio-xud3.onrender.com/api/admin/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: email.trim(),
    password: password.trim()
  })
})
  const data = await res.json()

  if (data.success) {

    sessionStorage.setItem("admin_token", "true")

    toast.success("Login successful")

    navigate("/admin")

  } else {

    toast.error(data.message || "Invalid email or password")

  }

} catch (error) {

  toast.error("Server error")

}

setLoading(false)

}


return (

<div className="min-h-screen flex items-center justify-center px-6 bg-[#0d1117]">

<div className="fixed inset-0 -z-40">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_65%)]"/>
</div>

<div className="w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-xl">

<h2 className="text-3xl font-bold text-center mb-2">
<span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
Admin Login
</span>
</h2>

<p className="text-gray-400 text-center mb-8 text-sm">
Secure access to portfolio dashboard
</p>

<form onSubmit={handleSubmit} className="space-y-5">

<div>
<label className="text-sm text-gray-300">
Email
</label>

<input
type="email"
required
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="mt-2 w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
/>
</div>

<div>
<label className="text-sm text-gray-300">
Password
</label>

<input
type="password"
required
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="mt-2 w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
/>
</div>

<button
type="submit"
disabled={loading}
className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] transition"
>
{loading ? "Logging in..." : "Login"}
</button>

</form>

<div className="text-center mt-6">

<button
onClick={()=>toast("Reset password feature coming soon")}
className="text-indigo-400 hover:text-indigo-300 text-sm"
>
Forgot Password?
</button>

</div>

</div>

</div>

)

}