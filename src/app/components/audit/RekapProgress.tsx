'use client';

import React from 'react';
import { Button } from '@mantine/core';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';

interface Usulan {
  id: number;
  judul: string;
  tahun: number;
  pengusul: string;
  progress: number;
  tahap: string;
}

const RekapProgress: React.FC<{ usulans: Usulan[] }> = ({ usulans }) => {
    const columns = React.useMemo<MRT_ColumnDef<Usulan>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No',
        size: 50,
      },
      {
        accessorKey: 'judul',
        header: 'Judul Usulan',
        size: 200,
      },
      {
        accessorKey: 'tahun',
        header: 'Tahun',
        size: 100,
      },
      {
        accessorKey: 'pengusul',
        header: 'Pengusul',
        size: 200,
      },
      {
        accessorKey: 'progress',
        header: 'Progress',
        size: 100,
      },
      {
        accessorKey: 'tahap',
        header: 'Tahap Evaluasi',
        size: 150,
      },
    ],
    []
  );

  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <div className="flex justify-between mb-4">
      <h2 className="text-xl font-semibold">Rekap Progress</h2>
        <Button>Buat Usulan Baru</Button>
      </div>
      <MantineReactTable
        columns={columns}
        data={usulans}
        enablePagination
        enableColumnActions={false}
      />
    </div>
  );
};

export default RekapProgress;
