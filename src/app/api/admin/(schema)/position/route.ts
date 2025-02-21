import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import positionService from "src/services/positionService";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();

        const research_groups = await positionService.getAllActive();

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: research_groups
        }, {
            status: 200,
        },)

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}