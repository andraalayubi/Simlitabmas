import { getSession } from "src/lib/session";
import proposalSuggestionService from "src/services/proposalSuggestionService";
import { NextRequest, NextResponse } from "next/server";
import { proposal_suggestion_phase, proposal_suggestion_status } from "prisma/interfaces";
import filterService from "src/services/filterService";
import lecturerService from "src/services/lecturerService";
import proposalService from "src/services/proposalService";
import logbookService from "src/services/logbookService";
import finalReportService from "src/services/finalReportService";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        let filter = filterService.getFilter(req.nextUrl.searchParams, [
            { key: "id", type: "number" },
            { key: "status", type: "string" },
            { key: "year_research_id", type: "number" },
            { key: "schema_id", type: "number" },
            { key: "lecturer_id", type: "number" },
            { key: "research_group_id", type: "number" },
            { key: "is_active", type: "boolean" },
        ]);

        // Cek apakah lecturer_id adalah "null" dan ubah menjadi null
        if (req.nextUrl.searchParams.get("lecturer_id") === "null") {
            filter = { ...filter, lecturer_id: null };
        }

        const include = {
            schema: req.nextUrl.searchParams.get("get_schema") === "true",
            lecturer: req.nextUrl.searchParams.get("get_lecturer") === "true",
            research_group: req.nextUrl.searchParams.get("get_research_group") === "true",
            year_research: req.nextUrl.searchParams.get("get_year_research") === "true",
            department: req.nextUrl.searchParams.get("get_department") === "true",
        };

        const proposal_suggestions = await proposalSuggestionService.getByFilter(filter, include);

        return NextResponse.json({
            success: true,
            message: "Success getting data",
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
        const body = await req.json();

        // Convert string IDs to numbers
        const proposalData = {
            ...body,
            research_group_id: Number(body.research_group_id) || null,
            schema_id: Number(body.schema_id),
            year_research_id: Number(body.year_research_id),
            lecturer_id: Number(body.lecturer.id),
            department_id: Number(body.lecturer.department_id),
            phase: 'pengajuan' as proposal_suggestion_phase,
            status: 'tersimpan' as proposal_suggestion_status,
            is_active: true
        };

        // Create proposal suggestion
        const newProposalSuggestion = await proposalSuggestionService.create(proposalData);

        if (!newProposalSuggestion?.id) {
            throw new Error("Failed to create proposal suggestion: ID is missing");
        }

        const result = await lecturerService.addLecturerMember(newProposalSuggestion.id, body.lecturer);

        // create proposal
        await proposalService.create(newProposalSuggestion.id, {
            name: newProposalSuggestion.name,
            file_url: '',
        })

        // create empty logbook with 2 phase
        await logbookService.create(newProposalSuggestion.id, {
            name: 'Logbook 1',
            file_url: '',
            description: '',
        })

        await logbookService.create(newProposalSuggestion.id, {
            name: 'Logbook 2',
            file_url: '',
            description: '',
        })

        // create empty final report with 2 phase
        await finalReportService.create(newProposalSuggestion.id, {
            name: 'Laporan Kemajuan',
            file_url: '',
            description: '',
        })
        
        await finalReportService.create(newProposalSuggestion.id, {
            name: 'Laporan Akhir',
            file_url: '',
            description: '',
        })

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