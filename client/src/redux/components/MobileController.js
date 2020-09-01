import React from 'react'
import { useDispatch } from 'react-redux'
import { MdSpaceBar } from 'react-icons/md'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai'
import '../styles/Controller.css'
import { userInput } from '../actions/actions'

function MobileController() {
    const dispatch = useDispatch()

    return (
        <div className="mobileController">
            <button onClick={() => dispatch(userInput('space'))} className="spaceButton"><MdSpaceBar style={{color: 'white'}} size={40}/></button>
            <div className="controllerButtons">
                    <button onClick={() => dispatch(userInput('up'))} className="upButton"><AiOutlineArrowUp style={{color: '#2375D8'}} size={25}/></button>
                    <button onClick={() => dispatch(userInput('left'))} className="leftButton"><AiOutlineArrowLeft style={{color: '#2375D8'}} size={25}/></button>
                    <button onClick={() => dispatch(userInput('right'))} className="rightButton"><AiOutlineArrowRight style={{color: '#2375D8'}} size={25}/></button>
                    <button onClick={() => dispatch(userInput('down'))} className="downButton"><AiOutlineArrowDown style={{color: '#2375D8'}} size={25}/></button>
            </div>
        </div>
    )
}

export default MobileController
