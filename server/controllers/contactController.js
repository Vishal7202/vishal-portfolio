const nodemailer = require("nodemailer")

exports.sendContactMessage = async (req, res) => {
  try {

    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // Production safe transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Message: ${subject}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    })

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    })

  } catch (error) {

    console.error("EMAIL ERROR:", error)

    res.status(500).json({
      success: false,
      message: "Email failed to send",
    })
  }
}