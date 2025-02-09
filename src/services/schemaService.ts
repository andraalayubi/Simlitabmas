import prisma from "../client/prisma";
import { schema } from "prisma/interfaces";

// get by id
const getById = async (id: number) => {
    return await prisma.schema.findUnique({
        where: { id: id },
    })
}

// get all active
const getAllActive = async () => {
    return await prisma.schema.findMany({
        where: { deleted: false },
    });
};

const schemaService = {
    getById,
    getAllActive,
}


export default schemaService;