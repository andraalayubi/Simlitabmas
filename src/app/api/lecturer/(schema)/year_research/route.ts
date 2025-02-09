import { NextRequest, NextResponse } from 'next/server';
import yearResearchService from 'src/services/yearResearchService';

export async function GET(request: NextRequest) {
  try {
    const year_researches = await yearResearchService.getAllActive();

    return NextResponse.json({
      success: true,
      message: "Success getting data",
      data: year_researches
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Internal Server error: ${error.message}`
    }, { status: 500 });
  }
}