import { getSession } from "src/lib/session";
import proposalSuggestionService from "src/services/proposalSuggestionService";
import { NextRequest, NextResponse } from "next/server";
import { proposal_suggestion_status } from "prisma/interfaces";
import filterService from "src/services/filterService";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        // Define the filter type with all possible properties
        type ProposalSuggestionFilter = {
            id?: number;
            status?: proposal_suggestion_status;
            year_research_id?: number;
            schema_id?: number;
            lecturer_id?: number | null;
            research_group_id?: number | null;
            is_active?: boolean;
        };

        // Get the base filter from the query parameters
        let filter: ProposalSuggestionFilter = filterService.getFilter(req.nextUrl.searchParams, [
            { key: "id", type: "number" },
            { key: "status", type: "string" } as const,
            { key: "year_research_id", type: "number" },
            { key: "schema_id", type: "number" },
            { key: "lecturer_id", type: "number" },
            { key: "research_group_id", type: "number" },
        ]);

        // Cek apakah lecturer_id adalah "null" dan ubah menjadi null
        if (req.nextUrl.searchParams.get("lecturer_id") === "null") {
            filter = { ...filter, lecturer_id: null };
        }

        // Set is_active to true
        filter = { ...filter, is_active: true };

        const include = {
            schema: req.nextUrl.searchParams.get("get_schema") === "true",
            lecturer: req.nextUrl.searchParams.get("get_lecturer") === "true",
            research_group: req.nextUrl.searchParams.get("get_research_group") === "true",
            year_research: req.nextUrl.searchParams.get("get_year_research") === "true",
            department: req.nextUrl.searchParams.get("get_department") === "true",
        };

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
