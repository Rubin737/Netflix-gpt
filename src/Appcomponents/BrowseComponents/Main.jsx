import { useFetchNowPlay } from '@/utils/Hooks/useFetchNowPlay'
import React from 'react'
import MainVedio from './mainVedio';
import { useSelector } from 'react-redux';
import { MOVIE_ICON, PLAY_ICON } from '@/utils/constants';
import { IMG_PATH } from '@/utils/constants';
import ShimerUi from './ShimerUi';
import { useState,useEffect } from 'react';



const Main = () => {
  
  useFetchNowPlay();  

  const [scroll,setScroll] = useState(1);
  
  useEffect(()=>{
    
    const interval = setInterval(()=>{
      setChange((prev)=>{
        return (prev+1)%5;
      })
    },30000)

    return ()=>clearInterval(interval)

  },[])

  useEffect(()=>{
    const handleScroll = ()=>{
      setScroll(window.scrollY)
    }
    window.addEventListener('scroll',handleScroll)
    return ()=> window.removeEventListener('scroll',handleScroll)
  },[])

  
  const movies = useSelector((store) => store.movie.popularMovies);
  
  const[change,setChange] = useState(3);
  
  const opacity = Math.max(1 - scroll / 1000, 0);
  const translateY = scroll * 0.3;

  
  const handleVideoChange = (index)=>{    
      setChange(index)
  }
 
  
  if (!movies) return <ShimerUi/>;

  const cards = movies.slice(1,6);
  

  const mainMovie = cards[change];
  

  const year = mainMovie.release_date.split('-')[0];

  const languageMap = {
    en: 'English',
    ja: 'Japanese',
    ko: 'Korean',
    fr:'French',
    da:'Danish',
    hi:'Hindi',
    ta:'Tamil'
  };

  const language = languageMap[mainMovie.original_language];

  return (
    <section className='relative aspect-video w-full  mb-5'
    style={
      
     {    transform: `translateY(${translateY}px)`,
          opacity: opacity < 0 ? 0 : opacity,
          transition: 'transform 0.1s, opacity 0.1s ease-out',
      
      }
    }
    >
      <div className=' flex  flex-col z-10 gap-y-5 absolute text-white top-[35%] left-10'>
        <h1 className='font-bold text-indigo-500 text-5xl font-poppins'>{mainMovie.title}</h1>
        <p className='font-bold text-lg font-poppins '>
          {year} . <strong className='text-slate-400'>{language ? language : mainMovie.original_language}</strong>
        </p>
        <p className='text-sm font-poppins w-[50%]'>{mainMovie.overview}</p>
        
        <div className='flex gap-x-5'>
          <div className='title-button bg-white'>
            <img src={PLAY_ICON} width={30} alt="" />
            <button>Play</button>
          </div>
          <div className='title-button bg-slate-400 opacity-50'>
            <img src={MOVIE_ICON} width={20} alt="" />
            <button>Movie Info</button>
          </div>
        </div>

        <div className='flex gap-x-5 '>
          {cards.map((items,index) => {
            return (
              <img key={items.title}
                className={`title-cards border-2 ${change === index?'scale-110 border-red-500':'border-blue-500'} `} 
                src={IMG_PATH + items.poster_path} 
                alt="title-cards"
                onClick={()=>handleVideoChange(index)} 
              />
            )
          })}
        </div>
      </div>
      <MainVedio movieId={mainMovie.id} />
    </section>
  );
};

export default Main;
