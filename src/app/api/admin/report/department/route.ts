import reportService from "src/services/reportService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const departments = await reportService.getDepartment();

    return NextResponse.json(
      {
        success: true,
        message: "Successfully retrieved department data",
        data: departments
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to retrieve department data: ${error}`,
      },
      { status: 500 }
    );
  }
}