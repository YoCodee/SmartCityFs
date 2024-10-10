import React, { useEffect, useState } from 'react';
import './HomePage.css';
import images from "/images/Untitled design (14).png";
import awan from "/images/Untitled design (16).png";
import About from '../About/About';
import Service from '../Service/Service';
import Point from '../Point/Point';
import VoucherPage from '../Voucher/VoucherPage';
import FAQ from '../FAQ/FAQ';
import Footer from '../Footer/Footer';


const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  // Handle the scroll event to create the parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <div className='bg1'>
      <div className="parallax-container">
        <div className="flex w-full min-h-[520px] flex-col justify-center items-center">
          <div
            className="Judul"
            style={{ transform: `translateY(${scrollY * 0.7}px)` }} // Parallax effect for H1
          >
            <h1 className='font-bold text-3xl sm:text-6xl'>SMART CITIES</h1>
          </div>
          <div className="sub-judul" style={{ transform: `translateY(${scrollY * 0.7}px)` }}>
            <h3>For your future City</h3>
          </div>
        </div>

        {/* Background images */}
       
      </div>
      <div className="absolute bottom-0 left-0 right-0">
          <img src={images} className='w-screen h-64 sm:h-96 z-30 ' alt="Logo" />
        </div>
        <div className="absolute bottom-[-30px] sm:bottom-[-200px] flex z-40">
          <img src={awan} className='w-screen' alt="Awan" />
        </div>
    </div>
    <div className=' z-50'>
      <About/>
    </div>
    <div className=' z-50'>
      <Service/>
    </div>
    <div className=' z-50'>
    <Point/>
    </div>
    <div className=' z-50'>
      <VoucherPage/>
    </div>
    <div className=' z-50'>
      <FAQ/>
    </div>
    <div className=' relative z-50'>
    <div className="absolute sm:top-[-220px] top-[-50px] flex z-40">
          <img src={awan}  className='w-screen' alt="Awan" />
        </div>
      <Footer/>
    </div>
    </>
  );
};

export default HomePage;
