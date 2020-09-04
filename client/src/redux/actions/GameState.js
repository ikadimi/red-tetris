import { START_GAME, GAME_LOST, ASSIGN_ADMIN, GAME_OVER, PUSH_NOTIFICATION, SHOW_HIDE_CONTROLLER, SET_MESSAGES, OPEN_CLOSE_CHAT, SWITCH_THEME, RESET_MESSAGES } from '.'
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

        if (payload.name)
            dispatch(setMessages(payload))
        if (notification === '') {
            dispatch(pushNotification(payload))
            setTimeout(() => {
                dispatch(pushNotification(''))
            }, 2000)
        }
    }
}

const pushNotification = (payload) => {
    return {
        type: PUSH_NOTIFICATION,
        payload
    }
}

export const resetMessages = () => {
    return {
        type: RESET_MESSAGES
    }
}

const setMessages = (payload) => {
    return {
        type: SET_MESSAGES,
        payload
    }
}

export const newNotification = (payload) => {
    return function (dispatch, getState) {
        const name = getState().name

        dispatch(setMessages({name, message: payload}))
        socket.emit('newNotification', {name, message: payload})
    }
}

export const showHideController = () => {
    return {
        type: SHOW_HIDE_CONTROLLER
    }
}

export const openCloseChat = () => {
    return {
        type: OPEN_CLOSE_CHAT
    }
}

export const switchTheme = () => {
    return {
        type: SWITCH_THEME
    }
}

export const lightOrDark = () => {
    return function (dispatch) {
        document.body.classList.toggle('dark')
        dispatch(switchTheme())
    }
}