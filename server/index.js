const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`user connected: ${socket.id}`)

  socket.on('join_room', (data) => {
    socket.join(data)
  })

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data)
    console.log(data)
  })
})

server.listen(3001, () => {
  console.log('server is running')
})
