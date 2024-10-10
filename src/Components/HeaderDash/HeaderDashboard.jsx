import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
library.add(faBell, faBarsStaggered);
import { useSelector } from 'react-redux';
const HeaderDashboard = ({ icon, Title, toggleSidebar }) => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div>
            <div className="header flex justify-between">
                <div className="Title flex flex-col">
                    <div className="flex items-center gap-1 mb-1">
                        <FontAwesomeIcon icon={icon} onClick={toggleSidebar} /> / <h1>{Title}</h1>
                    </div>
                    <div>
                        <h2 className='font-bold'>{Title}</h2>
                    </div>
                </div>
                <div className="profile">
                    <div className="flex gap-3 items-center">
                        <div className="notification">
                            <FontAwesomeIcon icon={faBarsStaggered} className='text-xl block md:hidden' onClick={toggleSidebar} />
                        </div>
                        <div className="notification flex items-center">
                            <FontAwesomeIcon icon={faBell} className='text-xl' />
                        </div>
                        <div className="user py-2 px-2 bg-blue-500 rounded-lg text-white">
                            <h1>{user?.name}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderDashboard;
