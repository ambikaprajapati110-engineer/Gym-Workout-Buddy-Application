const express = require('express');
const router = express.Router();

const User = require('../models/userModel');
const { signupUser, loginUser } = require('../controllers/userController');

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

router.get('/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verifyToken: req.params.token });

    if (!user) return res.send("Invalid link");

   
    user.isVerified = true;        // ✅ verified karna hai
    user.verifyToken = undefined;  // ✅ token hata dena hai

    await user.save();
    
    res.send("Email verified! Now you can login.");
  } catch (err) {
    res.send("Error verifying email");
  }
});

module.exports = router;