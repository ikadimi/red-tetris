import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Join from './redux/containers/Join'
import Error from './redux/components/ErrorComponent'
import OnlineTetris from './redux/containers/TetrisOnlineContainer'

import history from './history'
import './App.css'

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Join}></Route>
                    <Route path="/online" exact component={OnlineTetris}></Route>
                    <Route component={Error}></Route> 
                </Switch>
            </Router>
        </Provider>
    )
}

export default App
