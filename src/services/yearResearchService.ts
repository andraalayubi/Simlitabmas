import prisma from "../client/prisma";
import { year_research } from "prisma/interfaces";

// get by id
const getById = async (id: number) => {
    return await prisma.year_research.findUnique({
        where: { id: id },
    })
}

// get all active
const getAllActive = async () => {
    return await prisma.year_research.findMany({
        where: { deleted: false },
    });
};

const create = async (data: any) => {
    return await prisma.year_research.create({ data })
}


const update = async (id: number, data: any) => {
    return await prisma.year_research.update({
        data: data,
        where: { id: id }
    })
}

const updateByWhere = async (where: any, data: any) => {
    
    return await prisma.year_research.updateMany({
        data: data,
        where: where
    })
}

//get summary for audit page
const getSummaryList = async () => {
    const [yearResearches, acceptedSuggestionCount, proposalSuggestionCount] = await prisma.$transaction([
        prisma.year_research.findMany({
            where: { deleted: false },
        }),
        prisma.$queryRaw<{ id: bigint; accepted_suggestion_count: bigint }[]>`
            SELECT
                yr.id AS "id",
                count(ps.id) AS "accepted_suggestion_count"
            FROM proposal_suggestions ps
            RIGHT JOIN year_researches yr ON yr.id = ps.year_research_id
            WHERE ps.status != 'ditolak'
            GROUP BY yr.id
            ORDER BY yr.id ASC;
        `,
        prisma.$queryRaw<{ id: bigint; proposal_suggestion_count: bigint }[]>`
            SELECT
                yr.id AS "id",
                count(ps.id) AS "proposal_suggestion_count"
            FROM proposal_suggestions ps
            RIGHT JOIN year_researches yr ON yr.id = ps.year_research_id
            GROUP BY yr.id
            ORDER BY yr.id ASC;
        `
    ]);

    // map by year_research_id
    const proposalSuggestionMap = Object.fromEntries(proposalSuggestionCount.map(item => [Number(item.id), Number(item.proposal_suggestion_count)]));
    const acceptedMap = Object.fromEntries(acceptedSuggestionCount.map(item => [Number(item.id), Number(item.accepted_suggestion_count)]));

    const formattedResult = yearResearches.map(yearResearch => ({
        ...yearResearch,
        accepted_suggestion_count: acceptedMap[Number(yearResearch.id)]|| 0,
        proposal_suggestion_count: proposalSuggestionMap[Number(yearResearch.id)] || 0
    }));

    return formattedResult
}


const yearResearchService = {
    getById,
    getAllActive,
    create,
    getSummaryList,
    update,
    updateByWhere
}


export default yearResearchService;