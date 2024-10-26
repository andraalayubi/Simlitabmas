import prisma from "../../../../../prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { nama, deskripsi } = await req.json();

    try {
        const researchGroup = await prisma.research_group.create({
            data: {
                nama: nama,
                deskripsi: deskripsi,
            }
        })

        return NextResponse.json({
            success: true,
            message: "Research Group created successfully",
            data: researchGroup
        },
            { status: 201 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Failed to create research group: ${error}`,
        },
            { status: 500 })
    }
}