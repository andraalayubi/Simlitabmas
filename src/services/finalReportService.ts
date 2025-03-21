import prisma from "src/client/prisma";

const getByProposalSuggestionId = async (proposalSuggestionId: number) => {

    return await prisma.proposal_suggestion.findUnique({
        relationLoadStrategy: 'join',
        where: { id: proposalSuggestionId },
        include: {
            final_report: {
                orderBy: {
                    id: 'asc'
                }
            }
        },
    })
}

interface FinalReport {
    file_url?: string;
    name?: string;
    description?: string;
}

const update = async (final_report_id: number, data: FinalReport) => {

    const updatedFinalReport = await prisma.final_report.update({
        where: {
            id: final_report_id
        },
        data: data,
    });

    return updatedFinalReport;
}

const create = async (proposal_suggestion_id: number, data: FinalReport) => {
    return prisma.final_report.create({
        data: {
            name: data.name,
            file_url: data.file_url,
            proposal_suggestion_id: proposal_suggestion_id
        }
    })
}

const finalReportService = {
    update,
    create,
    getByProposalSuggestionId,
}

export default finalReportService

