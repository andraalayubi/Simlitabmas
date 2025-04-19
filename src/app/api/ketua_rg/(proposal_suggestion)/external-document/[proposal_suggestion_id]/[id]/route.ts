import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import externalDocumentService from "src/services/externalDocumentService";

interface Params {
    id: string;
}


export async function PUT(req: NextRequest, { params }: { params: Params }) {
    const id = parseInt(params.id)
    const payload = await req.json();

    try {
        const session = await getSession();

        if (isNaN(id)) {
            return NextResponse.json({
                success: false,
                message: "Id not found"
            }, { status: 400 });
        }

        const external_document = await externalDocumentService.update(id, payload)

        return NextResponse.json({
            success: true,
            message: "Success update external document",
            data: external_document
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    const id = parseInt(params.id)


    try {
        const session = await getSession();

        if (isNaN(id)) {
            return NextResponse.json({
                success: false,
                message: "Id not found"
            }, { status: 400 });
        }

        const external_document = await externalDocumentService.deleteById(id);

        return NextResponse.json({
            success: true,
            message: "Success update external document",
            data: external_document
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}