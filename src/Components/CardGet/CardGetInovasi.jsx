import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Link } from 'react-router-dom';
library.add(faArrowLeft)
function CardGetInovasi({data}) {
  const [items, setItems] = useState([])

  useEffect(() => {
    if (data) {
      setItems(data)
    }
  }, [data])
  return (
    <>
    <Link to="/dashboard/profile">
    <FontAwesomeIcon className='text-3xl' icon={faArrowLeft} />
    </Link>
    <div className='flex gap-5 flex-wrap'>
    {/* Conditional rendering to avoid calling map on undefined */}
    {items && items.length > 0 ? (
      items.map((item) => (
        <div className="flex px-2 py-4 shadow-2xl border-2 border-gray-200 rounded-2xl" key={item.id}>
                
      <div className="pr-12 pl-2 gap-6 flex flex-col">
          <h1 className='text-2xl font-black border-b-2 border-black'>{item.JenisInovasi}</h1>
          <div className="flex flex-col h-full">
            <p className='text-sm'>{item.Description}</p>
          <p className='text-md'>Lama Waktu : {item.LamaWaktu}</p>
          <p className='text-sm flex items-end'>Jumlah Uang : {item.Uang}</p>
          </div>
          {item.status === 'Approved' ? ( 
                     <div className='px-2 py-1 text-center bg-green-600 text-white rounded-md'>{item.status}</div>
          ):(
            <div className='px-2 py-1 text-center bg-blue-600 text-white rounded-md'>{item.status}</div>
          )}
          </div>
         
        </div>
      ))
    ) : (
      <p>No items available</p> // Fallback content when there's no data
    )}
  </div>
  </>
  )
}

export default CardGetInovasi