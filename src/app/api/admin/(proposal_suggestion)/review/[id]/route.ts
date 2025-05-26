import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import reviewService from "src/services/reviewService";

interface Params {
    id: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    const review_id = parseInt(params.id);

    const session = await getSession();

    try {
        await reviewService.remove(review_id)

        return NextResponse.json({
            success: true,
            message: "Success deleting data",
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }

}
