import React from 'react'
import { useDispatch } from 'react-redux'
import { startGame } from '../actions/actions'
import './GameMode'

import '../styles/Dialog.css'
import GameMode from './GameMode'

function StartComponent({ admin, dropTime }) {
    const dispatch = useDispatch()

    return (
        <div className="dialogContainer">
            {admin ?
            <div>
                <button onClick={() => dispatch(startGame(true, dropTime))} className="startButton">START</button>
                <GameMode />
            </div>
            : <div className="pauseButton"><p>ON HOLD</p></div>
            }
        </div>
    )
}

export default StartComponent