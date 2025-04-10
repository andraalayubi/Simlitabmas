
import { external_document } from "@prisma/client";
import prisma from "src/client/prisma";


const getByProposalSuggestionId = async (proposalSuggestionId: number) => {

    return await prisma.proposal_suggestion.findUnique({
        relationLoadStrategy: 'join',
        where: { id: proposalSuggestionId },
        include: {
            external_document: {
                orderBy: {
                    id: 'asc'
                }
            }
        }
    })

}


const create = async (proposal_suggestion_id: number, data: external_document) => {

    return prisma.external_document.create({
        data: {
            name: data.name,
            proposal_suggestion_id: proposal_suggestion_id,
            external_document_category_id: data.external_document_category_id,
            description: data.description,
            status: data.status,
            file_url: data.file_url
        }
    })

}

const update = async (id: number, data: external_document) => {

    return prisma.external_document.update({
        where: {
            id: id,
        },
        data: data
    })
}

const deleteById = async (id: number) => {
    return await prisma.external_document.delete(
        { where: { id: id }, }
    )
}



const externalDocumentService = {
    getByProposalSuggestionId,
    create,
    update,
    deleteById,
}

export default externalDocumentService;






