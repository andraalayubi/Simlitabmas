import { getSession } from "@/app/lib/session";
import proposalSuggestionService from "@/app/services/proposalSuggestionService";
import { NextRequest, NextResponse } from "next/server";


interface Params {
    id: string;
}


export async function GET(req: NextRequest, { params }: { params: Params }) {
    const proposal_suggestion_id = parseInt(params.id);

    try {
        const session = await getSession();

        if (isNaN(proposal_suggestion_id)) {
            return NextResponse.json({
                success: false,
                message: "Id not found"
            }, { status: 400 });
        }

        const proposal_suggestion = await proposalSuggestionService.getById(proposal_suggestion_id);
        
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