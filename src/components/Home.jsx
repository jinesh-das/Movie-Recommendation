import React from 'react'
import SideNav from './SideNav'
import BodyContent from './BodyContent'

const Home = () => {
  return (
    <div className='w-full h-screen flex bg-[#1f1e24]'>
      <SideNav />
      <BodyContent />
    </div>
  )
}

export default Home