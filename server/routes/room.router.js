const express = require('express')
const roomRouter = express.Router()
const { createRoom } = require('../controllers/rooms.controller')
const auth = require('../middleware/auth.middleware')

roomRouter.post('/', auth, createRoom)

module.exports = roomRouter
