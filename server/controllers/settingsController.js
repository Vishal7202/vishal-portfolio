const Settings = require("../models/Settings")

const getSettings = async (req, res) => {

  try {

    let settings = await Settings.findOne()

    if (!settings) {
      settings = await Settings.create({})
    }

    res.json(settings)

  } catch (err) {

    res.status(500).json({ message: "Server Error" })

  }

}

const updateSettings = async (req, res) => {

  try {

    let data = req.body

    if (req.files) {

      if (req.files.profileImage) {
        data.profileImage = req.files.profileImage[0].filename
      }

      if (req.files.resume) {
        data.resume = req.files.resume[0].filename
      }

    }

    const settings = await Settings.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    )

    res.json(settings)

  } catch (err) {

    res.status(500).json({ message: "Update Failed" })

  }

}

module.exports = {
  getSettings,
  updateSettings
}