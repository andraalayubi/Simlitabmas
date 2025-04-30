import prisma from "../client/prisma";
import { schema } from "prisma/interfaces";

// get by id
const getById = async (id: number) => {
    return await prisma.schema.findUnique({
        where: { id: id },
    })
}

// get all active
const getByFilter = async (filter: any) => {
    return await prisma.schema.findMany({
        where: filter,
        orderBy: {
            id: "asc"
        }
    });
};


// get by proposal suggestion id
const getByProposalSuggestionId = async (proposal_suggestion_id: number) => {
    return await prisma.proposal_suggestion.findUnique({
        where: { id: proposal_suggestion_id },
        include: {
            schema: true,
            lecturer: {
                include: {
                    department: true
                }
            }
        }
    })
}

// const update
const update = async (id: number, data: any) => {
    return await prisma.schema.update({
        data: data,
        where: { id: id }
    })
}

const create = async (data: any) => {
    return await prisma.schema.create({
        data: data
    })
}

const updateByWhere = async (where: any, data: any) => {
    
    return await prisma.schema.updateMany({
        data: data,
        where: where
    })
}


//get summary for audit page
const getSummaryList =  async () => {
    const [schemas, proposalSuggestionCount] = await prisma.$transaction([
        prisma.schema.findMany({
            include: {
                position_schema: {
                    include: {
                        position: true
                    }
                }
            }
        }),
        prisma.$queryRaw<{ id: bigint; proposal_suggestion_count: bigint }[]>`
            SELECT
                s.id AS "id",
                count(ps.id) AS "proposal_suggestion_count"
            FROM proposal_suggestions ps
            RIGHT JOIN schemas s ON s.id = ps.schema_id
            GROUP BY s.id
            ORDER BY s.id ASC;
        `
    ])

    // map by schema_id
    const proposalSuggestionMap = Object.fromEntries(proposalSuggestionCount.map(item => [Number(item.id), Number(item.proposal_suggestion_count)]));

    const formattedResult = schemas.map(schema => ({
        ...schema,
        proposal_suggestion_count: proposalSuggestionMap[Number(schema.id)] || 0
    }))

    return formattedResult
}

const createPosition = async (data: any) => {
    return await prisma.position_schema.createMany({
        data: data
    });
}

const schemaService = {
    getById,
    getByFilter,
    getByProposalSuggestionId,
    getSummaryList,
    update,
    create,
    updateByWhere,
    createPosition,
}

export default schemaService;