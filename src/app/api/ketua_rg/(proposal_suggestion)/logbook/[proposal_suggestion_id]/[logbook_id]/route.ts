import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import logbookService from "src/services/logbookService";


interface Params {
    logbook_id: string;
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    const logbook_id = parseInt(params.logbook_id)
    const payload = await req.json();

    try {

        const session = await getSession();

        const logbook = await logbookService.update(logbook_id, payload)

        return NextResponse.json({
            success: true,
            message: "Success update proposal",
            data: logbook
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}