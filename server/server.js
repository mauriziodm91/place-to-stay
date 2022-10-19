const http = require('http')
const app = require('./app')
require('dotenv').config()
const port = process.env.PORT || 5000
const server = http.createServer(app)

function startServer() {
  //connect to mongodb
  server.listen(port, () => console.log('Server is listening on port:', port))
}

startServer()
