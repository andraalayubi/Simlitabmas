import { proposal, proposal_suggestion_status } from "prisma/interfaces";
import prisma from "../client/prisma";

// declare column can be update
interface UpdateProposal {
    name?: string;
    file_url?: string;
}



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

const update = async (proposal_suggestion_id: number, data: UpdateProposal) => {
    const updatedProposal = await prisma.proposal.update({
        where: { proposal_suggestion_id },
        data: data,
    });
    return updatedProposal;
}

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
    update,
    updateByProposalSection,
}


export default proposalService;