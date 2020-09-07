import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gameSpeed } from '../actions/actions'

function GameSpeed() {
    const dispatch = useDispatch()
    const dropTime = useSelector(state => state.dropTime)

    return (
        <div>
            <ul className="speedMode">
                <li className="speedChoices">
                    <button className={dropTime === 1 ? 'choosenSpeed' : null} onClick={() => dispatch(gameSpeed(1))}>NORMAL</button>
                </li>
                <li className="speedChoices">
                    <button className={dropTime === 0.5 ? 'choosenSpeed' : null} onClick={() => dispatch(gameSpeed(0.5))}>MEDUIM</button>
                </li>
                <li className="speedChoices">
                    <button className={dropTime === 0.25 ? 'choosenSpeed' : null} onClick={() => dispatch(gameSpeed(0.25))}>FAST</button>
                </li>
            </ul>
        </div>
    )
}

export default GameSpeed
