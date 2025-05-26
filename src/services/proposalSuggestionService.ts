

import prisma from '../client/prisma'
import { evaluation_phase, proposal_suggestion, proposal_suggestion_phase, proposal_suggestion_status } from 'prisma/interfaces'

// get all proposal suggestion 
const getById = async (id: number) => {

    return await prisma.proposal_suggestion.findUnique({
        where: { id: id },
    })
}

// get all proposal suggestion lecturer_id
const getByLecturerId = async (lecturer_id: number) => {

    return await prisma.proposal_suggestion.findMany({
        where: { lecturer_id: lecturer_id },
    })

}

// get by filter
const getByFilter = async (filter: {
    id?: number;
    status?: proposal_suggestion_status;
    year_research_id?: number;
    schema_id?: number;
    lecturer_id?: number;
    research_group_id?: number | null;
    department_id?: number;
    is_active?: boolean;
    lecturer_member?: number;
}, include?: {
    schema?: boolean;
    lecturer?: boolean;
    research_group?: boolean;
    year_research?: boolean;
    department?: boolean;
}) => {
    let whereClause: any = {
        id: filter.id,
        status: filter.status,
        year_research_id: filter.year_research_id,
        schema_id: filter.schema_id,
        research_group_id: filter.research_group_id,
        department_id: filter.department_id,
        is_active: filter.is_active,
    };

    if (filter.research_group_id === null) {
        whereClause.research_group_id = null;
    } else if (filter.research_group_id === -1) {
        whereClause.research_group_id = { not: null };
    } else if (filter.research_group_id !== undefined) {
        whereClause.research_group_id = filter.research_group_id;
    }

    // Jika filter lecturer_id atau lecturer_member digunakan, gunakan OR condition
    if (filter.lecturer_id !== undefined || filter.lecturer_member !== undefined) {
        whereClause.OR = [];

        if (filter.lecturer_id !== undefined) {
            whereClause.OR.push({ lecturer_id: filter.lecturer_id });
        }

        if (filter.lecturer_member !== undefined) {
            whereClause.OR.push({
                lecturer_member: {
                    some: { lecturer_id: filter.lecturer_member }
                }
            });
        }
    }

    return await prisma.proposal_suggestion.findMany({
        where: whereClause,
        include: {
            schema: include?.schema,
            lecturer: include?.lecturer,
            research_group: include?.research_group,
            year_research: include?.year_research,
            department: include?.department,
        }
    });
};

// create proposal_suggestion
const create = async (data: proposal_suggestion) => {
    return await prisma.proposal_suggestion.create({
        data: {
            name: data.name,
            year_research_id: data.year_research_id,
            schema_id: data.schema_id,
            lecturer_id: data.lecturer_id,
            research_group_id: data.research_group_id,
            department_id: data.department_id,
            phase: data.phase,
            status: data.status,
            is_active: data.is_active,
        },
    })
}

// const update
const update = async (id: number, data: any) => {
    return await prisma.proposal_suggestion.update({
        data: data,
        where: { id: id }
    })
}


const updateByWhere = async (where: any, data: any) => {
    
    return await prisma.proposal_suggestion.updateMany({
        data: data,
        where: where
    })
}

const createEvaluation = async(
    id: number,
    category: string
) => {
    await prisma.proposal_suggestion.update({
        data: {
            status: "diterima" as proposal_suggestion_status,
            phase: "evaluasi_proposal" as proposal_suggestion_phase
        },
        where: {
            id: id
        }
    })

    const evaluation = await prisma.evaluation.create({
        data: {
            proposal_suggestion_id: id,
            category: category,
            evaluation_phase: "evaluasi_proposal" as evaluation_phase,
            status: "menunggu_admin" as proposal_suggestion_status
        },
    })

    return evaluation;
}

const proposalSuggestionService = {
    getById,
    getByLecturerId,
    getByFilter,
    create,
    update,
    updateByWhere,
    createEvaluation
}

export default proposalSuggestionService