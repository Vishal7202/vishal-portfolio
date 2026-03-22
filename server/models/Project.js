const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    default: ""
  },

  tech: {
    type: [String],
    default: []
  },

  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft"
  },

  github: {
    type: String,
    default: ""
  },

  live: {
    type: String,
    default: ""
  },

  image: {
    type: String,
    default: ""
  },

  featured: {
    type: Boolean,
    default: false
  }

},
{
  timestamps: true
}
)

module.exports = mongoose.model("Project", projectSchema)