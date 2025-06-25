import { JsonValue } from "@prisma/client/runtime/library";
import prisma from "../client/prisma";

// get by id
const getById = async (id: number) => {
    return await prisma.research_group.findUnique({
        where: { id: id },
    })
}

// get all active
const getAllActive = async () => {
    return await prisma.research_group.findMany({
        where: { deleted: false },
    });
};


// insert a new rf
const create = async (data: any) => {
    return await prisma.research_group.create({ data });
}


// get summary
const getSummaryList = async () => {
    const [researchGroups, lecturerCount, proposalSuggestionCount] = await prisma.$transaction([
        prisma.$queryRaw<{ id: bigint; name: string; description: string; createdAt: Date; updatedAt: Date; deleted: boolean; ketua_rg_id: bigint | null; ketua_rg_name: string | null }[]>`
        SELECT 
            rg.id AS "id",
            rg.name AS "name",
            rg.description AS "description",
            rg."createdAt" AS "createdAt",
            rg."updatedAt" AS "updatedAt",
            rg.deleted AS "deleted",
            l.id AS "ketua_rg_id",
            l.name AS "ketua_rg_name"
        FROM research_groups rg
        LEFT JOIN lecturers l 
            ON l.research_group_id = rg.id AND l.is_ketua_rg = TRUE
        WHERE rg.deleted = FALSE
        GROUP BY 
            rg.id, 
            rg.name, 
            rg.description, 
            l.id, 
            l.name,  
            rg."createdAt", 
            rg."updatedAt"
        ORDER BY rg.id ASC;
        `,
        prisma.$queryRaw<{ id: bigint; lecturer_count: bigint }[]>`
            SELECT 
                rg.id AS "id", 
                count(l.id) AS "lecturer_count"
            FROM research_groups rg
            LEFT JOIN lecturers l ON rg.id = l.research_group_id
            GROUP BY rg.id
            ORDER BY rg.id ASC;
        `,
        prisma.$queryRaw<{ id: bigint; proposal_suggestion_count: bigint }[]>`
            SELECT
                rg.id AS "id",
                count(ps.id) AS "proposal_suggestion_count"
            FROM research_groups rg
            LEFT JOIN proposal_suggestions ps ON rg.id = ps.research_group_id
            GROUP BY rg.id
            ORDER BY rg.id ASC;
        `
    ]);

    // map count lecturer and proposal_suggestion
    const lecturerMap = Object.fromEntries(lecturerCount.map(item => [Number(item.id), Number(item.lecturer_count)]));
    const proposalSuggestionMap = Object.fromEntries(proposalSuggestionCount.map(item => [Number(item.id), Number(item.proposal_suggestion_count)]));

    const formattedResult = researchGroups.map(group => ({
        id: Number(group.id),
        name: group.name,
        description: group.description,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
        deleted: group.deleted,
        ketua_rg_name: group.ketua_rg_name,
        proposal_suggestion_count: proposalSuggestionMap[Number(group.id)] || 0,
        lecturer_count: lecturerMap[Number(group.id)] || 0,

        ketua_rg: {
            id: group.ketua_rg_id ? Number(group.ketua_rg_id) : null,
            name: group.ketua_rg_name,
        },
        lecturer: {
            count: lecturerMap[Number(group.id)] || 0
        },
        proposal_suggestion: {
            count: proposalSuggestionMap[Number(group.id)] || 0
        }
    }));

    return formattedResult;
};

const getProfileRG = async (id: number) => {
    const [researchGroups, lecturers, proposalSuggestions] = await prisma.$transaction([
        prisma.$queryRaw<{ id: bigint; name: string; description: string; createdAt: Date; updatedAt: Date; deleted: boolean; ketua_rg_id: bigint | null; ketua_rg_name: string | null }[]>`
            SELECT 
                rg.id AS "id",
                rg.name AS "name",
                rg.description AS "description",
                rg."createdAt" AS "createdAt",
                rg."updatedAt" AS "updatedAt",
                rg.deleted AS "deleted",
                l.id AS "ketua_rg_id",
                l.name AS "ketua_rg_name"
            FROM research_groups rg
            LEFT JOIN lecturers l 
                ON l.research_group_id = rg.id AND l.is_ketua_rg = TRUE
            WHERE rg.deleted = FALSE AND rg.id = ${id}
            ORDER BY rg.id ASC;
        `,
        prisma.$queryRaw<{
            id: number;
            name: string;
            department_id: number | null;
            nidn: string | null;
            nip: string | null;
            is_ketua_rg: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            department_name: string | null;
        }[]>`
            SELECT 
                l.*,
                d.name AS department_name
            FROM lecturers l
            LEFT JOIN departments d ON l.department_id = d.id
            WHERE l.research_group_id = ${id}
            ORDER BY l.id ASC;
        `,
        prisma.$queryRaw<{
            id: number;
            name: string;
            phase: string | null;
            lecturer_id: number | null;
            lecturer_name: string | null;
            year_research_id: number | null;
            year_research_year: number | null;
        }[]>`
            SELECT 
                ps.*,
                l.id AS lecturer_id,
                l.name AS lecturer_name,
                yr.id AS year_research_id,
                yr.year AS year_research_year
            FROM proposal_suggestions ps
            LEFT JOIN research_groups rg ON ps.research_group_id = rg.id
            LEFT JOIN lecturers l ON ps.lecturer_id = l.id
            LEFT JOIN year_researches yr ON ps.year_research_id = yr.id
            WHERE rg.id = ${id}
            ORDER BY ps.id ASC;
        `
    ]);

    // map lecturer and proposal_suggestion data
    const formattedResult = researchGroups.map(group => ({
        research_group: {
            id: Number(group.id),
            name: group.name,
            description: group.description,
            createdAt: group.createdAt,
            updatedAt: group.updatedAt,
            deleted: group.deleted,

            lecturer: {
                id: group.ketua_rg_id ? Number(group.ketua_rg_id) : null,
                name: group.ketua_rg_name,
            },
        },
        lecturers: lecturers.map(lecturer => ({
            id: Number(lecturer.id),
            name: lecturer.name,
            nidn: lecturer.nidn,
            nip: lecturer.nip,
            is_ketua_rg: lecturer.is_ketua_rg,
            createdAt: lecturer.createdAt,
            updatedAt: lecturer.updatedAt,
            deleted: lecturer.deleted,
            department: {
                id: lecturer.department_id ? Number(lecturer.department_id) : null,
                name: lecturer.department_name
            }
        })),
        proposal_suggestions: proposalSuggestions.map(proposal => ({
            id: Number(proposal.id),
            name: proposal.name,
            phase: proposal.phase,
            lecturer: {
                id: proposal.lecturer_id ? Number(proposal.lecturer_id) : null,
                name: proposal.lecturer_name
            },
            year_research: {
                id: proposal.year_research_id ? Number(proposal.year_research_id) : null,
                year: proposal.year_research_year
            }
        }))
    }));

    return formattedResult;
};

const researchGroupService = {
    create,
    getById,
    getAllActive,
    getSummaryList,
    getProfileRG
}


export default researchGroupService;