import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import finalReportService from "src/services/finalReportService";


interface Params {
    final_report_id: string;
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    const final_report_id = parseInt(params.final_report_id)
    const payload = await req.json();

    try {

        const session = await getSession();

        const final_report = await finalReportService.update(final_report_id, payload)

        return NextResponse.json({
            success: true,
            message: "Success update final report",
            data: final_report
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}