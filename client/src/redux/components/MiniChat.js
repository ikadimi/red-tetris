import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newNotification } from '../actions/actions'

import '../styles/Chat.css'

function MiniChat({ openChat }) {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            dispatch(newNotification(message))
            setMessage('')
            openChat(false)
        }
    }

    return (
        <div>
            <form className="chatForm">
                <input
                className="chatInput"
                type="text"
                placeholder="Type a message..."
                value={message}
                maxLength={40}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button
                className="chatButton"
                onClick={(event) =>  sendMessage(event)}
                >SEND</button>
            </form>
        </div>
    )
}

export default MiniChat
