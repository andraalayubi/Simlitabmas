import { getSession } from "src/lib/session";
import { NextRequest, NextResponse } from "next/server";
import departmentService from "src/services/departmentService";

interface Params {
    id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    const department_id = parseInt(params.id);

    try {
        const session = await getSession();

        const department = await departmentService.getById(department_id);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: department
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}