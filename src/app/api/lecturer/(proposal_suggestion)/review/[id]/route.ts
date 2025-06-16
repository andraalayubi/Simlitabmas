import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import filterService from "src/services/filterService";
import reviewService from "src/services/reviewService";

export async function GET(req: NextRequest,  { params }: { params: Params }) {

    try {
        const reviewId = parseInt(params.id, 10);

        let filter = filterService.getFilter(req.nextUrl.searchParams,
            [])

        const include = {
            evaluation: req.nextUrl.searchParams.get("get_evaluation") === "true"
                ? {
                    include: {
                        proposal_suggestion : req.nextUrl.searchParams.get("get_proposal_suggestion") === "true"
                        ? {
                            include: {
                                final_report: true,
                                lecturer : true,
                                year_research: true,
                                schema: true,
                                department: true,
                                research_group: true,
                                proposal: req.nextUrl.searchParams.get("get_proposal") === "true"
                                ? true : false
                            }
                        }
                        : false
                    }
                }
                : false,
        }


        const reviews = await reviewService.getById(reviewId, filter, include);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: reviews
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest,  { params }: { params: Params }) {
    try {
        const session = await getSession();
        const reviewId = parseInt(params.id, 10);
        const body = await request.json();
        
        const updateReview = {
            note: body.note,
            status: body.status,
            average_score: body.average_score,
        };

        const review = await reviewService.update(reviewId, updateReview);

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