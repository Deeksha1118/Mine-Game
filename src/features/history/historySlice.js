import { createSlice } from "@reduxjs/toolkit"

const saved = localStorage.getItem("betHistory")

const historySlice = createSlice({
    name: "history",

    initialState: {
        entries: saved ? JSON.parse(saved) : []
    },

    reducers: {
        addHistoryEntry: (state, action) => {
            // action.payload: { bet, multiplier, payout, result: "win"|"loss", timestamp }
            state.entries.unshift(action.payload)       // newest first
            if (state.entries.length > 50) state.entries.pop()  // cap at 50
            localStorage.setItem("betHistory", JSON.stringify(state.entries))
        },
        clearHistory: (state) => {
            state.entries = []
            localStorage.removeItem("betHistory")
        }
    }
})

export const { addHistoryEntry, clearHistory } = historySlice.actions
export default historySlice.reducer
