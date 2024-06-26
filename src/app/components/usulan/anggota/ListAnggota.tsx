"use client"

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Input, InputWrapper, Select, Modal } from '@mantine/core';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';

interface Member {
  id: number;
  name: string;
  role: string;
  activityCount: string;
}
const DaftarAnggota: React.FC = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [opened, setOpened] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get("/api/members");
        setMembers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the proposals!", error);
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const handleAddMember = async () => {
    const newMember = { name, role, activityCount: '0' };
    
    try {
      const response = await axios.post('/api/members', newMember);
      if (response.status === 201) {
        setMembers([...members, { ...newMember, id: members.length + 1 }]);
        setName('');
        setRole('');
        setOpened(false);
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
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

  if (loading) {
    return <p>Loading...</p>;
  }

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
            // { value: 'Ketua', label: 'Ketua' },
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
