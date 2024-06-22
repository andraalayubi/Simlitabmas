'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const menuItems = [
    { name: 'Dashboard', icon: '', path: '/' },
    { name: 'Penelitian', icon: '', path: '/penelitian' },
    { name: 'Pengmas', icon: '', path: '/usulan/pengmas' },
  ];

  return (
    <div className="fixed w-64 h-screen bg-white shadow-md p-4">
      <h1 className="text-2xl font-bold mb-6">SIMLITABMAS UNIVERSITAS A</h1>
      <div className="mb-4">
        {menuItems.slice(0, 1).map((item) => (
          <Link key={item.name} href={item.path}>
            <div className={`flex items-center p-2 mb-2 cursor-pointer rounded ${pathname === item.path ? 'bg-blue-800 text-white' : 'text-gray-400 hover:bg-gray-200'}`}>
              <span className="material-icons mr-2">{item.icon}</span>
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      <h2 className="text-base font-semibold mb-2">USULAN</h2>
      <hr className="border-t-2 border-black mb-2" />
      {menuItems.slice(1).map((item) => (
        <Link key={item.name} href={item.path}>
          <div className={`flex items-center p-2 mb-2 cursor-pointer rounded ${pathname === item.path ? 'bg-blue-800 text-white' : 'text-gray-400 hover:bg-gray-200'}`}>
            <span className="material-icons mr-2">{item.icon}</span>
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
