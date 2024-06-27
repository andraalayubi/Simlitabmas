import { NextRequest, NextResponse } from 'next/server';

const evaluations = [
  {
    id: 1,
    title: 'Evaluasi Proposal',
    details: [
      { id: 1, reviewer: 'Dr. Selvia Ferdiana Kusuma, M.Kom', aspect: 'Terapan', comment: 'Menunggu penilaian reviewer', score: 'Menunggu penilaian reviewer' },
      { id: 2, reviewer: 'Wiratmoko Yuwono,ST., MT', aspect: 'Terapan', comment: 'Ulas Kembali ulasan dalam analisa rumusan masalah.', score: '80' },
    ],
  },
  {
    id: 2,
    title: 'Evaluasi Kemajuan',
    details: [
      { id: 1, reviewer: 'Dr. Selvia Ferdiana Kusuma, M.Kom', aspect: 'Terapan', comment: 'Menunggu penilaian reviewer', score: 'Menunggu penilaian reviewer' },
      { id: 2, reviewer: 'Wiratmoko Yuwono,ST., MT', aspect: 'Terapan', comment: 'Ulas Kembali ulasan dalam analisa rumusan masalah.', score: '80' },
    ],
  },
  { 
    id: 3,
    title: 'Evaluasi Akhir',
    details: [
      { id: 1, reviewer: 'Dr. Selvia Ferdiana Kusuma, M.Kom', aspect: 'Terapan', comment: 'Menunggu penilaian reviewer', score: 'Menunggu penilaian reviewer' },
      { id: 2, reviewer: 'Wiratmoko Yuwono,ST., MT', aspect: 'Terapan', comment: 'Ulas Kembali ulasan dalam analisa rumusan masalah.', score: '80' },
    ],
  },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(evaluations);
}
