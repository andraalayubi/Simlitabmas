import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import evaluationService from 'src/services/evaluationService';

export async function GET(req: NextRequest) {
    const session = await getSession();
  const data = {
    phase: req.nextUrl.searchParams.get("evaluation_phase") || "",
    type: req.nextUrl.searchParams.get("type") || "",
    lecturerId: parseInt(req.nextUrl.searchParams.get("lecturer_id") || "", 10),
  };

  if (!data.lecturerId || isNaN(data.lecturerId)) {
    return NextResponse.json(
      { success: false, message: "lecturer id harus berupa angka yang valid" },
      { status: 400 }
    );
  }

    try {
        const evaluations = await evaluationService.getEvaluations(data);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: evaluations
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}

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