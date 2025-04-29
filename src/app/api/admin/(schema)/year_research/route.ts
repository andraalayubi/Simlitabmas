import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'src/lib/session';
import filterService from 'src/services/filterService';
import yearResearchService from 'src/services/yearResearchService';

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();

        let filter = filterService.getFilter(request.nextUrl.searchParams, [
            { key: "id", type: "number" },
            { key: "year", type: "number" },
            { key: "is_active", type: "boolean" },
        ]);

    const year_researches = await yearResearchService.getByFilter(filter);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: year_researches
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    console.log('kesini');
    
    const { year, open_date, closed_date } = await req.json();

    try {
        console.log(year, open_date, closed_date);
        const year_research = await yearResearchService.create({
            year,
            open_date,
            closed_date
        })

        return NextResponse.json({
            success: true,
            message: "Year Research created successfully",
            data: year_research
        },
            { status: 201 })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}