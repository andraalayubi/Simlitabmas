import prisma from "../client/prisma";

const create = async (data: any) => {
    return await prisma.reviewer.create({
        data: data
    })
}

const getByFilter = async (
    filter: {
        lecturer_id?: number,
        category?: string
    }, include: any
) => {
    return await prisma.reviewer.findMany({
        where: {
            ...filter,
        },
        include: include
    })
}

const update = async (reviewer_id: number, reviewerData: any) => {
    return await prisma.reviewer.update({
        where: { id: reviewer_id },
        data: reviewerData
    })
}

const reviewerService = {
    create,
    getByFilter,
    update
}

export default reviewerService;