import reportService from "src/services/reportService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const lecturers = await reportService.getLecturer();

    return NextResponse.json(
      {
        success: true,
        message: "Successfully retrieved lecturer data",
        data: lecturers
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to retrieve lecturer data: ${error}`,
      },
      { status: 500 }
    );
  }
}
