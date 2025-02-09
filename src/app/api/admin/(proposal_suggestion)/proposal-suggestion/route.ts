import { getSession } from "src/lib/session";
import filterService from "src/services/filterService";
import proposalSuggestionService from "src/services/proposalSuggestionService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();

        const filter = filterService.getFilter(req.nextUrl.searchParams, [
            { key: "status", type: "string" },
            { key: "year_research_id", type: "number" },
            { key: "schema_id", type: "number" },
            { key: "lecturer_id", type: "number" },
            { key: "research_group_id", type: "number" },
            { key: "is_active", type: "boolean" },
        ]);

        // get by filter
        const proposal_suggestions = await proposalSuggestionService.getByFilter(filter);

        return NextResponse.json({
            success: true,
            data: proposal_suggestions,
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}
