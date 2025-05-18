import Header from './Appcomponents/Header'
import React, { useEffect } from 'react'
import Hero from './Appcomponents/Hero'
import SignUp from './Appcomponents/SignUp'
import { createBrowserRouter, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase'
import { addUser, removeUser } from './utils/Slices/userslice'
import Browse from './Appcomponents/Browse'
import SearchGPT from './Appcomponents/BrowseComponents/SearchGPT'


const App = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
   
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
       
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({userId:uid,email:email,displayName,photoURL}));
        navigate('/browse')
  
      } else {
        dispatch(removeUser());
        navigate('/')
      }
    });
   return ()=>unsubscribe()  
  },[])


  return (
    
      <section className='px-5 mt-5 relative'>
      <Header/>
      <Outlet/>
      </section>
    
  )
}

export default App

export const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Hero/>
      },
      {
        path:'/signup',
        element:<SignUp/>
      },
      {
        path:'/browse',
        element:<Browse/>
      },
      {
        path:'/searchmovies',
        element:<SearchGPT/>
      },

    ]
  }
])