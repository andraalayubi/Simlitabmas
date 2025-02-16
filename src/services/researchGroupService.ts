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

const researchGroupService = {
    create,
    getById,
    getAllActive,
}


export default researchGroupService;