import { useEffect } from "react";
import { API_URL,OPTIONS } from "../constants";
import { useDispatch } from "react-redux";
import { nowPlayingMovies } from "../Slices/movieSlice";

export const useFetchNowPlay = ()=>{

    const dispatch = useDispatch();
    
    let isMouted = true;
    

    useEffect(()=>{
       const fetchData = async () => {
         
         try{
          const response = await fetch(API_URL, OPTIONS);
          if(!response.ok){
            throw new Error('Cannot Fetch Movies!')
          }
          const data = await response.json();

         if(isMouted) dispatch(nowPlayingMovies(data.results));
         
         }
         catch(eror){
          console.log(eror)
         }
         
       };
        fetchData();

        
    },[])
    
    return()=>isMouted = false;
   
    
}