import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import additionalDocumentService from "src/services/additionalDocumentService";

export async function GET(req: NextRequest, { params }: { params: Params }) {

    try {
        const proposalSuggestionId = parseInt(params.proposal_suggestion_id, 10);
        const evaluations = await additionalDocumentService.getById(proposalSuggestionId);
        
        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: evaluations
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}