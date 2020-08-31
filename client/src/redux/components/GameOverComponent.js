import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGame } from '../actions/actions'

function GameOverComponent() {
    const {name, score, lineCleared, admin, gameOver, lost} = useSelector(state => state)
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
                    {admin && gameOver ? <button className="restartButton" onClick={() => dispatch(startGame(false))}>ANOTHER ONE</button>
                    : admin ? <p className="restartButton"> Please Wait for the game to End</p> :
                    <p className="restartButton">Please Wait for room admin to restart the game</p> }
                </div>
            </div>
        </div>
    )
}

export default GameOverComponent
