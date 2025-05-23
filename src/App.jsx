import Header from './Appcomponents/Header'
import React, { lazy, Suspense, useEffect } from 'react'
import Hero from './Appcomponents/Hero'
import { createBrowserRouter, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase'
import { addUser, removeUser } from './utils/Slices/userslice'
import ErrorPage from './Appcomponents/ErrorPage'
import ShimerSignup from './Appcomponents/shimmerCOmponets/ShimerSignup'
import ShimmerBrowse from './Appcomponents/shimmerCOmponets/ShimmerBrowse'

const Browse = lazy(()=>import('./Appcomponents/Browse'));
const SignUp = lazy(()=>import('./Appcomponents/SignUp'));
const SearchGPT = lazy(()=>import('./Appcomponents/BrowseComponents/SearchGPT'))


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
  },[dispatch,navigate])


  return (
    
      <section className=' mt-0  relative'>
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
        element:<Suspense fallback={<ShimerSignup/>}><SignUp/></Suspense>
      },
      {
        path:'/browse',
        element:<Suspense fallback={<ShimmerBrowse/>}><Browse/></Suspense>
      },
      {
        path:'/searchmovies',
        element:<Suspense fallback={<ShimmerBrowse/>}><SearchGPT /></Suspense>
      },

    ],
    errorElement:<ErrorPage/>
  }
])