'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '@/app/components/layouts/MainLayout';
import DaftarSkema from '@/app/components/audit/Skema';
import { Skema } from '@/app/types/Interfaces';
import LoadingPage from '@/app/components/usulan/LoadingPage';

const SkemaPage: React.FC = () => {
  const [skemaList, setSkemaList] = useState<Skema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkemaData = async () => {
      try {
        const response = await axios.get('/api/skema');
        setSkemaList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching skema data:', error);
        setLoading(false);
      }
    };

    fetchSkemaData();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <MainLayout>
      <nav className="text-sm text-gray-600 mb-4">
        Audit {'>'} Skema
      </nav>
      <DaftarSkema skemaList={skemaList} />
    </MainLayout>
  );
};

export default SkemaPage;
