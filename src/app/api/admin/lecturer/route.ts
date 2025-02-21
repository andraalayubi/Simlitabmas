import Dashboard from "@/app/(pages)/dashboard/page";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import filterService from "src/services/filterService";
import lecturerService from "src/services/lecturerService";

export async function GET(req: NextRequest) {

    const session = await getSession();

    try {
        let filter = filterService.getFilter(req.nextUrl.searchParams,
            [
                { key: "department_id", type: "number" },
                { key: "research_group_id", type: "number" },
                { key: "position_id", type: "number" },

            ])

        const include = {
            user: req.nextUrl.searchParams.get("get_user") === "true"
                ? { where: { deleted: false } }
                : false,

            research_group: req.nextUrl.searchParams.get("get_research_group") === "true"
                ? { where: { deleted: false } }
                : false,

            department: req.nextUrl.searchParams.get("get_department") === "true"
                ? { where: { deleted: false } }
                : false,
        }


        const lecturers = await lecturerService.getByFilter(filter, include);
        
        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: lecturers
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}


// endpoint to create lecturer and first user
export async function POST(req: NextRequest, res: NextResponse) {
    const payload = await req.json();

    const session = await getSession();
    console.log(payload);
    try {
        const lecturer = await lecturerService.create(payload)

        return NextResponse.json({
            success: true,
            message: "Success create new lecturer",
            data: lecturer
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}

