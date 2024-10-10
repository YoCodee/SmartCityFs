import React from 'react'
import logo from "/images/Untitled design (17).png"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'

library.add(faBars, faX)
const Navbar = () => {
  const {user} = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(!open)
  }

  if(open){
    document.body.style.overflow = "hidden"
  }else{
    document.body.style.overflow = "unset"
  }
  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div className='flex z-50 justify-center items-center mx-auto'>
{
            open && (
                <div className="menu flex flex-col pt-28 text-3xl font-bold h-screen text-white px-5 bg-slate-500 w-full gap-5">
                    <Link className='py-3 border-b-2 hover:bg-white hover:text-black'>Home</Link>
                    <Link className='py-3 border-b-2 hover:bg-white hover:text-black'>About Us</Link>
                    <Link className='py-3 border-b-2 hover:bg-white hover:text-black'>Services</Link>
                    <Link className='py-3 border-b-2 hover:bg-white hover:text-black'>Reward</Link>
                </div>
            )
        }
    <div className="flex fixed justify-between z-30 top-3 left-0 right-0 w-full mx-auto items-center px-5 max-w-7xl h-20 text-black bg-white shadow-xl rounded-full" >
       
        <div className="flex ">
          <Link to="/">
            <img src={logo} className='w-28' alt="" />
            </Link>
         
        </div>
        
        <div className="menu hidden sm:flex gap-5">
            <Link>Home</Link>
            <Link>About Us</Link>
            <Link>Services</Link>
            <Link>Reward</Link>
        </div>
        <div className="flex">
          {
            user ? (
              <Link to="/dashboard/profile" className='bg-gray-500 text-white px-5 py-2 rounded-sm'>{user?.name}</Link>
            ) : (
              <Link to="/login" className='bg-gray-500 text-white px-5 py-2 rounded-sm'>Login</Link>
            )
          }

            <div className="menu flex sm:hidden justify-center items-center mx-2">
          <FontAwesomeIcon icon={open ? faX : faBars} className='text-2xl  cursor-pointer' onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'}), toggle();
        }}
  />

        </div>
        </div>

        
    </div>
    </div>
  )
}

export default Navbar