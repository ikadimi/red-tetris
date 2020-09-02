import { START_GAME, GAME_LOST, ASSIGN_ADMIN, GAME_OVER, PUSH_NOTIFICATION } from '.'
import socket from "../../socket"
import { playBackgroundMusic } from './actions'

export const gameOver = () => {
    return {
        type: GAME_OVER
    }
}

export const gameLost = () => {
    return {
        type: GAME_LOST
    }
}

export const gameOn = () => {
    return {
        type: START_GAME
    }
}

export const startGame = (payload) => {
    return function (dispatch) {
        dispatch(gameOn())
        playBackgroundMusic()
        socket.emit('gameOn', (payload))
    }
}

export const assignAdmin = () => {
    return {
        type: ASSIGN_ADMIN
    }
}

export const myNotification = (payload) => {
    return function(dispatch, getState) {
        const notification = getState().notification

        if (notification === '') {
            dispatch(pushNotification(payload))
            setTimeout(() => {
                dispatch(pushNotification(''))
            }, 3000)
        }
    }
}

const pushNotification = (payload) => {
    return {
        type: PUSH_NOTIFICATION,
        payload
    }
}

export const newNotification = (payload) => {
    return function (dispatch, getState) {
        const name = getState().name

        // dispatch(myNotification(name + ': ' + payload))
        socket.emit('newNotification', name + ': ' + payload)
    }
}