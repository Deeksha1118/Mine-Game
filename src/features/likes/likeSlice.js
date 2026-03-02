import { createSlice } from "@reduxjs/toolkit"

const saved = localStorage.getItem("likes")

const likeSlice = createSlice({
    name: "likes",

    initialState: {
        liked: saved ? JSON.parse(saved) : {}   // { gameId: true/false }
    },

    reducers: {
        toggleLike: (state, action) => {
            const gameId = action.payload
            state.liked[gameId] = !state.liked[gameId]
            localStorage.setItem("likes", JSON.stringify(state.liked))
        }
    }
})

export const { toggleLike } = likeSlice.actions
export default likeSlice.reducer
