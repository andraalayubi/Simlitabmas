import { NextResponse } from 'next/server';

let researchGroups = [
  { id: 1, name: 'Agile Product Development', leader: 'Dr. Selvia Ferdiana Kusuma, M.Kom', memberCount: 12, researchCount: 21 },
  { id: 2, name: 'Human Centric Multimedia', leader: 'Wiratmoko Yuwono, ST., MT', memberCount: 5, researchCount: 33 },
  { id: 3, name: 'Health Informatics', leader: 'Ira Prasetyaningrum, S.Si, MT', memberCount: 8, researchCount: 12 },
  { id: 4, name: 'Embedded AI', leader: 'Yuliana Setiowati S.Kom, M.Kom', memberCount: 10, researchCount: 11 },
  { id: 5, name: 'Knowledge Engineering', leader: 'Prof. M. Udin Harun Al Rasyid S.Kom, Ph.D', memberCount: 7, researchCount: 16 },
];

export async function GET() {
  return NextResponse.json(researchGroups);
}

export async function POST(req: Request) {
  const newGroup = await req.json();
  researchGroups.push(newGroup);
  return NextResponse.json(newGroup, { status: 201 });
}
