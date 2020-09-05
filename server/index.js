const express = require('express')
const socketio = require('socket.io')
const Client = require('./client')
const Pieces = require('./pieces')
const Room = require('./room')
const {createId, getInfo} = require('./helperFunctions')
const http = require('http')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {pingTimeout: 30000})
const rooms = new Map

function createRoom(id = createId())
{
    const room = new Room(id)
    room.pieces = new Pieces()
    rooms.set(id, room)

    return room
}

io.on('connect', (socket) => {
    const client = new Client(socket)

    socket.on('join', ({name, room}, callback) => {
        if (!name || !room)
            callback({error: "Name or Room is missing"})
        else {
            if (client.room) {
                return client.restartGame() 
            }
            client.name = name
            activeRoom = rooms.get(room)
            if (!activeRoom)
                activeRoom = createRoom(room)
            activeRoom.join(client)
            .then(res => {
                client.initialiseClient()
                const clients = [...activeRoom.clients.values()].filter(peer => client.id !== peer.id)
                const peers = clients.map(peer => getInfo(peer))
    
                socket.emit('instantiateGame', {board: client.board.board, piece: client.pieces[1]})
                socket.join(activeRoom.id)
                socket.broadcast.to(activeRoom.id).emit('userJoined',
                {
                    roomId: activeRoom.id,
                    peer: getInfo(client)
                })
                callback({success: {roomId: activeRoom.id, peers, admin: client.admin}})
            })
            .catch(error => {
                callback({error})
            })
        }
    })

    socket.on('freezLines', (lines, callback) => {
        if (client)
            callback(client.freezLines(lines))
    })

    socket.on('gameOn', (first) => {
        if (client.room) {
            client.room.active = true
            if (first)
                socket.broadcast.to(client.room.id).emit('gameOn')
            else {
                client.room.pieces.restartStack()
                client.restartGame()
                socket.broadcast.to(client.room.id).emit('restartGame')
            }
        }
    })

    socket.on('restartGame', () => {
        if (client)
            client.restartGame()
    })

    socket.on('newNotification', (payload) => {
        if (client.room) {
            socket.broadcast.to(client.room.id).emit('newNotification', payload) 
        }
    })

    socket.on('userInput', (move, callback) => {
        switch (move)
        {
            case 'space':
                return callback(client.dropPiece())
            case 'down':
                return callback(client.moveDown())
            case 'up':
                return callback(client.checkRotation())
            case 'right':
                return callback(client.moveRight())
            case 'left':
                return callback(client.moveLeft())
            default:
                return callback(null)
        }
    })

    socket.on('disconnect', (reason) => {
        const room = client.room

        if (room) {
            room.leave(client)
            client.socket.emit('disconnect', reason)
            if (room.clients.size === 0)
                rooms.delete(room.id);
            else 
            {
                if (client.admin) {
                    admin = room.nextRoomAdmin()
                    admin.socket.emit('newAdmin')
                }
                socket.broadcast.to(activeRoom.id).emit('userLeft', {roomId: activeRoom.id, userId: client.id, name: client.name})
            }
        }
    })
})

app.use(cors())
app.use(router)

server.listen(PORT, () => console.log(`server has started on port ${PORT}`))