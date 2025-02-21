import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import lecturerService from "src/services/lecturerService";
import userService from "src/services/userService";

interface Params {
    id: string;
}

// get lecturer by id
export async function GET(req: NextRequest, { params }: { params: Params }) {
    const lecturer_id = parseInt(params.id);

    const session = await getSession();

    try {
        const lecturer = await lecturerService.getById(lecturer_id)

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: lecturer
        }, { status: 200 });


    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    const lecturer_id = parseInt(params.id);

    const session = await getSession();

    try {
        await lecturerService.remove(lecturer_id)

        await userService.removeByLecturerId(lecturer_id)

        return NextResponse.json({
            success: true,
            message: "Success deleting data",
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }

}