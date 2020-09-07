import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGame } from '../actions/actions'
import GameSpeed from './GameSpeed'

function GameOverComponent() {
    const {name, score, lineCleared, admin, gameOver, lost, dropTime} = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div className="dialogContainer">
            <div className="gameOverContainer">
                <div className="titleContainer">
                    <h3>{lost ? 'YOU LOST !!' : 'YOU WON !!'} </h3>
                </div>
                <div className="bodyContainer">
                    <p>NAME: {name}</p>
                    <p>SCORE: {score}</p>
                    <p>LINES {lineCleared}</p>
                </div>
                <div className="buttonContainer">
                    {admin && gameOver ? <button className="restartButton" onClick={() => dispatch(startGame(false, dropTime))}>PLAY AGAIN</button>
                    : lost && !gameOver ? <p className="restartButton"> Please Wait for the game to End</p> :
                    <p className="restartButton">Please Wait for room admin to restart the game</p> }
                </div>
                {admin ? <div className="buttonContainer mt-20">
                    <GameSpeed />
                </div> : null}
            </div>
        </div>
    )
}

export default GameOverComponent
