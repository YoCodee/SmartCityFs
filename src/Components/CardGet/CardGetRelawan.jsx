import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Link } from 'react-router-dom';
library.add(faArrowLeft)
function CardGetRelawan({data}) {
  const [items, setItems] = useState([]);

  // Use effect to set items from data when it becomes available
  useEffect(() => {
    if (data) {
      setItems(data); // Set initial data to state when data is available
    }
  }, [data]);

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id)); // Update the state after deletion
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
return (
  <>
  <Link to="/dashboard/profile">
  <FontAwesomeIcon className='text-3xl' icon={faArrowLeft} />
  </Link>
  <div className='flex gap-5'>
        {items && items.length > 0 ? (
      items.map((item) => (
        <div className="flex px-2 py-4 shadow-2xl border-2 border-gray-200 rounded-2xl max-w-3xl" key={item.id}>

      <div className="pr-12 pl-2 gap-6 flex flex-col">
      <h1 className='text-2xl font-black border-b-2 border-black'>Jenis Report : {item.reportType}</h1>
          <div className="flex flex-col h-full">
          <p className='text-md'>Kode Report : {item.report}</p>
          <p className='text-md'>Tanggal Dibuat : {formatDate(item.assignedAt)}</p>
          <p className='text-sm flex items-end'>Tanggal Selesai : {formatDate(item.completedAt)} </p>
          </div>
          {item.status === 'Completed' ? ( 
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

export default CardGetRelawan