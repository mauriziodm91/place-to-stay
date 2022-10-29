const http = require('http')
const app = require('./app')
require('dotenv').config()
const port = process.env.PORT || 5000
const server = http.createServer(app)
const mongoose = require('mongoose')

async function startServer() {
  //connect to mongodb
  try {
    await mongoose.connect(process.env.MONGO_CONNECT)
    server.listen(port, () => console.log('Server is listening on port:', port))
  } catch (error) {
    console.log(error)
  }
}

startServer()
