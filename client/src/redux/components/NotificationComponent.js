import React from 'react'

function NotificationComponent({ notification, width }) {
    return (
        <div className={width < 500 ? 'activeMobileNotification' : 'activeNotification'}>
            <p className="notificationContent">{notification}</p>
        </div>
    )
}

export default NotificationComponent
