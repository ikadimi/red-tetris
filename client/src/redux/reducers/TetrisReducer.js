import { GAME_LOST, START_GAME, SET_BOARD, ASSIGN_ADMIN, GAME_OVER, INITIATION_SUCCESS, PIECE_CHANGE, RESTART_GAME, UPDATE_SCORE, UPDATE_ROOM, JOIN_REQUEST, JOIN_FAILURE, JOIN_SUCCESS, PUSH_NOTIFICATION, HIDE_ERROR_BOX, MUTE_UNMUTE_GAME, OPEN_CLOSE_SETTINGS, USER_OFF, SHOW_HIDE_CONTROLLER, SET_MESSAGES, OPEN_CLOSE_CHAT, SWITCH_THEME } from "../actions"

const initialState = {
    loading: true,
    error: '',
    notification: '',
    messages: [],
    board: [],
    name: 'challenger',
    room: {
        id: '',
        clients: new Map()
    },
    score: 0,
    nextPiece: 1,
    lineCleared: 0,
    active: false,
    gameOver: false,
    admin: false,
    lost: false,
    settings: false,
    volume: true,
    controller: false,
    chat: false,
    light: false,
}

const TetrisReducer = (state = initialState, {type, payload}) => {
    switch (type)
    {
        case SWITCH_THEME:
            return {
                ...state,
                light: !state.light
            }
        case OPEN_CLOSE_CHAT:
            return  {
                ...state,
                chat: !state.chat
            }
        case SET_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, payload]
            }
        case SHOW_HIDE_CONTROLLER:
            return {
                ...state,
                controller: !state.controller
            }
        case USER_OFF:
            return {
                ...state,
                active: false,
                gameOver: false,
                lost: false,
                settings: false,
            }
        case OPEN_CLOSE_SETTINGS:
            return {
                ...state,
                settings: !state.settings
            }
        case MUTE_UNMUTE_GAME:
            return {
                ...state,
                volume: !state.volume
            }
        case HIDE_ERROR_BOX:
            return {
                ...state,
                error: ''
            }
        case PUSH_NOTIFICATION:
            return {
                ...state,
                notification: payload
            }
        case ASSIGN_ADMIN:
            return {
                ...state,
                admin: true
            }
        case START_GAME:
            return {
                ...state,
                active: true,
                gameOver: false,
                lost: false
            }
        case GAME_LOST:
            return {
                ...state,
                lost: true,
                active: false
            }
        case JOIN_SUCCESS:
            return {
                ...state,
                name: payload.name,
                admin: payload.admin,
                loading: false
            }
        case JOIN_FAILURE:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case JOIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_ROOM:
            return {
                ...state,
                room: payload
            }
        case UPDATE_SCORE:
            return {
                ...state,
                score: payload.score,
                lineCleared: payload.lineCleared
            }
        case RESTART_GAME:
            return {
                ...state,
                gameOver: false,
                active: true
            }
        case PIECE_CHANGE:
            return {
                ...state,
                nextPiece: payload
            }
        case SET_BOARD:
            return {
                ...state,
                board: payload
            }
        case INITIATION_SUCCESS:
            return {
                ...state,
                board: payload.board,
                nextPiece: payload.piece,
            }
        case GAME_OVER:
            return {
                ...state,
                gameOver: true,
                active: false
            }
        default:
            return state
    }
}

export default TetrisReducer