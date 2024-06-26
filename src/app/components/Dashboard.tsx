"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, SimpleGrid, Text, Container, Badge } from '@mantine/core';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';

interface Proposal {
    id: number;
    title: string;
    date: string;
    schema: string;
    dosenPengusul: string;
    prodi: string;
    status: string;
    statusClass: string;
}

const Dashboard: React.FC = () => {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await axios.get('/api/proposals');
                setProposals(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching proposals:', error);
                setLoading(false);
            }
        };

        fetchProposals();
    }, []);

    const columns = React.useMemo<MRT_ColumnDef<Proposal>[]>(
        () => [
            {
                accessorKey: 'title',
                header: 'Judul Penelitian',
            },
            {
                accessorKey: 'schema',
                header: 'Skema',
            },
            {
                accessorKey: 'dosenPengusul',
                header: 'Dosen Pengusul',
            },
            {
                accessorKey: 'prodi',
                header: 'Prodi',
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({ cell }) => {
                    const proposal = cell.row.original as Proposal;
                    return (
                        <span className={proposal.statusClass}>{proposal.status}</span>
                    );
                },
            },
        ],
        [],
    );

    return (
        <Container>
            <SimpleGrid cols={3} spacing="lg" mb="lg">
                <Card shadow="sm" padding="lg">
                    <Text size="xl" fw={700} ta="center">3</Text>
                    <Text ta="center">Usulan Saya</Text>
                </Card>
                <Card shadow="sm" padding="lg">
                    <Text size="xl" fw={700} ta="center">2</Text>
                    <Text ta="center">Usulan Penelitian Saya</Text>
                </Card>
                <Card shadow="sm" padding="lg">
                    <Text size="xl" fw={700} ta="center">1</Text>
                    <Text ta="center">Usulan Pengabdian Saya</Text>
                </Card>
            </SimpleGrid>
            <Card shadow="sm" padding="lg">
                <Text size="lg" fw={500} mb="md">Usulan Terbaru</Text>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <MantineReactTable columns={columns} data={proposals} />
                )}
            </Card>
        </Container>
    );
};

export default Dashboard;
