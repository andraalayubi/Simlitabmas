import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import externalDocumentCategoryService from "src/services/externalDocumentCategoryService";
import externalDocumentService from "src/services/externalDocumentService";

interface Params {
    proposal_suggestion_id: string;
}


export async function GET(req: NextRequest, { params }: { params: Params }) {
    const proposal_suggestion_id = parseInt(params.proposal_suggestion_id)

    try {
        const session = await getSession();

        const external_doc = await externalDocumentService.getByProposalSuggestionId(proposal_suggestion_id)

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: external_doc
        })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}


export async function POST(req: NextRequest, { params }: { params: Params }) {
    const proposal_suggestion_id = parseInt(params.proposal_suggestion_id)
    const payload = await req.json();

    const session = await getSession();

    try {

        const external_document_category = await externalDocumentCategoryService.getById(payload.external_document_category_id)

        const data = {
            name: external_document_category?.name,
            description: external_document_category?.description,
            category_name: external_document_category?.name,
            file_url: "",
            status: "",
        }

        const external_doc = await externalDocumentService.create(proposal_suggestion_id, data)

        return NextResponse.json({
            success: true,
            message: "Success creat external document",
            data: external_doc
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}



