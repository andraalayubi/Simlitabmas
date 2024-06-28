'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextInput, Modal, Group } from '@mantine/core';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { Skema } from '@/app/types/Interfaces';

interface DaftarSkemaProps {
  skemaList: Skema[];
}

const DaftarSkema: React.FC<DaftarSkemaProps> = ({ skemaList }) => {
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddSkema = async () => {
    const newSkema = { id: skemaList.length + 1, name, description, proposalCount: 0 };
    try {
      const response = await axios.post('/api/skema', newSkema);
      if (response.status === 201) {
        // Handle successful addition, e.g., updating state
      }
    } catch (error) {
      console.error('Error adding skema:', error);
    }
    setName('');
    setDescription('');
    setOpened(false);
  };

  const columns = React.useMemo<MRT_ColumnDef<Skema>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No',
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'Nama Skema',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'Deskripsi Skema',
        size: 300,
      },
      {
        accessorKey: 'proposalCount',
        header: 'Jumlah Usulan',
        size: 100,
      },
    ],
    []
  );

  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Skema</h2>
        <Button onClick={() => setOpened(true)}>Buat Skema Baru</Button>
      </div>
      <MantineReactTable
        columns={columns}
        data={skemaList}
        enablePagination
        enableColumnActions={false}
      />
      <Modal opened={opened} onClose={() => setOpened(false)} title="Buat Skema Baru">
        <TextInput
          label="Nama Skema"
          placeholder="Masukkan nama skema"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Deskripsi Skema"
          placeholder="Masukkan deskripsi skema"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          required
        />
        <Group justify="flex-end" mt="md">
          <Button onClick={handleAddSkema}>Simpan</Button>
        </Group>
      </Modal>
    </div>
  );
};

export default DaftarSkema;
