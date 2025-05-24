import { external_document_category } from "prisma/interfaces";
import prisma from "src/client/prisma";


const getAll = async () => {
    return await prisma.external_document_category.findMany({
        orderBy: {
            id: 'asc'
        }
    })
}

const getById = async (id: number) => {
    return await prisma.external_document_category.findUnique({
        where: {id: id}
    })
}

const deleteByWhere = async (where: any) => {
    return await prisma.external_document_category.deleteMany({
        where: where
    })
}

const createMany = async (data: any) => {
    return await prisma.external_document_category.createMany({
        data: data,
        skipDuplicates: true,
    });
}



const getBySchemaId = async (schema_id: number) => {
    return await prisma.external_document_category.findMany(
        {
            where: { schema_id: schema_id }, orderBy: {
                id: 'asc'
            }
        }
    )
}

const externalDocumentCategoryService = {
    getAll,
    getBySchemaId,
    deleteByWhere,
    createMany,
    getById,
}

export default externalDocumentCategoryService;