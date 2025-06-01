import { proposal_suggestion_status, evaluation_phase } from "prisma/interfaces";
import prisma from "../client/prisma";

const create = async (evaluationId: number, reviewerId: number) => {
    return await prisma.review.create({
        data: {
            evaluation_id: evaluationId,
            reviewer_id: reviewerId,
            status: "menunggu_review" as proposal_suggestion_status
        }
    })
}

const getByFilter = async (
  filter: {
    proposal_suggestion_id?: number;
    lecturer_id?: number,
    evaluation_phase?: string,
    type?: string,
    evaluation_id?: number;
  },
  include?: any
) => {
  const where: any = {
    deleted: false,
  };

  if (filter.proposal_suggestion_id) {
    where.evaluation = {
      proposal_suggestion_id: filter.proposal_suggestion_id,
      evaluation_phase: filter.evaluation_phase as evaluation_phase
    };
  }

if (filter.lecturer_id) {
  where.reviewer = {
    lecturer_id: filter.lecturer_id,
  };

  where.evaluation = {
    evaluation_phase: filter.evaluation_phase as evaluation_phase,
    category: filter.type,
  };
}

  return await prisma.review.findMany({
    where,
    include,
  });
};

const remove = async (reviewId: number) => {
    return await prisma.review.delete({
        where: { id: reviewId },
      });
}

const getById = async (
  id: number,
  filter: {},
  include: any
) => {
  return await prisma.review.findUnique({
    where: {
      id: id,
      deleted: false
    },
    include,
  });
};

const update = async (review_id: number, data: any) => {
  return await prisma.review.update({
    where: {
      id: review_id
    },
    data: data
  });
}


const reviewService = {
    create,
    getByFilter,
    remove,
    getById,
    update
}

export default reviewService;