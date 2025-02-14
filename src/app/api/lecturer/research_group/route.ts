import prisma from "../../../../../prisma";
import { NextRequest, NextResponse } from "next/server";
import researchGroupService from 'src/services/researchGroupService';

export async function GET(request: NextRequest) {
  try {
    const research_groups = await researchGroupService.getAllActive();

    return NextResponse.json({
      success: true,
      message: "Success getting data",
      data: research_groups
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Internal Server error: ${error.message}`
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    const { nama: name, deskripsi: description } = await req.json();

    try {
        const researchGroup = await prisma.research_group.create({
            data: {
                name,
                description,
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