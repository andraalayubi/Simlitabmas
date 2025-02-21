import prisma from "src/client/prisma";

const getById = async (id: number) => {
  return await prisma.position.findUnique({
    where: { id: id },
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
};

export default positionService;
