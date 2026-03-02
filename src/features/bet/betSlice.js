import { createSlice } from "@reduxjs/toolkit"

const betSlice = createSlice({
    name: "bet",

    initialState: {
        amount: 2,
        isActive: false,   // true while a round is in progress
    },

    reducers: {
        setBetAmount: (state, action) => {
            state.amount = action.payload
        },
        startBet: (state) => {
            state.isActive = true
        },
        endBet: (state) => {
            state.isActive = false
        }
    }
})

export const { setBetAmount, startBet, endBet } = betSlice.actions
export default betSlice.reducer
