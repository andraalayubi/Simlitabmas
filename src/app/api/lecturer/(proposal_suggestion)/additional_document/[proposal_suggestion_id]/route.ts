import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import additionalDocumentService from "src/services/additionalDocumentService";

export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const proposalSuggestionId = parseInt(params.proposal_suggestion_id, 10);
        const evaluations = await additionalDocumentService.getById(proposalSuggestionId);
        
        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: evaluations
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
    try {      
        const proposalSuggestionId = parseInt(params.proposal_suggestion_id, 10);

        const body = await req.json();

        const result = await additionalDocumentService.create({
            proposal_suggestion_id: proposalSuggestionId,
            name: body.name,
            file_url: body.fileUrl,
        });

        return NextResponse.json({
            success: true,
            data: result,
            message: "Additional document created successfully"
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error creating additional document:", error);
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {      
        const body = await req.json();

        const result = await additionalDocumentService.update({
            id: body.id,
            name: body.name,
            file_url: body.fileUrl,
        });

        return NextResponse.json({
            success: true,
            data: result,
            message: "Additional document updated successfully"
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error updating additional document:", error);
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}