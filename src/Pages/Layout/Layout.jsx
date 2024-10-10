import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import ScrollToTop from '../../Components/ScrollToTop'
import { useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../Features/authSlice"
const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user} = useSelector((state)=> state.auth)

  useEffect(()=>{
    dispatch(getMe())
  },[dispatch]);
  return (
    <div>
      <ScrollToTop>
        <div className='z-50'>
            <Navbar/>
        </div>
        <Outlet/>
        </ScrollToTop>
    </div>
  )
}

export default Layout