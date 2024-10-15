import React, { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import { useSelector } from 'react-redux';

function PenangkapanTable() {
    const { token } = useSelector((state) => state.auth);
    const [tableData, setTableData] = useState([]);

    // Fetch data from backend
    const fetchTable = async () => {
        try {
            const response = await axios.get("https://web-city-server.vercel.app/api/penangkapan");
            return response.data;
            setTableData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    // Approve a report
    const updateBookingStatus = async (reportId) => {
        try {
            const response = await axios.put(`https://web-city-server.vercel.app/api/penangkapan/approve/${reportId}`,{

            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            alert(response.data.message); // Show success message
            fetchTable(); // Refresh the table after approval
        } catch (error) {
            console.error("Error approving report:", error);
            alert("Gagal meng-approve laporan");
        }
    };
    useEffect(() => {
        const fetchData = async () => {
          const data = await fetchTable();
          setTableData(data);
        };
    
        fetchData();
      }, []);
    
      useEffect(() => {
        if (tableData.length) {
          $('#bookingTable').DataTable();
        }
      }, [tableData]);
   
    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Laporan Penangkapan</h1>
        <div className="overflow-x-auto">
            <table id="perbaikanTable" className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="px-4 py-2 text-left text-gray-600">ID</th>
                        <th className="px-4 py-2 text-left text-gray-600">Inisial</th>
                        <th className="px-4 py-2 text-left text-gray-600">Jenis</th>
                        <th className="px-4 py-2 text-left text-gray-600">Lokasi</th>
                        <th className="px-4 py-2 text-left text-gray-600">Waktu</th>
                        <th className="px-4 py-2 text-left text-gray-600">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((report) => (
                        <tr key={report._id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{report._id}</td>
                            <td className="px-4 py-2">{report.Inisial}</td>
                            <td className="px-4 py-2">{report.Jenis}</td>
                            <td className="px-4 py-2">{report.Lokasi}</td>
                            <td className="px-4 py-2">{report.Waktu}</td>
                            <td className="px-4 py-2">
                                {report.status === 'Pending' && (
                                    <button
                                        onClick={() => updateBookingStatus(report._id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Approve
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );

}

export default PenangkapanTable