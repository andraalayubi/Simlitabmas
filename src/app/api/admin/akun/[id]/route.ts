import prisma from "../../../../../../prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: string;
}

// get data dosen and user role
export async function GET(req: NextRequest, { params }: { params: Params }) {
    const dosen_id = parseInt(params.id);

    try {
        if (isNaN(dosen_id)) {

            return NextResponse.json({
                success: false,
                message: "Invalid dosen ID"
            }, {
                status: 400,
            })
        }

        const dosen = await prisma.dosen.findUnique({
            where: {
                id: dosen_id
            }, include: {
                research_group: true,
                program_studi: true,
                jabatan: true,
                user: true
            }
        })

        if (!dosen) {
            return NextResponse.json({
                success: false,
                message: "Dosen tidak ditemukan"
            }, {
                status: 404,
            })

        }

        return NextResponse.json({
            success: true,
            data: dosen
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error}`
        }, { status: 500 })

    }
}


// add new user role for dosen
export async function POST(req: NextRequest, { params }: { params: Params }) {
    const dosen_id = parseInt(params.id);
    const { user_type, email, password } = await req.json();

    try {
        if (isNaN(dosen_id)) {

            return NextResponse.json({
                success: false,
                message: "Invalid dosen ID"
            }, { status: 400, })

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                dosen_id: dosen_id,
                email: email,
                password: hashedPassword,
                user_type: user_type,
            }
        });

        return NextResponse.json({
            success: true,
            message: "User role berhasil ditambahkan",
            data: user
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error}`
        }, { status: 500 })

    }

}


// update akun
export async function PUT(req: NextRequest) {

}

