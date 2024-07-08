import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";
import { UserType } from "../../../../../prisma/models";
import { NextRequest, NextResponse } from "next/server";

// get all akun dosen
export async function GET(req: NextRequest, res: NextResponse) {

    try {
        const dosen = await prisma.dosen.findMany({
            include: {
                research_group: true,
                program_studi: true,
            }
        });


        return NextResponse.json({
            success: true,
            data: dosen
        },
            { status: 200 })

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: `Internal Server Error ${error}`
        }, { status: 500 })
    }
}

// buat akun
export async function POST(req: NextRequest, res: NextResponse) {
    const { email, password, nama, nip, nidn, research_group_id, program_studi_id, gelar, jabatan_id } = await req.json();

    try {
        // cek apakah user sudah ada
        const existingUserEmail = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        const existingUserNip = await prisma.dosen.findFirst({
            where: {
                nip: nip.toString()
            }
        })

        const existingUserNidn = await prisma.dosen.findFirst({
            where: {
                nidn: nidn.toString()
            }
        })

        if (existingUserEmail || existingUserNip || existingUserNidn) {
            return NextResponse.json({
                success: false,
                message: "User sudah terdaftar"
            }, { status: 400 })

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // buat dosen baru
        const newDosen = await prisma.dosen.create({
            data: {
                nama: nama,
                research_group_id: research_group_id,
                program_studi_id: program_studi_id,
                nidn: nidn.toString(),
                nip: nip.toString(),
                is_ketua_rg: false,
                gelar_tertinggi: gelar,
                ttd_url: '',
                jabatan_id: jabatan_id,
            }
        });

        // buat user baru hanya sebagai DOSEN
        const newUser = await prisma.user.create({
            data: {
                dosen_id: newDosen.id,
                email: email,
                password: hashedPassword,
                user_type: UserType.DOSEN,
            }
        });

        return NextResponse.json({
            success: true,
            message: "User berhasil dibuat"
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error ${error}`
        }, { status: 500 })
    }

}
