'use client';

import React, { useEffect } from 'react';
import { MantineProvider, MantineThemeOverride, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Sidebar from './Sidebar';
import Header from './Header';

const theme: MantineThemeOverride = {};

interface MainLayoutProps {
  role: string;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ role, children }) => {
  const [opened, { toggle, close }] = useDisclosure(true);
  const mantineTheme = useMantineTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= parseFloat(mantineTheme.breakpoints.sm) * 16) {
        close();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [close, toggle, mantineTheme.breakpoints.sm]);

  return (
    <MantineProvider theme={theme}>
      <div className="flex w-full">
        <Sidebar role={role} opened={opened} toggle={toggle} close={close} />
        <div className={`transition-all duration-500 ${opened ? 'ml-64' : 'ml-16'} flex-1`}>
          <Header />
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </MantineProvider>
  );
};

export default MainLayout;
