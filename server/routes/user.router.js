const express = require('express')
const userRouter = express.Router()
const { register } = require('../controllers/user.controller')

userRouter.post('/register', register)

module.exports = userRouter
