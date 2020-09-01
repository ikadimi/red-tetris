import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import queryString from 'query-string'
import TetrisContainer from './TetrisContainer'
import TetrisEnemyContainer from './TetrisEnemyContainer'
import Error from '../components/ErrorComponent'
import Navbar from './Navbar'
import { joinActionCreator, joinFailure, roomEventListeners, leaveRoom } from '../actions/actions'

function TetrisOnlineContainer({location}) {
    const dispatch = useDispatch()
    const {room, error} = useSelector(state => state)
    const clients = [...room.clients.values()]
    
    useEffect(() => {
        let {name, room} = queryString.parse(location.search)

        if (!name)
            dispatch(joinFailure("Name not specified"))
        else if (window.innerWidth < 300 || window.innerHeight < 300)
            dispatch(joinFailure('WINDOW TO SMALL FOR THE GAME'))
        else {
            if (Array.isArray(name))
                name = name[0]
            if (Array.isArray(room))
                room = room[0]
            dispatch(joinActionCreator({name, room}))
            dispatch(roomEventListeners())
        }
        return () => {
            dispatch(leaveRoom())
        }
    }, [dispatch, location.search])

    return (
        <div>
            {error ? <Error error={error}/> :
            <div>
                <Navbar />
                <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '50px'}}>
                    <TetrisContainer mode={'online'}/>
                    {clients.map((el, index) => (<TetrisEnemyContainer key={index} className="EnemyContainer" board={el.board} info={el.peer}/>))}
                </div>
            </div>
            }
        </div>
    )
}

export default TetrisOnlineContainer
