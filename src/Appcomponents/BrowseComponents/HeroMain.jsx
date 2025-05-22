import { useFetchNowPlay } from '@/utils/Hooks/useFetchNowPlay'
import React from 'react'
import { useSelector } from 'react-redux';
import { GOOGLE_SEARCH, MOVIE_ICON, PLAY_ICON, YOUTUBE_VIDEO_URL } from '@/utils/constants';
import { IMG_PATH } from '@/utils/constants';
import ShimerUi from './ShimerUi';
import { useState,useEffect } from 'react';
import TrailerVedio from './TrailerVedio';

const HeroMain = () => {
  
  useFetchNowPlay();
  
  const movies = useSelector((store) => store.movie.popularMovies);
  const trailer = useSelector((store)=>store.movie.trailerVideos);
  
  const[change,setChange] = useState(3);    
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

  const opacity = Math.max(1 - scroll / 1000, 0);
  const translateY = 0;
  
  
  
  const handleVideoChange = (index)=>{
          
      setChange(index)
  }

  const handleNavigation = (e,title)=>{
    e.preventDefault();
    const gSearch = GOOGLE_SEARCH + encodeURIComponent(title);
    window.open(gSearch,'_blank')

  }
 
  
  if (!movies) return <ShimerUi/>;

  const cards = movies.slice(1,6);
  const mainMovie = cards[change];
  const year = mainMovie.release_date.split('-')[0];
  const overView = mainMovie.overview.slice(0,200) + '....';

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
      <div className=' flex  flex-col z-10 gap-y-2 md:gap-y-5 absolute text-white top-10 left-2   md:top-[15%] lg:top[50%] xl:left-10'>
        <h1 className='font-bold text-indigo-500 text-sm lg:text-4xl md:text-4xl xl:text-5xl font-poppins'>{mainMovie.title}</h1>
        <p className='font-bold sm:text-[12px] md:text-lg lg:text-xl xl:text-lg font-poppins '>
          {year} . <strong className='text-slate-400'>{language ? language : mainMovie.original_language}</strong>
        </p>
        <p className='text-[8px] md:text-[14px] lg:text-[14px] xl:text-lg w-[300px] md:w-[500px] lg:w-[500px] xl:w-[50%] font-poppins '>{overView}</p>
        
        <div className='flex gap-x-5 cursor-pointer'>
          <a href={`${YOUTUBE_VIDEO_URL+trailer?.key}`} target='_blank'>
            <div className='title-button bg-white'>
            <img src={PLAY_ICON} className='w-3 md:w-[20px] xl:w-[30px]' alt="" />
            <button className='text-[10px] md:text-sm xl:text-lg'>Play</button>
          </div>
          </a>
          <a href="#" onClick={(e)=>handleNavigation(e,mainMovie.title)} >
          <div className='title-button bg-slate-400 opacity-50'>
            <img src={MOVIE_ICON} className='w-2 md:w-5' alt="" />
            <button className='text-[10px] md:text-sm xl:text-lg'>Movie Info</button>
          </div>
          </a>
        </div>

        <div className='flex  md:gap-x-5 md:-mt-26 lg:mt-0 '>
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
      <TrailerVedio movieId={mainMovie.id} />
    </section>
  );
};

export default HeroMain;
