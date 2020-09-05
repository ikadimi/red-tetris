import { INITIATION_SUCCESS, SET_PIECES, SET_BOARD, DROP_PIECE, PIECE_CHANGE, UPDATE_SCORE, UPDATE_ROOM} from "."
import React from 'react'
import socket from "../../socket"
import { createNewBoard, joinFailure } from './JoinActions'
import {gameOver, gameLost, gameOn, assignAdmin, myNotification, pauseBackgroundMusic, playMiniBeepSound, playBeepSound, playBackgroundMusic} from './actions'

export const setBoard = (payload) => {
    return {
        type: SET_BOARD,
        payload
    }
}

export const setPieces = (payload) => {
    return {
        type: SET_PIECES,
        payload
    }
}

export const getPieces = () => {
    return function(dispatch) {
        socket.emit('getPieces', (pieces) => {
            dispatch(setPieces(pieces))
        })
    }
}

export const pieceChange = (payload) => {
    return {
        type: PIECE_CHANGE,
        payload
    }
}

export const updateScore = (payload) => {
    return {
        type: UPDATE_SCORE,
        payload
    }
}

export const updateRoom = (payload) => {
    return {
        type: UPDATE_ROOM,
        payload
    }
}

const initiationSuccess = payload => {
    return {
        type: INITIATION_SUCCESS,
        payload
    }
}

export const roomEventListeners = () => {
    return function(dispatch, getState) {

        socket.on('disconnect', (reason) => {
            dispatch(joinFailure(reason))
        })

        socket.on('gameLost', () => {
            pauseBackgroundMusic()
            dispatch(gameLost())
        })

        socket.on('newAdmin', () => {
            dispatch(assignAdmin())
            dispatch(myNotification({name: 'ROOM', message: 'You are the new Admin'}))
        })

        socket.on('newNotification', (payload) => {
            dispatch(myNotification(payload))
        })

        socket.on('gameOn', () => {
            dispatch(gameOn())
            playBackgroundMusic()
        })

        socket.on('restartGame', () => {
            socket.emit('restartGame')
            dispatch(gameOn())
        })

        socket.on('instantiateGame', (payload) => {
            dispatch(initiationSuccess(payload))
            dispatch(tetrisEventListeners())
        })

        socket.on('userJoined', ({roomId, peer}) => {
            const room = getState().room
            const users = [...room.clients.keys()]

            if (!users.find(user => user === peer.id)) {
                dispatch(myNotification({name: 'ROOM', message: `${peer.name} has joined`}))
                room.clients.set(peer.id, {board: createNewBoard(), peer})
                dispatch(updateRoom({id: roomId, clients: room.clients}))
            }
        })

        socket.on('userLeft', ({roomId, userId, name}) => {
            const room = getState().room
            const users = [...room.clients.keys()]

            if (users.find(user => user === userId)) {
                dispatch(myNotification({name: 'ROOM', message: `${name} has left`}))
                room.clients.delete(userId)
                dispatch(updateRoom({id: roomId, clients: room.clients}))
            }
        })

        socket.on('boardUpdated', ({roomId, id, board}) => {
            const room = getState().room
            const user = room.clients.get(id)

            if (user) {
                user.board = board
                dispatch(updateRoom({id: roomId, clients: room.clients}))
            }
        })

        socket.on('infoUpdated', ({ info }) => {
            const room = getState().room
            const user = room.clients.get(info.id)

            if (user) {
                if (user.peer.lineCleared < info.lineCleared)
                    socket.emit('freezLines', (info.lineCleared - user.peer.lineCleared), ({board}) => {
                        if (board)
                            user.board = board
                    })
                user.peer = info
                dispatch(updateRoom({id: info.room, clients: room.clients}))
            }
        })
    }
}

export const tetrisEventListeners = () => {
    return function(dispatch) {
        socket.on('pieceChange', (pieceOrder) => {
            dispatch(pieceChange(pieceOrder))
        })
        socket.on('updateScore', (payload) => {
            dispatch(updateScore(payload))
        })
        socket.on('gameOver', () => {
            pauseBackgroundMusic()
            dispatch(gameOver())
        })
    }
}

export const userInput = (key) => {
    return function(dispatch, getState){
        const active = getState().active
        if (active) {
            socket.emit("userInput", key, (newBoard) => {
                if (newBoard) {
                    if (key === 'left' || key === 'right' || key === 'up')
                        playMiniBeepSound()
                    else if (key === 'space')
                        playBeepSound()
                    dispatch(setBoard(newBoard))
                }
            })
        }
    }
}

export const dropPiece = () => {
    return {
        type: DROP_PIECE
    }
}

export const fromPieceToGrid = (piece) => {
    let displayBoard = []

    if (piece) {
        for (let i = 0; i < piece.size; i++) 
        {
            for (let j = 0; j < piece.size; j++) 
            {
                if ((piece.shape[i][j]) === '0')
                    displayBoard.push(<div key={(i * 10) + j} style={{opacity: 0}} className='nextPiece'></div>) 
                else
                    displayBoard.push(<div key={(i * 10) + j} style={{backgroundColor: piece.color}} className='nextPiece'></div>)
            }
        }
    }
    return displayBoard
}
