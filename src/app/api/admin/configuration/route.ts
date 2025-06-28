import { Schema } from "@tiptap/pm/model";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import configurationService from "src/services/configurationService";
import proposalSuggestionService from "src/services/proposalSuggestionService";
import schemaService from "src/services/schemaService";
import yearResearchService from "src/services/yearResearchService";


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

        // update all proposal suggestion open column
        if (payload.year_research_id != lastConfig?.year_research_id) {

            const year_research_id = parseInt(payload.year_research_id);

            // update all proposal suggestion 'open' column
            await proposalSuggestionService.updateByWhere(
                { year_research_id: year_research_id, is_active: true },
                { open: true }
            )

            await proposalSuggestionService.updateByWhere(
                {
                    year_research_id: {
                        not: year_research_id
                    }, is_active: true
                },
                { open: false }
            )

            // update column is_active year_research
            await yearResearchService.update(year_research_id, { is_active: true })

            await yearResearchService.update(lastConfig?.year_research_id!, { is_active: false })
        }

        const config = await configurationService.update({ year_research_id: payload.year_research_id, template_proposal: payload.template_proposal, template_external_document: payload.template_external_document, template_logbook: payload.template_logbook, template_final_report: payload.template_final_report });

        // update active schema
        payload.schemas.map(async (item: any) => {
            return await schemaService.update(item.schema_id, { is_active: item.is_active });
        })

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