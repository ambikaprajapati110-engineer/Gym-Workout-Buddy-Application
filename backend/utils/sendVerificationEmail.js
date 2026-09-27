const nodemailer = require('nodemailer')
const crypto = require('crypto')

const sendVerificationEmail = async (user) => {
  try {
    const token = crypto.randomBytes(32).toString('hex')

    user.verifyToken = token
    await user.save()

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS   // App Password
      }
    })

    // ✅ IMPORTANT — backend port 4000
    const url = `http://localhost:4000/api/user/verify/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Verify Your Email',
      html: `
        <h2>Email Verification</h2>
        <a href="${url}">Click here to verify</a>
      `
    })

    console.log("✅ Verification email sent")

  } catch (error) {
    console.log("❌ Mail Error:", error.message)
  }
}

module.exports = sendVerificationEmail