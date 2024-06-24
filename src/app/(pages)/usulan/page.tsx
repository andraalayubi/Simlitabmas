"use client"

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import DaftarProposal from '../../components/usulan/proposal/CreateProposal';
import DaftarAnggota from '../../components/usulan/ListAnggota';

const ProposalDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState('proposal');

  const renderContent = () => {
    switch (activeTab) {
      case 'proposal':
        return <DaftarProposal />;
      case 'anggota':
        return <DaftarAnggota />;
      // Tambahkan case lain untuk tab lainnya
      default:
        return <DaftarProposal />;
    }
  };

  return (
    <div className="flex w-screen">
      <Sidebar role="dosen" />
      <div className="ml-64 flex-1">
        <Header />
        <div className="p-4">
          <nav className="text-sm text-gray-600 mb-4">
            Usulan {'>'} Pengmas {'>'} Detail Usulan
          </nav>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="mb-4 flex justify-between items-center border-b">
              <div className="flex space-x-4">
                <button className={`px-4 py-2 border-b-2 font-semibold ${activeTab === 'proposal' ? 'border-[#132963] text-[#132963]' : 'text-gray-600'}`} onClick={() => setActiveTab('proposal')}>
                  Proposal
                </button>
                <button className={`px-4 py-2 border-b-2 font-semibold ${activeTab === 'anggota' ? 'border-[#132963] text-[#132963]' : 'text-gray-600'}`} onClick={() => setActiveTab('anggota')}>
                  Anggota
                </button>
                {/* Tambahkan tombol lain untuk tab lainnya */}
              </div>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;
