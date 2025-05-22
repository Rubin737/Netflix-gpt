import React from 'react'
import Secondary from './BrowseComponents/Secondary'
import Main from './BrowseComponents/Main'
const Browse = () => {
  return (
    <section className='space-y-10 px:0 xl:px-6 py-4 bg-black min-h-screen rounded-xl'>
      <Main/>
      <Secondary/>
    </section>
  )
}


export default Browse