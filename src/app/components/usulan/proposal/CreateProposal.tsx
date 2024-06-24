"use client"

import RichTextEditors from '@/app/components/usulan/proposal/CustomRTE';

function DaftarProposal() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white shadow sm:rounded-lg p-6">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="judul-proposal">
                Judul Proposal
              </label>
              <input
                id="judul-proposal"
                type="text"
                placeholder="Masukkan Judul Proposal"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default DaftarProposal