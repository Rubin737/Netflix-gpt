import React from 'react'
import MovieList from './MovieList'
import { useFetchTopRated } from '@/utils/Hooks/useFetchTopRated'
import { useSelector } from 'react-redux'
import { useFetchFavorites } from '@/utils/Hooks/useFetchFavorites'
import { useFetchTrending } from '@/utils/Hooks/useFetchTrending'
import { shuffleArray } from '@/utils/ShuffleArray'

const Secondary = () => {
  
  useFetchTopRated()
  useFetchFavorites()
  useFetchTrending()

  const topRated = useSelector((store)=>store.movie.topRatedMovies);
  const fav = useSelector((store)=>store.movie.favoriteMovies);
 
  const trendingMovies = useSelector((store)=>store.movie.trendingMovies);
  const trending = trendingMovies ? shuffleArray([...trendingMovies]) : [];

  
  return(
    <section className='mt-35 md:mt-18 xl:mt-30'>
      <MovieList title={'Popular Shows'} movie={fav} />
      <MovieList title={'Top Rated'} movie={topRated} />
      <MovieList title={'Trending Now'} movie={trending} />
      <MovieList title={`People's Favourites`} movie={topRated} />
    </section>
   )
}

export default Secondary 