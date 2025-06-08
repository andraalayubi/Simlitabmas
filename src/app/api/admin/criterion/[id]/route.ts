import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import criterionService from "src/services/criterionService";

interface Params {
    id: string;
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
    const criterion_id = parseInt(params.id);

    try {
        const session = await getSession();

        const criterion = await criterionService.update(criterion_id);

        return NextResponse.json({
            success: true,
            message: "Success deleting data",
            data: criterion
        }, { status: 200 });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }

}