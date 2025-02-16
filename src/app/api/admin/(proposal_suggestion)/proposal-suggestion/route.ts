import { getSession } from "src/lib/session";
import filterService from "src/services/filterService";
import proposalSuggestionService from "src/services/proposalSuggestionService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();

        let filter = filterService.getFilter(req.nextUrl.searchParams, [
            { key: "status", type: "string" },
            { key: "year_research_id", type: "number" },
            { key: "schema_id", type: "number" },
            { key: "lecturer_id", type: "number" },
            { key: "research_group_id", type: "number" },
            { key: "is_active", type: "boolean" },
        ]);

        // Cek apakah lecturer_id adalah "null" dan ubah menjadi null
        if (req.nextUrl.searchParams.get("lecturer_id") === "null") {
            filter = { ...filter, lecturer_id: null };
        }

        const include = {
            schema: req.nextUrl.searchParams.get("get_schema") === "true",
            lecturer: req.nextUrl.searchParams.get("get_lecturer") === "true",
            research_group: req.nextUrl.searchParams.get("get_research_group") === "true",
        };

        // get by filter
        const proposal_suggestions = await proposalSuggestionService.getByFilter(filter, include);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: proposal_suggestions,
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}
