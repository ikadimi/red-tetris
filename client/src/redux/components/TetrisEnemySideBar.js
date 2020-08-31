import React from 'react'
import { Tetris } from '../../static/Tetris'
import { fromPieceToGrid } from '../actions/TetrisActions'
import '../styles/Tetris.css'

function TetrisEnemySideBar({ info }) {
    const {nextPiece, score, lineCleared, name} = info
    let piece = {
        width: Tetris[nextPiece].size * 20,
        height: Tetris[nextPiece].size * 20,
    }

    return (
        <div className="sideContainer">
            <div className="infoContainer">
                <p>NAME: {name}</p>
                <p>SCORE: {score}</p>
                <p>LINES: {lineCleared}</p>
                <p>NEXT PIECE:</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', height: '50%', width: '100%'}}>
                <div className='pieceContainer' style={piece}>
                    {fromPieceToGrid(Tetris[nextPiece])}
                </div>
            </div>
            
        </div>
    )
}

export default TetrisEnemySideBar
