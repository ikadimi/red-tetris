import io from 'socket.io-client'

const ENDPOINT = ' https://red-tetris-1337.herokuapp.com'
const socket = io(ENDPOINT, {
    pingTimeout: 30000
})


export default socket