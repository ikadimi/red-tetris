import React from 'react'
import '../styles/Chat.css'

function NotificationComponent({ notification }) {
    return (
        <div className='activeNotification'>
            <p className="messageName">{notification.name}</p>
            <p className="messageText">{notification.message}</p>
        </div>
    )
}

export default NotificationComponent
