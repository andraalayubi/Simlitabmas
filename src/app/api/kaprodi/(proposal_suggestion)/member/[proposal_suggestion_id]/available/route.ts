import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import lecturerService from "src/services/lecturerService";
import memberService from "src/services/memberService";
import proposalSuggestionService from "src/services/proposalSuggestionService";
import schemaService from "src/services/schemaService";

export async function GET(req: NextRequest, { params }: { params: Params }) {

    try {
        const proposalSuggestionId = parseInt(params.proposal_suggestion_id, 10);

        const proposalSuggestion = await proposalSuggestionService.getById(proposalSuggestionId);

        // get lecturer not already inlcude in lecturer member
        const availableLecturers = await lecturerService.getAvailableLecturers(proposalSuggestionId);

        // let lecturers = availableLecturers;

        // // check schema if research
        // if (proposalSuggestion?.research_group_id != null) {
            
        //     const validLecturerIds = await lecturerService.getLecturerIdsBySchema(proposalSuggestionId)
            
        //     lecturers = availableLecturers.filter(lecturer => 
        //         validLecturerIds.includes(lecturer.id)
        //     );
        // }

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: availableLecturers
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const result = await memberService.getLecturerByIds(body.anggota)

        return NextResponse.json({
            success: true,
            data: result,
            message: "Success getting data lecturers"
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error creating proposal suggestion:", error);
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}