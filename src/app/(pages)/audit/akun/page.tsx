'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs } from '@mantine/core';
import MainLayout from '@/app/components/layouts/MainLayout';
import DaftarResearchGroup from '@/app/components/audit/ListRG';
import DaftarProgramStudi from '@/app/components/audit/ListProdi';
import LoadingPage from '@/app/components/usulan/LoadingPage';
import DaftarDosen from '@/app/components/audit/ListDosen';

const AkunPage: React.FC = () => {
  const [researchGroups, setResearchGroups] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [dosens, setDosens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGroups = await axios.get('/api/rg');
        const responsePrograms = await axios.get('/api/prodi');
        const responseDosen = await axios.get('/api/dosen');
        setResearchGroups(responseGroups.data);
        setPrograms(responsePrograms.data);
        setDosens(responseDosen.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <MainLayout>
      <nav className="text-sm text-gray-600 mb-4">
        Audit {'>'} Akun
      </nav>
      <Tabs defaultValue="researchGroup" variant="outline" radius="md">
        <Tabs.List grow>
          <Tabs.Tab value="researchGroup">Research Group</Tabs.Tab>
          <Tabs.Tab value="programStudi">Program Studi</Tabs.Tab>
          <Tabs.Tab value="dosen">Dosen</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="researchGroup" pt="xs">
          <DaftarResearchGroup researchGroups={researchGroups} />
        </Tabs.Panel>

        <Tabs.Panel value="programStudi" pt="xs">
          <DaftarProgramStudi programs={programs} />
        </Tabs.Panel>

        <Tabs.Panel value="dosen" pt="xs">
          <DaftarDosen dosenList={dosens} />
        </Tabs.Panel>
      </Tabs>
    </MainLayout>
  );
};

export default AkunPage;
