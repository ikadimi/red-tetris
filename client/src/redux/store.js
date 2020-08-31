import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import TetrisReducer from './reducers/TetrisReducer'

const store = createStore(TetrisReducer, applyMiddleware(thunk))

export default store;