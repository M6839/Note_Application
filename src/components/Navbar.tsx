import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-center md:justify-start py-4 gap-[10px] items-center md:px-[32px]'>
        <img src='/logo.png' className='w-[32px] h-[32px]'></img>
        <h1 className='text-[24px] font-semibold'>HD</h1>
    </div>
  )
}

export default Navbar