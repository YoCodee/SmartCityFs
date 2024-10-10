import React from 'react'
import Voucher from '../../Components/Voucher/Voucher'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { faHospital } from '@fortawesome/free-solid-svg-icons'
import { faBus } from '@fortawesome/free-solid-svg-icons'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faShoppingBag,faBolt,faHospital,faFilm,faGraduationCap)

const VoucherPage = () => {
  return (
    <div className='bg-white px-5 pb-24 '>
      <div className="flex justify-center items-center ">
        <h1 className='text-4xl font-bold  py-2 '>Voucher</h1>
      </div>
      <div className="flex gap-12 flex-wrap justify-center">
      <Voucher 
        className="bg-yellow-400 w-[450px]" 
          text="sm:text-[35px]"
        icon={<FontAwesomeIcon icon={faShoppingBag} 
        className="text-black" />}
        title="Voucher Belanja"
        persentase="10%"
        date="30 Desember 2024"
        point="100 Point"
      />
      <Voucher 
        className="bg-red-400 w-[450px]"
        text="sm:text-[35px]"  
        icon={<FontAwesomeIcon icon={faBolt} 
        className="text-black"/>}
        title="Voucher Token Listrik"
        persentase="20%"
        date="30 Desember 2024"
        point="150 Point"
      />
      <Voucher 
        className="bg-green-400 w-[450px]"
                  text="sm:text-[35px]"
        icon={<FontAwesomeIcon icon={faBus} 
        className="text-black"/>}
        title="Voucher Transportasi"
        persentase="50%"
        date="30 Desember 2024"
        point="250 Point"
      />
      <Voucher 
        className="bg-purple-400 w-[450px]"
                  text="sm:text-[35px]"
        icon={<FontAwesomeIcon icon={faFilm} 
        className="text-black"/>}
        title="Voucher Bioskop"
        persentase="50%"
        date="30 Desember 2024"
        point="250 Point"
      />
      <Voucher 
        className="bg-blue-400 w-[450px]"
                  text="sm:text-[35px]"
        icon={<FontAwesomeIcon icon={faHospital} 
        className="text-black"/>}
        title="Voucher Rumah Sakit"
        persentase="60%"
        date="30 Desember 2024"
        point="400 Point"
      />
      <Voucher 
        className="bg-gray-400  w-[450px]"
                  text="sm:text-[35px]"
        icon={<FontAwesomeIcon icon={faGraduationCap} 
        className="text-black"/>}
        title="Sertifikat Top"
        persentase="100%"
        date="30 Desember 2024"
        point="500 Point"
      />
      </div>
    </div>
  )
}

export default VoucherPage