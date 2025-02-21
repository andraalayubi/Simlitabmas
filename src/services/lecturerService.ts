import { lecturer_member } from "prisma/interfaces";
import prisma from "../client/prisma";
import { JsonArray } from "@prisma/client/runtime/library";

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
        },
        select: {
            id: true,
            name: true
        }
    });
};

// add lecturer to proposal suggestion
const addLecturerMember = async (proposalSuggestionId: number, anggota: lecturer_member[] | lecturer_member) => {
    const lecturers = Array.isArray(anggota) ? anggota : [anggota];

    const result = await prisma.lecturer_member.createMany({
        data: lecturers.map((lecturer) => ({
            proposal_suggestion_id: proposalSuggestionId,
            lecturer_id: Number(lecturer.id),
            name: lecturer.name,
            research_group_id: lecturer.research_group_id,
            department_id: lecturer.department_id,
            nip: lecturer.nip,
            degree: lecturer.degree as JsonArray,
            is_ketua_rg: lecturer.is_ketua_rg,
            position_id: lecturer.position_id,
            signature_url: lecturer.signature_url
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