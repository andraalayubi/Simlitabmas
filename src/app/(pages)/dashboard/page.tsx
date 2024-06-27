import React from 'react';
import MainLayout from '@/app/components/layouts/MainLayout';
import Dashboard from '../../components/Dashboard';

const Home: React.FC = () => {
  return (
    <MainLayout role="dosen">
      <Dashboard />
    </MainLayout>
  );
};

export default Home;
