'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextInput, Modal, Group } from '@mantine/core';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';

interface ProgramStudi {
    id: number;
    name: string;
    head: string;
    serviceCount: number;
}

const DaftarProgramStudi: React.FC<{ programs: ProgramStudi[] }> = ({ programs }) => {
    const [search, setSearch] = useState('');
    const [opened, setOpened] = useState(false);
    const [name, setName] = useState('');
    const [head, setHead] = useState('');
    const [serviceCount, setServiceCount] = useState(0);

    const filteredPrograms = programs.filter((program) =>
        program.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddProgramStudi = async () => {
        const newProgram = { id: programs.length + 1, name, head, serviceCount };
        try {
            const response = await axios.post('/api/program-studi', newProgram);
            if (response.status === 201) {
                // Handle successful addition, e.g., updating state
            }
        } catch (error) {
            console.error('Error adding program studi:', error);
        }
        setName('');
        setHead('');
        setServiceCount(0);
        setOpened(false);
    };

    const columns = React.useMemo<MRT_ColumnDef<ProgramStudi>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'No',
                size: 50,
            },
            {
                accessorKey: 'name',
                header: 'Nama Program Studi',
                size: 200,
            },
            {
                accessorKey: 'head',
                header: 'Kaprodi',
                size: 200,
            },
            {
                accessorKey: 'serviceCount',
                header: 'Jumlah Pengabdian',
                size: 100,
            },
        ],
        []
    );

    return (
        <div className="bg-white shadow sm:rounded-lg p-6">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Program Studi</h2>
                <Button onClick={() => setOpened(true)}>Buat Program Studi Baru</Button>
            </div>
            <MantineReactTable
                columns={columns}
                data={filteredPrograms}
                enablePagination
                enableColumnActions={false}
            />
            <Modal opened={opened} onClose={() => setOpened(false)} title="Buat Program Studi Baru">
                <TextInput
                    label="Nama Program Studi"
                    placeholder="Masukkan nama program studi"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    required
                />
                <TextInput
                    label="Kaprodi"
                    placeholder="Masukkan kaprodi"
                    value={head}
                    onChange={(e) => setHead(e.currentTarget.value)}
                    required
                />
                <TextInput
                    label="Jumlah Pengabdian"
                    placeholder="Masukkan jumlah pengabdian"
                    value={serviceCount}
                    onChange={(e) => setServiceCount(Number(e.currentTarget.value))}
                    type="number"
                    required
                />
                <Group justify='flex-end' mt="md">
                    <Button onClick={handleAddProgramStudi}>Simpan</Button>
                </Group>
            </Modal>
        </div>
    );
};

export default DaftarProgramStudi;
