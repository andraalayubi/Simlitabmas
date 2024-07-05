'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs } from '@mantine/core';
import MainLayout from '@/app/components/layouts/MainLayout';
import DaftarTahun from '@/app/components/audit/ListTahun';
import RekapProgress from '@/app/components/audit/RekapProgress';
import LoadingPage from '@/app/components/usulan/LoadingPage';

const TahunPage: React.FC = () => {
  const [tahunList, setTahunList] = useState([]);
  const [usulans, setUsulans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTahun = await axios.get('/api/tahun');
        const responseUsulans = await axios.get('/api/rekap_progress');
        setTahunList(responseTahun.data);
        setUsulans(responseUsulans.data);
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
        Audit {'>'} Tahun
      </nav>
      <div className='max-w-screen'>
      <Tabs color="rgba(19, 41, 99, 1)" defaultValue="tahun" radius="md" keepMounted={false}>
        <Tabs.List grow className="flex flex-wrap">
          <Tabs.Tab value="tahun" className="whitespace-nowrap">Tahun</Tabs.Tab>
          <Tabs.Tab value="rekapProgress" className="whitespace-nowrap">Rekap Progress</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="tahun" pt="xs">
          <div className="overflow-x-auto">
            <DaftarTahun tahunList={tahunList} />
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="rekapProgress" pt="xs">
          <div className="overflow-x-auto">
            <RekapProgress usulans={usulans} />
          </div>
        </Tabs.Panel>
      </Tabs>
      </div>
    </MainLayout>
  );
};

export default TahunPage;
