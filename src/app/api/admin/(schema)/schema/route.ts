import { NextRequest, NextResponse } from 'next/server';
import schemaService from 'src/services/schemaService';

export async function GET(request: NextRequest) {
    try {
        const schemas = await schemaService.getAllActive();

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: schemas
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}