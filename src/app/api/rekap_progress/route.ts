import { NextResponse } from 'next/server';

let proposals = [
  { id: 1, judul: 'Pembuatan PJU berbasis IOT dengan kecerdasan buatan', tahun: 2024, pengusul: 'Dr. Selvia Ferdiana Kusuma, M.Kom', progress: 80, tahap: 'Akhir' },
  { id: 2, judul: 'Pembuatan PJU berbasis IOT dengan kecerdasan buatan', tahun: 2024, pengusul: 'Wiratmoko Yuwono, ST., MT', progress: 75, tahap: 'Akhir' },
  { id: 3, judul: 'Pembuatan PJU berbasis IOT dengan kecerdasan buatan', tahun: 2024, pengusul: 'Ira Prasetyaningrum, S.Si, MT', progress: 78, tahap: 'Akhir' },
  { id: 4, judul: 'Pembuatan PJU berbasis IOT dengan kecerdasan buatan', tahun: 2024, pengusul: 'Yuliana Setiowati S.Kom, M.Kom', progress: 90, tahap: 'Akhir' },
  { id: 5, judul: 'Pembuatan PJU berbasis IOT dengan kecerdasan buatan', tahun: 2024, pengusul: 'Prof. M. Udin Harun Al Rasyid S.Kom, Ph.D', progress: 81, tahap: 'Akhir' },
];

export async function GET() {
  return NextResponse.json(proposals);
}

export async function POST(req: Request) {
  const newProposal = await req.json();
  proposals.push(newProposal);
  return NextResponse.json(newProposal, { status: 201 });
}
