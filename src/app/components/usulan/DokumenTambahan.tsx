'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import MainLayout from '@/app/components/layouts/MainLayout';
import LoadingPage from '@/app/components/usulan/LoadingPage';

interface Dokumen {
    id: number;
    name: string;
    fileUrl: string;
}

const DokumenTambahan: React.FC = () => {
    const [dokumens, setDokumens] = useState<Dokumen[]>([]);
    const [loading, setLoading] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);
    const [namaDokumen, setNamaDokumen] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchDokumens = async () => {
            try {
                const response = await axios.get('/api/dokumen');
                setDokumens(response.data);
                setLoading(false);
            } catch (error) {
                console.error('There was an error fetching the dokumens!', error);
                setLoading(false);
            }
        };

        fetchDokumens();
    }, []);

    const handleDrop = (files: File[]) => {
        setFile(files[0]);
    };

    const handleUpload = async () => {
        if (!file || !namaDokumen) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', namaDokumen);

        try {
            const response = await axios.post('/api/dokumen', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setDokumens([...dokumens, response.data]);
                setNamaDokumen('');
                setFile(null);
                close();
            }
        } catch (error) {
            console.error('There was an error uploading the dokumen!', error);
        }
    };

    const columns = React.useMemo<MRT_ColumnDef<Dokumen>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Nama Dokumen',
                size: 300,
            },
            {
                accessorKey: 'fileUrl',
                header: 'File',
                size: 150,
                Cell: ({ cell }) => (
                    <a href={cell.getValue<string>()} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Download
                    </a>
                ),
            },
        ],
        []
    );

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <>
            <div className="bg-white shadow rounded-lg py-6">
                <div className="mb-4 mx-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Daftar Dokumen Tambahan</h2>
                    <Button onClick={open} className="bg-blue-800 text-white">
                        Tambah Dokumen
                    </Button>
                </div>
                <div className="w-full">
                    <MantineReactTable columns={columns} data={dokumens} />
                </div>
            </div>

            <Modal opened={opened} onClose={close} title="Tambah Dokumen">
                <TextInput
                    label="Nama Dokumen"
                    placeholder="Masukkan Nama Dokumen"
                    className='mb-4'
                    value={namaDokumen}
                    onChange={(e) => setNamaDokumen(e.currentTarget.value)}
                    required
                />
                <Dropzone
                    onDrop={handleDrop}
                    accept={[MIME_TYPES.pdf, MIME_TYPES.doc, MIME_TYPES.docx]}
                    multiple={false}
                    style={{ pointerEvents: 'none' }}
                >
                    <div className="p-4 border-dashed border-2 rounded-md text-center">
                        {file ? (
                            <div>{file.name}</div>
                        ) : (
                            <div>Drag files here or click to select files</div>
                        )}
                    </div>
                </Dropzone>
                <Button onClick={handleUpload} className="mt-4 bg-blue-800 text-white">
                    Simpan
                </Button>
            </Modal>
        </>
    );
};

export default DokumenTambahan;
