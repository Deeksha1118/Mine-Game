import { useState, useCallback, useEffect } from "react"
import {
    playDiamondSound, playMineSound, playCashoutSound, playBetSound,
    playMusic, pauseMusic
} from "./soundManager"

const STORAGE_KEY = "audioPrefs"

function loadPrefs() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : { sound: true, music: false }
    } catch {
        return { sound: true, music: false }
    }
}

function savePrefs(prefs) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)) } catch { }
}

export function useAudio() {
    const prefs = loadPrefs()
    const [soundOn, setSoundOn] = useState(prefs.sound)
    const [musicOn, setMusicOn] = useState(prefs.music)

    useEffect(() => {
        if (musicOn) {
            playMusic()
        } else {
            pauseMusic()
        }
        savePrefs({ sound: soundOn, music: musicOn })
    }, [musicOn])

    useEffect(() => {
        savePrefs({ sound: soundOn, music: musicOn })
    }, [soundOn])

    const toggleSound = useCallback(() => setSoundOn(v => !v), [])
    const toggleMusic = useCallback(() => setMusicOn(v => !v), [])

    const sfx = {
        diamond: useCallback(() => { if (soundOn) playDiamondSound() }, [soundOn]),
        mine: useCallback(() => { if (soundOn) playMineSound() }, [soundOn]),
        cashout: useCallback(() => { if (soundOn) playCashoutSound() }, [soundOn]),
        bet: useCallback(() => { if (soundOn) playBetSound() }, [soundOn]),
    }

    return { soundOn, musicOn, toggleSound, toggleMusic, sfx }
}