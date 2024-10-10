import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import "./DashboardPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStar, faStream } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import HeaderDashboard from "../Components/HeaderDash/HeaderDashboard";
import { useSelector,useDispatch } from 'react-redux';
// import { LogOut, reset } from '../Features/authSlice';
import { useNavigate } from 'react-router-dom';

import { logout } from '../Features/authSlice';
library.add(faHome, faStar, faStream)

const DashboardPage = () => {
  const {user} = useSelector((state) => state.auth);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility
  const dispatchEvent = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatchEvent(logout()); // Dispatch logout action
    navigate('/'); // Re

  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar
  };

  return (
    <div className="dashboard-container flex h-screen">
      {
        isSidebarOpen ? (
          <aside className={`sidebar absolute top-1 bottom-1 z-10  md:hidden w-[250px] py-4 mx-2 mt-28 mb-6 rounded-xl p-[20px] text-white`}>
          <div className="title">
            <h1 className='text-2xl font-bold text-center py-3 border-b-2'>Dashboard</h1>
          </div>
          <div className="flex flex-col justify-between h-full pb-16">
            <ul className='list-none py-2'>
              <li className={`py-2 rounded-md my-2 pl-2 ${location.pathname === '/dashboard/profile' ? 'bg-blue-500' : ''}`}>
                <FontAwesomeIcon icon={faHome} className='mr-2' /> <Link to="/dashboard/profile">Profile</Link>
              </li>
              <li className={`py-2 rounded-md my-2 pl-2 ${location.pathname === '/dashboard/task' ? 'bg-blue-500' : ''}`}>
                <FontAwesomeIcon icon={faStream} className='mr-2' /> <Link to="/dashboard/service">Task</Link>
              </li>
              <li className={`py-2 rounded-md my-2 pl-2 ${location.pathname === '/dashboard/service' ? 'bg-blue-500' : ''}`}>
                <FontAwesomeIcon icon={faStar} className='mr-2' /> <Link to="/dashboard/service">My Reward</Link>
              </li>
            </ul>
            <div className="logout py-2 rounded-md my-2 pl-2 bg-red-600 text-center ">
              <button>Logout</button>
            </div>
          </div>
        </aside>
        ):(
          null
        )
      }
      <aside className={`sidebar hidden md:block w-[250px] py-4 mx-2 mt-28 mb-6 rounded-xl p-[20px] text-white`}>
        <div className="title">
          <h1 className='text-2xl font-bold text-center py-3 border-b-2'>Dashboard</h1>
        </div>
        <div className="flex flex-col justify-between h-full pb-16">
          <ul className='list-none py-2'>
            <li className={`py-2 rounded-md my-2 pl-2 ${location.pathname === '/dashboard/profile' ? 'bg-blue-500' : ''}`}>
              <FontAwesomeIcon icon={faHome} className='mr-2' /> <Link to="/dashboard/profile">Profile</Link>
            </li>
            <li className={`py-2 rounded-md my-2 pl-2 ${location.pathname === '/dashboard/services' ? 'bg-blue-500' : ''}`}>
                <FontAwesomeIcon icon={faStream} className='mr-2' /> <Link to="/dashboard/services">Task</Link>
              </li>
            <li className={`py-2 rounded-md my-2 pl-2 ${location.pathname === '/dashboard/service' ? 'bg-blue-500' : ''}`}>
              <FontAwesomeIcon icon={faStar} className='mr-2' /> <Link to="/dashboard/service">My Reward</Link>
            </li>
          </ul>
          <div className="
          ">
          {user?.role === "admin" ? (
            <div className="logout py-2 rounded-md my-2 pl-2 bg-yellow-500 text-center ">
              <Link to="/dashboard/admin">All Data</Link>
            </div>
          ):(
            null
          )}
          <div className="logout py-2 rounded-md my-2 pl-2 bg-red-600 text-center ">
            <button onClick={handleLogout}>Logout</button>
          </div>
          </div>
        </div>
      </aside>

      <main className="dashboard-content py-28 flex-grow p-[20px] ">
      <HeaderDashboard icon={faHome} Title="Dashboard" toggleSidebar={toggleSidebar}  />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardPage;
