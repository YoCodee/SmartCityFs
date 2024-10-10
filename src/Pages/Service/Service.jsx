import React from 'react'
import './Service.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoad } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import Kota from '/images/Untitled design (23).png'
import Penjahat from '/images/Untitled design (24).png'


// Tambahkan icon ke library
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faRoad, faTrashCan, faListCheck,faCalendarDays)
import CardServices from '../../Components/Card/CardServices'

const Service = () => {
  return (
    <div className='w-full '>
        <div className="bg mx-auto max-w-[90rem] min-h-[40rem] rounded-3xl p-16">
        <div className="flex-col flex justify-center items-center text-white ">
            <h1 className='font-bold text-5xl mb-2'>SERVICE</h1> 


            <p className='text-center text-lg max-w-6xl'>Kami berkomitmen untuk menciptakan kota yang cerdas, inklusif, dan berkelanjutan dengan melibatkan warga dalam proses pengambilan keputusan dan inovasi kota. Berikut adalah kegiatan yang dapat kami lakukan</p>
        </div>

        <div className="flex mx-auto gap-5 justify-center pl-10 pt-5 max-w-6xl flex-wrap">
      <CardServices
        classname="bg-[#f6f4e7] "
        title={<FontAwesomeIcon icon={faRoad} className="text-black" />}
        description="Ayo Temukan Jalan yang Rusak di Kotamu, lalu kerjakan Misi sampai akhir Semangat !! 🙌🙌"
      />
      <CardServices
        classname="bg-[#f6f4e7]"
        title={<FontAwesomeIcon icon={faTrashCan} className="text-black" />}
        description="Mau ketika Buang sampah tapi malah Untung? Gunakan Smart Trash lalu tukarkan dengan Points.😁😁 "
      />
      <CardServices
        classname="bg-[#4e656f] text-white"
        title={<FontAwesomeIcon icon={faListCheck} className="text-white" />}
        description="Punya Kreatifitas Lebih ? Tuangkan idemu di Website ini !! 😍😍"
      />
      <CardServices
        classname="bg-[#fdc93f]"
        title={<FontAwesomeIcon icon={faCalendarDays} className="text-black" />}
        description="Ayo Buat Eventmu dengan bantuan Website ini !! ✔️✔️"
      />
      <CardServices
        classname="bg-[#4e656f] text-white"
        image={Penjahat}
        description="Cari Penjahat di sekitar Kotamu , Jika ketemu maka dapat ditukarkan dengan Uang loh !! 😶‍🌫️😶‍🌫️"
      />
      <CardServices
        classname="bg-[#fdc93f]"
        image={Kota}
        description="Mau menjadi Pekerja untuk membangun Kota kamu? Jadilah Voulenter dan dapat keuntungannya!! 🤗🤗"
      />
    </div>
        </div>
    </div>
  )
}

export default Service