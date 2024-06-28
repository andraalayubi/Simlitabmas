import { NextResponse } from 'next/server';

let tahunList = [
  { id: 1, tahun: 2024, tanggalBuka: '12 Februari 2024', tanggalTutup: '29 Desember 2024', usulanDiterima: 12, jumlahUsulan: 21 },
  { id: 2, tahun: 2023, tanggalBuka: '12 Februari 2023', tanggalTutup: '29 Desember 2023', usulanDiterima: 5, jumlahUsulan: 33 },
  { id: 3, tahun: 2022, tanggalBuka: '12 Februari 2022', tanggalTutup: '29 Desember 2022', usulanDiterima: 8, jumlahUsulan: 12 },
  { id: 4, tahun: 2021, tanggalBuka: '12 Februari 2021', tanggalTutup: '29 Desember 2020', usulanDiterima: 10, jumlahUsulan: 11 },
  { id: 5, tahun: 2020, tanggalBuka: '12 Februari 2020', tanggalTutup: '29 Desember 2020', usulanDiterima: 7, jumlahUsulan: 16 },
];

export async function GET() {
  return NextResponse.json(tahunList);
}

export async function POST(req: Request) {
  const newTahun = await req.json();
  tahunList.push(newTahun);
  return NextResponse.json(newTahun, { status: 201 });
}
