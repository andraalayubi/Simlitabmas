'use client';

import React from 'react';
import { Breadcrumbs, Anchor } from '@mantine/core';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumb: React.FC = () => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  // Format title: replace "_" with a space and capitalize words
  const formatTitle = (title: string) =>
    title
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const breadcrumbItems = [
    <Anchor
      component={Link}
      href="/"
      key="home"
      className={`text-gray-700 hover:text-blue-700 ${
        pathNames.length === 0 ? 'font-bold text-gray-900' : ''
      }`}
    >
      Home
    </Anchor>,
    ...pathNames.map((link, index) => {
      const href = `/${pathNames.slice(0, index + 1).join('/')}`;
      const isActive = index === pathNames.length - 1;

      return (
        <Anchor
          component={Link}
          href={href}
          key={href}
          className={`${
            isActive
              ? 'font-bold text-gray-900'
              : 'text-gray-700 hover:text-blue-700'
          }`}
        >
          {formatTitle(link)}
        </Anchor>
      );
    }),
  ];

  return (
    <nav aria-label="breadcrumbs">
      <Breadcrumbs separator="/" className="flex items-center ">
        {breadcrumbItems}
      </Breadcrumbs>
    </nav>
  );
};

export default Breadcrumb;
