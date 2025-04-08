import proposalSuggestionService from "src/services/proposalSuggestionService";
import { NextResponse } from "next/server";
import { getSession } from "src/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    console.log('tes', session);
    
    const lecturer_id = session?.lecturer_id;

    const include = {
      schema: true,
      lecturer: true,
      department: true,
    };

    // get by filter
    const proposal_suggestions = await proposalSuggestionService.getByFilter({is_active: true, lecturer_id: Number(lecturer_id)}, include);

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
