import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import lecturerService from "src/services/lecturerService";
import positionService from "src/services/positionService";
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

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    const lecturer_id = parseInt(params.id);
    const payload = await req.json();

    try {
        const session = await getSession();

        const position = await positionService.getByFilter({ name: payload.position })

        // get hisghet degree
        const degreeRank: any = { 'S1': 1, 'S2': 2, 'S3': 3 };
        const index_highest_degree = payload.degree.reduce(
            (highestIdx: number, current: any, currentIdx: number) => {
                const currentRank = degreeRank[current.degree];
                const highestRank = degreeRank[payload.degree[highestIdx].degree];
                return currentRank > highestRank ? currentIdx : highestIdx;
            }, 
            0
        );


        // parse field 
        const lecturerData = {
            name: payload.name,
            nip: payload.nip,
            nidn: payload.nidn,
            phone_number: payload.phone_number,
            position_id: position!.id!,
            highest_degree: payload.degree[index_highest_degree].degree,
            degree: payload.degree
        };

        const lecturer = await lecturerService.update(lecturer_id, lecturerData);

        return NextResponse.json({
            success: true,
            message: "Success updating data",
            data: lecturer
        }, { status: 200 });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }

}