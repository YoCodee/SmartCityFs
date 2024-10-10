import React, { useState } from 'react';
import CardService from '../Components/CardService/CardService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';

library.add(faArrowLeft);

const ServicesPage = () => {
  const services = [
    {
      title: 'Perbaikan Jalan',
      subtitle: 'Ayo Cari Jalan yang mau di Perbaiki!',
      points: '25 Points',
      tata: [
        'Pastikan Kamu Sudah login',
        'Carilah Jalan Yang Rusak Di Sekitar Kotamu',
        'Pastikan itu Bukan Gambar dari Google Karena akan di Cek',
        'Jika sudah Kirim, maka tinggal menunggu persetujuan dari admin',
        'Jika di terima maka point akan otomatis masuk ke Akun kamu 🤗🤗',
      ],
      link: '/addJalan',
      className1: 'text-blue-500',
      className: 'border-blue-500',
      className2: 'bg-white border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
    },
    {
      title: 'Buang SampahMu',
      subtitle: 'Ayo berlomba lomba Buang Sampahmu!',
      points: '25 Points',
      tata: [
        'Pastikan Kamu Sudah login',
        'Kumpulkan Sampahmu yang ingin dibuang',
        'Pilih Kategori Sampah mu di Form Pembuangan',
        'Jika sudah Kirim, maka tinggal menunggu persetujuan dari admin',
        'Jika di terima maka point akan otomatis masuk ke Akun kamu 🤗🤗',
      ],
      link: '/addPembuangan',
      className1: 'text-blue-500',
      className: 'border-blue-500',
      className2: 'bg-white border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
    },
    {
      title: 'Inovasi',
      subtitle: 'Ayo Tuangkan Ide mu untuk Kotamu!',
      points: '50 Points',
      tata: [
        'Pastikan Kamu Sudah login',
        'kirimkan beberapa Ide Inovasi mu untuk Kami',
        'Pastikan Inovasi adalah hasil dari kreativitasmu sendiri',
        'Jika sudah Kirim, maka tinggal menunggu persetujuan dari admin',
        'Jika di terima maka point akan otomatis masuk ke Akun kamu 🤗🤗',
      ],
      link: '/addInovasi',
      className1: 'text-[#4e656f]',
      className: 'border-[#4e656f]',
      className2: 'bg-white border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white',
    },
    {
      title: 'Cari Penjahat',
      subtitle: 'Ayo Cari Penjahat di Kotamu!',
      points: '50 Points',
      tata: [
        'Pastikan Kamu Sudah login',
        'Pastikan kamu hati hati saat proses penangkapan',
        'Foto penjahat dan simpan lalu kirimkan ke admin',
        'Jika sudah Kirim, maka tinggal menunggu persetujuan dari admin',
        'Jika di terima maka point akan otomatis masuk ke Akun kamu 🤗🤗',
      ],
      link: '/addPenangkapan',
      className1: 'text-[#4e656f]',
      className: 'border-[#4e656f]',
      className2: 'bg-white border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white',
    },
    {
      title: 'Event',
      subtitle: 'Kumpulkan Temanmu dan Buat Eventmu!',
      points: '100 Points',
      tata: [
        'Pastikan Kamu Sudah login',
        'Pastikan idemu tidak mengandung unsur Sara dan pornografi',
        'Pastikan itu Ide adalah milikmu sendiri',
        'Jika sudah Kirim, maka tinggal menunggu persetujuan dari admin',
        'Jika di terima maka point akan otomatis masuk ke Akun kamu 🤗🤗',
      ],
      link: '/addEvent',
      className1: 'text-[#ffbd59]',
      className: 'border-[#ffbd59]',
      className2: 'bg-white border-[#ffbd59] text-[#ffbd59] hover:bg-[#ffbd59] hover:text-white',
    },
    {
      title: 'Sukarelawan',
      subtitle: 'Ayo jadi Sukarelawan untuk Kotamu!',
      points: '25 Points',
      tata: [
        'Pastikan Kamu Sudah login',
        'Carilah Jalan Yang Rusak Di Sekitar Kotamu',
        'Pastikan itu Bukan Gambar dari Google Karena akan di Cek',
        'Jika sudah Kirim, maka tinggal menunggu persetujuan dari admin',
        'Jika di terima maka point akan otomatis masuk ke Akun kamu 🤗🤗',
      ],
      link: '/addVoulenter',
      className1: 'text-[#ffbd59]',
      className: 'border-[#ffbd59]',
      className2: 'bg-white border-[#ffbd59] text-[#ffbd59] hover:bg-[#ffbd59] hover:text-white',
    },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentServices = services.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="pt-2">
      <div className="Title flex justify-center items-center flex-col mb-4">
        <h1 className='text-3xl font-bold'>Ayo Kerjakan Tugas untuk <span className='text-[#ffbd0e]'>kotamu!</span></h1>
      </div>
      <div className='flex flex-wrap gap-5 max-w-6xl w-full items-center mx-auto justify-center'>
        {currentServices.map((service, index) => (
          <CardService 
            key={index}
            className2={service.className2} 
            link={service.link}
            className1={service.className1}
            className={service.className}
            title={service.title} 
            subtitle={service.subtitle} 
            points={service.points}
            tata1={service.tata[0]}
            tata2={service.tata[1]}
            tata3={service.tata[2]}
            tata4={service.tata[3]}
            tata5={service.tata[4]}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={handlePrev} disabled={currentPage === 1} className="btn-prev">
          Prev
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages} className="btn-next">
          Next
        </button>
      </div>
    </div>
  );
}

export default ServicesPage;
