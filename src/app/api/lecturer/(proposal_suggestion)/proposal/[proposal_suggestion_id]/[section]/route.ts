import { getSession } from "@/app/lib/session";
import proposalService from "@/app/services/proposalService";
import { NextRequest, NextResponse } from "next/server";


interface Params {
    section: string;
    proposal_suggestion_id: string;
}

// update each proposal section / part
export async function PUT(req: NextRequest, { params }: { params: Params }) {
    const section = params.section
    const proposal_suggestion_id = parseInt(params.proposal_suggestion_id)

    try {
        const session = await getSession();

        const body = await req.json();
        const data = body.data;

        const updatedProposal = await proposalService.updateByProposalSection(proposal_suggestion_id, section, data);

        return NextResponse.json({
            success: true,
            data: updatedProposal,
            message: `Proposal section '${section}' updated successfully`
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}