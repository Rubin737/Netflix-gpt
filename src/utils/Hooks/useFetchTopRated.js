import { useEffect } from "react"
import { OPTIONS, TOP_RATED } from "../constants"
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../Slices/movieSlice";

export const useFetchTopRated = ()=>{
    const dispatch = useDispatch()
    const top = useSelector((store) => store.movie.topRatedMovies);
    
    useEffect(()=>{
        let isMounted = true;
        const fetchTopRated = async()=>{
            try{
            
                const response = await fetch(TOP_RATED,OPTIONS);
            
            if(!response.ok){
            
                throw new Error('Cant fetch Movies')
            }
            const data = await response.json();

            if(isMounted) dispatch(addTopRatedMovies(data.results))    
            
            }
            catch(error){
                //
            }
        }
        if(!top) fetchTopRated();
        return ()=>{
            isMounted = false;
        }
    },[dispatch,top])


   

}