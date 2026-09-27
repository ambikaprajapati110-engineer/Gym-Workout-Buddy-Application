const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const sendVerificationEmail = require('../utils/sendVerificationEmail')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    if (!user.isVerified) {
      return res.status(400).json({ error: "Please verify your email first" })
    }
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// SIGNUP
const signupUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    await sendVerificationEmail(user)

    res.status(200).json({
      message: "Signup successful. Verification email sent."
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { loginUser, signupUser }