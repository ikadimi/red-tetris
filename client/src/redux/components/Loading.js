import React from 'react'
import { Tetris } from '../../static/Tetris'
import '../styles/Dialog.css'
import { fromPieceToGrid } from '../actions/TetrisActions'

function Loading() {
    return (
        <div className="dialogContainer">
            <div className='loadingAnimation'>
                <div className='pieceContainer' style={{width: 60, height: 60}}>
                    {fromPieceToGrid(Tetris[0])}
                </div>
            </div>
        </div>
    )
}

export default Loading
