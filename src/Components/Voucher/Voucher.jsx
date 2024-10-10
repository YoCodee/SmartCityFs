import React, { useState } from 'react';
import "./Voucher.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
library.add(faShoppingBag);

const Voucher = ({ className, text, icon, title, persentase, date, point, rewardId }) => {
  const [claimStatus, setClaimStatus] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const ClaimReward = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/user/claim-reward", {
        rewardId: rewardId // Mengirimkan ID reward
      });
      setClaimStatus(response.data.message); // Menyimpan pesan respons klaim reward
    } catch (error) {
      console.log(error)
      setCopyStatus(error.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <>
    <div className={` ${className} card h-[180px] rounded-md p-3 relative`}>
      <div className="main flex px-0 py-3 justify-between items-center">
        <div className="co-img flex">
          <div className="bg-white rounded-xl">
            <p className='text-7xl p-4'> {icon}</p>
          </div>
        </div>
        <div className="vertical"></div>
        <div className="content font-bold">
          <h2 className='text-[10px] sm:text-[18px] ml-[24px] sm:ml-[-20px] text-[#565656] uppercase'>{title}</h2>
          <h1 className={` text-[25px] ${text} ml-[24px] sm:ml-[-20px] text-[#565656]`}>{persentase} <span className='font-bold'>Coupon</span></h1>
          <p className='font-bold max-w-[10rem] w-full text-[#696969] ml-[24px] sm:ml-[-20px]'>{date}</p>
        </div>
      </div>
      <div className="copy-button">
        <input id="copyvalue" type="text" className='p-2 text-center pr-8 font-bold text-black' readOnly value={point} />
        <button onClick={ClaimReward} className="copybtn">CLAIM</button>
      </div>
      
    </div>
    {claimStatus && <p className="claim-status bg-green-400 px-2 py-2 text-white text-xl absolute bottom-2 right-1">{claimStatus}</p>} {/* Menampilkan status klaim */}
    {copyStatus && <p className="claim-status bg-red-400 px-2 py-2 text-white text-xl absolute bottom-2 right-1">{copyStatus}</p>} {/* Menampilkan status klaim */}
    </>
  );
};

export default Voucher;
