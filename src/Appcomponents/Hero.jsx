import React from 'react'
import { Link } from 'react-router-dom'
import { languagesList } from '@/utils/languagesList';
import { useSelector } from 'react-redux';
const Hero = () => {

  const languageKey = useSelector((store)=>store.language.lang);

  return (
    <section>
      <div className='bg-image hero-container'>
          <h1 className='text-6xl font-extrabold text-white w-[600px] relative z-[50] text-center'>Unlimited movies, TV shows and more</h1>
          <p className='font-bold  text-xl text-white relative z-[50]'>Starts at ₹149. Cancel at any time.</p>
          <p className='text-xl text-white relative z-[50]'>Ready to watch? Enter your email to create or restart your membership.</p>
          <div className='flex items-center bg-red-500 px-5 gap-x-2 py-2 rounded-lg relative z-[50] button-transitions'>
            <img className='w-[20px] h-[20px] object-center' src="https://cdn-icons-png.flaticon.com/128/14025/14025507.png" alt="" />
            <Link to={'/signup'}><p className='text-white font-bold text-xl'>{languagesList[languageKey].start}</p></Link>
          </div>     
          
      </div>
      <h1>Trending Now</h1>

    </section>
  )
}

export default Hero