'use client';

import React, { useState } from 'react';
import axios from "axios";
import { Button, Input, InputWrapper, Select, Modal } from '@mantine/core';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';

interface Member {
  id: number;
  name: string;
  role: string;
  activityCount: string;
}

interface DaftarAnggotaProps {
  members: Member[];
  onAddMember: (newMember: Omit<Member, 'id' | 'activityCount'>) => void;
}

const DaftarAnggota: React.FC<DaftarAnggotaProps> = ({ members, onAddMember }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [opened, setOpened] = useState(false);

  const handleAddMember = async () => {
    const newMember = { name, role };
    onAddMember(newMember);
    setName('');
    setRole('');
    setOpened(false);
  };

  const columns = React.useMemo<MRT_ColumnDef<Member>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No',
      },
      {
        accessorKey: 'name',
        header: 'Nama',
      },
      {
        accessorKey: 'role',
        header: 'Role',
      },
      {
        accessorKey: 'activityCount',
        header: 'Jumlah Aktivitas',
      }
    ],
    [],
  );

  return (
    <div className='bg-white shadow sm:rounded-lg py-6'>
      <div className="flex justify-between mb-4 px-6">
        <h2 className="text-xl font-semibold">Daftar Anggota</h2>
        <Button onClick={() => setOpened(true)}>Tambah Anggota</Button>
      </div>
      <MantineReactTable
        columns={columns}
        data={members}
        enablePagination={false}
        enableColumnActions={false}
      />
      <Modal opened={opened} onClose={() => setOpened(false)} title="Tambah Anggota">
        <InputWrapper label="Nama">
          <Input
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Masukkan nama"
            required
          />
        </InputWrapper>
        <Select
          label="Role"
          value={role}
          onChange={(value) => setRole(value!)}
          placeholder="Pilih role"
          data={[
            { value: 'Dosen', label: 'Dosen' },
            { value: 'Mahasiswa', label: 'Mahasiswa' },
          ]}
          required
        />
        <Button onClick={handleAddMember} className="mt-4">Simpan</Button>
      </Modal>
    </div>
  );
};

export default DaftarAnggota;
