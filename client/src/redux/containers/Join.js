import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { costumRoom } from '../actions/JoinActions'

import '../styles/Join.css'

function Join() {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const costum = useSelector(state => state.costum)
    const dispatch = useDispatch()

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)}/></div>
                <div className="relativeInput">
                    <input disabled={costum} placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}/>
                    <button className="randomRooms" onClick={() => dispatch(costumRoom())}>Costum</button>
                </div>
                <Link onClick={event => (!name || (!room && !costum)) ? event.preventDefault() : null} to={`/online/?room=${room}&name=${name}`}>
                    <button className="button" type="submit mt-20">Start Game</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
