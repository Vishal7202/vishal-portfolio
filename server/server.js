require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")

const contactRoute = require("./routes/contactRoute")
const adminAuthRoute = require("./routes/adminAuthRoute")
const projectRoutes = require("./routes/projectRoutes")
const settingsRoutes = require("./routes/settingsRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")

// CONNECT DATABASE
connectDB()

const app = express()

// MIDDLEWARE
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

app.use(express.json())

// STATIC FOLDER
const path = require("path")

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// ROUTES
app.use("/api/contact", contactRoute)
app.use("/api/admin", adminAuthRoute)
app.use("/api/projects", projectRoutes)
app.use("/api/settings", settingsRoutes)
app.use("/api/dashboard", dashboardRoutes)

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running ✅")
})

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack)

  res.status(500).json({
    success: false,
    message: "Server Error"
  })
})

// SERVER START
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})