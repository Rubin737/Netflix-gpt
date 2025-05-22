import { useEffect } from "react";
import { API_URL,OPTIONS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { nowPlayingMovies } from "../Slices/movieSlice";

export const useFetchNowPlay = ()=>{

    const dispatch = useDispatch();
    const nowPlaying = useSelector((store) => store.movie.popularMovies);    
    
    
    
    useEffect(()=>{
      
      let isMounted = true;
      
      const fetchData = async () => {
         
         try{
          const response = await fetch(API_URL, OPTIONS);
          if(!response.ok){
            throw new Error('Cannot Fetch Movies!')
          }
          const data = await response.json();

          if(isMounted) dispatch(nowPlayingMovies(data.results));
         
         }
         catch(eror){
          console.log(eror)
         }
         
        };
        
        if(!nowPlaying) fetchData();
        return()=>{
          isMounted = false;
        }
        
    },[nowPlaying,dispatch])
    
   
    
}