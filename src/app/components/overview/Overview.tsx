import React from 'react';
import { Card, Text, Badge, Button } from '@mantine/core';
import TableOverview from './TableOverview';

const Overview: React.FC = () => {
    return (
        <Card shadow="sm" padding="lg" mb="lg">
            <div className='flex justify-between'>
                <Text size="lg" fw={500} mb="md">Ringkasan Usulan</Text>
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
            <TableOverview />
        </Card>
    );
};

export default Overview;
