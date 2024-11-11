import React from 'react'
import Carousel from '../components/StaticCarousel'
import { Outlet } from 'react-router-dom'

const Service = () => {
  return (
    <div className='w-full bg-white  overflow-x-hidden'>
      <div className='mt-10 '>
        <Carousel />
      </div>
      <Outlet />
    </div>
  )
}

export default Service
