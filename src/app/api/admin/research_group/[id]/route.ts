import { getSession } from "src/lib/session";
import { NextRequest, NextResponse } from "next/server";
import researchGroupService from "src/services/researchGroupService";

interface Params {
    id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    const research_group_id = parseInt(params.id);

    try {
        const session = await getSession();

        const research_group = await researchGroupService.getById(research_group_id);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: research_group
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}