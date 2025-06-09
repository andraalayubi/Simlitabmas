import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import evaluationService from "src/services/evaluationService";

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        const body = await request.json();
        
        const newEvaluation = {
            proposal_suggestion_id: Number(body.proposal_suggestion_id),
            category: body.category,
            evaluation_phase: body.evaluation_phase
        };

        const data = await evaluationService.create(newEvaluation);

        return NextResponse.json({
            success: true,
            message: "Success creating data",
            data: data
        }, { status: 201 });
    } catch (error: any) {
        console.log(error);

        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}