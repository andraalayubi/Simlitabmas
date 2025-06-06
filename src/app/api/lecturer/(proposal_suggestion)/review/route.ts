import { NextRequest, NextResponse } from "next/server";
import filterService from "src/services/filterService";
import reviewService from "src/services/reviewService";

export async function GET(req: NextRequest) {

    try {
        let filter = filterService.getFilter(req.nextUrl.searchParams,
            [
                { key: "lecturer_id", type: "number" },
                { key: "evaluation_phase", type: "string"},
                { key: "type", type: "string"},
                { key: "evaluation_id", type: "number"},
                {key: "proposal_suggestion_id", type: "number"}
            ])

        const include = {
            evaluation: req.nextUrl.searchParams.get("get_evaluation") === "true"
                ? {
                    include: {
                        proposal_suggestion : {
                            include: {
                                lecturer : true,
                                year_research: true,
                                schema: true
                            }
                        }
                    }
                }
                : false,
            reviewer: req.nextUrl.searchParams.get("get_reviewer")=== "true"
            ?{
                include: {
                    lecturer: true
                }
            }
            : false,
            criterion_score: req.nextUrl.searchParams.get("get_criterion_score") === "true"
            ? {
                include: {
                    criterion: true
                }
            }
            : false
        }


        const reviews = await reviewService.getByFilter(filter, include);

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