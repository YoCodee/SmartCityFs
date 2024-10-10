import React from 'react'
import { Link } from 'react-router-dom'
import './CardVouln.scss'
function CardVoulenter() {
  return (
    <div className='Card rounded-2xl '>
            <Link to='' className='imageContainer'>
                
                    <img src="/images/Untitled design (22).png" alt="Default" />
              
            </Link>
            <div className="textContainer">
                <h2 className='title'>
                    <Link to=''>asd</Link>
                </h2>
                <p className='address'>
                    <img src="/pin.png" alt="" />
                    <span>Add</span>
                </p>
                <p className='price'>ad</p>
                <div className="bottom">
                    <div className="features">
                        <div className="feature">
                            <img src="/bed.png" alt="" />
                            <span>2 Bedroom</span>
                        </div>
                       
                    </div>
                    
                    
                </div>
            </div>
        </div>
  )
}

export default CardVoulenter