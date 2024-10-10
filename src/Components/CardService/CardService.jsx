import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Link } from 'react-router-dom'
library.add(faCircleCheck)
const CardService = ({className, link, className1,className2,title, subtitle, points,tata1,tata2,tata3,tata4,tata5}) => {
  return (
    <div className={`flex bg-white px-5 py-4 flex-col w-max border-2 gap-1 ${className}  rounded-xl shadow-xl`}>
        
        <div className="  border-b-2 pb-7 flex flex-col gap-3">
        <div className="title">
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-sm'>{subtitle}</p>
        </div>
        <div className="sub-Title">
            <h2 className='text-2xl font-bold'> Get <span className={`${className1}`}>{points}</span> </h2>
        </div>
        <Link to={link} className={` ${className2 } w-full bg-white py-3 text-center  border-2  rounded-2xl  `}>
           Kerjakan Tugasnya !
        </Link>
        </div>
        <div className="list ">
            <h1 className='text-center mb-2'>Tata Cara Mengerjakan</h1>
            <ol className='max-w-[18rem]'>
                <li className='text-sm'><FontAwesomeIcon icon={faCircleCheck} className='text-xs mr-2 '/>{tata1}</li>
                <li className='text-sm'><FontAwesomeIcon icon={faCircleCheck} className='text-xs mr-2 '/>{tata2}</li>
                <li className='text-sm'><FontAwesomeIcon icon={faCircleCheck} className='text-xs mr-2 '/>{tata3} </li>
                <li className='text-sm'><FontAwesomeIcon icon={faCircleCheck} className='text-xs mr-2 '/>{tata4} </li>
                <li className='text-sm'><FontAwesomeIcon icon={faCircleCheck} className='text-xs mr-2 '/>{tata5} </li>
            </ol>
        </div>
    </div>
  )
}

export default CardService