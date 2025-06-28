import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'src/lib/session';
import proposalSuggestionService from 'src/services/proposalSuggestionService';
import yearResearchService from 'src/services/yearResearchService';

export async function GET(request: NextRequest) {
    try {

        const session = await getSession();

        const proposal_suggestions = await proposalSuggestionService.getByFilter({ research_group_id: session?.research_group_id! }, { year_research: true })

        const year_researches = await yearResearchService.getByFilter({});

        let year_research_data = year_researches.map((year) => {

            const per_year = proposal_suggestions.filter((item: any) => 
                item.year_research_id == year.id
            )

            return {
                year: year,
                count: per_year.length
            };

        })

        year_research_data = year_research_data.sort((a, b) =>
            a.year.year - b.year.year
        );

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: year_research_data
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}