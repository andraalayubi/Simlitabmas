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
    return await prisma.proposal.findUnique({
        where: { proposal_suggestion_id: proposalSuggestionId },
    });
};


const proposalService = {
    getById,
    getByProposalSuggestionId,
}


export default proposalService;