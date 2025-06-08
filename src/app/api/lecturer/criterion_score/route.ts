import { NextRequest, NextResponse } from 'next/server';
import { getSession } from "src/lib/session";
import criterionScoreService from 'src/services/criterionScoreService';
import filterService from 'src/services/filterService';

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        const body = await request.json();
        
        const newCriterionScore = {
            review_id: body.review_id,
            score: body.score,
            criterion_id: body.criterion_id,
        };

        const criterion = await criterionScoreService.create(newCriterionScore);

        return NextResponse.json({
            success: true,
            message: "Success creating data",
            data: criterion
        }, { status: 201 });
    } catch (error: any) {
        console.log(error);

        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {

    try {
        let filter = filterService.getFilter(req.nextUrl.searchParams,
            [
                { key: "review_id", type: "number"},
                { key: "proposal_suggestion_id", type: "number"},
                { key: "evaluation_phase", type: "string"}
            ])

        const include = {
            criterion: req.nextUrl.searchParams.get("get_criterion") === "true"
                ? true
                : false,
        }

        const data = await criterionScoreService.getScore(filter, include);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: data
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}