import { NextResponse } from 'next/server';

let dosenList = [
  { id: 1, nama: 'Dr. Selvia Ferdiana Kusuma, M.Kom', nip: '123456789', rg: 'Agile Product Development', prodi: 'Teknik Informatika' },
  { id: 2, nama: 'Wiratmoko Yuwono, ST., MT', nip: '987654321', rg: 'Human Centric Multimedia', prodi: 'Teknik Elektro Industri' },
  { id: 3, nama: 'Ira Prasetyaningrum, S.Si, MT', nip: '123789456', rg: 'Health Informatics', prodi: 'Teknik Mekatronika' },
  { id: 4, nama: 'Yuliana Setiowati S.Kom, M.Kom', nip: '987123654', rg: 'Embedded AI', prodi: 'Teknik Rekayasa Internet' },
  { id: 5, nama: 'Prof. M. Udin Harun Al Rasyid S.Kom, Ph.D', nip: '456123789', rg: 'Knowledge Engineering', prodi: 'Sains Data Terapan' },
];

export async function GET() {
  return NextResponse.json(dosenList);
}

export async function POST(req: Request) {
  const newDosen = await req.json();
  dosenList.push(newDosen);
  return NextResponse.json(newDosen, { status: 201 });
}
