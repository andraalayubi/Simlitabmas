import { NextRequest, NextResponse } from 'next/server';

let members = [
  { id: 1, name: 'John Doe', role: 'Ketua', activityCount: '10' },
  { id: 2, name: 'Jane Smith', role: 'Dosen', activityCount: '10' },
  { id: 3, name: 'Jane Doe', role: 'Mahasiswa', activityCount: '-' },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(members);
}

export async function POST(request: NextRequest) {
  const newMember = await request.json();
  members.push({ ...newMember, id: members.length + 1 });
  return NextResponse.json(newMember, { status: 201 });
}
