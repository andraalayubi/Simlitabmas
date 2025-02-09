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

const researchGroupService = {
    getById,
    getAllActive,
}


export default researchGroupService;