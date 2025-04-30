import prisma from "src/client/prisma";

const getById = async (id: number) => {
  return await prisma.position.findUnique({
    where: { id: id },
  });
};

const getByFilter = async (filter: any) => {
  return await prisma.position.findFirst({
    where: filter,
  });
};

const getAllActive = async () => {
  return await prisma.position.findMany({
    where: { deleted: false },
  });
};

const positionService = {
  getById,
  getAllActive,
  getByFilter,
};

export default positionService;
