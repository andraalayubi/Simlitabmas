import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'src/lib/session';
import filterService from 'src/services/filterService';
import schemaService from 'src/services/schemaService';

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