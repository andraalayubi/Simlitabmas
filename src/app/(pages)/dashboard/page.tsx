"use client"

import React, { useEffect, useState } from 'react';
import MainLayout from '@/app/components/layouts/MainLayout';
import Dashboard from '../../components/Dashboard';
import axios from 'axios';
import LoadingPage from '@/app/components/usulan/LoadingPage';

interface Usulan {
  id: number;
  title: string;
  date: string;
  schema: string;
  dosenPengusul: string;
  prodi: string;
  status: string;
  statusClass: string;
}

const Home: React.FC = () => {
  const [usulan, setUsulan] = useState<Usulan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get('api/usulan');
        setUsulan(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching proposals:', error);
        setLoading(false);
      }
    };

    fetchProposals();
    console.log(usulan);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <MainLayout>
      <Dashboard usulan={usulan} />
    </MainLayout>
  );
};

export default Home;
