import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import reviewerService from "src/services/reviewerService";

interface Params {
    id: string;
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
    const reviewer_id = parseInt(params.id);

    try {
        const session = await getSession();
        const body = await req.json();

        const isDelete = body.deleted === true;
        const category = body.category;
        const isSwitch = body.switch === true;

        let reviewerData = {};

        if (isDelete) {
            reviewerData = { deleted: true };
        } else if (isSwitch && category == "penelitian"){
            reviewerData = { category: "pengmas", deleted: false };
        } else if (isSwitch && category == "pengmas"){
            reviewerData = { category: "penelitian", deleted: false };
        }else{
            reviewerData = { category: category, deleted: false };
        }

        const reviewer = await reviewerService.update(reviewer_id, reviewerData);

        return NextResponse.json({
            success: true,
            message: "Success updating data",
            data: reviewer
        }, { status: 200 });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }

}