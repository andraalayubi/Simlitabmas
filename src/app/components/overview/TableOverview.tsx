import React, { useMemo } from 'react';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { Badge } from '@mantine/core';

interface UsulanData {
  id: number;
  aspekUsulan: string;
  skema: string;
  progressUsulan: string;
  statusProposal: string;
}

const TableOverview: React.FC = () => {
  const data: UsulanData[] = useMemo(
    () => [
      {
        id: 1,
        aspekUsulan: 'Proposal',
        skema: 'Terapan',
        progressUsulan: 'Lorem ipsum dolor sit amet, consectetur...',
        statusProposal: 'Diisi',
      },
      {
        id: 2,
        aspekUsulan: 'Anggota',
        skema: 'Terapan',
        progressUsulan: '0/1 anggota terdaftar',
        statusProposal: 'Belum Diisi',
      },
      {
        id: 3,
        aspekUsulan: 'Biaya',
        skema: 'Terapan',
        progressUsulan: 'Total Biaya Rp 0,00',
        statusProposal: 'Belum Diisi',
      },
      {
        id: 4,
        aspekUsulan: 'Luaran',
        skema: 'Terapan',
        progressUsulan: 'Lorem ipsum dolor sit amet, consectetur...',
        statusProposal: 'Belum Diisi',
      },
      {
        id: 5,
        aspekUsulan: 'Dokumen Tambahan',
        skema: 'Terapan',
        progressUsulan: '0/0 file terlampir',
        statusProposal: 'Belum Diisi',
      },
    ],
    []
  );

  const columns = useMemo<MRT_ColumnDef<UsulanData>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No',
        size: 50,
      },
      {
        accessorKey: 'aspekUsulan',
        header: 'Aspek Usulan',
        size: 150,
      },
      {
        accessorKey: 'skema',
        header: 'Skema',
        size: 100,
      },
      {
        accessorKey: 'progressUsulan',
        header: 'Progress Usulan',
        size: 300,
      },
      {
        accessorKey: 'statusProposal',
        header: 'Status Proposal',
        Cell: ({ cell }) => (
          <Badge color={cell.getValue<string>() === 'Diisi' ? 'green' : 'red'}>
            {cell.getValue<string>()}
          </Badge>
        ),
      },
    ],
    []
  );

  return (
    <MantineReactTable columns={columns} data={data} enablePagination={false} enableSorting={false} enableColumnActions={false}/>
  );
};

export default TableOverview;
