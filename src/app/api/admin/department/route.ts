import prisma from "../../../../../prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const { nama, deskripsi } = await req.json();

    try {
        const programStudi = await prisma.program_studi.create({
            data: {
                nama: nama,
                deskripsi: deskripsi,
            }
        })

        return NextResponse.json({
            success: true,
            message: "Program Studi created successfully",
            data: programStudi
        }, {
            status: 201,
        },)

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error}`,
        }, {
            status: 500,
        },)
    }
}