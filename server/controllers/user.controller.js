const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tryCatch = require('../utils/tryCatch')
const Room = require('../models/room.model')

const register = tryCatch(async function (req, res) {
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
})

const login = tryCatch(async function (req, res) {
  const { email, password } = req.body
  const emailLowercase = email.toLowerCase()
  const existedUser = await User.findOne({ email: emailLowercase })
  if (!existedUser)
    return res
      .status(404)
      .json({ success: false, message: 'User does not exist!' })
  const correctPasword = await bcrypt.compare(password, existedUser.password)
  if (!correctPasword)
    return res
      .status(400)
      .json({ success: false, message: 'Invalid Credentials' })

  const { _id: id, name, photoURL } = existedUser
  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
  res.status(200).json({
    success: true,
    result: { id, name, email: emailLowercase, photoURL, token },
  })
})

const updateProfile = tryCatch(async function (req, res) {
  const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  })
  const { _id: id, name, photoURL } = updateUser

  await Room.updateMany({ uid: id }, { uName: name, uPhoto: photoURL })

  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
  res.status(200).json({ success: true, result: { name, photoURL, token } })
})

module.exports = {
  register,
  login,
  updateProfile,
}
