import { useEffect } from "react"
import { OPTIONS, FAV_MOVIES } from "../constants"
import { useDispatch } from "react-redux";
import { addFavoriteMovies } from "../Slices/movieSlice";

export const useFetchFavorites = ()=>{
    const dispatch = useDispatch()
    let isMounted = true;

    useEffect(()=>{
        const fetchTopRated = async()=>{
            try{
            
                const response = await fetch(FAV_MOVIES,OPTIONS);
            
            if(!response.ok){
            
                throw new Error('Cant fetch Movies')
            }
            const data = await response.json();

             if(isMounted) dispatch(addFavoriteMovies(data.results))    
            
            }
            catch(error){
                console.log(error)
            }
        }
        fetchTopRated()
    },[])


    return ()=> isMounted = false

}