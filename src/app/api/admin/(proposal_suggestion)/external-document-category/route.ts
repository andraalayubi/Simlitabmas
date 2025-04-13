import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import externalDocumentCategoryService from "src/services/externalDocumentCategoryService";



export async function GET(req: NextRequest) {
    try {
        const session = await getSession();

        const external_document_categories = await externalDocumentCategoryService.getAll()

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: external_document_categories
        })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}