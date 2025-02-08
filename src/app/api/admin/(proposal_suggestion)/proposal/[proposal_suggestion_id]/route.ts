import { getSession } from "@/app/lib/session";
import proposalService from "@/app/services/proposalService";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    proposal_suggestion_id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    const proposal_suggestion_id = parseInt(params.proposal_suggestion_id)

    try {
        const session = await getSession();

        if (isNaN(proposal_suggestion_id)) {
            return NextResponse.json({
                success: false,
                message: "Id not found"
            }, { status: 400 });
        }

        const proposal = await proposalService.getByProposalSuggestionId(proposal_suggestion_id);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: proposal
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }


}