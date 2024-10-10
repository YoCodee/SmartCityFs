import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Cardhistory.css"
import { Link } from 'react-router-dom'

function Cardhistory({Title1, icon, TitleAtas, image, className, routes}) {
  return (
    <div className="relative">
       
    <div  className='box1 w-96 px-2  relative bg-white h-60  py-2 rounded-xl'>
        <Link to={routes} className="flex justify-between">
        <div className={`box1 absolute flex justify-center  items-center px-6 py-4 left-6 rounded-xl h-44 right-6  ${className} top-[-25px]`}>
            <FontAwesomeIcon icon={icon} className='text-7xl'/>
            {image && <img src={image} alt="" className="w-24" />}
        </div>
        <div className="flex w-full justify-start pt-40">
            <div className="flex flex-col">
            <h1 className='text-md font-light'>{TitleAtas}</h1>
            <h1 className='text-2xl font-bold'>{Title1}</h1>
            </div>
        </div>
        </Link>
    </div>
    </div>
  )
}

export default Cardhistory