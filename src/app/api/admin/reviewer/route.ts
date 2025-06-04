import { NextRequest, NextResponse } from 'next/server';
import { getSession } from "src/lib/session";
import filterService from 'src/services/filterService';
import reviewerService from 'src/services/reviewerService';

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        const body = await request.json();
        
        const newReviewer = {
            lecturer_id: Number(body.lecturer_id),
            category: body.category,
        };

        const reviewer = await reviewerService.create(newReviewer);

        return NextResponse.json({
            success: true,
            message: "Success creating data",
            data: reviewer
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

    const session = await getSession();

    try {
        let filter = filterService.getFilter(req.nextUrl.searchParams,
            [
                { key: "lecturer_id", type: "number" },
                { key: "evaluation", type: "string" },
                { key: "category", type: "string" },
            ])

        const include = {
            lecturer: req.nextUrl.searchParams.get("get_lecturer") === "true"
                ? { where: { deleted: false } }
                : false,
            review: req.nextUrl.searchParams.get("get_review") === "true"
                ? { 
                    include: {
                        evaluation: true
                    }
                 }
                : false,
        }


        const reviewers = await reviewerService.getByFilter(filter, include);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: reviewers
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}