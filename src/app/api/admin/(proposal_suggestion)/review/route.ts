import { NextRequest, NextResponse } from "next/server";
import filterService from "src/services/filterService";
import reviewService from "src/services/reviewService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { evaluation_id, reviewer_id } = body;

    const review = await reviewService.create(
      evaluation_id,
      reviewer_id,
    );

    return NextResponse.json(
      {
        success: true,
        message: "Success creating data",
        data: review,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: `Internal Server error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {

    try {
        let filter = filterService.getFilter(req.nextUrl.searchParams,
            [
                { key: "proposal_suggestion_id", type: "number" },
            ])

        const include = {
            reviewer: req.nextUrl.searchParams.get("get_reviewer") === "true"
                ? {
                    include: {
                        lecturer : true
                    }
                }
                : false,
            evaluation: req.nextUrl.searchParams.get("get_evaluation") === "true"
                ? true
                : false,
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