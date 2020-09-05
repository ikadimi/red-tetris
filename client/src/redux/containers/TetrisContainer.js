import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userInput } from '../actions/TetrisActions'
import Start from '../components/StartComponent'
import GameOverContainer from '../components/GameOverComponent'
import SideBar from '../components/TetrisSideBar'

import '../styles/Tetris.css'

function TetrisContainer() {
    const dispatch = useDispatch()
    const {board, gameOver, loading, admin, active, light} = useSelector(state => state)
    let oldTimeStamp = 0
    let timeDiff = 0
    const requestRef = useRef()

    const gameLoop = (timeStamp = 0) => {
        timeDiff += (timeStamp - oldTimeStamp) / 1000
        oldTimeStamp = timeStamp

        if (timeDiff >= 1)
        {
            dispatch(userInput('down'))
            timeDiff = 0
        }
        if (!active || !gameOver)
            requestRef.current = requestAnimationFrame(gameLoop)
    }

    const slowKeyHandler = event => {
        event.preventDefault()
        switch (event.keyCode) {
            case 32:
                return dispatch(userInput('space'))
            case 38: case 87:
                return dispatch(userInput('up'))
            default:
                break
        } 
    }

    const keyHandler = event => {
        event.preventDefault()
        switch (event.keyCode) {
            case 37: case 65:
                return dispatch(userInput('left'))
            case 39: case 68:
                return dispatch(userInput('right'))
            case 40: case 83:
                timeDiff = 0
                return dispatch(userInput('down'))
            default:
                break 
        }
    }

    useEffect(() => {
        if (!loading && active && !gameOver) {
            requestRef.current = requestAnimationFrame(gameLoop)
            document.body.addEventListener('keydown', keyHandler)
            document.body.addEventListener('keyup', slowKeyHandler)
        }

        return () => {
            document.body.removeEventListener('keydown', keyHandler)
            document.body.removeEventListener('keyup', slowKeyHandler)
            cancelAnimationFrame(requestRef.current)
        }
    }, [loading, active, gameOver]) // eslint-disable-line react-hooks/exhaustive-deps

    const fromBoardToGrid = (board) => {
        let displayBoard = []
    
        if (board) {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (parseInt(board[i][j]) < 0)
                        displayBoard.push(<div key={(i * 10) + j} className={'gridEl style_moving'}></div>)
                    else
                        displayBoard.push(<div key={(i * 10) + j} className={'gridEl style_' + board[i][j]}></div>)
                }
            }
        }
        return displayBoard
    }

    return (
        <div className="wrapContainer">
            {gameOver ? <GameOverContainer /> : null}
            {!active && !gameOver ? <Start admin={admin}/> : null}
            <div className="grid_container" style={light ? {backgroundColor: '#78909C'} : null}>
                {admin ? <div className="adminBadge">ADMIN</div> : null}
                {fromBoardToGrid(board)}
            </div>
            <SideBar />
        </div>
    )
}

export default TetrisContainer