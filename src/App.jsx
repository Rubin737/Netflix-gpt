import Header from './Appcomponents/Header'
import React from 'react'
import Hero from './Appcomponents/Hero'
import SignUp from './Appcomponents/SignUp'
import { createBrowserRouter, Outlet } from 'react-router-dom'


const App = () => {

  return (
    <section className='px-10 relative'>
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

    ]
  }
])