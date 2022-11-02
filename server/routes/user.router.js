const express = require('express')
const userRouter = express.Router()
const {
  register,
  login,
  updateProfile,
} = require('../controllers/user.controller')
const auth = require('../middleware/auth.middleware')

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.put('/updateProfile', auth, updateProfile)

module.exports = userRouter
