import proposalSuggestionService from "src/services/proposalSuggestionService";
import { NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import lecturerService from "src/services/lecturerService";
import { Workflow } from "src/lib/workflow";

export async function GET() {
  try {
    const session = await getSession();
    const lecturer_id = session?.lecturer_id;
    const lecturer = await lecturerService.getById(Number(lecturer_id));

    const include = {
      schema: true,
      lecturer: true,
      year_research: true,
      department: true,
    };

    // get by filter
    const proposal_suggestions = await proposalSuggestionService.getByFilter({ is_active: true, research_group_id: Number(lecturer?.research_group_id) }, include);

    // filter which suggestion that need action from this role
    const workflow = new Workflow();
    const valid_proposal_suggestion = proposal_suggestions.filter((item: any) => {

      if (item.status === null || item.phase === null) return false;

      const action = workflow.getAction(item.status, item.phase, 'ketua_rg', 'penelitian');
      return action !== null;
    });

    // build response
    const data = {
      count_in_research_group : proposal_suggestions.length,
      count: valid_proposal_suggestion.length,
      list : valid_proposal_suggestion
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success getting data",
        data: data
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Internal Server Error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
