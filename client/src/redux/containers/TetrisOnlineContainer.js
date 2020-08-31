import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import queryString from 'query-string'
import TetrisContainer from './TetrisContainer'
import TetrisEnemyContainer from './TetrisEnemyContainer'
import Error from '../components/ErrorComponent'
import Navbar from './Navbar'
import Notification from '../components/NotificationComponent'
import { joinActionCreator, joinFailure, roomEventListeners, leaveGame } from '../actions/actions'

function TetrisOnlineContainer({location}) {
    const dispatch = useDispatch()
    const {room, error, notification} = useSelector(state => state)
    const clients = [...room.clients.values()]
    
    useEffect(() => {
        let {name, room} = queryString.parse(location.search)

        if (!name)
            dispatch(joinFailure("Name not specified"))
        else {
            if (Array.isArray(name))
                name = name[0]
            if (Array.isArray(room))
                room = room[0]
            dispatch(joinActionCreator({name, room}))
            dispatch(roomEventListeners())
        }
        return () => {
            dispatch(leaveGame())
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
                {notification ? <Notification notification={notification}/> : null}
            </div>
            }
        </div>
    )
}

export default TetrisOnlineContainer
