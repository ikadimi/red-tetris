import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Join.css'

function Join() {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const createId = (len = 6, chars = 'abcdefghjkmnopqrstwxyz0123456789') => 
    {
        let id = '';
        while (len--)
        {
            id += chars[Math.random() * chars.length | 0];
        }
        return id
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" maxLength={30} className="joinInput" type="text" onChange={(event) => setName(event.target.value)}/></div>
                <div className="relativeInput">
                    <input placeholder="Room" value={room} maxLength={30} className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}/>
                    <button className="randomRooms" onClick={() => setRoom(createId())}>Costum</button>
                </div>
                <Link onClick={event => (!name || !room ) ? event.preventDefault() : null} to={`/online/?room=${room}&name=${name}`}>
                    <button className="submitButton" type="submit">JOIN ROOM</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
