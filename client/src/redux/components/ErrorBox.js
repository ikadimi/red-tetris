import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hideErrorBox } from '../actions/ErrorActions'

import '../styles/Error.css'

function ErrorBox({error}) {
    const dispatch = useDispatch()

    useEffect(() => {
        const timer = setTimeout(() => dispatch(hideErrorBox()), 3000);
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div className="alertBox">
            {error}
            <button onClick={() => dispatch(hideErrorBox())} className="closeButton">CLOSE</button>
        </div>
    )
}

export default ErrorBox
