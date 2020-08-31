import React from 'react'
import EnemySideBar from '../components/TetrisEnemySideBar'
import '../styles/Tetris.css'


function TetrisEnemyContainer({ board, info }) {
    const fromBoardToGrid = (board) => {
        let displayBoard = []
    
        if (board) {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (parseInt(board[i][j]) < 0)
                        displayBoard.push(<div key={(i * 10) + j} className={'gridEl style_moving'}></div>)
                    else
                        displayBoard.push(<div key={(i * 10) + j} className={'gridEl style_' + board[i][j]}></div>)
                }
            }
        }
        return displayBoard
    }

    return (
        <div className="wrapContainer">
            <div className="grid_container">
                {info.admin ? <div className="adminBadge">ADMIN</div> : null}
                {fromBoardToGrid(board)}
            </div>
            <EnemySideBar info={info}/>
        </div>
    )
}

export default TetrisEnemyContainer
