import prisma from "src/client/prisma";

const createMany = async (data: any) => {
    return await prisma.position_schema.createMany({
        data: data,
        skipDuplicates: true,
    });
}


const deleteByWhere = async (where: any) => {
    return await prisma.position_schema.deleteMany({
        where: where
    })
}

const updateByWhere = async (where: any, data: any) => {

    return await prisma.position_schema.updateMany({
        data: data,
        where: where
    })
}



const positionSchemaService = {
    createMany,
    deleteByWhere,
    updateByWhere
}

export default positionSchemaService;