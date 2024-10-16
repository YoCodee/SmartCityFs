import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
const FAQ = () => {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [data, setData] = useState()

    useEffect(() => {
        axios
        .get('https://web-city-server.vercel.app/api/event')
        .then((res) => {
            setData(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const toggle = () => {
        setOpen(!open);
    }
    const toggle1 = () => {
        setOpen1(!open1);
    }
    const toggle2 = () => {
        setOpen2(!open2);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const monthNames = [
            'Jan', 'Feb', 'marc', 'Apr', 'Mei', 'Juni', 
            'Juli', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
        ];
        const month = monthNames[date.getMonth()]; // Get month name from array
        const year = date.getFullYear();
        return (
            <div>
                <h1 className='text-center text-xl font-bold'>{`${month} ${year}`}</h1>
                <h1 className='text-center text-2xl sm:text-6xl font-bold'>{day}</h1>
            </div>
        );
    };
  return (
    <div className=' bg-[#f1f1f1] pl-5 pt-5 h-screen'>
    <div className="flex flex-wrap h-full gap-7">
        <div className="Box1 flex flex-1 justify-center mt-6">
            <div className="Text1 w-full flex flex-col gap-5">
            <h1 className='text-5xl font-bold text-black underline'>FAQ</h1>

            <button onClick={toggle} className="box1 bg-white w-full rounded-xl px-2 py-2">
            <div className="flex justify-between">
                <h1 className='font-bold'>Apakah Website ini Bisa digunakan Secara Online ?</h1><span><FontAwesomeIcon icon={faArrowDown} /></span>
                </div>
                {
                    open ? (
                        <div className="flex">
                        <h1>Tentu Website ini berbasis Online dan sudah terhubung dengan Database pemerintah Masih Daerah.</h1>
                        </div>
                    ) :(
                        null
                )
                }
            </button>
            <button onClick={toggle1} className="box1 bg-white w-full rounded-xl px-2 py-2">
            <div className="flex justify-between">
                <h1 className='font-bold'>Apakah website ini masih tahap pembuatan ?</h1><span><FontAwesomeIcon icon={faArrowDown} /></span>
                </div>
                {
                    open1 ? (
                        <div className="flex">
                        <h1>Iya Website ini hanya Website pembuatan belum masuk tahap development </h1>
                        </div>
                    ) :(
                        null
                )
                }
            </button>
            <button onClick={toggle2} className="box1 bg-white w-full rounded-xl px-2 py-2">
            <div className="flex justify-between">
                <h1 className='font-bold'>Apakah bisa membuat Task seblum Login ?</h1><span><FontAwesomeIcon icon={faArrowDown} /></span>
                </div>
                {
                    open2 ? (
                        <div className="flex">
                        <h1>Tidak , tentu kamu harus Login terlebih dahulu</h1>
                        </div>
                    ) :(
                        null
                )
                }
            </button>
            
            </div>
        </div>
        <div className="Box2 flex flex-wrap flex-1 h-full ">
            <div className="flex flex-wrap ">
                <h1 className='text-3xl font-bold my-3 pl-5 text-black underline'>Agenda</h1>
            </div>
            <div className=" px-5 w-full h-full text-white font-bold  flex p-4 flex-col gap-5 ">
            {data?.slice(0, 3).map((item) => (
                            <div key={item?.id} className="flex flex-wrap w-full border-b-2">
                                <div className="box100 bg-[#145593] px-4 py-4 w-32 rounded-xl mb-2">
                                    {/* Menggunakan formatDate untuk menampilkan tanggal */}
                                    {formatDate(item?.date)}
                                </div>
                                <div className="flex py-4 pl-2">
                                    <h1 className='text-[#9d9d9d]'>{item?.title}</h1>
                                </div>
                            </div>
                        ))}
                
               
               
            </div>
        </div>
    </div>
</div>
  )
}

export default FAQ