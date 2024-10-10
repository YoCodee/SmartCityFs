import React from 'react'
import './CardDash.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faCoins)
function CardDashboard({Title1, icon, TitleAtas, bgColor}) {
  return (
    <div className="relative">
       
    <div className='box1 w-72 px-2  relative bg-white  py-2 rounded-xl'>
        <div className="flex justify-between">
        <div className={`box1 absolute px-6 py-4 left-6 rounded-xl text-white ${bgColor} top-[-25px]`}>
            <FontAwesomeIcon icon={icon} className='text-2xl'/>
        </div>
        <div className="flex w-full justify-end pr-8 py-6">
            <div className="flex flex-col">
            <h1 className='text-md font-light'>{TitleAtas}</h1>
            <h1 className='text-2xl font-bold'>{Title1}</h1>
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default CardDashboard