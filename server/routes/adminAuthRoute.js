const express = require("express")
const router = express.Router()

router.post("/login", (req, res) => {

  const { email, password } = req.body

  console.log("REQ EMAIL:", email)
  console.log("REQ PASSWORD:", password)

  console.log("ENV EMAIL:", process.env.ADMIN_EMAIL)
  console.log("ENV PASSWORD:", process.env.ADMIN_PASSWORD)

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({
      success: true,
      message: "Login successful"
    })
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password"
  })
})

module.exports = router