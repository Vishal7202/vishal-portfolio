const express = require("express")
const router = express.Router()

const Project = require("../models/Project")
const Contact = require("../models/Contact")

router.get("/", async (req,res)=>{

  try{

    const projects = await Project.countDocuments()
    const messages = await Contact.countDocuments()

    // visitors temporary (until analytics added)
    const visitors = 0

    res.json({
      projects,
      messages,
      visitors
    })

  }catch(err){
    console.log(err)
    res.status(500).json({message:"Server Error"})
  }

})

module.exports = router