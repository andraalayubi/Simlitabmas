import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import lecturerService from "src/services/lecturerService";

export async function GET(req: NextRequest, { params }: { params: Params }) {
    const lecturer_id = parseInt(params.id);

    try {
        const lecturer = await lecturerService.getById(lecturer_id);
        
        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: lecturer
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }

}