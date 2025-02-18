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
const addLecturerMember = async (proposalSuggestionId: number, lecturerIds: number[] | number) => {
    const ids = Array.isArray(lecturerIds) ? lecturerIds : [lecturerIds];

    const result = await prisma.lecturer_member.createMany({
        data: ids.map((lecturerId) => ({
            proposal_suggestion_id: proposalSuggestionId,
            lecturer_id: Number(lecturerId),
        })),
        skipDuplicates: true,
    });

    return result;
};



const lecturerService = {
    getById,
    getAllActive,
    addLecturerMember,
}

export default lecturerService;