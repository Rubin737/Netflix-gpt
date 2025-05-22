import { createSlice } from "@reduxjs/toolkit"


const aiSlice = createSlice({
    name : 'ai',
    initialState:{
        movies:null,
        bgClr:null,
        online:null,
    },
    reducers:{
        addTMDBMovies:(state,action)=>{    
            state.movies = action.payload;
        },
        changeBgClr:(state,action)=>{
            state.bgClr = action.payload
        },
        checkOnline:(state,actiom)=>{
            state.online = actiom.payload;
        }

    }
})
export const {addTMDBMovies,changeBgClr,checkOnline} = aiSlice.actions
export default aiSlice.reducer;
