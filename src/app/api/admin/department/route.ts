import { getSession } from "src/lib/session";
import { NextRequest, NextResponse } from "next/server";
import departmentService from "src/services/departmentService";


export async function POST(req: NextRequest) {
    const { name, description } = await req.json();

    try {
        const session = await getSession();

        const department = await departmentService.create({
            name, description
        })

        return NextResponse.json({
            success: true,
            message: "Program Studi created successfully",
            data: department
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


export async function GET(req: NextRequest) {
    try {
        const session = await getSession();

        const departments = await departmentService.getAllActive();

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: departments
        }, {
            status: 200,
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
