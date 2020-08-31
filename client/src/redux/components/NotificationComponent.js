import React from 'react'

function NotificationComponent({ notification }) {
    return (
        <div className='activeNotification'>
            <p className="notificationContent">{notification}</p>
        </div>
    )
}

export default NotificationComponent
