import { evaluation_phase } from "prisma/interfaces";
import prisma from "../client/prisma";

const create = async (data: any) => {
  // Cari entri yang sama tapi deleted = true
  const existing = await prisma.criterion.findFirst({
    where: {
      name: data.name,
      category: data.category,
      phase: data.phase,
      deleted: true,
    },
  });

  if (existing) {
    // Jika ditemukan, update menjadi aktif kembali
    return await prisma.criterion.update({
      where: { id: existing.id },
      data: { ...data ,deleted: false },
    });
  }

  // Jika tidak ada, buat baru
  return await prisma.criterion.create({
    data: data
  });
}

const getCriteria = async () => {
    return await prisma.criterion.findMany({
        where: {
            deleted: false
        },
    })
}

const update = async (criterion_id: number) => {
    return await prisma.criterion.update({
        where: { id: criterion_id },
        data: {
            deleted: true
        }
    })
}


const getByFilter = async (
  filter: {
    phase?: string,
    category?: string
  }
) => {
  return await prisma.criterion.findMany({
    where: {
      phase: filter.phase as evaluation_phase,
      category: filter.category,
      deleted: false
    },
  });
};

const criterionService = {
    create,
    getCriteria,
    update,
    getByFilter
}

export default criterionService;