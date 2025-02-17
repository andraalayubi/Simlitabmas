import { getSession } from "src/lib/session";
import prisma from "../../../../../prisma";
import { NextRequest, NextResponse } from "next/server";
import researchGroupService from "src/services/researchGroupService";

export async function POST(req: NextRequest) {
    const { name, description } = await req.json();

    try {
        const session = await getSession();

        const research_group = await researchGroupService.create({
            name, description
        })

        return NextResponse.json({
            success: true,
            message: "Research Group created successfully",
            data: research_group
        },
            { status: 201 })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {
        const session = await getSession();

        const research_groups = await researchGroupService.getSummaryList();

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: research_groups
        }, {
            status: 200,
        },)

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}