import reportService from "src/services/reportService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const research_groups = await reportService.getResearchGroup();

    return NextResponse.json(
      {
        success: true,
        message: "Successfully retrieved research_group data",
        data: research_groups
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to retrieve research_group data: ${error}`,
      },
      { status: 500 }
    );
  }
}
