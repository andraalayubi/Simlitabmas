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

const yearResearchService = {
    getById,
    getAllActive,
}


export default yearResearchService;