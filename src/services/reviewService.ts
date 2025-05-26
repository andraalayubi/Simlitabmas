import { proposal_suggestion_status } from "prisma/interfaces";
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
  },
  include: any
) => {
  const where: any = {
    deleted: false,
  };

  if (filter.proposal_suggestion_id) {
    where.evaluation = {
      proposal_suggestion_id: filter.proposal_suggestion_id,
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


const reviewService = {
    create,
    getByFilter,
    remove
}

export default reviewService;