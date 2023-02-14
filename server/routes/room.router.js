const express = require('express')
const roomRouter = express.Router()
const { createRoom, getRooms } = require('../controllers/rooms.controller')
const auth = require('../middleware/auth.middleware')

roomRouter.post('/', auth, createRoom)
roomRouter.get('/', getRooms)

module.exports = roomRouter
