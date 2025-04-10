import proposalSuggestionService from "src/services/proposalSuggestionService";
import { NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import lecturerService from "src/services/lecturerService";

export async function GET() {
  try {
    const session = await getSession();
    const lecturer_id = session?.lecturer_id;
    const lecturer = await lecturerService.getById(Number(lecturer_id));

    const include = {
      schema: true,
      lecturer: true,
      department: true,
    };

    // get by filter
    const proposal_suggestions = await proposalSuggestionService.getByFilter({is_active: true, department_id: Number(lecturer?.department_id), research_group_id: null}, include);

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
