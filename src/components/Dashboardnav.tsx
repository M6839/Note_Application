import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
const Dashboardnav = () => {
  const navigate=useNavigate()
  const handleSignOut=()=>{
    alert('user Sign out')
    localStorage.clear();
    navigate('/SignIn')
  }

  return (
    <div className='flex justify-between items-center py-4'>
        <img src='/logo.png' className='w-[32px] h-[32px]'></img>
        <h1 className='text-[24px] font-medium'>Dashboard</h1>
        <span className="underline text-[14px] md:text-[20px] font-semibold text-[#367AFF] cursor-pointer" onClick={handleSignOut}>Sign out</span>
    </div>
  )
}

export default Dashboardnav