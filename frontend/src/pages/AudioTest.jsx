import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import CarouselSection from '../components/audiotest/carouselsection';

const Service = () => {
  return (
    <div className='w-full bg-white  overflow-x-hidden'>
      <div className='mt-10 '>
        <CarouselSection />
      </div>
      <Outlet />
    </div>
  )
}

export default Service
