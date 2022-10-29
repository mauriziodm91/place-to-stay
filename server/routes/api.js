const express = require('express')
const api = express.Router()
const roomRouter = require('./room.router')
const userRouter = require('./user.router')

api.use('/room', roomRouter)
api.use('/user', userRouter)

module.exports = api
