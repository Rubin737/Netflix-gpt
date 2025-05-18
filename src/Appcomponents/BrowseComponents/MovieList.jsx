import { IMG_PATH } from '@/utils/constants'
import React from 'react'

const MovieList = ({title,movie}) => {
  
  const defaultImg = 'https://img.freepik.com/free-vector/home-movie-background-with-popcorn_1419-1852.jpg';
  return (
    <section>
        <h1 className='font-bold  text-3xl text-white font-poppins'>{title}</h1>
        <div className='flex justify-between  items-center my-5 gap-x-5 overflow-scroll no-scrollbar w-full'>
          {
            movie &&  movie.map(eachMovies=>(
              <img key={eachMovies.id} className='w-40  h-52 rounded-md object-cover flex-shrink-0' src={eachMovies.poster_path ? IMG_PATH+eachMovies.poster_path :defaultImg} alt="img" />
            ))
          }
       
        </div>
    </section>
  )
}

export default MovieList