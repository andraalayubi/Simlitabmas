import proposalSuggestionService from "src/services/proposalSuggestionService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const include = {
      schema: true,
      lecturer: true,
      year_research: true,
      department: true,
    };

    const proposal_suggestions = await proposalSuggestionService.getByFilter({is_active: true}, include);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully retrieved proposal data",
        data: proposal_suggestions
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to retrieve proposal data: ${error}`,
      },
      { status: 500 }
    );
  }
}
