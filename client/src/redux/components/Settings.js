import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineHome, AiOutlineClose } from 'react-icons/ai'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import { MdSpaceBar } from 'react-icons/md'
import { GiGamepadCross } from 'react-icons/gi'
import { leaveRoom } from '../actions/JoinActions'
import { changeGameSounds, openCloseSettings } from '../actions/Sounds'
import { showHideController } from '../actions/actions'

function Settings() {
    const dispatch = useDispatch()
    const {volume, light} = useSelector(state => state)
    const upStyle = {position: 'absolute', top: '5', left: '35', border: '1px solid', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}
    const leftStyle = {position: 'absolute', top: '35', left: '0', border: '1px solid', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}
    const rightStyle = {position: 'absolute', top: '35', left: '70', border: '1px solid', borderBottomLeftRadius: '10px', borderTopLeftRadius: '10px'}
    const downStyle = {position: 'absolute', top: '70', left: '35', border: '1px solid', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}

    return (
        <div className="settingDialog" style={light ? {backgroundColor: "#78909C"} : {backgroundColor: "black"}}>
            <button onClick={() => dispatch(openCloseSettings())} className="closeSettings">
                <AiOutlineClose size={30}/>
            </button>

            <button onClick={() => dispatch(showHideController())} className="controllerSettings">
                <GiGamepadCross size={30}/>
            </button>

            <button onClick={() => dispatch(changeGameSounds(volume))} className="audioSettings">
                {volume ? <FaVolumeUp size={30}/>
                : <FaVolumeMute size={30}/>}
            </button>

            <div className="keyList">
            <div className="movementButtons">
                    <AiOutlineArrowUp style={upStyle} size={25}/>
                    <AiOutlineArrowLeft style={leftStyle} size={25}/>
                    <AiOutlineArrowRight style={rightStyle} size={25}/>
                    <AiOutlineArrowDown style={downStyle} size={25}/>
            </div>

            <div className="spaceKey">
                <MdSpaceBar size={40}/>
            </div>
            
            <div className="movementButtons">
                <p className="upKey">W</p>
                <p className="leftKey">A</p>
                <p className="rightKey">D</p>
                <p className="downKey">S</p>
            </div>
                
            </div>
            <div>
                <Link onClick={() => dispatch(leaveRoom())} to={'/'}>
                    <button className="navHomeButton">
                        <span>GO HOME</span>
                        <AiOutlineHome style={{paddingTop: '3px'}} size={18}/>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Settings