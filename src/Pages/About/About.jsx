import React from 'react'
import Card from '../../Components/Card/Card'

const About = () => {
  return (
    <div className='pt-52 z-50'>
        <div className="flex-col flex justify-center items-center">
            <h1 className='font-bold text-3xl mb-2'>About Us</h1>
            <p className='text-center text-lg max-w-6xl'>Selamat datang di SmartCity Hub, sebuah platform yang didedikasikan untuk mendorong transformasi kota melalui integrasi teknologi canggih dan praktik berkelanjutan. Misi kami adalah menciptakan kota yang lebih cerdas dan berkelanjutan guna meningkatkan kualitas hidup bagi semua warga.</p>
        </div>
       <div className="flex justify-center items-centerw-full mx-auto mt-8">
       <Card/>
       </div>
     
    </div>
  )
}

export default About