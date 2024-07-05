"use client";

import React, { useEffect, useState } from 'react';
import DaftarProposal from '../../../../components/usulan/proposal/CreateProposal';
import DaftarAnggota from '../../../../components/usulan/anggota/ListAnggota';
import LogbookForm from '@/app/components/usulan/Logbook';
import Evaluations from '@/app/components/usulan/Evaluations';
import MainLayout from '@/app/components/layouts/MainLayout';
import Overview from '@/app/components/usulan/overview/Overview';
import axios from 'axios';
import LoadingPage from '@/app/components/usulan/LoadingPage';
import { Tabs } from '@mantine/core';
import DokumenTambahan from '@/app/components/usulan/DokumenTambahan';

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
  const [activeTab, setActiveTab] = useState<string | null>('overview');
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const [members, setMembers] = useState<Member[]>([]);
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
        return <Overview role={role ?? ''} />;
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
        return <DokumenTambahan />;
      case 'laporan-akhir':
        return <div>Laporan Akhir</div>;
      case 'evaluasi':
        return <Evaluations />;
      default:
        return <Overview role={role ?? ''} />;
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
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List grow>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="proposal">Proposal</Tabs.Tab>
            <Tabs.Tab value="anggota">Anggota</Tabs.Tab>
            <Tabs.Tab value="biaya">Biaya</Tabs.Tab>
            <Tabs.Tab value="luaran">Luaran</Tabs.Tab>
            <Tabs.Tab value="logbook">Logbook</Tabs.Tab>
            <Tabs.Tab value="dokumen-tambahan">Dokumen Tambahan</Tabs.Tab>
            <Tabs.Tab value="laporan-akhir">Laporan Akhir</Tabs.Tab>
            <Tabs.Tab value="evaluasi">Evaluasi</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview">
            {renderContent()}
          </Tabs.Panel>
          <Tabs.Panel value="proposal">
            {renderContent()}
          </Tabs.Panel>
          <Tabs.Panel value="anggota">
            {renderContent()}
          </Tabs.Panel>
          <Tabs.Panel value="biaya">
            {renderContent()}
          </Tabs.Panel>
          <Tabs.Panel value="luaran">
            {renderContent()}
          </Tabs.Panel>
          <Tabs.Panel value="logbook">
            {renderContent()}
          </Tabs.Panel>
          <Tabs.Panel value="dokumen-tambahan">
            {renderContent()}
          </Tabs.Panel>
          <Tabs.Panel value="laporan-akhir">
            {renderContent()}
          </Tabs.Panel>
          <Tabs.Panel value="evaluasi">
            {renderContent()}
          </Tabs.Panel>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ProposalDetail;
