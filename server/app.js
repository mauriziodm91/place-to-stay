const express = require('express')
require('dotenv').config()
const api = require('./routes/api')
const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  )
  next()
})

app.use(express.json({ limit: '10mb' }))

app.use('/', api)
app.use('/', (req, res) => res.json({ message: 'Welcome to out API' }))
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Not Found' })
})
module.exports = app
