import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import walletReducer from "../features/wallet/walletSlice";
import betReducer from "../features/bet/betSlice";
import historyReducer from "../features/history/historySlice";
import likesReducer from "../features/likes/likeSlice";
import mineGameReducer from "../features/mineGame/mineGame";

const store = configureStore({
    reducer: {
        auth: authReducer,
        wallet: walletReducer,
        bet: betReducer,
        history: historyReducer,
        likes: likesReducer,
        mineGame: mineGameReducer,
    }
});

export default store;