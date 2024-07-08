import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma';

// buat jabatan baru
export async function POST(req: NextRequest) {
    const { nama } = await req.json();

    try {
        const jabatan = await prisma.jabatan.create({
            data: {
                nama: nama
            }
        })

        return NextResponse.json(
            {
                succes: true,
                message: "jabatan baru berhasil dibuat"
            }, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json({
            succes: false,
            message: `Internal Server Error ${error}`
        })
    }
}