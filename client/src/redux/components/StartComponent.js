import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGame } from '../actions/actions'

import '../styles/Dialog.css'

function StartComponent({ admin }) {
    const dispatch = useDispatch()
    const active = useSelector(state => state.active)

    return (
        <div className="dialogContainer">
            {admin && !active ?
            <button onClick={() => dispatch(startGame(true))} className="startButton">START</button>
            : <div className="pauseButton"><p>ON HOLD</p></div>
            }
        </div>
    )
}

export default StartComponent