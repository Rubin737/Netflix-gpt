import { languagesList } from '@/utils/languagesList';
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { main } from '@/utils/groqiAi';
import { OPTIONS } from '@/utils/constants';
import { addTMDBMovies } from '@/utils/Slices/AiSlice';
import MovieList from './MovieList';

const SearchGPT = () => {
  
  const languageKey = useSelector((store)=>store.language.lang);
  
  const {movies,moviesName} = useSelector((store)=>store.ai);
  

  
  const searchText = useRef(null);
  const dispatch = useDispatch()

  const getMoviesFromTMDB = async(movieName)=>{
    const promise = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,OPTIONS);
    const data = await promise.json();
    const filteredList = data.results.filter(movie=>movie.original_title.toLowerCase() === movieName.toLowerCase())
    return filteredList;
    
  }

  const handleSearchResults = async()=>{

    const getResult = await main(searchText.current.value);

    const movies = getResult.split(',').map(items=>items.trim()).filter(Boolean);
    
  
    const movieInfo = movies.map((movieName)=>getMoviesFromTMDB(movieName));

    const resolveMovieInfo = await Promise.all(movieInfo);

    const finalList = resolveMovieInfo.filter(movies=>movies.length>0)
    
    dispatch(addTMDBMovies({movies,finalList}))
    
    
  }

  return (
    <section className='search-image relative'>
      <form onSubmit={(e)=>{
        e.preventDefault()
        handleSearchResults()
        }} 

        className='absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-x-5 bg-black px-10 rounded-xl py-5'>
        <input ref={searchText} type="text" placeholder={languagesList[languageKey].placeHolder} className='w-[400px] px-3 border-2 text-white py-2 outline-blue-600 text-lg font-bold'/>
        <button className='text-5xl font-semibold hover:scale-105 cursor-pointer bg-red-800 text-white px-5 rounded-md py-2'>{languagesList[languageKey].searchMovies}</button>
      
      </form>

      { moviesName &&

       <div className='absolute top-2/4 text-white transform left-10 font-bold'>
      
          {
            
            moviesName.map(name=>{
            return  <MovieList key={name} title={name} movie={movies}/>
            })

          }
       </div>
    }
    
    </section>
    
  )
}

export default SearchGPT