import { ARROW, IMG_PATH, } from '@/utils/constants'

const MovieList = ({title,movie}) => {
  
  const forBrowse = 'flex  items-center my-5 gap-x-1 xl:gap-x-5 overflow-scroll no-scrollbar w-full';
  const forSearch = 'grid xl:grid-cols-6 grid-cols-3 gap-x-1 md:grid-cols-6  xl:gap-x-5 gap-y-5';

  

  const style = (title === 'Movie Results' || title === 'People Also Watch This!') || title === 'Give chance to these movies!'   ? forSearch : forBrowse


  const defaultImg = 'https://img.freepik.com/free-vector/home-movie-background-with-popcorn_1419-1852.jpg';
  return (
    <section className='px-2 xl:px-0'>
        <div className=' flex items-center gap-x-1 mb-5'>
          <h1 className='font-bold  text-sm md:text-xl lg:2xl xl:text-3xl  text-white font-poppins'>{title}</h1>
          <img src={ARROW} alt="" className='w-3 md:w-4 lg:w-5' />
        </div>
        <div className={style}>
          {
            movie &&  movie.map(eachMovies=>(
              <img key={eachMovies.id} className='w-24 h-34 md:w-32 md:h-40 xl:w-40  xl:h-52 rounded-md object-cover flex-shrink-0' src={eachMovies.poster_path ? IMG_PATH+eachMovies.poster_path :defaultImg} alt="img" />
            ))
          }
       
        </div>
    </section>
  )
}

export default MovieList