import { external_document_category } from "prisma/interfaces";
import prisma from "src/client/prisma";


const getAll = async () => {
    return await prisma.external_document_category.findMany({
        orderBy: {
            id: 'asc'
        }
    })
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
}

export default externalDocumentCategoryService;