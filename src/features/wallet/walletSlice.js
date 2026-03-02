import { createSlice } from "@reduxjs/toolkit"

const savedBalance = localStorage.getItem("balance")

const initialState = {
    balance: savedBalance ? Number(savedBalance) : 5000
}

const walletSlice = createSlice({
    name: "wallet",

    initialState,

    reducers: {

        deductBalance: (state, action) => {
            state.balance -= action.payload
            localStorage.setItem("balance", state.balance)
        },

        addBalance: (state, action) => {
            state.balance += action.payload
            localStorage.setItem("balance", state.balance)
        }

    }
})

export const { deductBalance, addBalance } = walletSlice.actions
export default walletSlice.reducer