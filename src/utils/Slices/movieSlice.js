import { createSlice } from "@reduxjs/toolkit";


const movieslice = createSlice({
    name:'movie',
    initialState:{
        popularMovies:null,
        trailerVideos:null,
        topRatedMovies:null,
        favoriteMovies:null,
        trendingMovies:null,
    },
    reducers:{
      nowPlayingMovies:(state,action)=>{
          state.popularMovies = action.payload;
      },
      addTrailerVideos:(state,action)=>{
        state.trailerVideos = action.payload
      },
      addTopRatedMovies:(state,action)=>{
      state.topRatedMovies = action.payload;
      },
      addFavoriteMovies:(state,action)=>{
      state.favoriteMovies = action.payload;
      },
      addTrendingMovies:(state,action)=>{
      state.trendingMovies = action.payload;
      },
    }
})

export const  {nowPlayingMovies,addTrailerVideos,addTopRatedMovies,addFavoriteMovies,addTrendingMovies} = movieslice.actions
export default movieslice.reducer; 