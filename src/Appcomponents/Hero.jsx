import React from 'react'
import { languagesList } from '@/utils/languagesList';
import {  useDispatch, useSelector } from 'react-redux';
import { checkOnline } from '@/utils/Slices/AiSlice';
import { useNavigate } from 'react-router-dom';
import { useFetchOnlineStatus } from '@/utils/Hooks/useFetchOnlineStatus';
const Hero = () => {

  useFetchOnlineStatus();

  const languageKey = useSelector((store)=>store.language.lang);
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const handleNavigation = ()=>{
    const status = navigator.onLine;
    dispatch(checkOnline(status))

    if(status){
      navigate('/signup')
    }
    else{
      navigate('/error')
    }
     
  }

  return  (
    <section>
      <div className='bg-image hero-container z-0'>
          <h1 className='text-2xl lg:text-5xl xl:text-6xl  font-extrabold text-white w-[300px] md:w-[400px] lg:w-[600px] xl:w-[800px]  relative z-[50] text-center'>Unlimited movies, TV shows and more</h1>
          <p className='font-bold text-sm  xl:text-xl font-poppins text-red-500 relative z-[50]'>Starts at ₹149. Cancel at any time.</p>
          <p className='text-[12px] text-center mx-6 xl:mx-0 md:text-lg xl:text-xl lg:text-lg   font-poppins text-white relative z-[50] '>Ready to watch? Enter your email to create or restart your membership.</p>
          <div className='flex items-center  bg-red-500 px-5 gap-x-2 font-poppins py-[6px] lg:py-2 xl:py-2 mt-5 lg:mt-0 xl:mt-0 xl:gap-x-2  rounded-lg relative z-[50] button-transitions'>
            <img className='w-[20px] h-[20px] object-center' src="https://cdn-icons-png.flaticon.com/128/14025/14025507.png" alt="" />
            <p onClick={()=>handleNavigation()} className='text-black font-bold text-xl'>{languagesList[languageKey].start}</p>
          </div>     
          
      </div>

    </section>
  )
}

export default Hero