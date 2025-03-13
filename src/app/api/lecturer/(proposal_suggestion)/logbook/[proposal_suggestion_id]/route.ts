import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import logbookService from "src/services/logbookService";

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

        const logbook = await logbookService.getByProposalSuggestionId(proposal_suggestion_id);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: logbook
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}


export async function PUT(req: NextRequest, { params }: { params: Params }) {
    const proposal_suggestion_id = parseInt(params.proposal_suggestion_id)
    const payload = await req.json();

    try {

        const session = await getSession();

        const logbook = await logbookService.update(proposal_suggestion_id, payload)

        return NextResponse.json({
            success: true,
            message: "Success update proposal",
            data: logbook
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}