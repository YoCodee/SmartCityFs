import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import ScrollToTop from '../../Components/ScrollToTop';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../Features/authSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user or token is missing
    if (!user && token) {
      // If token exists, try to fetch the user data
      dispatch(getMe())
        .unwrap()
        .then((userData) => {
          console.log('User Data: ', userData);
        })
        .catch((message) => {
          console.error('Error fetching user data:', message);
          // If there's an error (e.g., invalid token), redirect to login
          navigate('/login');
        });
    } else if (!token) {
      // If no token is found, redirect to login
      navigate('/login');
    }
  }, [dispatch, navigate, user, token]);

  return (
    <div>
      <ScrollToTop>
        <div className='z-50'>
          <Navbar />
        </div>
        <Outlet />
      </ScrollToTop>
    </div>
  );
};

export default Layout;
