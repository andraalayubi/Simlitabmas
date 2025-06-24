import prisma from "src/client/prisma";

//get Documents by proposal_suggestion id
const getById = async (id: number) => {
    return await prisma.proposal_suggestion.findUnique({
        where: {
            id: id,
            deleted: false,
        },
        include: {
            additional_document: true,
            lecturer: true
        }
    });
};

const create = async (data: any) => {
    return await prisma.additional_document.create({
        data,
    });
};

const update = async (data: any) => {
    return await prisma.additional_document.update({
        data,
        where: {
            id: data.id,
        }
    });
};

const deleteDocument = async (id: number, proposal_suggestion_id: number) => {
    return await prisma.additional_document.delete({
        where: {
            id: id,
            proposal_suggestion_id: proposal_suggestion_id,
        }
    });
};

const evaluationService = {
    getById,
    create,
    update,
    delete: deleteDocument
};

export default evaluationService;
