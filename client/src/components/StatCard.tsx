import {
  LayoutDashboard,
  FolderGit2,
  Mail,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react"

type Props = {
  page: string
  setPage: (page: string) => void
}

export default function AdminSidebar({ page, setPage }: Props) {

  const menu = [
    { name: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { name: "projects", label: "Projects", icon: FolderGit2 },
    { name: "messages", label: "Messages", icon: Mail },
    { name: "analytics", label: "Analytics", icon: BarChart3 },
    { name: "settings", label: "Settings", icon: Settings }
  ]

  return (
    <aside className="w-64 min-h-screen bg-[#0d1117] border-r border-gray-800 flex flex-col justify-between p-6">

      {/* LOGO */}
      <div>

        <h2 className="text-2xl font-bold mb-12 tracking-wide bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Admin Panel
        </h2>

        {/* MENU */}
        <nav className="space-y-2">

          {menu.map((item) => {
            const Icon = item.icon
            const active = page === item.name

            return (
              <button
                key={item.name}
                onClick={() => setPage(item.name)}
                className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${
                  active
                    ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30"
                    : "text-gray-400 hover:bg-[#161b22] hover:text-white"
                }`}
              >

                <Icon
                  size={18}
                  className={`transition ${
                    active ? "text-indigo-400" : "group-hover:text-indigo-400"
                  }`}
                />

                <span className="font-medium tracking-wide">
                  {item.label}
                </span>

              </button>
            )
          })}

        </nav>

      </div>

      {/* LOGOUT */}
      <button className="flex items-center gap-3 text-red-400 hover:text-red-300 transition px-4 py-3 rounded-xl hover:bg-red-500/10">
        <LogOut size={18}/>
        Logout
      </button>

    </aside>
  )
}