"use client"

import React, { useState } from 'react';
import DaftarProposal from '../../../../components/usulan/proposal/CreateProposal';
import DaftarAnggota from '../../../../components/usulan/anggota/ListAnggota';
import LogbookForm from '@/app/components/usulan/Logbook';
import Evaluations from '@/app/components/usulan/Evaluations';
import MainLayout from '@/app/components/layouts/MainLayout';
import Overview from '@/app/components/overview/Overview';

const ProposalDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState('proposal');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'proposal':
        return <DaftarProposal />;
      case 'anggota':
        return <DaftarAnggota />;
      case 'biaya':
        return <div>biaya</div>;
      case 'logbook':
        return <LogbookForm />;
      case 'luaran':
        return <div>Luaran</div>;
      case 'dokumen-tambahan':
        return <div>Dokumen Tambahan</div>;
      case 'laporan-akhir':
        return <div>Laporan Akhir</div>;
      case 'evaluasi':
        return <Evaluations />;
      default:
        return <DaftarProposal />;
    }
  };

  return (
    <MainLayout role={'dosen'}>
      <nav className="text-sm text-gray-600 mb-4">
        Usulan {'>'} Pengmas {'>'} Detail Usulan
      </nav>
      <div className="bg-white shadow rounded-lg py-6">
        <div className="mb-4 flex justify-between items-center border-b px-6">
          <div className="flex space-x-4 justify-between w-full">
            <button className={`py-2 border-b-2 font-semibold ${activeTab === 'overview' ? 'border-[#132963] text-[#132963]' : 'text-gray-600'}`} onClick={() => setActiveTab('overview')}>
              Overview
            </button>
            <button className={`py-2 border-b-2 font-semibold ${activeTab === 'proposal' ? 'border-[#132963] text-[#132963]' : 'text-gray-600'}`} onClick={() => setActiveTab('proposal')}>
              Proposal
            </button>
            <button className={`py-2 border-b-2 font-semibold ${activeTab === 'anggota' ? 'border-[#132963] text-[#132963]' : 'text-gray-600'}`} onClick={() => setActiveTab('anggota')}>
              Anggota
            </button>
            <button className={`py-2 border-b-2 font-semibold ${activeTab === 'biaya' ? 'border-[#132963] text-[#132963]' : 'text-gray-600'}`} onClick={() => setActiveTab('biaya')}>
              Biaya
            </button>
            <button className={`py-2 border-b-2 font-semibold ${activeTab === 'luaran' ? 'border-[#132963] text-[#132963]' : 'text-gray-600'}`} onClick={() => setActiveTab('luaran')}>
              Luaran
            </button>
            <button className={`py-2 border-b-2 font-semibold ${activeTab === 'logbook' ? 'border-[#132963] text-[#132963]' : 'text-gray-600'}`} onClick={() => setActiveTab('logbook')}>
              Logbook
            </button>
            <button className={`py-2 border-b-2 font-semibold ${activeTab === 'dokumen-tambahan' ? 'border-[#132963] text-[#132963]' : 'text-gray-600'}`} onClick={() => setActiveTab('dokumen-tambahan')}>
              Dokumen Tambahan
            </button>
            <button className={`py-2 border-b-2 font-semibold ${activeTab === 'laporan-akhir' ? 'border-[#132963] text-[#132963]' : 'text-gray-600'}`} onClick={() => setActiveTab('laporan-akhir')}>
              Laporan Akhir
            </button>
            <button className={`py-2 border-b-2 font-semibold ${activeTab === 'evaluasi' ? 'border-[#132963] text-[#132963]' : 'text-gray-600'}`} onClick={() => setActiveTab('evaluasi')}>
              Evaluasi
            </button>
          </div>
        </div>
        {renderContent()}
      </div>
    </MainLayout>
  );
};

export default ProposalDetail;
