import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'src/lib/session';
import filterService from 'src/services/filterService';
import schemaService from 'src/services/schemaService';
import { degree } from 'prisma/interfaces';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    // Buat filter dari parameter URL
    let filter = filterService.getFilter(request.nextUrl.searchParams, [
      { key: "id", type: "number" },
      { key: "name", type: "string" },
      { key: "is_active", type: "boolean" },
      { key: "min_degree", type: "string" },
      { key: "position_id", type: 'number' }
    ]);

    console.log(filter.position_id)

    // Jika filter min_degree ada, modifikasi untuk mengambil semua degree yang lebih rendah/sama
    if (filter.min_degree) {
      const degreeHierarchy = {
        "S1": 1,
        "S2": 2,
        "S3": 3
      };

      const requestedDegree = filter.min_degree as degree;
      const requestedDegreeLevel = degreeHierarchy[requestedDegree as keyof typeof degreeHierarchy];

      // Ambil semua degree yang levelnya <= requested degree
      const allowedDegrees = Object.keys(degreeHierarchy)
        .filter(degree => degreeHierarchy[degree as keyof typeof degreeHierarchy] <= requestedDegreeLevel);

      // Ganti filter min_degree dengan operator 'in'
      filter.min_degree = {
        in: allowedDegrees
      };
    }

    // filter by position
    let requiredPositionId = null
    if (filter.position_id != null) {
      requiredPositionId = filter.position_id
      

      delete filter.position_id;
    }

    // Panggil service dengan filter yang sudah dimodifikasi
    let schemas = await schemaService.getByFilter(filter);

    console.log(schemas, requiredPositionId);

    if (requiredPositionId !== null) {
      schemas = schemas.filter((schema: any) => {
        // Pastikan position_schemas terload dan tidak null
        if (!schema.position_schema) return false;
        
        // Cek apakah ada position schema yang match
        return schema.position_schema.some(
          (ps: any) => ps.position_id === requiredPositionId
        );
      });
    }

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