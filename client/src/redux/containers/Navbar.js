import React, {useLayoutEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newNotification, openCloseSettings } from '../actions/actions'
import Settings from '../components/Settings'
import MobileController from '../components/MobileController'
import MiniChat from '../components/MiniChat'
import Notification from '../components/NotificationComponent'

import { SiRiotgames } from 'react-icons/si'
import { GiTimeBomb, GiPodiumWinner, GiGamepadCross } from 'react-icons/gi'
import { MdMoreHoriz } from 'react-icons/md'
import { IoIosFastforward } from 'react-icons/io'

import '../styles/Navbar.css'


function NavbarComponent() {
    const dispatch = useDispatch()
    const {settings, notification} = useSelector(state => state)

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
    const arr = [
    {msg: 'GG', icon: 0, text: 'GOOD GAME'}, {msg: 'HURRY!', icon: 1, text: 'HURRY UP'},
    {msg: 'NEXT', icon: 2, text: 'GO NEXT'}, {msg: 'EZ', icon: 3, text: 'THAT WAS EAZY'}]

    const Icon = (order) => {
        switch (order) {
            case 0:
                return <SiRiotgames size={16}/>
            case 1:
                return <GiTimeBomb size={16}/>
            case 2:
                return <IoIosFastforward size={16}/>
            case 3:
                return <GiPodiumWinner size={16}/>
            default:
                break
        }
    }
    const [chat, openChat] = useState(false)

    return (
        <div>
            <nav>
            <ul className="navList">
                {arr.map(el => (
                <li key={el.msg} className="listElements">
                    <button onClick={() => dispatch(newNotification(el.text))}>{width > 600 ? el.msg : Icon(el.icon)}</button>
                </li>))}
                <li className="listElements">
                    <button onClick={() => openChat(!chat)}><MdMoreHoriz style={{color: 'white'}} size={20}/></button>
                </li>
            </ul>
            </nav>
            <button onClick={() => dispatch(openCloseSettings())} className={width < 500 ? "settingsPhoneButton" : "settingsButton"}>
                <GiGamepadCross size={28} style={{color: '#2375D8'}}/>
            </button>
            {chat ? <MiniChat openChat={openChat}/> : null}
            {width < 500 ? <MobileController /> : null}
            {notification ? <Notification notification={notification} width={width}/> : null}
            {settings ? <Settings /> : null}
        </div>
    )
}

export default NavbarComponent
