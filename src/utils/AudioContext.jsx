import { createContext, useContext } from "react"
import { useAudio } from "./useAudio"

const AudioCtx = createContext(null)

export function AudioProvider({ children }) {
    const audio = useAudio()
    return <AudioCtx.Provider value={audio}>{children}</AudioCtx.Provider>
}

export function useAudioContext() {
    return useContext(AudioCtx)
}