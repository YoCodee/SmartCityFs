import React from 'react';
import './CardServices.css'; // Pastikan Anda membuat file CSS ini

const CardServices = ({ title, classname, image, description }) => {
  return (
    <div className={`card-container ${classname}`} >
      <div className="content text-8xl">
        {image && <img src={image} alt="" className="mb-4" />}
        {title}
      </div>
      <div className="description rotate-180 font-bold">{description}</div>
    </div>
  );
};

export default CardServices;
