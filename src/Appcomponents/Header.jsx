 import React from 'react'
 import { signOut } from 'firebase/auth';
 import { auth } from '@/utils/firebase';
 import { useNavigate } from 'react-router-dom';
 import { useSelector } from 'react-redux';
 import { useState } from 'react';


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  console.log(user);
 
  const[hideProfile,setHideProfile] = useState(true)
  
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

  return (
    <section className=' flex items-center justify-between left-10 right-10 z-[100]'>
        <img className='w-[200px]' src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="" />
         {
          !user && <div className={` items-center gap-x-2 ${hideProfile?'flex' : 'hidden'}`}>
          <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" className='w-[40px]' alt="" 
          onClick={()=>{handleSignOut()}}
          />
          <h1 className='button-style'
           onClick={()=>handleHideProfile()}
          >Sign in</h1>
        </div>
         }
         {
          user && 
          <div className='flex items-center gap-x-2 '>
          <img src={user.photoURL} className='w-[40px]' alt="" 
          
          />
          <h1 className='button-style '
           
          >{user.displayName?user.displayName:''}</h1>
          <div className='relative group cursor-pointer'>
          <img src="https://cdn-icons-png.flaticon.com/128/4436/4436954.png" alt="" className='w-[30px] cursor-pointe ml-5'
            onClick={handleSignOut}
          />
          <p className='text-sm group-hover:block hidden   px-2 -bottom-6 -right-4 rounded-lg font-display bg-slate-400 text-white absolute'>Logout</p>
          </div>
        </div>
         }
    </section>

  )
}

export default Header