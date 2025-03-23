import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userslice'

export const appStore = configureStore({
    reducer:{
        user:userReducer,
    }
})