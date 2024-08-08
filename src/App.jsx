import React from 'react'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'
import "./index.css"


function App() {
  return (
    <div className='w-screen h-screen bg-stone-200 flex overflow-hidden'>
    <Navbar />
    <div className='flex-1 overflow-y-auto'>
      <Outlet />
    </div>
  </div>
  )
}

export default App