import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHome, faBell, faCoins ,faInbox, faSpinner,faCheck,faRoad,faTrashCan,faListCheck,faCalendarDays, faStar  } from '@fortawesome/free-solid-svg-icons';
import CardDashboard from '../Components/CardDashboard/CardDashboard';
import Cardhistory from '../Components/HistoryCard/Cardhistory';
import HeaderDashboard from "../Components/HeaderDash/HeaderDashboard";
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faHome, faBell, faCoins,faCalendarDays , faInbox, faSpinner,faCheck,faRoad,faTrashCan,faListCheck,faCalendarDays,faStar)  
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMe } from '../Features/authSlice';
import { useEffect } from 'react';
import axios from 'axios';

import Kota from '/images/Untitled design (23).png'
import Penjahat from '/images/Untitled design (24).png'


const ProfilePage = () => {
    const cardData = [
        { icon: faRoad, className: "bg-[#f6f4e7] text-black", TitleAtas: "24/06/2024", Title1: "Perbaikan Jalan",routes:"/dashboard/getPerbaikanJalan" },
        { icon: faTrashCan, className: "bg-[#4e656f] text-white", TitleAtas: "24/06/2024", Title1: "Pembuangan Sampah", routes:"/dashboard/getPembuangan" },
        { icon: faListCheck, className: "bg-[#fdc93f] text-black", TitleAtas: "24/06/2024", Title1: "Inovasi", routes:"/dashboard/getInovasi" },
        { icon: faCalendarDays, className: "bg-[#f6f4e7] text-black", TitleAtas: "24/06/2024", Title1: "Event", routes:"/dashboard/getEvent" },
        { image: Penjahat, className: "bg-[#4e656f] text-white", TitleAtas: "24/06/2024", Title1: "Penangkapan", routes:"/dashboard/getPenangkapan" },
        { image: Kota, className: "bg-[#fdc93f] text-black", TitleAtas: "24/06/2024", Title1: "Relawan", routes:"/dashboard/getRelawan" },
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(cardData.length / itemsPerPage);
    const dispatch  = useDispatch();
    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const currentCards = cardData.slice(startIndex, startIndex + itemsPerPage);

   

    const [data, setData] = useState([]);
    const {user} = useSelector((state) => state.auth);

    console.log("first")

    useEffect(() => {
       dispatch(getMe());

    },[dispatch]);

    useEffect(() => {
        if (user) {
            setData(user); // Set data dari user yang didapat
            console.log("User Data:", user);
        }
    }, [user]);



    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar
  };

  console.log("ini data ", data);
  const rewardHistoryData = data?.rewardHistory || [];

  const avuelableData = data?.points || "0";
  const avuelable1Data = data?.pendingTasks || "0";
  const avuelable2Data = data?.successfulTasks || "0";

  
  return (
    <div className=''>  

        <div className="mt-12 flex flex-wrap gap-5">
            <CardDashboard bgColor="bg-orange-500" Title1={avuelableData} icon={faCoins} TitleAtas="Total Poin"/>
            <CardDashboard bgColor="bg-blue-500" Title1={rewardHistoryData.length} icon={faStar} TitleAtas="Total Reward"/>
            <CardDashboard bgColor="bg-gray-500"  Title1={avuelable1Data} icon={faSpinner} TitleAtas="Pending Project"/>
            <CardDashboard bgColor="bg-green-500"  Title1={avuelable2Data} icon={faCheck} TitleAtas="Done Project"/>
        </div>
        <div className="mt-5">
            <div className="">
                <div className="title">
                    <h1 className='text-2xl font-bold'>History Project</h1>
                </div>
              <div className="mt-8 flex flex-wrap gap-6">
                {currentCards.map((card, index) => (
                    <Cardhistory key={index} {...card} />
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button onClick={prevPage} disabled={currentPage === 0}>
                    Previous
                </button>
                <button onClick={nextPage} disabled={currentPage === totalPages - 1}>
                    Next
                </button>
            </div>
            </div>
        </div>
    </div>
  );
};

export default ProfilePage;
