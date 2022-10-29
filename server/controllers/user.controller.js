const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function register(req, res) {
  try {
    const { name, email, password } = req.body
    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: 'Password must be 6 characters or more',
      })
    const emailLowercase = email.toLowerCase()
    const existedUser = await User.findOne({ email: emailLowercase })
    if (existedUser)
      return res
        .status(400)
        .json({ success: false, message: 'User already exist!' })
    const hashedPasword = await bcrypt.hash(password, 12)
    const user = await User.create({
      name,
      email: emailLowercase,
      password: hashedPasword,
    })
    const { _id: id, photoURL } = user
    const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    res.status(201).json({
      success: true,
      result: { id, name, email: user.email, photoURL, token },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong! try again later',
    })
  }
}

module.exports = {
  register,
}
