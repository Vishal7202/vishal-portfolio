const express = require("express")

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/projectController")

const upload = require("../middleware/upload")

const router = express.Router()


// GET PROJECTS
router.get("/", getProjects)


// CREATE PROJECT WITH IMAGE
router.post("/", upload.single("image"), createProject)


// UPDATE PROJECT WITH IMAGE
router.put("/:id", upload.single("image"), updateProject)


// DELETE PROJECT
router.delete("/:id", deleteProject)


module.exports = router