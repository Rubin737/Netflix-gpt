import { useEffect } from "react"
import { OPTIONS, TRENDING_MOVIES } from "../constants"
import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies } from "../Slices/movieSlice";

export const useFetchTrending = ()=>{
    const dispatch = useDispatch()
    const trend = useSelector((store) => store.movie.trendingMovies);
    useEffect(()=>{
        let isMounted = true;
        const fetchTopRated = async()=>{
            try{
            
                const response = await fetch(TRENDING_MOVIES,OPTIONS);
            
            if(!response.ok){
            
                throw new Error('Cant fetch Movies')
            }
            const data = await response.json();
            
            if(isMounted) dispatch(addTrendingMovies(data.results))    
            
            }
            catch(error){
                console.log(error)
            }
        }
        if(!trend) fetchTopRated()
        return ()=> {
    isMounted = false
};
    },[trend,dispatch])



}