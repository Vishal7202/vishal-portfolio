const express = require("express")
const router = express.Router()

const upload = require("../middleware/upload")

const { getSettings, updateSettings } = require("../controllers/settingsController")

router.get("/", getSettings)

router.put(
  "/",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 }
  ]),
  updateSettings
)

module.exports = router