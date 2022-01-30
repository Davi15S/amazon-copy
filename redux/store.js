import { configureStore } from "@reduxjs/toolkit"
import basketReducer from "./basketSlice"

//GLOBAL STORE

export const store = configureStore({
    reducer: {
        basket: basketReducer
    }
})