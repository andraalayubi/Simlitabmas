
import { external_document } from "@prisma/client";
import prisma from "src/client/prisma";


const getByProposalSuggestionId = async (proposalSuggestionId: number) => {

    const proposalSuggestion = await prisma.proposal_suggestion.findUnique({
        relationLoadStrategy: 'join',
        where: { id: proposalSuggestionId },
        include: {
            external_document: {
                orderBy: {
                    id: 'asc'
                }
            }
        }
    });

    const configuration = await prisma.configuration.findFirst();
    
    return {
        ...proposalSuggestion,
        template_external_document: configuration?.template_external_document
    }
}


const create = async (proposal_suggestion_id: number, data: any) => {

    return prisma.external_document.create({
        data: {
            name: data.name,
            proposal_suggestion_id: proposal_suggestion_id,
            category_name: data.category_name,
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






