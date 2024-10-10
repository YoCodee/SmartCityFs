import React, { useState } from 'react';
import PerbaikanTables from './Tables/PerbaikanTables';
import PembuanganTable from './Tables/PembuanganTable';
import PenangkapanTable from './Tables/PenangkapanTable';
import InovasiTable from './Tables/Inovasi';
import EventTable from './Tables/Event';
import RelawanTable from './Tables/RelawanTable';

const AdminPage = () => {
  const tables = [
    <PerbaikanTables key="perbaikan" />,
    <PembuanganTable key="pembuangan" />,
    <PenangkapanTable key="penangkapan" />,
    <InovasiTable key="inovasi" />,
    <EventTable key="event" />,
    <RelawanTable key="relawan" />,
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const totalPages = Math.ceil(tables.length / itemsPerPage);

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

  const currentTable = tables[currentPage - 1];

  return (
    <div className="container flex flex-col mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Page Management</h1>
      {currentTable}
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
};

export default AdminPage;
