import { useEffect } from "react"
import { OPTIONS, TOP_RATED } from "../constants"
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../Slices/movieSlice";

export const useFetchTopRated = ()=>{
    const dispatch = useDispatch()
    let isMounted = true;

    useEffect(()=>{
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
                console.log(error)
            }
        }
        fetchTopRated()
    },[])


    return ()=> isMounted = false

}