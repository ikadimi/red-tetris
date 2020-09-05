import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newNotification, openCloseChat } from '../actions/actions'
import { IoIosFastforward } from 'react-icons/io'
import { SiRiotgames } from 'react-icons/si'
import { GiTimeBomb, GiPodiumWinner } from 'react-icons/gi'
import { FiMinimize2 } from 'react-icons/fi'

import '../styles/Chat.css'

function ChatLog() {
    const [message, setMessage] = useState('')
    const {name, messages} = useSelector(state => state)
    const dispatch = useDispatch()
    const el = useRef(null)

    useEffect(() => {
        el.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
    })
    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            dispatch(newNotification(message))
            setMessage('')
        }
    }

    const arr = 
    [{msg: 'GG', icon: 0, text: 'GOOD GAME'}, {msg: 'HURRY!', icon: 1, text: 'HURRY UP'},
    {msg: 'NEXT', icon: 2, text: 'GO NEXT'}, {msg: 'EZ', icon: 3, text: 'THAT WAS EAZY'}]
    
    const Icon = (order) => {
        switch (order) {
            case 0:
                return <SiRiotgames size={21}/>
            case 1:
                return <GiTimeBomb size={21}/>
            case 2:
                return <IoIosFastforward size={21}/>
            case 3:
                return <GiPodiumWinner size={21}/>
            default:
                break
        }
    }

    const nameColor = (messageName) => {
        if (name === messageName)
            return "myMessageName messageName"
        else if (messageName === 'ROOM')
            return "roomMessageName messageName"
        else
            return "messageName"
    }

    return (
        <div>
            <div className="sideIcons">
                <ul className="navList">
                    {arr.map(el => (
                    <li key={el.msg} className="listElements">
                        <button onClick={() => dispatch(newNotification(el.text))}>{ Icon(el.icon) }</button>
                    </li>))}
                </ul>
            </div>
            <div className="chatLog">
                {messages.map((message, index) => (
                    <div key={index} className='messageContainer'>
                        <p className={nameColor(message.name)}>{message.name}</p>
                        <p className="messageText">{message.message}</p>
                    </div>
                ))}
                <div id={'el'} ref={el}>
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
                        className="sendButton"
                        onClick={(event) =>  sendMessage(event)}
                        >SEND</button>
                    </form>
                </div>
            </div>
            <button onClick={() => dispatch(openCloseChat())} className="chatButton">
                <FiMinimize2 style={{color: 'white'}} size={28}/>
            </button>
        </div>
    )
}

export default ChatLog
