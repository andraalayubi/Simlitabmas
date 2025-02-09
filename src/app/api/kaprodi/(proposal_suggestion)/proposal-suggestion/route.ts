import { getSession } from "src/lib/session";
import proposalSuggestionService from "src/services/proposalSuggestionService";
import { NextRequest, NextResponse } from "next/server";
import { proposal_suggestion_status } from "prisma/interfaces";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);

        const filter = {
            status: searchParams.get("status") as proposal_suggestion_status | undefined,
            year_research_id: searchParams.get("year_research_id") ? Number(searchParams.get("year_research_id")) : undefined,
            schema_id: searchParams.get("schema_id") ? Number(searchParams.get("schema_id")) : undefined,
            lecturer_id: searchParams.get("lecturer_id") ? Number(searchParams.get("lecturer_id")) : undefined,
            research_group_id: searchParams.get("research_group_id") ? Number(searchParams.get("research_group_id")) : undefined,
            is_active: searchParams.get("is_active") ? searchParams.get("is_active") === "true" : undefined,
        };


        // filter params
        const filteredParams = Object.fromEntries(
            Object.entries(filter).filter(([_, value]) => value !== undefined)
        );

        // get by filter
        const proposal_suggestions = await proposalSuggestionService.getByFilter(filteredParams);

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
