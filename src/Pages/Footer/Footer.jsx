import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Footer = () => {
  const user = useSelector((state) => state.auth.user);


  return (
    <div className='flex justify-center items-center bg2 pt-20 sm:pt-56 pb-14 px-2 '>
        <div className="w-full flex flex-col gap-3 justify-center items-center max-w-7xl bg-[#ffbd0e] h-96 p-3 shadow-xl rounded-2xl">
            <h1 className='text-4xl font-bold'>Ayo mulai bangun <span className='text-[#ffffff]'>Kota</span> impianmu</h1>
            <p>Ayo jadilah superhero kota dengan membantu
            membangun kota melewati platform ini</p>

            {user ? (
              <Link to='/dashboard/services' className='bg-black text-white px-5 py-2 rounded-sm hover:bg-white hover:text-black'>Build Your City</Link>
            ):(
              <Link to='/login' className='bg-black text-white px-5 py-2 rounded-sm hover:bg-white hover:text-black'>Build Your City</Link>
            )}
            
        </div>
    </div>
  )
}

export default Footer