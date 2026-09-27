const User = require('../models/userModel')

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params

    const user = await User.findOne({ verifyToken: token })

    if (!user) {
      return res.status(400).send("Invalid or expired token")
    }

    user.isVerified = true
    user.verifyToken = undefined
    await user.save()

    res.send("Email verified successfully. You can login now.")

  } catch (error) {
    res.status(500).send("Server error")
  }
}

module.exports = { verifyEmail }