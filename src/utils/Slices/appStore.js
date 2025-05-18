import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userslice'
import movieReducer from './movieSlice';
import languagereducer from './languageSlice'
import aiReducer from './AiSlice';
export const appStore = configureStore({
    reducer:{
        user:userReducer,
        movie:movieReducer,
        language:languagereducer,
        ai:aiReducer

    }
})