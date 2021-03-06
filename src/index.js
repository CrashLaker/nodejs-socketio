const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketio(server)


const port = process.env.PORT || 8080
const publicDirectoryPath = path.join(__dirname, '../public')


app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection', (socket) => {
    console.log('New websocket connection')

    socket.emit('countUpdated', count)

    socket.on('increment', ()=>{
        count++
        //socket.emit('countUpdated', count) // emit to client
        io.emit('countUpdated', count) // emit to all clients
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
