'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextInput, Modal, Group } from '@mantine/core';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';

interface ResearchGroup {
    id: number;
    name: string;
    leader: string;
    memberCount: number;
    researchCount: number;
}

const DaftarResearchGroup: React.FC<{ researchGroups: ResearchGroup[] }> = ({ researchGroups }) => {
    const [search, setSearch] = useState('');
    const [opened, setOpened] = useState(false);
    const [name, setName] = useState('');
    const [leader, setLeader] = useState('');
    const [memberCount, setMemberCount] = useState(0);
    const [researchCount, setResearchCount] = useState(0);

    const filteredResearchGroups = researchGroups.filter((group) =>
        group.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddResearchGroup = async () => {
        const newGroup = { id: researchGroups.length + 1, name, leader, memberCount, researchCount };
        try {
            const response = await axios.post('/api/research-groups', newGroup);
            if (response.status === 201) {
                // Handle successful addition, e.g., updating state
            }
        } catch (error) {
            console.error('Error adding research group:', error);
        }
        setName('');
        setLeader('');
        setMemberCount(0);
        setResearchCount(0);
        setOpened(false);
    };

    const columns = React.useMemo<MRT_ColumnDef<ResearchGroup>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'No',
                size: 50,
            },
            {
                accessorKey: 'name',
                header: 'Nama Research Group',
                size: 200,
            },
            {
                accessorKey: 'leader',
                header: 'Ketua Research Group',
                size: 200,
            },
            {
                accessorKey: 'memberCount',
                header: 'Jumlah Anggota',
                size: 100,
            },
            {
                accessorKey: 'researchCount',
                header: 'Jumlah Penelitian',
                size: 100,
            },
        ],
        []
    );

    return (
        <div className="bg-white shadow sm:rounded-lg p-6">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Research Group</h2>
                <Button onClick={() => setOpened(true)}>Buat Research Group Baru</Button>
            </div>
            <MantineReactTable
                columns={columns}
                data={filteredResearchGroups}
                enablePagination
                enableColumnActions={false}
            />
            <Modal opened={opened} onClose={() => setOpened(false)} title="Buat Research Group Baru">
                <TextInput
                    label="Nama Research Group"
                    placeholder="Masukkan nama research group"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    required
                />
                <TextInput
                    label="Ketua Research Group"
                    placeholder="Masukkan ketua research group"
                    value={leader}
                    onChange={(e) => setLeader(e.currentTarget.value)}
                    required
                />
                <TextInput
                    label="Jumlah Anggota"
                    placeholder="Masukkan jumlah anggota"
                    value={memberCount}
                    onChange={(e) => setMemberCount(Number(e.currentTarget.value))}
                    type="number"
                    required
                />
                <TextInput
                    label="Jumlah Penelitian"
                    placeholder="Masukkan jumlah penelitian"
                    value={researchCount}
                    onChange={(e) => setResearchCount(Number(e.currentTarget.value))}
                    type="number"
                    required
                />
                <Group justify="flex-end" mt="md">
                    <Button onClick={handleAddResearchGroup}>Simpan</Button>
                </Group>
            </Modal>
        </div>
    );
};

export default DaftarResearchGroup;
