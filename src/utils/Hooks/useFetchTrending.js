import { useEffect } from "react"
import { OPTIONS, TRENDING_MOVIES } from "../constants"
import { useDispatch } from "react-redux";
import { addTrendingMovies } from "../Slices/movieSlice";

export const useFetchTrending = ()=>{
    const dispatch = useDispatch()
    let isMounted = true;

    useEffect(()=>{
        const fetchTopRated = async()=>{
            try{
            
                const response = await fetch(TRENDING_MOVIES,OPTIONS);
            
            if(!response.ok){
            
                throw new Error('Cant fetch Movies')
            }
            const data = await response.json();
            console.log(data)

            if(isMounted) dispatch(addTrendingMovies(data.results))    
            
            }
            catch(error){
                console.log(error)
            }
        }
        fetchTopRated()
    },[])


    return ()=> isMounted = false

}