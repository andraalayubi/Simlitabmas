import { NextResponse } from 'next/server';

let programs = [
  { id: 1, name: 'Teknik Informatika', head: 'Dr. Selvia Ferdiana Kusuma, M.Kom', serviceCount: 12 },
  { id: 2, name: 'Teknik Elektro Industri', head: 'Wiratmoko Yuwono, ST., MT', serviceCount: 5 },
  { id: 3, name: 'Teknik Mekatronika', head: 'Ira Prasetyaningrum, S.Si, MT', serviceCount: 8 },
  { id: 4, name: 'Teknik Rekayasa Internet', head: 'Yuliana Setiowati S.Kom, M.Kom', serviceCount: 10 },
  { id: 5, name: 'Sains Data Terapan', head: 'Prof. M. Udin Harun Al Rasyid S.Kom, Ph.D', serviceCount: 7 },
];

export async function GET() {
  return NextResponse.json(programs);
}

export async function POST(req: Request) {
  const newProgram = await req.json();
  programs.push(newProgram);
  return NextResponse.json(newProgram, { status: 201 });
}
