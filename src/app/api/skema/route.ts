import { NextResponse } from 'next/server';

export async function GET() {
  const skemaList = [
    { id: 1, name: 'Dasar', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl curs...', proposalCount: 30 },
    { id: 2, name: 'Terapan', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl curs...', proposalCount: 18 },
    { id: 3, name: 'Terapan', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl curs...', proposalCount: 21 },
    { id: 4, name: 'Pengembangan', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl curs...', proposalCount: 55 },
    { id: 5, name: 'Terapan', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl curs...', proposalCount: 23 },
  ];

  return NextResponse.json(skemaList);
}
