import prisma from "../../../../../prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const proposal = await prisma.proposal_suggestion.count();
    const researchProposalNotNull = await prisma.proposal_suggestion.count({
      where: {
        research_group_id: {
          not: null,
        },
      },
    });
    const communityProposal = await prisma.proposal_suggestion.count({
      where: {
        research_group_id: null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully retrieved proposal data",
        data: proposal,
        researchProposalNotNull,
        communityProposal,
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
