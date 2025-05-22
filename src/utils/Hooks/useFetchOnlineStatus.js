import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkOnline } from "../Slices/AiSlice";

export const useFetchOnlineStatus = ()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
          
          const updateOnlineStatus = () => {
          dispatch(checkOnline(navigator.onLine));
          };
          updateOnlineStatus();
    
          window.addEventListener('online', updateOnlineStatus);
          window.addEventListener('offline', updateOnlineStatus);
    
           return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
          };
        
      },[dispatch])
    
}