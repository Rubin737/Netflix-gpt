import { createSlice } from "@reduxjs/toolkit"


const aiSlice = createSlice({
    name : 'ai',
    initialState:{
        movies:null,
        moviesName : null
    },
    reducers:{
        addTMDBMovies:(state,action)=>{
            const {movies,finalList} = action.payload;
            state.movies = finalList;
            state.moviesName = movies;

        }

    }
})
export const {addTMDBMovies} = aiSlice.actions
export default aiSlice.reducer;
