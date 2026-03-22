import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"

import AdminDashboard from "./admin/AdminDashboard"
import AdminLogin from "./pages/AdminLogin"
import ProtectedRoute from "./components/ProtectedRoute"

// ADMIN PAGES
import Settings from "./pages/Settings"
import Dashboard from "./pages/Dashboard"
import Messages from "./pages/Messages"
import ManageProjects from "./pages/ManageProjects"

function App() {

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {

    document.documentElement.style.scrollBehavior = "smooth"

    const timer = setTimeout(() => {
      setLoaded(true)
    }, 250)

    return () => clearTimeout(timer)

  }, [])

  return (

    <Router>

      <div className="min-h-screen w-full overflow-x-hidden antialiased text-gray-200">

        {/* Background */}
        <div className="fixed inset-0 -z-50 bg-[#0d1117]" />

        {/* Glow */}
        <div className="fixed inset-0 -z-40 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.07),transparent_65%)]" />
        </div>

        <Routes>

          {/* ================= PORTFOLIO ================= */}
          <Route
            path="/"
            element={
              <div
                className={`transition-opacity duration-700 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              >
                <MainLayout />
              </div>
            }
          />

          {/* ================= ADMIN LOGIN ================= */}
          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />

          {/* ================= ADMIN DASHBOARD ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN PAGES ================= */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <ManageProjects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

        </Routes>

        {/* Toast */}
        <Toaster
          position="top-right"
          toastOptions={{
            style:{
              background:"#111827",
              color:"#ffffff",
              border:"1px solid rgba(255,255,255,0.08)"
            }
          }}
        />

      </div>

    </Router>

  )

}

export default App