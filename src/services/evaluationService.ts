import prisma from "src/client/prisma";

//include with proposal_suggestion and lecturer who reviewed
const getById = async (id: number) => {
    return await prisma.proposal_suggestion.findUnique({
        where: {
            id: id,
            deleted: false,
        },
        include: {
            review: {
                where: {
                    deleted: false,
                },
                include: {
                    lecturer: true,
                    evaluation: true
                },
                orderBy: {
                    evaluation_id: "asc"
                }
            }
        }
    });
};

const evaluationService = {
    getById,
};

export default evaluationService;
