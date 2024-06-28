import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const proposals = [
    { id: 1, title: 'Pembuatan PJU berbasis IOT dengan kecerdasan buatan', date: 'Apr 24, 2022', schema: 'Dasar', dosenPengusul: 'Dr. Selvia Ferdiana Kusuma, M.Kom', prodi: 'Teknik Informatika', status: 'Diterima', statusClass: 'bg-green-200 text-green-700 p-2 rounded-lg' },
    { id: 2, title: 'Pembuatan PJU berbasis IOT dengan kecerdasan buatan', date: 'Apr 24, 2022', schema: 'Terapan', dosenPengusul: 'Wiratmoko Yuwono, ST., MT', prodi: 'Teknik Informatika', status: 'Ditolak', statusClass: 'bg-red-200 text-red-700 p-2 rounded-lg' },
    { id: 3, title: 'Pembuatan PJU berbasis IOT dengan kecerdasan buatan', date: 'Apr 24, 2022', schema: 'Terapan', dosenPengusul: 'Ira Prasetyaningrum, S.Si, MT', prodi: 'Teknik Informatika', status: 'Selesai', statusClass: 'bg-blue-200 text-blue-700 p-2 rounded-lg' },
    { id: 4, title: 'Pembuatan PJU berbasis IOT dengan kecerdasan buatan', date: 'Apr 24, 2022', schema: 'Pengembangan', dosenPengusul: 'Yuliana Setiowati, S.Kom, M.Kom', prodi: 'Teknik Informatika', status: 'Menunggu', statusClass: 'bg-yellow-200 text-yellow-700 p-2 rounded-lg' },
    { id: 5, title: 'Pembuatan PJU berbasis IOT dengan kecerdasan buatan', date: 'Apr 24, 2022', schema: 'Terapan', dosenPengusul: 'Prof M. Udin Harun Al Rasyid S.Kom, Ph.D', prodi: 'Teknik Informatika', status: 'Aktif', statusClass: 'bg-pink-200 text-pink-700 p-2 rounded-lg' }
  ];

  return NextResponse.json(proposals);
}
