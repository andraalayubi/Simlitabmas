import React from 'react';
import { Card, Text, Badge, Button } from '@mantine/core';
import TableOverview from './TableOverview';
import InputKomentar from './InputKomentar';

interface OverviewProps {
    role: string;
};

const Overview: React.FC<OverviewProps> = ({ role }) => {
    return (
        <Card shadow="sm" padding="lg" mb="lg">
            <div className='flex justify-between'>
                <h2 className="text-xl font-semibold">Ringkasan Usulan</h2>
                <div className="flex space-x-4">
                    <Button color="green">Ajukan Usulan</Button>
                    <Button color="blue">Simpan Usulan</Button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <Text>Status Usulan:</Text> <Badge color="green">Diisi</Badge>
                <Text>Judul Usulan:</Text> <Text>Pembuatan Modul Penelitian SIMLITABMAS BERBASIS WEB SERVICE</Text>
                <Text>Skema Penelitian:</Text> <Text>Terapan</Text>
                <Text>Tahun:</Text> <Text>2024</Text>
                <Text>Studi Program:</Text> <Text>Teknik Informatika</Text>
                <Text>Komentar:</Text> <Text>Proposal kurang lengkap dan jelas</Text>
            </div>
            {role === 'dosen' ?
                <TableOverview /> :
                <InputKomentar />
            }
        </Card>
    );
};

export default Overview;
