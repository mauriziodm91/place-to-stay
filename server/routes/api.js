const express = require('express')
const api = express.Router()
const roomRouter = require('./room.router')

api.use('/room', roomRouter)

module.exports = api
