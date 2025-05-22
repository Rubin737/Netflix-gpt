import React from 'react'
import { useFetchTrailor } from '@/utils/Hooks/useFetchTrailor'
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player'
import { useRef } from 'react';
import { youtube } from '@/utils/youtubeConfig';
import { ALTERNATE_VIDEO_KEY, YOUTUBE_VIDEO_URL } from '@/utils/constants';


const MainVedio = ({movieId}) => {
  
  useFetchTrailor(movieId);
  

  const videoRef = useRef(null);

  const trailer = useSelector((store)=>store.movie?.trailerVideos);
 
  return (
    <section className='w-full h-full relative rounded-none xl:rounded-3xl'>
      
        <div className="absolute inset-0 w-full h-full pointer-events-none xl:rounded-3xl overflow-hidden xl:mt-10 mt-2">
        <ReactPlayer
          url={`${YOUTUBE_VIDEO_URL}${trailer?.key?trailer?.key:ALTERNATE_VIDEO_KEY}`}
          playing={true}
          controls={false}
          muted={true}
          width="100%"
          height="100%"
          ref={videoRef}
          className="scale-125"
          onProgress={({ playedSeconds }) => {
            if (playedSeconds >= 30) {
              videoRef.current.seekTo(0, "seconds"); // Restart at 50s
            }
          }}
          config={
            {
              youtube
            }
          }
          
          />
      
      </div>

    </section>
  )
}

export default MainVedio