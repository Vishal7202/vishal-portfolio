const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
  },

  subject: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },

  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },

  status: {
    type: String,
    enum: ["new", "read", "replied"],
    default: "new"
  }

}, {
  timestamps: true
})


// PERFORMANCE INDEX

contactSchema.index({ createdAt: -1 })

module.exports = mongoose.model("Contact", contactSchema)