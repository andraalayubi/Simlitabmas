'use client';

import React from 'react';
import { TextInput, Button, Group } from '@mantine/core';
import RichTextEditors from '@/app/components/usulan/CustomRTE';

interface DaftarProposalProps {
  proposal: {
    title: string;
    abstrak: string;
    latarBelakang: string;
    tujuan: string;
  };
  onChange: (field: keyof DaftarProposalProps['proposal'], value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const DaftarProposal: React.FC<DaftarProposalProps> = ({ proposal, onChange, onSubmit }) => {
  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Buat Proposal</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <TextInput
            label="Judul Proposal"
            placeholder="Masukkan Judul Proposal"
            value={proposal.title}
            onChange={(e) => onChange('title', e.currentTarget.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="abstrak">
            Abstrak
          </label>
          <RichTextEditors
            value={proposal.abstrak}
            onChange={(value) => onChange('abstrak', value)}
            placeholder="Masukkan Abstrak"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latar-belakang">
            Latar Belakang
          </label>
          <RichTextEditors
            value={proposal.latarBelakang}
            onChange={(value) => onChange('latarBelakang', value)}
            placeholder="Masukkan Latar Belakang"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tujuan">
            Tujuan
          </label>
          <RichTextEditors
            value={proposal.tujuan}
            onChange={(value) => onChange('tujuan', value)}
            placeholder="Masukkan Tujuan"
          />
        </div>
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  );
};

export default DaftarProposal;
