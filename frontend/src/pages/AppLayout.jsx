import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className='overflow-x-hidden min-h-screen flex flex-col'>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default AppLayout
