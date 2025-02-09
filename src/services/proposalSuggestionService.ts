

import prisma from '../client/prisma'
import { proposal_suggestion, proposal_suggestion_status } from 'prisma/interfaces'

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
    status?: proposal_suggestion_status;
    year_research_id?: number;
    schema_id?: number;
    lecturer_id?: number;
    research_group_id?: number;
    is_active?: boolean;
}) => {
    return await prisma.proposal_suggestion.findMany({
        where: {
            status: filter.status,
            year_research_id: filter.year_research_id,
            schema_id: filter.schema_id,
            lecturer_id: filter.lecturer_id,
            research_group_id: filter.research_group_id,
            is_active: filter.is_active,
        },
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
            status: data.status,
            is_active: data.is_active,
        },
    })

}

const proposalSuggestionService = {
    getById,
    getByLecturerId,
    getByFilter,
    create
}

export default proposalSuggestionService