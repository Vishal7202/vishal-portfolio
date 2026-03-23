import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  FileText,
  Settings,
  LogOut,
  User
} from "lucide-react"

type Props = {
  activePage: string
  setActivePage: (page: string) => void
  messageCount: number
}

export default function AdminSidebar({ activePage, setActivePage, messageCount }: Props) {

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      value: "dashboard"
    },
    {
      name: "Projects",
      icon: FolderKanban,
      value: "projects"
    },
    {
  name: "Messages",
  icon: Mail,
  value: "messages",
  badge: messageCount
},
    {
      name: "Blog Posts",
      icon: FileText,
      value: "blogs"
    },
    {
      name: "Settings",
      icon: Settings,
      value: "settings"
    }
  ]

  const handleLogout = () => {

    sessionStorage.removeItem("admin_token")

    window.location.href = "/admin-login"

  }

  return (

    <aside className="w-72 min-h-screen bg-gradient-to-b from-[#020617] via-[#020617] to-[#0f172a] border-r border-white/10 flex flex-col backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">

        <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">

          <User size={18} className="text-white"/>

        </div>

        <div>

          <h2 className="text-lg font-semibold text-white tracking-wide">
            Vishal Admin
          </h2>

          <p className="text-xs text-gray-400">
            Portfolio Control
          </p>

        </div>

      </div>



      {/* Menu */}

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

        {menu.map((item) => {

          const Icon = item.icon
          const active = activePage === item.value

          return (

            <button
              key={item.value}
              onClick={() => setActivePage(item.value)}

              className={`group relative w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300

              ${
                active
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
              }
              `}
            >

              {/* Active bar */}

              {active && (
                <span className="absolute left-0 top-0 h-full w-1 bg-indigo-400 rounded-r-md"/>
              )}

              <div className="flex items-center gap-3">

                <Icon
                  size={18}
                  className={`transition ${
                    active ? "text-white" : "text-gray-400 group-hover:text-white"
                  }`}
                />

                <span className="text-sm font-medium">
                  {item.name}
                </span>

              </div>


              {/* Badge */}

              {item.badge && (

                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">

                  {item.badge}

                </span>

              )}

            </button>

          )

        })}

      </nav>



      {/* Logout */}

      <div className="px-4 py-5 border-t border-white/10">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
        >

          <LogOut size={18}/>

          Logout

        </button>

      </div>

    </aside>

  )

}