'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Burger, useMantineTheme } from '@mantine/core';
import Link from 'next/link';

interface MenuItem {
  name: string;
  icon: string;
  path: string;
}

interface SidebarProps {
  opened: boolean;
  toggle: () => void;
  close: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ opened, toggle, close }) => {
  const pathname = usePathname();
  const theme = useMantineTheme();
  const [role, setRole] = useState<string | null>(null);

  const saveRoleToLocalStorage = ({role}: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', role);
    }
  };
  useEffect(() => {
    saveRoleToLocalStorage({role: 'admin'});
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const adminMenu: MenuItem[] = [
    { name: 'Dashboard', icon: '', path: '/dashboard' },
    { name: 'Penelitian', icon: '', path: '/usulan/penelitian' },
    { name: 'Pengmas', icon: '', path: '/usulan/pengmas' },
    { name: 'Skema', icon: '', path: '/audit/skema' },
    { name: 'Akun', icon: '', path: '/audit/akun' },
    { name: 'Tahun', icon: '', path: '/audit/tahun' },
  ];

  const kaprodiMenu: MenuItem[] = [
    { name: 'Dashboard', icon: '', path: '/dashboard' },
    { name: 'Penelitian', icon: '', path: '/usulan/penelitian' },
    { name: 'Pengmas', icon: '', path: '/usulan/pengmas' },
    { name: 'Pengmas', icon: '', path: '/prodi' },
  ];

  const rgMenu: MenuItem[] = [
    { name: 'Dashboard', icon: '', path: '/dashboard' },
    { name: 'Penelitian', icon: '', path: '/usulan/penelitian' },
    { name: 'Pengmas', icon: '', path: '/usulan/pengmas' },
    { name: 'Penelitian', icon: '', path: '/rg' },
  ];

  const dosenMenu: MenuItem[] = [
    { name: 'Dashboard', icon: '', path: '/dashboard' },
    { name: 'Penelitian', icon: '', path: '/usulan/penelitian' },
    { name: 'Pengmas', icon: '', path: '/usulan/pengmas' },
  ];

  const getMenuItems = (role: string): MenuItem[] => {
    switch (role) {
      case 'admin':
        return adminMenu;
      case 'rg':
        return rgMenu;
      case 'kaprodi':
        return kaprodiMenu;
      default:
        return dosenMenu;
    }
  };

  const menuItems = getMenuItems(role ?? '');

  const getSectionTitle = (): string => {
    switch (role) {
      case 'admin':
        return 'AUDIT';
      case 'rg':
        return 'RESEARCH GROUP';
      case 'kaprodi':
        return 'PRODI';
      default:
        return '';
    }
  };

  const sectionTitle = getSectionTitle();

  return (
    <div className={`fixed h-full bg-white shadow-md p-4 transition-width duration-500 ${opened ? 'w-64' : 'w-16'}`}>
      <div className="flex justify-between items-center mb-6">
        <Burger
          opened={opened}
          onClick={toggle}
          size="md"
        />
        {opened && <h1 className="text-2xl font-bold">PERGURUAN TINGGI</h1>}
      </div>
      <div className="mb-4">
        <Link key={menuItems[0].name} href={menuItems[0].path}>
          <div className={`flex items-center p-2 mb-2 cursor-pointer rounded ${pathname === menuItems[0].path ? 'bg-blue-800 text-white' : 'text-gray-400 hover:bg-gray-200'}`}>
            <span className="material-icons mr-2">{menuItems[0].icon}</span>
            {opened && menuItems[0].name}
          </div>
        </Link>
      </div>
      <h2 className={`text-base font-semibold mb-2 ${!opened && 'hidden'}`}>USULAN</h2>
      <hr className={`border-t-2 border-black mb-2 ${!opened && 'hidden'}`} />
      <div className='mb-4'>
        {menuItems.slice(1, 3).map((item) => (
          <Link key={item.name} href={item.path}>
            <div className={`flex items-center p-2 mb-2 cursor-pointer rounded ${pathname.startsWith(item.path) ? 'bg-blue-800 text-white' : 'text-gray-400 hover:bg-gray-200'}`}>
              <span className="material-icons mr-2">{item.icon}</span>
              {opened && item.name}
            </div>
          </Link>
        ))}
      </div>
      {role !== 'dosen' &&
        <>
          <h2 className={`text-base font-semibold mb-2 ${!opened && 'hidden'}`}>{sectionTitle}</h2>
          <hr className={`border-t-2 border-black mb-2 ${!opened && 'hidden'}`} />
          {menuItems.slice(3).map((item) => (
            <Link key={item.name} href={item.path}>
              <div className={`flex items-center p-2 mb-2 cursor-pointer rounded ${pathname === item.path ? 'bg-blue-800 text-white' : 'text-gray-400 hover:bg-gray-200'}`}>
                <span className="material-icons mr-2">{item.icon}</span>
                {opened && item.name}
              </div>
            </Link>
          ))}
        </>
      }
    </div>
  );
};

export default Sidebar;
