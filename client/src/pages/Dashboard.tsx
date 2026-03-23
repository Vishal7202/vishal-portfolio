import {
  FolderKanban,
  Mail,
  FileText,
  Clock,
  Pencil,
  Trash
} from "lucide-react"

import { useEffect, useState } from "react"
import VisitorsChart from "../components/VisitorsChart"

export default function Dashboard() {

  const [stats,setStats] = useState({
    projects:0,
    messages:0,
    blogs:0,
    pending:0
  })

  const [projects,setProjects] = useState<any[]>([])
  const [messages,setMessages] = useState<any[]>([])
  const [blogs,setBlogs] = useState<any[]>([])

  useEffect(()=>{

    const fetchDashboard = async()=>{

      try{

        const res = await fetch("https://vishal-portfolio-xud3.onrender.com/api/dashboard")

        const data = await res.json()

        setStats({
          projects:data.projects,
          messages:data.messages,
          blogs:data.blogs,
          pending:data.pending
        })

        setProjects(data.projectsList || [])
        setMessages(data.messagesList || [])
        setBlogs(data.blogsList || [])

      }catch(err){

        console.log(err)

      }

    }

    fetchDashboard()

  },[])


  const statsCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-indigo-400"
    },
    {
      title: "New Messages",
      value: stats.messages,
      icon: Mail,
      color: "text-green-400"
    },
    {
      title: "Blog Posts",
      value: stats.blogs,
      icon: FileText,
      color: "text-yellow-400"
    },
    {
      title: "Pending Approvals",
      value: stats.pending,
      icon: Clock,
      color: "text-red-400"
    }
  ]


  return (

    <div className="space-y-10">

      <div>

        <h1 className="text-3xl font-bold text-white">
          Welcome, Admin 👋
        </h1>

        <p className="text-gray-400 mt-1">
          Manage your portfolio content
        </p>

      </div>



      {/* STATS */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {statsCards.map((stat, i) => {

          const Icon = stat.icon

          return (

            <div
              key={i}
              className="bg-[#0f172a] backdrop-blur-xl p-6 rounded-xl border border-white/10 hover:border-indigo-500 hover:scale-[1.02] transition group"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">
                    {stat.title}
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    {stat.value}
                  </h2>

                </div>

                <Icon
                  size={28}
                  className={`${stat.color} opacity-80 group-hover:scale-110 transition`}
                />

              </div>

            </div>

          )

        })}

      </div>



      {/* CHART */}

      <div className="grid lg:grid-cols-2 gap-6">

        <VisitorsChart/>

        <div className="bg-[#0f172a] backdrop-blur-xl p-6 rounded-xl border border-white/10">

          <h2 className="text-lg font-semibold mb-4">
            Activity Feed
          </h2>

          <div className="space-y-3 text-sm text-gray-400">

            <p>🚀 New project added</p>
            <p>📩 New message received</p>
            <p>📝 Blog post published</p>
            <p>👤 Visitor joined portfolio</p>

          </div>

        </div>

      </div>



      {/* PROJECT TABLE */}

      <div className="bg-[#0f172a] backdrop-blur-xl p-6 rounded-xl border border-white/10">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-semibold">
            Manage Projects
          </h2>

          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm transition shadow-lg shadow-indigo-600/30">
            Add New Project
          </button>

        </div>


        <table className="w-full text-left text-sm">

          <thead className="text-gray-400 border-b border-gray-800">

            <tr>
              <th className="pb-3">Project</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>

          </thead>

          <tbody className="text-gray-300">

            {projects.length === 0 && (

              <tr>

                <td colSpan={3} className="py-4 text-gray-400">
                  No Projects
                </td>

              </tr>

            )}

            {projects.map((p:any,i)=> (

              <tr
                key={i}
                className="border-b border-gray-800 hover:bg-[#020617]"
              >

                <td className="py-3">
                  {p.name}
                </td>

                <td>

                  <span className={`px-2 py-1 rounded text-xs ${
                    p.status === "Published"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-gray-600/20 text-gray-400"
                  }`}>
                    {p.status}
                  </span>

                </td>

                <td className="flex gap-2">

                  <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded">
                    <Pencil size={14}/>
                  </button>

                  <button className="bg-red-600 hover:bg-red-700 p-2 rounded">
                    <Trash size={14}/>
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>



      {/* BOTTOM SECTION */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-[#0f172a] backdrop-blur-xl p-6 rounded-xl border border-white/10">

          <h2 className="text-xl font-semibold mb-4">
            Recent Messages
          </h2>

          <div className="space-y-3">

            {messages.length === 0 && (
              <p className="text-gray-400 text-sm">No messages</p>
            )}

            {messages.map((m:any,i)=> (

              <div
                key={i}
                className="bg-[#020617] p-3 rounded-lg hover:bg-[#0f172a] transition"
              >

                {m.name} — {m.subject}

              </div>

            ))}

          </div>

        </div>



        <div className="bg-[#0f172a] backdrop-blur-xl p-6 rounded-xl border border-white/10">

          <h2 className="text-xl font-semibold mb-4">
            Recent Blog Posts
          </h2>

          <div className="space-y-3">

            {blogs.length === 0 && (
              <p className="text-gray-400 text-sm">No blogs</p>
            )}

            {blogs.map((b:any,i)=> (

              <div
                key={i}
                className="bg-[#020617] p-3 rounded-lg hover:bg-[#0f172a] transition"
              >

                {b.title}

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  )

}