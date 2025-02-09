import prisma from "@/app/client/prisma";
import { getSession } from "@/app/lib/session";
import proposalSuggestionService from "@/app/services/proposalSuggestionService";
import { NextRequest, NextResponse } from "next/server";
import { proposal_suggestion_status } from "prisma/interfaces";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);

        const filter = {
            status: searchParams.get("status") as proposal_suggestion_status | undefined,
            year_research_id: searchParams.get("year_research_id") ? Number(searchParams.get("year_research_id")) : undefined,
            schema_id: searchParams.get("schema_id") ? Number(searchParams.get("schema_id")) : undefined,
            lecturer_id: searchParams.get("lecturer_id") ? Number(searchParams.get("lecturer_id")) : undefined,
            research_group_id: searchParams.get("research_group_id") ? Number(searchParams.get("research_group_id")) : undefined,
            is_active: searchParams.get("is_active") ? searchParams.get("is_active") === "true" : undefined,
        };


        // filter params
        const filteredParams = Object.fromEntries(
            Object.entries(filter).filter(([_, value]) => value !== undefined)
        );

        // get by filter
        const proposal_suggestions = await proposalSuggestionService.getByFilter(filteredParams);

        return NextResponse.json({
            success: true,
            data: proposal_suggestions,
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();

        // Type guard to ensure user_id is a number
        if (!session || typeof session.user_id !== 'number') {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
              id: session.user_id, 
            },
            select: {
              lecturer_id: true,
            },
          });
      
          if (!user || !user.lecturer_id) {
            throw new Error('Lecturer ID not found for the current user.');
          }

        // Parse request body
        const body = await req.json();

        // Convert string IDs to numbers
        const proposalData = {
            ...body,
            research_group_id: Number(body.research_group_id),
            schema_id: Number(body.schema_id),
            year_research_id: Number(body.year_research_id),
            lecturer_id: user.lecturer_id,
            status: 'tersimpan' as proposal_suggestion_status,
            is_active: true
        };
        console.log(proposalData);

        // Create proposal suggestion
        const newProposalSuggestion = await proposalSuggestionService.create(proposalData);

        return NextResponse.json({
            success: true,
            data: newProposalSuggestion,
            message: "Proposal suggestion created successfully"
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error creating proposal suggestion:", error);
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}