import prisma from "../client/prisma";

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
    });
};

const getByFilter = async (
    filter: {
        department_id?: number,
        research_group_id?: number
        position_id?: number
    }, include: any
) => {

    return await prisma.lecturer.findMany({
        where: {
            ...filter,
            deleted: false
        },
        include: include
    })
}

const create = async (lecturer: any) => {
    return await prisma.lecturer.create({
        data: lecturer
    })
}

// soft delete
const remove = async (lecturer_id: number) => {
    return await prisma.lecturer.update({
        where: { id: lecturer_id },
        data: { deleted: true }
    })
}

// get available lecturer for multiselect
const getAvailableLecturers = async (proposalSuggestionId: number) => {
    return await prisma.lecturer.findMany({
        where: {
            deleted: false,
            lecturer_member: {
                none: { proposal_suggestion_id: proposalSuggestionId }
            },
            proposal_suggestion: {
                none: { id: proposalSuggestionId }
            }
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
    getByFilter,
    create,
    remove,
    getAvailableLecturers,
    addLecturerMember,
}

export default lecturerService;