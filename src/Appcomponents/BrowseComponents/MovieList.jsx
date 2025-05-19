import { IMG_PATH } from '@/utils/constants'

const MovieList = ({title,movie}) => {
  
  const forBrowse = 'flex  items-center my-5 gap-x-5 overflow-scroll no-scrollbar w-full';
  const forSearch = 'grid grid-cols-6  gap-x-5 gap-y-5';

  

  const style = (title === 'Movie Results' || title === 'People Also Watch This!') || title === 'Give chance to these movies!'   ? forSearch : forBrowse


  const defaultImg = 'https://img.freepik.com/free-vector/home-movie-background-with-popcorn_1419-1852.jpg';
  return (
    <section>
        <h1 className='font-bold  text-3xl  text-white font-poppins mb-5'>{title}</h1>
        <div className={style}>
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