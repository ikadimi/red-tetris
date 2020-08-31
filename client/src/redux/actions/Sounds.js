import BackgroundFile from '../../static/background.mp3'
import BeepFile from '../../static/Beep.mp3'
import MiniBeepFile from '../../static/miniBeep.mp3'
import { MUTE_UNMUTE_GAME, OPEN_CLOSE_SETTINGS } from '.'

const BackgroundMusic = new Audio(BackgroundFile)
const BeepSound = new Audio(BeepFile)
const MiniBeepSound = new Audio(MiniBeepFile)
BeepSound.volume = 0.5
MiniBeepSound.volume = 0.5

export const playBeepSound = () => BeepSound.play()

export const playMiniBeepSound = () => MiniBeepSound.play()

export const playBackgroundMusic = () => {
    BackgroundMusic.loop = true
    BackgroundMusic.currentTime = 0
    BackgroundMusic.play()
}

export const pauseBackgroundMusic = () => {
    BackgroundMusic.pause()
}

const muteUnmuteGame = () => {
    return {
        type: MUTE_UNMUTE_GAME
    }
}

export const changeGameSounds = (volume = true) => {
    return function (dispatch) {
        if (volume) {
            BackgroundMusic.volume = 0
            BeepSound.volume = 0
            MiniBeepSound.volume = 0
        } else {
            BackgroundMusic.volume = 1
            BeepSound.volume = 0.5
            MiniBeepSound.volume = 0.5
        }
        dispatch(muteUnmuteGame())
    }
}

export const openCloseSettings = () => {
    return {
        type: OPEN_CLOSE_SETTINGS
    }
}