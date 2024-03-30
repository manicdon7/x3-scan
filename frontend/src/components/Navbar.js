import React from 'react'
import logo from '../assets/X3_Scan.png';
import Connect from './Connect';

const Navbar = () => {
  return (
    <div className='flex justify-between mx-3'>
        <div>
            <img src={logo} className='py-2 m-2' alt="Logo" />
        </div>
        <div>
            <div className='flex gap-5 py-4 px-2 text-xl'>
                <a href='' className='text-white pt-1 hover:text-blue-500'>Home</a>
                <a href='/playground' className='text-white pt-1 hover:text-blue-500'>Playground</a>
                <a href='/Documentation' className='text-white pt-1 hover:text-blue-500'>Docs</a>
                <Connect/>
            </div>
        </div>
    </div>
  )
}

export default Navbar