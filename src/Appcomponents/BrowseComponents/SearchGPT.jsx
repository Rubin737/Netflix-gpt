import { languagesList } from '@/utils/languagesList';
import React, { useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { main } from '@/utils/groqiAi';
import { OPTIONS } from '@/utils/constants';
import { addTMDBMovies, changeBgClr } from '@/utils/Slices/AiSlice';
import MovieList from './MovieList';
import { shuffleArray } from '@/utils/ShuffleArray';

const SearchGPT = () => {

  // const [scroll,setScroll] = useState(1);
  // console.log(scroll)

  // useEffect(()=>{
  //   const handleScroll = ()=>{
  //     setScroll(window.scrollY)
  //   }
  //   window.addEventListener('scroll',handleScroll);
  //   return ()=>window.removeEventListener('scroll',handleScroll)
  // },[])

  

  

  const languageKey = useSelector((store)=>store.language.lang);  
  const movies = useSelector((store)=>store.ai.movies)
  const bgClr = useSelector((store)=>store.ai.bgClr)
  const topRated = useSelector((store)=>store.movie.trendingMovies);
  
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
    console.log(getResult)
    const movies = getResult.split(',').map(items=>items.trim()).filter(Boolean);
  
    const movieInfo = movies.map((movieName)=>getMoviesFromTMDB(movieName));

    const resolveMovieInfo = await Promise.all(movieInfo);

    const filtered = resolveMovieInfo.filter(movies=>movies.length>0).flat();
    
    const finalList = filtered.filter((movies)=>movies.poster_path !== null)
    

    dispatch(addTMDBMovies(finalList));
    dispatch(changeBgClr('bg-black'))
    
    
  }

  return (
    <section className={`${bgClr ? bgClr : 'search-image'} bg-black pt-24 xl:pt-40 lg:pt-40   pb-10 ` }
    
    >

      <form onSubmit={(e)=>{
        e.preventDefault()
        handleSearchResults()
        }} 

        className='flex  justify-self-center items-center gap-x-2 md:gap-x-5 bg-black px-3 py-3 md:px-10 md:py-5  rounded-xl shadow-[0_0_20px_5px_#00ffff]'>
        <input ref={searchText} type="text" placeholder={languagesList[languageKey].placeHolder} className='w-[200px]  md:w-[400px] md:px-3 px-2 border text-white py-2 outline-none placeholder:text-[10px] md:placeholder:text-lg placeholder:font-poppins placeholder:text-[#00FFFF]/80 text-sm md:text-lg font-bold'
        />
        <button className='text-sm md:text-xl font-semibold hover:scale-105 cursor-pointer bg-red-800 text-white px-5 md:py-[8px]  py-2'>{languagesList[languageKey].searchMovies}</button>
      
      </form>
       {/* {
        !movies && <h1 className='text-5xl text-yellow-400 font-bold font-poppins text-center mt-10'>Explore Movies Here!</h1>
       } */}

      <div className='flex flex-col lg:items-center mt-16'>
      { movies && 

       <>
       {
        movies.length>0 ? 
        <div className=' flex flex-col xl:gap-y-18 gap-y-5  text-white font-bold xl:px-5 px-0 z-20 '>
        <MovieList title={'Movie Results'} movie={movies} />
        <MovieList title={'People Also Watch This!'} movie={shuffle} />          
       </div>
       : <div className=' flex flex-col gap-y-5  text-white  font-bold z-10'>
        <h1 className='text-sm text-center md:text-xl pl-2 font-bold text-[#FFD300] font-poppins'>The movie you're looking for might be on vacation 🎬🌴</h1>
        <MovieList title={'Give chance to these movies!'} movie={shuffle} />          
       </div>

       }
       
       </>
        

    }
    </div>

    
    </section>
    
  )
}

export default SearchGPT