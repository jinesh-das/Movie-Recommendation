import React from 'react'
import TopNav from './TopNav'
import Header from './Header'
import CardContainer from './CardContainer'

const BodyContent = () => {
  return (
    <div className='w-[80%] h-full overflow-y-auto '>
      <TopNav />
      <Header/>
      <CardContainer/>
    </div>
  )
}

export default BodyContent