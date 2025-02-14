import prisma from "../client/prisma";
import { lecturer } from "prisma/interfaces";

// get by id
const getById = async (id: number) => {
    return await prisma.lecturer.findUnique({
        where: { id: id },
    })
}

// get all active
const getAllActive = async () => {
    return await prisma.lecturer.findMany({
        where: { deleted: false },
        select: {
            id: true,
            name: true,
            nidn: true,
            nip: true,
        }
    });
};

// add lecturer to proposal suggestion
const addToProposalSuggestion = async (proposalSuggestionId: number, lecturerId: number) => {
    return await prisma.proposal_suggestion.update({
        where: { id: proposalSuggestionId },
        data: { 
            lecturer_id: lecturerId 
        },
        select: {
            id: true,
            lecturer_id: true
        }
    });
};

const lecturerService = {
    getById,
    getAllActive,
    addToProposalSuggestion,
}

export default lecturerService;