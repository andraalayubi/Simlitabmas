import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import researchGroupService from 'src/services/researchGroupService';

export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const id = Number(params.id);
    const research_groups = await researchGroupService.getProfileRG(id);
   
    return NextResponse.json({
      success: true,
      message: "Success getting data",
      data: research_groups[0]
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Internal Server error: ${error.message}`
    }, { status: 500 });
  }
}