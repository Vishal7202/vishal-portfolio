import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Menu } from "lucide-react"

import AdminSidebar from "../components/AdminSidebar"
import AdminTopbar from "../components/AdminTopbar"

import ManageProjects from "../pages/ManageProjects"
import Messages from "../pages/Messages"
import Blogs from "../pages/Blogs"
import Settings from "../pages/Settings"

import { FolderGit2, Mail, Users } from "lucide-react"

export default function AdminDashboard() {

  const navigate = useNavigate()

  const API = "https://vishal-portfolio-xud3.onrender.com"

  const [activePage, setActivePage] = useState("dashboard")
  const [sidebarOpen,setSidebarOpen] = useState(false)

  const [stats,setStats] = useState({
    projects:0,
    messages:0,
    visitors:0
  })

  const [recentMessages,setRecentMessages] = useState<any[]>([])

  // 🔐 Admin Route Protection
  useEffect(()=>{

    const token = sessionStorage.getItem("admin_token")

    if(!token){
      navigate("/admin-login")
    }

  },[navigate])



  // ⬅ Browser Back Button → Home Page
  useEffect(() => {

    const handleBack = () => {
      navigate("/")
    }

    window.addEventListener("popstate", handleBack)

    return () => {
      window.removeEventListener("popstate", handleBack)
    }

  }, [navigate])



  // 📊 Dashboard Stats
  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await fetch(`${API}/api/dashboard`)

        const data = await res.json()

        setStats({
          projects: data.projects || 0,
          messages: data.messages || 0,
          visitors: data.visitors || 0
        })

      } catch (err) {

        console.log(err)

      }

    }

    fetchStats()

  }, [])



  // 📩 Recent Messages
  useEffect(() => {

    const fetchRecentMessages = async () => {

      try {

        const res = await fetch(`${API}/api/contact/recent`)

        const data = await res.json()

        setRecentMessages(data)

      } catch (err) {

        console.log("Recent messages error:", err)

      }

    }

    fetchRecentMessages()

  }, [])



  const renderPage = () => {

    if (activePage === "dashboard") {

      return (

        <div>

          <h1 className="text-2xl md:text-3xl font-bold mb-8">
            Dashboard
          </h1>


          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* PROJECTS */}
            <div className="bg-[#0f172a] backdrop-blur-xl p-6 rounded-xl border border-white/10 hover:border-indigo-500 hover:scale-[1.02] transition">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">
                    Projects
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {stats.projects}
                  </h2>

                </div>

                <div className="bg-indigo-500/10 p-3 rounded-lg">
                  <FolderGit2 size={22} className="text-indigo-400"/>
                </div>

              </div>

            </div>


            {/* MESSAGES */}
            <div className="bg-[#0f172a] backdrop-blur-xl p-6 rounded-xl border border-white/10 hover:border-green-500 hover:scale-[1.02] transition">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">
                    Messages
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {stats.messages}
                  </h2>

                </div>

                <div className="bg-green-500/10 p-3 rounded-lg">
                  <Mail size={22} className="text-green-400"/>
                </div>

              </div>

            </div>


            {/* VISITORS */}
            <div className="bg-[#0f172a] backdrop-blur-xl p-6 rounded-xl border border-white/10 hover:border-purple-500 hover:scale-[1.02] transition">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">
                    Visitors
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {stats.visitors}
                  </h2>

                </div>

                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <Users size={22} className="text-purple-400"/>
                </div>

              </div>

            </div>

          </div>


          {/* RECENT MESSAGES */}
          <div className="mt-10 bg-[#0f172a] backdrop-blur-xl border border-white/10 rounded-xl p-6">

            <h2 className="text-xl font-semibold mb-6">
              Recent Messages
            </h2>

            <div className="space-y-4">

              {recentMessages.length === 0 && (

                <p className="text-gray-400 text-sm">
                  No recent messages
                </p>

              )}

              {recentMessages.map((msg:any,index)=> (

                <div
                  key={index}
                  className="flex justify-between border-b border-gray-800 pb-3"
                >

                  <div>

                    <p className="font-medium">
                      {msg.name}
                    </p>

                    <p className="text-gray-400 text-sm">
                      {msg.subject}
                    </p>

                  </div>

                  <span className="text-gray-400 text-sm">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      )

    }

    if (activePage === "projects") return <ManageProjects/>
    if (activePage === "messages") return <Messages/>
    if (activePage === "blogs") return <Blogs/>
    if (activePage === "settings") return <Settings/>

  }



  return (

    <div className="flex min-h-screen bg-[#020617] text-white">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={()=>setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
        fixed md:relative
        z-50
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        <AdminSidebar
  activePage={activePage}
  setActivePage={setActivePage}
  messageCount={stats.messages}
/>

      </div>


      {/* RIGHT SIDE */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* TOPBAR */}
        <div className="flex items-center gap-3 border-b border-gray-800 p-4">

          <button
            className="md:hidden"
            onClick={()=>setSidebarOpen(true)}
          >
            <Menu size={22}/>
          </button>

          <AdminTopbar/>

        </div>


        <main className="p-4 md:p-8 lg:p-10 flex-1 overflow-auto">

          {renderPage()}

        </main>

      </div>

    </div>

  )

}