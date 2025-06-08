import { evaluation_phase } from "prisma/interfaces";
import prisma from "../client/prisma";

const create = async (data: any) => {
  return await prisma.criterion_score.create({
    data: data
  });
}

const getScore = async (
    filter: {
        review_id?: number,
        proposal_suggestion_id?: number,
        evaluation_phase?: string
    }, include: any
) => {
    return await prisma.criterion_score.findMany({
        where: {
            review_id: filter.review_id,
            deleted: false,
            review: {
                evaluation:{
                    proposal_suggestion_id: filter.proposal_suggestion_id,
                    evaluation_phase: filter.evaluation_phase as evaluation_phase
                }
            }
        },
        include: include
    })
}

const criterionScoreService = {
    create,
    getScore
}

export default criterionScoreService;