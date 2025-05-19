import { languagesList } from '@/utils/languagesList';
import React, { useRef, useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { main } from '@/utils/groqiAi';
import { OPTIONS } from '@/utils/constants';
import { addTMDBMovies, changeBgClr } from '@/utils/Slices/AiSlice';
import MovieList from './MovieList';
import { shuffleArray } from '@/utils/ShuffleArray';

const SearchGPT = () => {

  const [scroll,setScroll] = useState(1);

  useEffect(()=>{
      const handleScroll = ()=>{
        setScroll(window.scrollY)
      }
      window.addEventListener('scroll',handleScroll)
      return ()=> window.removeEventListener('scroll',handleScroll)
    },[])

     const opacity = Math.max(1 - scroll / 1000, 0);
     const translateY = scroll * 0.3;

  

  const languageKey = useSelector((store)=>store.language.lang);  
  const movies = useSelector((store)=>store.ai.movies)
  const bgClr = useSelector((store)=>store.ai.bgClr)
  const topRated = useSelector((store)=>store.movie.topRatedMovies);
  
  const shuffle = topRated ? shuffleArray([...topRated]) : [];
 
  
  
  const searchText = useRef(null);
  const dispatch = useDispatch()

  const getMoviesFromTMDB = async(movieName)=>{
    const promise = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,OPTIONS);
    const data = await promise.json();
    const filteredList = data.results.filter(movie=>movie.original_title.toLowerCase()  === movieName.toLowerCase())
    return filteredList;
    
  }

  const handleSearchResults = async()=>{

    const getResult = await main(searchText.current.value);
    const movies = getResult.split(',').map(items=>items.trim()).filter(Boolean);
  
    const movieInfo = movies.map((movieName)=>getMoviesFromTMDB(movieName));

    const resolveMovieInfo = await Promise.all(movieInfo);

    const filtered = resolveMovieInfo.filter(movies=>movies.length>0).flat();
    
    const finalList = filtered.filter((movies)=>movies.poster_path !== null)
    

    dispatch(addTMDBMovies(finalList));
    dispatch(changeBgClr('bg-black'))
    
    
  }

  return (
    <section className={`${bgClr ? bgClr : 'search-image'} bg-black min-h-screen relative`}
    style={
      
     {    transform: `translateY(${translateY}px)`,
          opacity: opacity < 0 ? 0 : opacity,
          transition: 'transform 0.1s, opacity 2.1s ease-out',
      
      }
    }
    
    >

      <form onSubmit={(e)=>{
        e.preventDefault()
        handleSearchResults()
        }} 

        className='absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-x-5 bg-black px-10 rounded-xl py-5   shadow-[0_0_20px_5px_#00ffff]'>
        <input ref={searchText} type="text" placeholder={languagesList[languageKey].placeHolder} className='w-[400px] px-3 border-2 text-white py-2 outline-blue-600 text-lg font-bold'
        />
        <button className='text-xl font-semibold hover:scale-105 cursor-pointer bg-red-800 text-white px-5 rounded-md py-2'>{languagesList[languageKey].searchMovies}</button>
      
      </form>

      { movies && 

       <>
       {
        movies.length>0 ? 
        <div className='absolute flex flex-col gap-y-5   top-2/4 text-white left-0 right-0  font-bold bg-black px-5 pt-24'>
        <MovieList title={'Movie Results'} movie={movies} />
        <MovieList title={'People Also Watch This!'} movie={shuffle} />          
       </div>
       : <div className='absolute flex flex-col gap-y-5   top-2/4 text-white left-0 right-0  font-bold bg-black px-10'>
        <h1 className='text-xl font-bold text-emerald-400 font-poppins'>No Results Found, Dont Worry😎</h1>
        <MovieList title={'Give chance to these movies!'} movie={shuffle} />          
       </div>

       }
       
       </>
        

    }
    
    </section>
    
  )
}

export default SearchGPT