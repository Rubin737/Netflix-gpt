import { POPCORN_IMG } from '@/utils/constants'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {

  const navigate = useNavigate()

  return (
    <section className='bg-blue-100 h-screen pt-10 px-5'>
      <div className='flex flex-col gap-y-5 items-center justify-center'>
        <div className='flex gap-x-5 items-center'>
            <img src={POPCORN_IMG} className='w-20 xl:w-[100px]'  alt="" />
            <h1 className='xl:text-5xl text-2xl font-bold text-red-500 '> Well, that’s not in the script...</h1> 
        </div>
        <div className='flex flex-col justify-start'>
          <h1 className='lg:text-xl text-sm opacity-75 font-bold font-poppins'>Something broke🔧 — and unfortunately, it wasn’t a stunt double 🐱‍🏍.</h1>
          <h1 className='lg:text-xl mt-2 text-[16px] font-bold font-poppins'>The scene you're looking for didn’t load😵.</h1>
          <h1 className='lg:text-lg text-sm  mt-5 font-poppins'>🎬 Try refreshing the page, or</h1>
          <h1 className='lg:text-lg text-sm mt-1  font-poppins'>🚪 Exit stage left and <span onClick={()=>navigate('/')}
           className='text-blue-400 underline cursor-pointer hover:scale-125 hover:text-blue-600'>go back home</span></h1>
        </div>
      </div>   
    </section>
  )
}

export default ErrorPage