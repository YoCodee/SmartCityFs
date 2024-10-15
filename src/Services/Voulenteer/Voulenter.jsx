import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Voulenter() {
  const { user, token } = useSelector((state) => state.auth);
  const [perbaikanData, setPerbaikanData] = useState([]); // State untuk laporan perbaikan
  const [inovasiData, setInovasiData] = useState([]); // State untuk laporan inovasi
  const [penangkapanData, setPenangkapanData] = useState([]); // State untuk laporan penangkapan
  const [pembuanganData, setPembuanganData] = useState([]); // State untuk laporan pembuangan
  const [perbaikanJalanData, setPerbaikanJalanData] = useState([]); // State untuk laporan perbaikan jalan
  const [message, setMessage] = useState(''); // State untuk pesan sukses/gagal

  // Fungsi untuk mengambil data laporan
  const fetchPerbaikan = async () => {
    try {
      const res = await axios.get(`https://web-city-server.vercel.app/api/perbaikan`);
      return res.data; // Mengembalikan data
    } catch (error) {
      console.error('Error fetching Perbaikan:', error);
      return []; // Mengembalikan array kosong jika error
    }
  };

  const fetchInovasi = async () => {
    try {
      const res = await axios.get(`https://web-city-server.vercel.app/api/inovasi`);
      return res.data;
    } catch (error) {
      console.error('Error fetching Inovasi:', error);
      return [];
    }
  };

  const fetchPembuanganSampah = async () => {
    try {
      const res = await axios.get(`https://web-city-server.vercel.app/api/pembuangan`);
      return res.data;
    } catch (error) {
      console.error('Error fetching Pembuangan Sampah:', error);
      return [];
    }
  };

  const fetchPenangkapan = async () => {
    try {
      const res = await axios.get(`https://web-city-server.vercel.app/api/penangkapan`);
      return res.data;
    } catch (error) {
      console.error('Error fetching Penangkapan:', error);
      return [];
    }
  };

 

  // Mengambil semua data dalam useEffect
  useEffect(() => {
    const fetchAllData = async () => {
      if (user) {
        try {
          // Memanggil semua API secara bersamaan
          const [perbaikan, inovasi, penangkapan, pembuangan, perbaikanJalan] = await Promise.all([
            fetchPerbaikan(),
            fetchInovasi(),
            fetchPenangkapan(),
            fetchPembuanganSampah(),
      
          ]);

          // Menyimpan data masing-masing ke dalam state
          setPerbaikanData(perbaikan);
          setInovasiData(inovasi);
          setPenangkapanData(penangkapan);
          setPembuanganData(pembuangan);
          setPerbaikanJalanData(perbaikanJalan);
        } catch (error) {
          console.error("Error fetching data:", error);
          setMessage("Gagal mengambil data laporan");
        }
      }
    };

    fetchAllData();
  }, [user]);

  // Fungsi untuk membuat task berdasarkan laporan yang dipilih
  const createTask = async (reportId, reportType) => {
    try {
      const response = await axios.post('https://web-city-server.vercel.app/api/create-task', {
        user: user._id,
        reportId,
        reportType,

      }
      ,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setMessage(response.data.message);
      console.log(response.data) // Tampilkan pesan sukses
    } catch (error) {
      console.log(error)
      setMessage(error.response?.data?.message || 'Gagal membuat task'); // Pesan error
    }
  };
  const approvedReports = penangkapanData.filter((report) => report.status === 'Approved');
  const approvedReports1 = perbaikanData.filter((report) => report.status === 'Approved');
  const approvedReports2 = pembuanganData.filter((report) => report.status === 'Approved');
  const approvedReports3 = inovasiData.filter((report) => report.status === 'Approved');

  return (
    <div className="container mx-auto p-4 pt-28">
      <h2 className="text-2xl font-bold mb-4">Daftar Task Perbaikan Jalan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {perbaikanData.length > 0 ? (
  approvedReports1.length > 0 ? (
    approvedReports1.map((report) => (
      <div key={report._id} className="bg-white shadow-md rounded-lg overflow-hidden">
        {report.images && report.images.length > 0 ? (
          <img
            src={report.images[0]}
            alt={report.description}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span>Tidak ada gambar</span>
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{report.description}</h3>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Kerusakan:</strong> {report.kerusakan}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Lokasi:</strong> {report.lokasi}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Status:</strong> {report.status}
          </p>
          <button
            onClick={() => createTask(report._id, 'Perbaikan')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4 transition duration-300"
          >
            Buat Task
          </button>
        </div>
      </div>
    ))
  ) : (
    <p>Belum ada laporan yang Approved</p>
  )
) : (
  <p>Tidak ada laporan penangkapan yang ditemukan</p>
)}
</div>

      {/* Menampilkan data penangkapan */}
      <h2 className="text-2xl font-bold mb-4 mt-8">Data Penangkapan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

    {penangkapanData.length > 0 ? (
      approvedReports.length > 0 ? (
        approvedReports.map((report) => (
          <div key={report._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {report.images && report.images.length > 0 ? (
              <img
                src={report.images[0]}
                alt={report.description}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span>Tidak ada gambar</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{report.description}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Lokasi:</strong> {report.lokasi}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Status:</strong> {report.status}
              </p>
              <button
                onClick={() => createTask(report._id, 'penangkapan')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4 transition duration-300"
              >
                Buat Task
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Belum ada laporan yang Approved</p>
      )
    ) : (
      <p>Tidak ada laporan penangkapan yang ditemukan</p>
    )}

  </div>
   
      {/* Menampilkan data pembuangan */}
      <h2 className="text-2xl font-bold mb-4 mt-8">Data Pembuangan Sampah</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pembuanganData.length > 0 ? (
          approvedReports2.length > 0 ? (
        pembuanganData
        .filter((report) => report.status === 'Approved') // Hanya tampilkan laporan yang statusnya "Approved"
        .map((report) => (
            <div key={report._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              {report.images && report.images.length > 0 ? (
                <img
                  src={report.images[0]}
                  alt={report.description}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span>Tidak ada gambar</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{report.description}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Lokasi:</strong> {report.lokasi}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Status:</strong> {report.status}
                </p>
                <button
                  onClick={() => createTask(report._id, 'PembuanganSampah' )}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4 transition duration-300"
                >
                  Buat Task
                </button>
              </div>
            </div>
              ))
            ) : (
              <p>Belum ada laporan yang Approved</p>
            )
          ) : (
            <p>Tidak ada laporan penangkapan yang ditemukan</p>
          )}
      </div>

      {/* Menampilkan data inovasi */}
      <h2 className="text-2xl font-bold mb-4 mt-8">Data Inovasi</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {inovasiData.length > 0 ? (
          approvedReports3.length > 0 ? (
         inovasiData
         .filter((report) => report.status === 'Approved') // Hanya tampilkan laporan yang statusnya "Approved"
         .map((report) => (
            <div key={report._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              {report.images && report.images.length > 0 ? (
                <img
                  src={report.images[0]}
                  alt={report.description}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span>Tidak ada gambar</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{report.description}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Lokasi:</strong> {report.lokasi}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Status:</strong> {report.status}
                </p>
                <button
                  onClick={() => createTask(report._id, 'Inovasi')}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4 transition duration-300"
                >
                  Buat Task
                </button>
              </div>
              
            </div>
             ))
            ) : (
              <p>Belum ada laporan yang Approved</p>
            )
          ) : (
            <p>Tidak ada laporan penangkapan yang ditemukan</p>
          )}
      </div>

     
    
 
    </div>
  );
}

export default Voulenter;
