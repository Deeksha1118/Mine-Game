import { createSlice } from "@reduxjs/toolkit"

const STORAGE_KEY = "mineGameState"

const defaultState = {
    started: false,
    over: false,
    cashedOut: false,
    wasRefreshed: false,   // true when game was interrupted by a page refresh
    refundIssued: false,
    mines: [],
    revealed: [],
    mineCount: 3,
    gridSize: 5,
    currentMultiplier: 0,
    betAmount: 2,
}

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (!saved) return defaultState
        const parsed = JSON.parse(saved)

        // Game was active when page refreshed — end it and flag it
        if (parsed.started && !parsed.over && !parsed.cashedOut) {
            const recovered = {
                ...parsed,
                started: false,
                over: true,
                wasRefreshed: true,
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(recovered))
            return recovered
        }

        return { ...defaultState, ...parsed }
    } catch {
        return defaultState
    }
}

function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch { }
}

const mineGameSlice = createSlice({
    name: "mineGame",
    initialState: loadState(),

    reducers: {

        startGame: (state, action) => {
            state.started = true
            state.over = false
            state.cashedOut = false
            state.wasRefreshed = false
            state.refundIssued = false
            state.mines = action.payload.mines
            state.betAmount = action.payload.betAmount
            state.mineCount = action.payload.mineCount
            state.gridSize = action.payload.gridSize
            state.revealed = []
            state.currentMultiplier = 0
            saveState({ ...state })
        },

        revealSafe: (state, action) => {
            state.revealed.push(action.payload.index)
            state.currentMultiplier = action.payload.multiplier
            saveState({ ...state })
        },

        hitMine: (state) => {
            state.over = true
            state.started = false
            state.wasRefreshed = false
            state.currentMultiplier = 0
            saveState({ ...state })
        },

        cashOut: (state) => {
            state.cashedOut = true
            state.started = false
            saveState({ ...state })
        },

        resetGame: (state) => {
            state.started = false
            state.over = false
            state.cashedOut = false
            state.wasRefreshed = false
            state.refundIssued = false
            state.mines = []
            state.revealed = []
            state.currentMultiplier = 0
            saveState({ ...state })
        },

        markRefundIssued: (state) => {
            state.refundIssued = true
            saveState({ ...state })
        }

    }
})

export const { startGame, revealSafe, hitMine, cashOut, resetGame, markRefundIssued } = mineGameSlice.actions
export default mineGameSlice.reducer