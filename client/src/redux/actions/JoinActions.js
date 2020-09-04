import { USER_OFF, JOIN_REQUEST, JOIN_FAILURE, JOIN_SUCCESS, } from "."
import socket from "../../socket"
import { hideErrorBox } from "./ErrorActions"
import { pauseBackgroundMusic } from "./Sounds"
import { updateRoom } from './TetrisActions'
import { myNotification } from "./GameState"

const userOff = () => {
    return {
        type: USER_OFF
    }
}

export const leaveRoom = () => {
    return function(dispatch) {
        socket.disconnect()
        socket.off()
        pauseBackgroundMusic()
        dispatch(hideErrorBox())
        dispatch(userOff())
    }
}

const joinRequest = () => {
    return {
        type: JOIN_REQUEST
    }
}

export const joinFailure = (payload) => {
    return {
        type: JOIN_FAILURE,
        payload
    }
}

const joinSuccess = (payload) => {
    return {
        type: JOIN_SUCCESS,
        payload
    }
}

export const createNewBoard = () => {
    const board = new Array(20)

    for (let i = 0; i < 20; i++) {
        board[i] = new Array(10).fill('0')
    }
    return board
}

export const joinActionCreator = ({name, room}) => {
    return function (dispatch) {
        dispatch(joinRequest())
        socket.connect()
        socket.emit('join', {name, room}, ({error, success}) => {
            if (error)
                dispatch(joinFailure(error))
            else if (success) {
                const clients = new Map()
                const {roomId, peers, admin} = success

                if (peers) {
                    peers.forEach(peer => {
                        clients.set(peer.id, {board: createNewBoard(), peer})
                    })
                    dispatch(updateRoom({id: roomId, clients}))
                }
                dispatch(joinSuccess({name, admin}))
                dispatch(myNotification({name: 'ROOM', message: `Welcom to room ${roomId}`}))
            }
            else
                dispatch(joinFailure("Something Went Wrong"))
        })
    }
}