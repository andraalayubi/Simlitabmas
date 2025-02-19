import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import lecturerService from "src/services/lecturerService";
import memberService from "src/services/memberService";

export async function GET(req: NextRequest, { params }: { params: Params }) {

    try {
        const proposalSuggestionId = parseInt(params.proposal_suggestion_id, 10);
        const proposal_suggestion = await memberService.getVendorMembers(proposalSuggestionId);
        
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

export async function POST(req: NextRequest, { params }: { params: Params }) {
    try {      
        const proposalSuggestionId = parseInt(params.proposal_suggestion_id, 10);

        const body = await req.json();

        const result = await lecturerService.addLecturerMember(proposalSuggestionId, body.lecturerId);

        return NextResponse.json({
            success: true,
            data: result,
            message: "Lecturer associated with proposal suggestion successfully"
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error creating proposal suggestion:", error);
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}