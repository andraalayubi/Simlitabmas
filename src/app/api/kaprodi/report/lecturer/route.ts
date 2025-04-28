import reportService from "src/services/reportService";
import { NextResponse } from "next/server";
import { getSession } from "src/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    const lecturers = await reportService.getLecturerByDepartmentId(
      (session as { department_id: number }).department_id
    );
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
