import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import finalReportService from "src/services/finalReportService";

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

        const final_report = await finalReportService.getByProposalSuggestionId(proposal_suggestion_id);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: final_report
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

        const final_report = await finalReportService.update(proposal_suggestion_id, payload)

        return NextResponse.json({
            success: true,
            message: "Success update final report",
            data: final_report
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}