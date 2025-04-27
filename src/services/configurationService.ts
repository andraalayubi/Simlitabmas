import prisma from "src/client/prisma"


const get = async () => {

    return await prisma.configuration.findFirst({})
}

const update = async (data: any) => {
    
    return await prisma.configuration.updateMany({
        data : data
    })
}


const configurationService = {
    get,
    update
}


export default configurationService;