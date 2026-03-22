const mongoose = require("mongoose")

const settingsSchema = new mongoose.Schema({

  // BASIC INFO

  name:{
    type:String,
    default:"Vishal Kumar"
  },

  email:{
    type:String,
    default:"admin@portfolio.com"
  },

  role:{
    type:String,
    default:"MERN Stack Developer"
  },

  location:{
    type:String,
    default:"India"
  },

  bio:{
    type:String,
    default:""
  },

  // PORTFOLIO INFO

  portfolioTitle:{
    type:String,
    default:"Vishal Kumar Portfolio"
  },

  tagline:{
    type:String,
    default:"Building Scalable Web Applications"
  },

  // SOCIAL LINKS

  github:{
    type:String,
    default:""
  },

  linkedin:{
    type:String,
    default:""
  },

  twitter:{
    type:String,
    default:""
  },

  leetcode:{
    type:String,
    default:""
  },

  codeforces:{
    type:String,
    default:""
  },

  // MEDIA

  profileImage:{
    type:String,
    default:""
  },

  resume:{
    type:String,
    default:""
  },

  // SEO

  metaTitle:{
    type:String,
    default:""
  },

  metaDescription:{
    type:String,
    default:""
  },

  keywords:{
    type:String,
    default:""
  },

  // ANALYTICS

  visitors:{
    type:Number,
    default:0
  }

},{timestamps:true})

module.exports = mongoose.model("Settings",settingsSchema)