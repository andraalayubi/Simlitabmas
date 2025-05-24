import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'src/lib/session';
import externalDocumentCategoryService from 'src/services/externalDocumentCategoryService';
import positionService from 'src/services/positionService';
import positionSchemaService from 'src/services/schemaPositionService';
import schemaService from 'src/services/schemaService';

interface Params {
    id: string;
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    const schema_id = parseInt(params.id);
    const payload = await req.json();
    try {

        const session = await getSession();

        const existingSchema = await schemaService.getById(schema_id);

        if (existingSchema?.type == "penelitian") {

            // handle position schema
            const positions = await positionService.getAllActive();

            let newPositionSchema = positions.map((item: any) => {
                if (payload.positions.includes(item.name)) {
                    return {
                        schema_id: schema_id,
                        position_id: item.id
                    }
                }
            })

            // overwrite positions schema
            await positionSchemaService.deleteByWhere({ schema_id: schema_id })
            await positionSchemaService.createMany(newPositionSchema);
            delete payload.positions
        }


        // handle external document
        const newExternalDocumentCategory = payload.external_document_categories.map((item: any) => {
            return {
                schema_id: schema_id,
                name: item.name,
                description: item.description
            }
        })

        await externalDocumentCategoryService.deleteByWhere({ schema_id: schema_id });
        await externalDocumentCategoryService.createMany(newExternalDocumentCategory)
        delete payload.external_document_categories;

        const updatedSchema = await schemaService.update(schema_id, payload)

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: updatedSchema
        }, { status: 200 });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}