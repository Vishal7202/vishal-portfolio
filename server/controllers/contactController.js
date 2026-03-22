const nodemailer = require("nodemailer")
console.log("EMAIL USER:", process.env.EMAIL_USER)
console.log("EMAIL PASS:", process.env.EMAIL_PASS)

exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: subject,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    })

    res.status(200).json({ message: "Message sent successfully" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to send message" })
  }
}