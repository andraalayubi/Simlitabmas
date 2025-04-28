import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import departmentService from 'src/services/departmentService';

export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const id = Number(params.id);
    const department = await departmentService.getProfile(id);
   
    return NextResponse.json({
      success: true,
      message: "Success getting data",
      data: department[0]
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Internal Server error: ${error.message}`
    }, { status: 500 });
  }
}