import { proposal, proposal_suggestion_status } from "prisma/interfaces";
import prisma from "../client/prisma";

// declare column can be update
interface Proposal {
    name?: string;
    file_url?: string;
}

const create = async (proposalSuggestionId: number, data: Proposal) => {
    return await prisma.proposal.create({
        data: {
            name: data.name, file_url: data.file_url,
            proposal_suggestion_id: proposalSuggestionId
        }
    });
}

// get by id
const getById = async (id: number) => {
    return await prisma.proposal.findUnique({
        where: { id: id },
    })
}

// get by proposal_suggestion_id
const getByProposalSuggestionId = async (proposalSuggestionId: number) => {
    const proposalSuggestion = await prisma.proposal_suggestion.findUnique({
        relationLoadStrategy: 'join',
        where: { id: proposalSuggestionId },
        include: {
            proposal: true,
            evaluation: {
                include:  {
                    review: {
                        include: {
                            reviewer: {
                                include: {
                                    lecturer: true
                                }
                            },
                        }
                    }
                }
            }
        }
    });

    const configuration = await prisma.configuration.findFirst();
    
    return {
        ...proposalSuggestion,
        template_proposal: configuration?.template_proposal
    }
};

const update = async (proposal_suggestion_id: number, data: Proposal) => {
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

const deleteProposal = async (proposal_suggestion_id: number) => {
    return await prisma.proposal.update({
        where: { proposal_suggestion_id },
        data: { file_url: null },
    });
}

const proposalService = {
    getById,
    getByProposalSuggestionId,
    update,
    create,
    updateByProposalSection,
    deleteProposal,
}


export default proposalService;