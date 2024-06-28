"use client"

import React, { useEffect, useState } from 'react';
import DaftarProposal from '../../../../components/usulan/proposal/CreateProposal';
import DaftarAnggota from '../../../../components/usulan/anggota/ListAnggota';
import LogbookForm from '@/app/components/usulan/Logbook';
import Evaluations from '@/app/components/usulan/Evaluations';
import MainLayout from '@/app/components/layouts/MainLayout';
import Overview from '@/app/components/usulan/overview/Overview';
import axios from 'axios';
import { Loader } from '@mantine/core';
import LoadingPage from '@/app/components/usulan/LoadingPage';

interface Member {
  id: number;
  name: string;
  role: string;
  activityCount: string;
}

interface Proposal {
  title: string;
  abstrak: string;
  latarBelakang: string;
  tujuan: string;
}

const ProposalDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState('proposal');
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState<Proposal>({
    title: '',
    abstrak: '',
    latarBelakang: '',
    tujuan: '',
  });

  //Proposal Handler
  const handleChange = (field: keyof Proposal, value: string) => {
    setProposal((prevProposal) => ({
      ...prevProposal,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/usulan', proposal);
      if (response.status === 201) {
        console.log('Proposal submitted:', response.data);
      }
    } catch (error) {
      console.error('There was an error submitting the proposal!', error);
    }
  };

  //Anggota Handler
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('/api/members');
        setMembers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the members!', error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleAddMember = async (newMember: Omit<Member, 'id' | 'activityCount'>) => {
    const memberWithId = { ...newMember, id: members.length + 1, activityCount: '0' };

    try {
      const response = await axios.post('/api/members', memberWithId);
      if (response.status === 201) {
        setMembers((prevMembers) => [...prevMembers, memberWithId]);
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview role={'dosen'} />;
      case 'proposal':
        return <DaftarProposal proposal={proposal} onChange={handleChange} onSubmit={handleSubmit} />;
      case 'anggota':
        return <DaftarAnggota members={members} onAddMember={handleAddMember} />;
      case 'biaya':
        return <div>biaya</div>;
      case 'luaran':
        return <div>Luaran</div>;
      case 'logbook':
        return <LogbookForm />;
      case 'dokumen-tambahan':
        return <div>Dokumen Tambahan</div>;
      case 'laporan-akhir':
        return <div>Laporan Akhir</div>;
      case 'evaluasi':
        return <Evaluations />;
      default:
        return <Overview role={'dosen'} />;
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <MainLayout>
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
