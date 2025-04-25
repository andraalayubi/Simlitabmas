import { proposal_suggestion_phase } from "prisma/interfaces";
import prisma from "src/client/prisma";

const getByProposalSuggestionId = async (proposalSuggestionId: number) => {

    return await prisma.proposal_suggestion.findUnique({
        relationLoadStrategy: 'join',
        where: { id: proposalSuggestionId },
        include: {
            logbook: {
                orderBy: {
                    id: 'asc'
                }
            },
            year_research: true
        }
    })
}

interface Logbook {
    file_url?: string;
    name?: string;
    description?: string;
}

const update = async (logbook_id: number, data: Logbook) => {

    const updatedLogbook = await prisma.logbook.update({
        where: {
            id: logbook_id
        },
        data: data,
    });

    return updatedLogbook;
}

const create = async (proposal_suggestion_id: number, data: Logbook) => {
    return prisma.logbook.create({
        data: {
            name: data.name,
            file_url: data.file_url,
            proposal_suggestion_id: proposal_suggestion_id
        }
    })
}

const logbookService = {
    update,
    create,
    getByProposalSuggestionId,
}


export default logbookService

