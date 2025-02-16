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
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Failed to create research group: ${error}`,
        },
            { status: 500 })
    }
}


export async function GET(req: NextRequest) {
    try {
        const session = await getSession();

        const research_groups = await researchGroupService.getAllActive();

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: research_groups
        }, {
            status: 200,
        },)

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Failed to create research group: ${error}`,
        },
            { status: 500 })
    }
}