"use client"

import { TextInput, Button, Group } from '@mantine/core';
import RichTextEditors from '@/app/components/usulan/proposal/CustomRTE';

function DaftarProposal() {
  return (
      <div className="bg-white shadow sm:rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Buat Proposal</h2>
        <form >
          <div className="mb-4">
            <TextInput
              label="Judul Proposal"
              placeholder="Masukkan Judul Proposal"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="abstrak">
              Abstrak
            </label>
            <RichTextEditors placeholder={'Masukkan Abstrak'} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latar-belakang">
              Latar Belakang
            </label>
            <RichTextEditors placeholder={'Masukkan Latar Belakang'} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tujuan">
              Tujuan
            </label>
            <RichTextEditors placeholder={'Masukkan Tujuan'} />
          </div>
          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </div>
  );
}

export default DaftarProposal