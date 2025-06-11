import { proposal_suggestion_status, evaluation_phase } from "prisma/interfaces";
import prisma from "../client/prisma";

const create = async (evaluationId: number, reviewerId: number) => {
  // Buat review terlebih dahulu
  const newReview = await prisma.review.create({
    data: {
      evaluation_id: evaluationId,
      reviewer_id: reviewerId,
      status: "menunggu_review" as proposal_suggestion_status,
    },
  });

  // Hitung total review yang sudah terhubung ke evaluation tersebut
  const totalReviews = await prisma.review.count({
    where: {
      evaluation_id: evaluationId,
      deleted: false, // jika kamu pakai soft delete
    },
  });

  // Jika total review sudah 3 atau lebih, update status evaluation
  if (totalReviews >= 3) {
    await prisma.evaluation.update({
      where: { id: evaluationId },
      data: { status: "menunggu_review",
              proposal_suggestion: {
                update: {
                  status: "menunggu_review",
                },
              },
            },
    });
  }

  return newReview;
};



const getByFilter = async (
  filter: {
    proposal_suggestion_id?: number;
    lecturer_id?: number;
    evaluation_phase?: string;
    type?: string;
    evaluation_id?: number;
  },
  include?: any
) => {
  const where: any = {
    deleted: false,
  };

  // Jika hanya ingin filter berdasarkan evaluation_id langsung
  if (filter.evaluation_id) {
    where.evaluation_id = filter.evaluation_id;
  }

  // Jika ingin berdasarkan proposal_suggestion_id dan evaluation_phase
  if (filter.proposal_suggestion_id || filter.evaluation_phase) {
    where.evaluation = {
      ...(filter.proposal_suggestion_id && {
        proposal_suggestion_id: filter.proposal_suggestion_id,
      }),
      ...(filter.evaluation_phase && {
        evaluation_phase: filter.evaluation_phase as evaluation_phase,
      }),
      ...(filter.type && {
        category: filter.type,
      }),
    };
  }

  // Jika filter reviewer
  if (filter.lecturer_id) {
    where.reviewer = {
      lecturer_id: filter.lecturer_id,
    };
  }

  return await prisma.review.findMany({
    where,
    include,
  });
};


const remove = async (reviewId: number) => {
  // Dapatkan data review untuk mengetahui evaluation_id-nya
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    select: { evaluation_id: true },
  });

  if (!review) throw new Error("Review tidak ditemukan");

  const evaluationId = review.evaluation_id;

  // Hapus review
  await prisma.review.delete({
    where: { id: reviewId },
  });

  // Hitung jumlah review tersisa untuk evaluation tersebut
  const remainingReviews = await prisma.review.count({
    where: {
      evaluation_id: evaluationId,
      deleted: false, // jika menggunakan soft delete
    },
  });

  // Jika jumlah review kurang dari 3, ubah status evaluation menjadi 'menunggu_admin'
  if (remainingReviews < 3) {
    await prisma.evaluation.update({
      where: { id: evaluationId },
      data: { status: "menunggu_admin",
              proposal_suggestion: {
                update: {
                  status: "menunggu_admin",
                },
              },
             },
    });
  }

  return { success: true };
};


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