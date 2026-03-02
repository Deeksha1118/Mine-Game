import flipSrc from "../assets/sounds/flip.mp3"
import loseSrc from "../assets/sounds/lose_game.wav"
import winSrc from "../assets/sounds/win_game.mp3"
import bgmSrc from "../assets/sounds/mine_bgm.mp3"

// SFX 

function createSound(src, volume = 1) {
    const audio = new Audio(src)
    audio.preload = "auto"
    audio.volume = volume
    return audio
}

const sounds = {
    flip: createSound(flipSrc, 0.8),
    lose: createSound(loseSrc, 1.0),
    win: createSound(winSrc, 1.0),
}

function playSound(name) {
    try {
        const audio = sounds[name]
        if (!audio) return
        audio.currentTime = 0
        audio.play().catch(() => { })
    } catch (e) {
        console.warn("SFX error:", e)
    }
}

export function playDiamondSound() { playSound("flip") }
export function playMineSound() { playSound("lose") }
export function playCashoutSound() { playSound("win") }
export function playBetSound() { playSound("flip") }

// MUSIC 

const bgm = new Audio(bgmSrc)
bgm.loop = true
bgm.volume = 0.4
bgm.preload = "auto"

export function playMusic() {
    bgm.play().catch(() => { })
}

export function pauseMusic() {
    bgm.pause()
}