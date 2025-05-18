export const shuffleArray = (movieList)=>{
 
  for(let i=movieList.length-1;i>0;i--){
    const j = Math.floor(Math.random() * (i+1));
    
    [movieList[i], movieList[j]] = [movieList[j], movieList[i]];
  }
  return movieList
}