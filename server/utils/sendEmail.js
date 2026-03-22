const nodemailer = require("nodemailer")

const sendEmail = async ({ name, email, subject, message }) => {

  const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }

  })

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: process.env.EMAIL_USER,

    subject: `New Contact Message - ${subject}`,

    html: `
      <h3>New Message From Portfolio</h3>

      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Subject:</b> ${subject}</p>
      <p><b>Message:</b> ${message}</p>
    `
  })

}

module.exports = sendEmail