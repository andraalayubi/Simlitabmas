import { NextRequest, NextResponse } from "next/server";
import criterionService from "src/services/criterionService";
import filterService from "src/services/filterService";

export async function GET(req: NextRequest) {

    try {
        let filter = filterService.getFilter(req.nextUrl.searchParams,
            [
                { key: "phase", type: "string"},
                { key: "category", type: "string"}
            ])

        const reviews = await criterionService.getByFilter(filter);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: reviews
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}