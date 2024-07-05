'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextInput, Modal, Group } from '@mantine/core';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';

interface Tahun {
    id: number;
    tahun: number;
    tanggalBuka: string;
    tanggalTutup: string;
    usulanDiterima: number;
    jumlahUsulan: number;
}

const DaftarTahun: React.FC<{ tahunList: Tahun[] }> = ({ tahunList }) => {
    const [opened, setOpened] = useState(false);
    const [tahun, setTahun] = useState<number | null>(null);
    const [tanggalBuka, setTanggalBuka] = useState('');
    const [tanggalTutup, setTanggalTutup] = useState('');
    const [usulanDiterima, setUsulanDiterima] = useState<number | null>(null);
    const [jumlahUsulan, setJumlahUsulan] = useState<number | null>(null);

    const handleAddTahun = async () => {
        const newTahun = { id: tahunList.length + 1, tahun, tanggalBuka, tanggalTutup, usulanDiterima, jumlahUsulan };
        try {
            const response = await axios.post('/api/tahun', newTahun);
            if (response.status === 201) {
                // Handle successful addition, e.g., updating state
            }
        } catch (error) {
            console.error('Error adding tahun:', error);
        }
        setTahun(null);
        setTanggalBuka('');
        setTanggalTutup('');
        setUsulanDiterima(null);
        setJumlahUsulan(null);
        setOpened(false);
    };

    const columns = React.useMemo<MRT_ColumnDef<Tahun>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'No',
                size: 50,
            },
            {
                accessorKey: 'tahun',
                header: 'Tahun',
                size: 100,
            },
            {
                accessorKey: 'tanggalBuka',
                header: 'Tanggal Buka',
                size: 200,
            },
            {
                accessorKey: 'tanggalTutup',
                header: 'Tanggal Tutup',
                size: 200,
            },
            {
                accessorKey: 'usulanDiterima',
                header: 'Usulan Diterima',
                size: 150,
            },
            {
                accessorKey: 'jumlahUsulan',
                header: 'Jumlah Usulan',
                size: 150,
            },
        ],
        []
    );

    return (
        <div className="bg-white shadow sm:rounded-lg p-6">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Tahun</h2>
                <Button onClick={() => setOpened(true)}>Buka Tahun Baru</Button>
            </div>
            <MantineReactTable
                columns={columns}
                data={tahunList}
                enablePagination
                enableColumnActions={false}
            />
            <Modal opened={opened} onClose={() => setOpened(false)} title="Buka Tahun Baru">
                <TextInput
                    label="Tahun"
                    placeholder="Masukkan tahun"
                    value={tahun ? tahun.toString() : ''}
                    onChange={(e) => setTahun(Number(e.currentTarget.value))}
                    required
                />
                <TextInput
                    label="Tanggal Buka"
                    placeholder="Masukkan tanggal buka"
                    value={tanggalBuka}
                    onChange={(e) => setTanggalBuka(e.currentTarget.value)}
                    required
                />
                <TextInput
                    label="Tanggal Tutup"
                    placeholder="Masukkan tanggal tutup"
                    value={tanggalTutup}
                    onChange={(e) => setTanggalTutup(e.currentTarget.value)}
                    required
                />
                <TextInput
                    label="Usulan Diterima"
                    placeholder="Masukkan jumlah usulan diterima"
                    value={usulanDiterima ? usulanDiterima.toString() : ''}
                    onChange={(e) => setUsulanDiterima(Number(e.currentTarget.value))}
                    required
                />
                <TextInput
                    label="Jumlah Usulan"
                    placeholder="Masukkan jumlah usulan"
                    value={jumlahUsulan ? jumlahUsulan.toString() : ''}
                    onChange={(e) => setJumlahUsulan(Number(e.currentTarget.value))}
                    required
                />
                <Group justify='flex-end' mt="md">
                    <Button onClick={handleAddTahun}>Simpan</Button>
                </Group>
            </Modal>
        </div>
    );
};

export default DaftarTahun;
