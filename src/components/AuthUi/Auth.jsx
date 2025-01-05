import React from 'react'
import { Outlet } from 'react-router-dom'

function Auth() {
  return (
    <div className='bg-black flex items-center justify-center h-screen'>
       
      <Outlet />
    </div>
  )
}

export default Auth
