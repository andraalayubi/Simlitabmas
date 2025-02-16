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


const researchGroupService = {
    create,
    getById,
    getAllActive,
    getSummaryList,
}


export default researchGroupService;