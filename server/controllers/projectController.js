const Project = require("../models/Project")


// ===============================
// GET ALL PROJECTS
// ===============================
exports.getProjects = async (req, res) => {

  try {

    const projects = await Project.find().sort({ createdAt: -1 })

    res.status(200).json(projects)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects"
    })

  }

}


// ===============================
// CREATE PROJECT
// ===============================
exports.createProject = async (req, res) => {

  try {

    const {
      name,
      description,
      tech,
      status,
      github,
      live,
      featured
    } = req.body || {}

    const baseUrl =
  process.env.BASE_URL || `${req.protocol}://${req.get("host")}`

const imageFile = req.file
  ? `${baseUrl}/uploads/${req.file.filename}`
  : ""

    let techArray = tech

    if (typeof techArray === "string") {
      techArray = techArray.split(",").map(t => t.trim())
    }

    let featuredValue = featured

    if (typeof featuredValue === "string") {
      featuredValue = featuredValue === "true"
    }

    const project = await Project.create({
      name,
      description,
      tech: techArray,
      status,
      github,
      live,
      image: imageFile,
      featured: featuredValue
    })

    res.status(201).json({
      success: true,
      message: "Project created",
      project
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: "Failed to create project"
    })

  }

}


// ===============================
// UPDATE PROJECT
// ===============================
exports.updateProject = async (req, res) => {
  try {

    let updates = req.body

    // ✅ BASE URL (IMPORTANT FIX)
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`

    // ✅ NEW IMAGE HANDLE (PERMANENT URL)
    if (req.file) {
      updates.image = `${baseUrl}/uploads/${req.file.filename}`
    }

    // ✅ TECH ARRAY FIX
    if (updates.tech && typeof updates.tech === "string") {
      updates.tech = updates.tech.split(",").map(t => t.trim())
    }

    // ✅ FEATURED BOOLEAN FIX
    if (updates.featured && typeof updates.featured === "string") {
      updates.featured = updates.featured === "true"
    }

    // ✅ UPDATE PROJECT
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true
      }
    )

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: "Update failed"
    })

  }
}



// ===============================
// DELETE PROJECT
// ===============================
exports.deleteProject = async (req, res) => {

  try {

    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {

      return res.status(404).json({
        success: false,
        message: "Project not found"
      })

    }

    res.status(200).json({
      success: true,
      message: "Project deleted"
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: "Delete failed"
    })

  }

}