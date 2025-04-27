import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import configurationService from "src/services/configurationService";
import proposalSuggestionService from "src/services/proposalSuggestionService";


export async function GET(req: NextRequest) {
    try {

        const session = await getSession();

        const config = await configurationService.get();

        return NextResponse.json({
            success: true,
            message: "Success update configuration",
            data: config
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}



export async function PUT(req: NextRequest) {
    const payload = await req.json();


    try {
        const session = await getSession();

        // check updated data
        const lastConfig = await configurationService.get();

        // update all proposal suggestion open
        if (payload.year_research_id != lastConfig?.year_research_id) {

            const year_research_id = parseInt(payload.year_research_id);

            await proposalSuggestionService.updateByWhere(
                { year_research_id: year_research_id },
                { open: true }
            )

            await proposalSuggestionService.updateByWhere(
                {
                    year_research_id: {
                        not: year_research_id
                    }
                },
                { open: false }
            )
        }

        const config = await configurationService.update(payload);

        return NextResponse.json({
            success: true,
            message: "Success update configuration",
            data: config
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}