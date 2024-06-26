"use client"

import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Dashboard from '../../components/Dashboard';

const Home: React.FC = () => {
  return (
    <div className="flex w-screen">
      <Sidebar role="dosen" />
      <div className="ml-64 flex-1">
        <Header />
        <div className="p-4">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
