import reportService from "src/services/reportService";
import { NextRequest, NextResponse } from "next/server";
import filterService from "src/services/filterService";

export async function GET(request: NextRequest) {
    try {

        let filter = filterService.getFilter(request.nextUrl.searchParams, [
            { key: "research_group_id", type: "number" },
            { key: "year_research_id", type: "number" },
            { key: "type", type: "string"}
        ]);

        const lecturers = await reportService.getLecturerPerformance(filter);

        return NextResponse.json({
            success: true,
            message: "Successfully retrieved lecturer data",
            data: lecturers
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Failed to retrieve lecturer data: ${error}`,
        }, { status: 500 });
    }
}