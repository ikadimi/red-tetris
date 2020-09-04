import React, {useLayoutEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openCloseSettings, openCloseChat, lightOrDark } from '../actions/actions'
import Settings from '../components/Settings'
import MobileController from '../components/MobileController'
import Notification from '../components/NotificationComponent'
import ChatLog from '../components/ChatLog'

import { AiOutlineSetting } from 'react-icons/ai'
import { BsChatSquareDots } from 'react-icons/bs'
import { FiMoon, FiSun } from 'react-icons/fi'

import '../styles/Navbar.css'


function NavbarComponent() {
    const dispatch = useDispatch()
    const {settings, light, controller, chat, notification} = useSelector(state => state)

    const useWindowSize = () => {
        const [size, setSize] = useState([0, 0])

        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight])
            }
            window.addEventListener('resize', updateSize)
            updateSize()
            return () => window.removeEventListener('resize', updateSize)
        }, [])
        return size
    }
    const [width] = useWindowSize()

    return (
        <div>
            <button onClick={() => dispatch(openCloseSettings())} className="settingsButton">
                <AiOutlineSetting size={28}/>
            </button>
            <button onClick={() => dispatch(lightOrDark())} className="themeButton">
                { light ? <FiSun size={28}/> : <FiMoon size={28}/>}
            </button>
            {chat ? <ChatLog /> : <button onClick={() => dispatch(openCloseChat())} className="chatButton">
                <BsChatSquareDots size={28}/>
            </button>}
            {width < 500 || controller ? <MobileController /> : null}
            {notification && !chat ? <Notification notification={notification} /> : null}
            {settings ? <Settings /> : null}
        </div>
    )
}

export default NavbarComponent
