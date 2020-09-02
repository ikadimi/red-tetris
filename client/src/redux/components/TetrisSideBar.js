import React from 'react'
import { useSelector } from 'react-redux'
import { Tetris } from '../../static/Tetris'
import '../styles/Tetris.css'
import { fromPieceToGrid } from '../actions/TetrisActions'

function TetrisSideBar() {
    const {nextPiece, score, lineCleared, name} = useSelector(state => state)
    let piece = {
        width: Tetris[nextPiece].size * 20,
        height: Tetris[nextPiece].size * 20,
    }

    return (
        <div className="sideContainer">
            <div className="myInfoContainer">
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

export default TetrisSideBar
