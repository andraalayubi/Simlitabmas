'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs } from '@mantine/core';
import MainLayout from 'src/components/layouts/MainLayout';
import DaftarResearchGroup from 'src/components/audit/ListRG';
import DaftarProgramStudi from 'src/components/audit/ListProdi';
import LoadingPage from 'src/components/usulan/LoadingPage';
import DaftarDosen from 'src/components/audit/ListDosen';

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
    <>
      <nav className="text-sm text-gray-600 mb-4">
        Audit {'>'} Akun
      </nav>
      <div className='max-w-screen'>
        <Tabs color="rgba(19, 41, 99, 1)" defaultValue="researchGroup" radius="md" keepMounted={false}>
          <Tabs.List grow className="flex flex-wrap">
            <Tabs.Tab value="researchGroup" className="whitespace-nowrap">Research Group</Tabs.Tab>
            <Tabs.Tab value="programStudi" className="whitespace-nowrap">Program Studi</Tabs.Tab>
            <Tabs.Tab value="dosen" className="whitespace-nowrap">Dosen</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="researchGroup" pt="xs">
            <div className="overflow-x-auto">
              <DaftarResearchGroup researchGroups={researchGroups} />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="programStudi" pt="xs">
            <div className="overflow-x-auto">
              <DaftarProgramStudi programs={programs} />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="dosen" pt="xs">
            <div className="overflow-x-auto">
              <DaftarDosen dosenList={dosens} />
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>

    </>
  );
};

export default AkunPage;
