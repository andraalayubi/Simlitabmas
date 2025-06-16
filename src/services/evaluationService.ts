import { evaluation_phase } from "prisma/interfaces";
import prisma from "src/client/prisma";

//include with proposal_suggestion and lecturer who reviewed
const getById = async (id: number) => {
    return await prisma.evaluation.findUnique({
        where: {
            id: id,
            deleted: false,
        },
        include: {
            proposal_suggestion: {
                include: {
                    lecturer: true,
                    schema: true,
                    year_research: true,
                    proposal: true,
                    department:true,
                    final_report:true,
                    research_group: true
                }
            },
            review: {
                include: {
                    reviewer: {
                        include: {
                            lecturer: true
                        }
                    }
                }
            }
        }
    });
};

type GetEvaluationsParams = {
  phase: string;
  type: string;
  lecturerId?: number; // tetap opsional
};

async function getEvaluations({ phase, type, lecturerId }: GetEvaluationsParams) {
  const where: any = {
    evaluation_phase: phase as evaluation_phase,
    category: type,
  };

  if (lecturerId !== undefined) {
    where.review = {
      some: {
        reviewer: {
          is: {
            lecturerId,
          },
        },
      },
    };
  }

  return await prisma.evaluation.findMany({
    where,
    include: {
      proposal_suggestion: {
        include: {
          lecturer: true,
          schema: true,
          year_research: true,
          proposal: true,
        },
      },
      review: true
    },
  });
}

const update = async (evaluation_id: number, data: any) => {
  return await prisma.evaluation.update({
    where: {
      id: evaluation_id
    },
    data: data
  });
}

const create = async (data: any) => {
  return await prisma.evaluation.create({
    data: {
      ...data,
      status: "menunggu_admin",
    },
  });
};


const evaluationService = {
    getById,
    getEvaluations,
    update,
    create
};

export default evaluationService;
