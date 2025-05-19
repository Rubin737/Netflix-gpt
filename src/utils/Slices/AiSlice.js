import { createSlice } from "@reduxjs/toolkit"


const aiSlice = createSlice({
    name : 'ai',
    initialState:{
        movies:null,
        bgClr:null
        //moviesName : null
    },
    reducers:{
        addTMDBMovies:(state,action)=>{
            //const {movies,filtered} = action.payload;
            state.movies = action.payload;
            //state.moviesName = movies;

        },
        changeBgClr:(state,action)=>{
            state.bgClr = action.payload
        }

    }
})
export const {addTMDBMovies,changeBgClr} = aiSlice.actions
export default aiSlice.reducer;
