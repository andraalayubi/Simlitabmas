import { proposal_suggestion_status } from "prisma/interfaces";
import prisma from "../client/prisma";


// get by id
const getById = async (id: number) => {
    return await prisma.proposal.findUnique({
        where: { id: id },
    })
}

// get by proposal_suggestion_id
const getByProposalSuggestionId = async (proposalSuggestionId: number) => {
    return await prisma.proposal_suggestion.findUnique({
        relationLoadStrategy: 'join',
        where: { id: proposalSuggestionId },
        include: {
            proposal: true
        }
    });
};

// save by proposal section/part
const updateByProposalSection = async (proposal_suggestion_id: number, section: string, data: string) => {

    // update by key
    const updateData: { [key: string]: string } = {};
    updateData[section] = data;

    console.log(updateData);

    return await prisma.proposal.update({
        where: { proposal_suggestion_id: proposal_suggestion_id },
        data: updateData
    });
}

const proposalService = {
    getById,
    getByProposalSuggestionId,
    updateByProposalSection,
}


export default proposalService;