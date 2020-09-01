import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newNotification } from '../actions/actions'

function MiniChat() {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            dispatch(newNotification(message))
            setMessage('')
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
                maxLength={30}
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
