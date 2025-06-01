import { lecturer, lecturer_member } from "prisma/interfaces";
import prisma from "../client/prisma";
import { JsonArray } from "@prisma/client/runtime/library";

// get by id
const getById = async (id: number) => {
    return await prisma.lecturer.findUnique({
        where: { id: id }
    });
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
        is_kaprodi?: boolean
        is_ketua_rg?: boolean
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

const update = async (lecturer_id: number, lecturer: any) => {
    return await prisma.lecturer.update({
        where: { id: lecturer_id },
        data: lecturer
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

// get lecturer_id by schema id
const getLecturerIdsBySchema = async (proposalSuggestionId: number) => {

    const proposalSuggestion = await prisma.proposal_suggestion.findUnique({
        where: { id: proposalSuggestionId },
        include: {
            schema: true,
        }
    });

    const schema = proposalSuggestion?.schema;

    const positionSchemas = await prisma.position_schema.findMany({
        where: {schema_id: proposalSuggestion?.schema_id!}
    })

    const allowedlecturerIds = [];

    const lecturers  = await prisma.lecturer.findMany();

    const degreeHierarchy = ['S1', 'S2', 'S3'];
    const minDegreeIndex = degreeHierarchy.indexOf(schema?.min_degree!);

    const allowedPositionIds = positionSchemas.map(ps => ps.position_id);

    const allowedLecturers = lecturers.filter(lecturer => {
        const lecturerDegreeIndex = degreeHierarchy.indexOf(lecturer.highest_degree!);
        
        const isDegreeValid = lecturerDegreeIndex >= minDegreeIndex;
        
        // Cek position_id
        const isPositionValid = allowedPositionIds.includes(lecturer.position_id!);

        return isDegreeValid && isPositionValid;
    });

    return allowedLecturers.map(lecturer => lecturer.id);
}

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

// get data for profile
const getProfile = async (id: number) => {
    const result = await prisma.$queryRaw<any[]>`
    SELECT 
      l.*,
      d.id as department_id, d.name as department_name,
      rg.id as research_group_id, rg.name as research_group_name,
      p.id as position_id, p.name as position_name,
      (SELECT COUNT(*) FROM proposal_suggestions WHERE lecturer_id = l.id) as leader_proposal,
      (SELECT COUNT(*) FROM lecturer_members JOIN proposal_suggestions ps ON ps.id = lecturer_members.proposal_suggestion_id WHERE lecturer_members.lecturer_id = l.id AND ps.research_group_id IS NOT NULL) as penelitian_count,
      (SELECT COUNT(*) FROM lecturer_members JOIN proposal_suggestions ps ON ps.id = lecturer_members.proposal_suggestion_id WHERE lecturer_members.lecturer_id = l.id AND ps.research_group_id IS NULL) as pengmas_count
    FROM lecturers l
    LEFT JOIN departments d ON l.department_id = d.id
    LEFT JOIN research_groups rg ON l.research_group_id = rg.id
    LEFT JOIN positions p ON l.position_id = p.id    
    WHERE l.id = ${id}
  `;

    if (Array.isArray(result) && result.length > 0) {
        // Convert BigInt values to numbers or strings
        const processedResult: { [key: string]: any } = {};
        for (const [key, value] of Object.entries(result[0])) {
            if (typeof value === 'bigint') {
                processedResult[key] = Number(value);
            } else {
                processedResult[key] = value;
            }
        }

        return {
            id: processedResult.id,
            name: processedResult.name,
            nip: processedResult.nip,
            nidn: processedResult.nidn,
            degree: processedResult.degree,
            phone_number: processedResult.phone_number,
            department: processedResult.department_id ? { id: processedResult.department_id, name: processedResult.department_name } : null,
            research_group: processedResult.research_group_id ? { id: processedResult.research_group_id, name: processedResult.research_group_name } : null,
            position: processedResult.position_id ? { id: processedResult.position_id, name: processedResult.position_name } : null,
            penelitianCount: Number(processedResult.penelitian_count),
            pengmasCount: Number(processedResult.pengmas_count),
            leaderProposal: Number(processedResult.leader_proposal),
        };
    }

    return null;
};

const lecturerService = {
    getById,
    getAllActive,
    getByFilter,
    getLecturerIdsBySchema,
    create,
    update,
    remove,
    getAvailableLecturers,
    addLecturerMember,
    getProfile
}

export default lecturerService;