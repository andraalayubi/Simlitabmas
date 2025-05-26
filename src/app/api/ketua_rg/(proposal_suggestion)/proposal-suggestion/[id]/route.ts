import { getSession } from "src/lib/session";
import { NextRequest, NextResponse } from "next/server";
import proposalSuggestionService from "src/services/proposalSuggestionService";


interface Params {
    id: string;
}


export async function GET(req: NextRequest, { params }: { params: Params }) {
    const proposal_suggestion_id = parseInt(params.id);

    try {
        const session = await getSession();

        if (isNaN(proposal_suggestion_id)) {
            return NextResponse.json({
                success: false,
                message: "Id not found"
            }, { status: 400 });
        }

        const proposal_suggestion = await proposalSuggestionService.getById(proposal_suggestion_id);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: proposal_suggestion
        }, { status: 200 })


    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }

}


export async function PUT(req: NextRequest, { params }: { params: Params }) {
    const proposal_suggestion_id = parseInt(params.id);
    const data = await req.json();

    try {
        const session = await getSession();

        const proposal_suggestion = await proposalSuggestionService.update(proposal_suggestion_id, data)

        return NextResponse.json({
            success: true,
            message: "Success update proposal suggestion",
            data: proposal_suggestion
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
    const proposal_suggestion_id = parseInt(params.id);
    const { user_type } = await req.json();

    const category = user_type === "ketua_rg" ? "penelitian" : "pengmas";

    try {
        const session = await getSession();

        const proposal_suggestion = await proposalSuggestionService.createEvaluation(proposal_suggestion_id, category)

        return NextResponse.json({
            success: true,
            message: "Success",
            data: proposal_suggestion
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}