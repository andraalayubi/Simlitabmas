import { NextRequest, NextResponse } from 'next/server';
import schemaService from 'src/services/schemaService';
import { getSession } from "src/lib/session";
import filterService from 'src/services/filterService';

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();

        let filter = filterService.getFilter(request.nextUrl.searchParams, [
            { key: "id", type: "number" },
            { key: "name", type: "string" },
            { key: "is_active", type: "boolean" },
            { key: "min_degree", type: "string" },
        ]);

        const schemas = await schemaService.getByFilter(filter);

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

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        const body = await request.json();
        
        const newSchema = {
            name: body.name,
            description: body.description,
            min_degree: body.min_degree,
            is_lecturer: body.is_lecturer,
            is_student: body.is_student,
            is_partner: body.is_partner,
            type: body.type
        };

        const schema = await schemaService.create(newSchema);

        const positionsToCreate = Object.entries(body.positions)
            .filter(([_, value]) => value === true)
            .map(([positionId]) => ({
                schema_id: schema.id,
                position_id: Number(positionId)
            }));

        const position = await schemaService.createPosition(positionsToCreate);

        return NextResponse.json({
            success: true,
            message: "Success creating data",
            data: schema
        }, { status: 201 });
    } catch (error: any) {
        console.log(error);

        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}