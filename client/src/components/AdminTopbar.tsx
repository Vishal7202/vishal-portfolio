import { Search, Bell, UserCircle, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminTopbar() {

  const [openProfile, setOpenProfile] = useState(false)
  const [openNotif, setOpenNotif] = useState(false)

  const [unreadCount, setUnreadCount] = useState(0)

  const profileRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  // LOGOUT
  const handleLogout = () => {

    sessionStorage.removeItem("admin_token")

    navigate("/")

  }

  // PROFILE PAGE
  const handleProfile = () => {

    setOpenProfile(false)

    navigate("/")

  }

  // SETTINGS PAGE
  const handleSettings = () => {

    setOpenProfile(false)

    navigate("/admin/settings")

  }


  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpenProfile(false)
      }

      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setOpenNotif(false)
      }

    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [])


  // 🔔 FETCH UNREAD MESSAGES
  useEffect(() => {

    const fetchUnread = async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/contact"
        )

        const data = await res.json()

        const unread = data.filter(
          (msg:any) => msg.status === "new"
        )

        setUnreadCount(unread.length)

      } catch (err) {

        console.log("Notification error:", err)

      }

    }

    fetchUnread()

  }, [])



  return (

    <header className="sticky top-0 z-40 w-full h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <h1 className="text-lg font-semibold text-white tracking-wide">
          Admin Dashboard
        </h1>

      </div>


      {/* SEARCH */}
      <div className="hidden md:flex items-center bg-[#0f172a] border border-white/10 rounded-xl px-3 py-2 w-80 focus-within:border-indigo-500 transition">

        <Search size={16} className="text-gray-400"/>

        <input
          type="text"
          placeholder="Search projects, messages..."
          className="bg-transparent outline-none text-sm text-gray-300 ml-2 w-full"
        />

      </div>


      {/* RIGHT */}
      <div className="flex items-center gap-4">


        {/* NOTIFICATION */}
        <div ref={notifRef} className="relative">

          <button
            onClick={() => setOpenNotif(!openNotif)}
            className="relative p-2 rounded-xl hover:bg-white/5 transition"
          >

            <Bell size={20} className="text-gray-400"/>

            {unreadCount > 0 && (

              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full">

                {unreadCount}

              </span>

            )}

          </button>


          {openNotif && (

            <div className="absolute right-0 mt-3 w-72 bg-[#020617] border border-white/10 rounded-xl shadow-xl p-4">

              <p className="text-sm text-gray-300 mb-4 font-medium">

                Notifications

              </p>

              <p className="text-gray-400 text-sm">

                {unreadCount === 0
                  ? "No new notifications"
                  : `${unreadCount} new message(s)`}

              </p>

              <button
                onClick={() => navigate("/admin/messages")}
                className="mt-4 w-full text-sm text-indigo-400 hover:underline"
              >
                View Messages
              </button>

            </div>

          )}

        </div>



        {/* PROFILE */}
        <div ref={profileRef} className="relative">

          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-2 cursor-pointer hover:bg-white/5 px-3 py-2 rounded-xl transition"
          >

            <UserCircle size={28} className="text-indigo-400"/>

            <div className="hidden md:block text-sm">

              <p className="text-white font-medium">
                Vishal
              </p>

              <p className="text-gray-400 text-xs">
                Super Admin
              </p>

            </div>

            <ChevronDown size={16} className="text-gray-400"/>

          </button>


          {openProfile && (

            <div className="absolute right-0 mt-3 w-48 bg-[#020617] border border-white/10 rounded-xl shadow-xl py-2">

              <button
                onClick={handleProfile}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                Profile
              </button>

              <button
                onClick={handleSettings}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </header>

  )

}