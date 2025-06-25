import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import lecturerService from "src/services/lecturerService";
import evaluationService from "src/services/evaluationService";
import { getSession } from "src/lib/session";

export async function GET(req: NextRequest, { params }: { params: Params }) {

    try {
        const evaluationId = parseInt(params.id, 10);
        const evaluations = await evaluationService.getById(evaluationId);
        
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


export async function PATCH(request: NextRequest,  { params }: { params: Params }) {
    try {
        const session = await getSession();
        const evaluationId = parseInt(params.id, 10);
        const body = await request.json();
        
        const updateEvaluation = {
            status: body.status,
            score: body.score
        };

        const review = await evaluationService.update(evaluationId, updateEvaluation);

        return NextResponse.json({
            success: true,
            message: "Success creating data",
            data: review
        }, { status: 201 });
    } catch (error: any) {
        console.log(error);

        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}