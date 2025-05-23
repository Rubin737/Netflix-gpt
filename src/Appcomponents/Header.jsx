 import React, { useEffect } from 'react'
 import { signOut } from 'firebase/auth';
 import { auth } from '@/utils/firebase';
 import { useLocation, useNavigate } from 'react-router-dom';
 import { useSelector } from 'react-redux';
 import { useState } from 'react';
 import SelectLanguage from './BrowseComponents/SelectLanguage';
 import { AI_IMG, CLOSE, HAM_IMG, HOME_IMG, LOGOUT_IMG, NETFLIX_LOGO } from '@/utils/constants';
 import { languagesList } from '@/utils/languagesList';
 

const Header = () => {
  
  const navigate = useNavigate() 
  const location = useLocation();

  
  const[hideProfile,setHideProfile] = useState(true);
  const[switchPage,setSwitchPage] = useState(true);
  const[ham,setHam] = useState(false)
  
  const user = useSelector((store)=>store.user);
  const languageKey = useSelector((store)=>store.language.lang);

  useEffect(() => {
    if (location.pathname === '/browse') {
      setSwitchPage(true)
    } else if (location.pathname === '/searchmovies') {
      setSwitchPage(false);
    }
  }, [location.pathname]);

  const handleSignOut=()=>{
    
    signOut(auth).then(() => {
      navigate('/');
      setHideProfile(true)
    }).catch((error) => {
      // An error happened.
    });
  }
  const handleHideProfile = ()=>{
    navigate('/signup');
    setHideProfile(false)
  }
  
const handleSearchBar = () => {
  if (location.pathname === '/browse') {
    navigate('/searchmovies');
  } else {
    navigate('/browse');
  }
};

const handleHamburgerMenu = ()=>{
  setHam(!ham)
}

  return (
    <section className='flex px-2 xl:px-5 items-center justify-between backdrop-blur-md bg-black/5 fixed top-0 left-0 right-0  z-50   ' >
        <div className='flex bg-red lg:gap-x-5 sm:gap-x-2  items-center'>
        
         <img className='w-[100px] md:[150] lg:w-[180px]  xl:[200px] ' src={NETFLIX_LOGO} alt="" />
        </div>
          
            {
            !user && <div className={`items-center gap-x-2 ${hideProfile?'flex' : 'hidden'}`}>
            <h1 className='button-style'
            onClick={()=>handleHideProfile()}
            >{languagesList[languageKey].signIn}</h1>
            <SelectLanguage/>
             </div>
             }
        
         {
          user && 
          <div className='flex items-center gap-x-2 xl:gap-x-5 '>
          
          <div className='flex items-center md:gap-x-1 lg:gap-x-2 cursor-pointer' onClick={()=>handleSearchBar()}>
             <h1 className='font-bold text-[12px]   md:text-sm  font-poppins  text-yellow-400 '>{switchPage ? `${languagesList[languageKey].searchInBrowse}` : `${languagesList[languageKey].home}`}</h1>
              
              <img src={switchPage ? AI_IMG : HOME_IMG} alt="" className='w-5 ml-1 xl:ml-2  hover:scale-110 cursor-pointer'  
              />
                  
          </div>
          <img src={ham?CLOSE:HAM_IMG} onClick={handleHamburgerMenu} alt="HAM" className='w-8 h-8 block lg:hidden align-middle'/>
          
          <div className=' hidden lg:flex gap-x-2 items-center'>
            <img src={user.photoURL} className='w-[20px] lg:w-[30px]' alt=""/>
              <SelectLanguage/>
            <h1 className='text-sm xl:text-lg text-white font-bold font-poppins'
            
            >{user.displayName?user.displayName:''}</h1>
            <div className='relative group cursor-pointer'>
            <img src={LOGOUT_IMG} alt="" className='xl:w-[30px] w-[20px] cursor-pointe ml-1 xl:ml-5'
              onClick={handleSignOut}
            />
            <p className='text-sm group-hover:block hidden   px-2 -bottom-6 -right-4 rounded-lg font-display bg-slate-400 text-white absolute'>{languagesList[languageKey].logOut}</p>

            </div> 
          </div>


          <div className='relative block lg:hidden z-50'>
              <div className={`absolute shadow-[0_0_10px_5px_gray]   right-0 top-5 ${ham ? 'flex' : 'hidden'} items-center justify-between gap-y-2 flex-col bg-slate-500  px-2 py-5 overflow-visible`}>
                  <img src={user.photoURL} className='w-[20px] lg:w-[30px]' alt=""/>
                  <h1 className='text-sm xl:text-lg text-yellow-400 font-bold font-poppins'
                  
                  >{user.displayName?user.displayName:''}</h1>
                    <SelectLanguage/>
                  <div className='relative group cursor-pointer'>
                  <img src={LOGOUT_IMG} alt="" className='xl:w-[30px] w-[30px] cursor-pointe ml-1 xl:ml-5'
                    onClick={handleSignOut}
                  />
                  <p className='text-[9px] xl:text-sm group-hover:block hidden   px-2 -bottom-6 -right-4 rounded-lg font-display bg-slate-400 text-white absolute'>{languagesList[languageKey].logOut}</p>
                  </div>  
              </div> 
           </div>
        


        </div>
         }
    </section>

  )
}

export default Header