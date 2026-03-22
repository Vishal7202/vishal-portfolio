const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")

const Contact = require("../models/Contact")

// ===============================
// EMAIL TRANSPORTER
// ===============================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})


// ===============================
// SEND CONTACT MESSAGE
// ===============================

router.post("/", async (req, res) => {

  console.log("📨 Contact API HIT", req.body)

  try {

    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      })
    }

    // DUPLICATE CHECK (5 minutes)

    const existing = await Contact.findOne({
      email,
      subject,
      message,
      createdAt: {
        $gt: new Date(Date.now() - 5 * 60 * 1000)
      }
    })

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Duplicate message detected"
      })
    }

    // SAVE MESSAGE

    const newMessage = new Contact({
      name,
      email,
      subject,
      message,
      status: "new"
    })

    await newMessage.save()


    // ===============================
    // SEND EMAIL TO ADMIN
    // ===============================

    try {

      const info = await transporter.sendMail({

        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,

        subject: `New Portfolio Message: ${subject}`,

        html: `
          <h2>New Contact Message</h2>

          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>

          <p><b>Message:</b></p>
          <p>${message}</p>
        `
      })

      console.log("📧 Admin Email Sent:", info.messageId)

    } catch (err) {

      console.log("❌ Admin Email Error:", err)

    }


    // ===============================
    // AUTO REPLY TO VISITOR
    // ===============================

    try {

      await transporter.sendMail({

        from: `"Vishal Kumar" <${process.env.EMAIL_USER}>`,
        to: email,

        subject: "Thank you for contacting Vishal Kumar",

        html: `
          <div style="font-family:Arial;max-width:600px;margin:auto">

            <h2>Thank You for Contacting Me</h2>

            <p>Hello <b>${name}</b>,</p>

            <p>
              Thank you for reaching out through my portfolio website.
              I have received your message and will respond as soon as possible.
            </p>

            <hr/>

            <h3>Your Message</h3>

            <p><b>Subject:</b> ${subject}</p>
            <p><b>Message:</b> ${message}</p>

            <br/>

            <p>Best Regards</p>
            <p><b>Vishal Kumar</b></p>
            <p>Full Stack Developer</p>

          </div>
        `
      })

    } catch (err) {

      console.log("❌ Auto Reply Error:", err)

    }


    res.json({
      success: true,
      message: "Message sent successfully"
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: "Server error"
    })

  }

})


// ===============================
// GET ALL MESSAGES
// ===============================

router.get("/", async (req, res) => {

  try {

    const messages = await Contact
      .find()
      .sort({ createdAt: -1 })

    res.json(messages)

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    })

  }

})


// ===============================
// GET RECENT MESSAGES
// ===============================

router.get("/recent", async (req, res) => {

  try {

    const messages = await Contact
      .find()
      .sort({ createdAt: -1 })
      .limit(5)

    res.json(messages)

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    })

  }

})


// ===============================
// MARK MESSAGE AS READ
// ===============================

router.put("/read/:id", async (req, res) => {

  try {

    await Contact.findByIdAndUpdate(req.params.id, {
      status: "read"
    })

    res.json({ success: true })

  } catch {

    res.status(500).json({
      message: "Server error"
    })

  }

})


// ===============================
// REPLY TO MESSAGE
// ===============================

router.post("/reply/:id", async (req, res) => {

  try {

    const { reply } = req.body

    const message = await Contact.findById(req.params.id)

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      })
    }

    try {

      const info = await transporter.sendMail({

        from: `"Vishal Portfolio" <${process.env.EMAIL_USER}>`,
        to: message.email,

        subject: `Reply to: ${message.subject}`,

        html: `
          <h3>Hello ${message.name}</h3>

          <p>${reply}</p>

          <br/>

          <p>Regards</p>
          <p><b>Vishal Kumar</b></p>
        `
      })

      console.log("📧 Reply Email Sent:", info.messageId)

    } catch (err) {

      console.log("❌ Reply Email Failed:", err)

      return res.status(500).json({
        success: false,
        message: "Email sending failed"
      })

    }

    message.status = "replied"

    await message.save()

    res.json({
      success: true,
      message: "Reply sent successfully"
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: "Reply failed"
    })

  }

})


// ===============================
// DELETE MESSAGE
// ===============================

router.delete("/:id", async (req, res) => {

  try {

    await Contact.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: "Message deleted"
    })

  } catch {

    res.status(500).json({
      message: "Server error"
    })

  }

})


module.exports = router