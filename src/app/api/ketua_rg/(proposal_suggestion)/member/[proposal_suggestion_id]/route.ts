import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import schemaService from "src/services/schemaService";

export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const proposalSuggestionId = parseInt(params.proposal_suggestion_id, 10);
        const proposal_suggestion = await schemaService.getByProposalSuggestionId(proposalSuggestionId);
        
        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: proposal_suggestion
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}