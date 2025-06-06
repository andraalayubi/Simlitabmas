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