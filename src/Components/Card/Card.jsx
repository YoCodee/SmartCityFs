import React from 'react'
import Card1 from '/images/Untitled design (20).png'
import Card2 from '/images/Untitled design (21).png'
import Card3 from '/images/Untitled design (22).png'

const Card = () => {
  return (
    <div className='flex-wrap sm:flex'>
        <div className="card1"><img src={Card1} alt="" /></div>
        <div className="card1"><img src={Card2} className='w-[373px]' alt="" /></div>
        <div className="card1"><img src={Card3} alt="" /></div>
    </div>
  )
}

export default Card