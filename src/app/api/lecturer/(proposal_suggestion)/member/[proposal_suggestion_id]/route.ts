import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import lecturerService from "src/services/lecturerService";

export async function GET(req: NextRequest) {

    try {
        const session = await getSession();

        const proposal_suggestion = await lecturerService.getAllActive();
        
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

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();

        // Parse request body
        const body = await req.json();

        // Associate a lecturer with a proposal suggestion
        const result = await lecturerService.addToProposalSuggestion(1, 2);
        // result would contain the proposal suggestion ID and the lecturer ID

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