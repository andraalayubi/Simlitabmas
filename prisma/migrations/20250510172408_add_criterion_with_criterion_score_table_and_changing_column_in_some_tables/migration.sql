/*
  Warnings:

  - You are about to drop the column `name` on the `evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `schema_id` on the `evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `lecturer_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `proposal_suggestion_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `reviewer_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "evaluations" DROP CONSTRAINT "evaluations_schema_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_lecturer_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_proposal_suggestion_id_fkey";

-- AlterTable
ALTER TABLE "evaluations" DROP COLUMN "name",
DROP COLUMN "schema_id",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "proposal_suggestion_id" INTEGER,
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "lecturer_id",
DROP COLUMN "proposal_suggestion_id",
DROP COLUMN "score",
ADD COLUMN     "average_score" DOUBLE PRECISION,
ADD COLUMN     "reviewer_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "reviewers" (
    "id" SERIAL NOT NULL,
    "lecturer_id" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reviewers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criteria" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "phase" "evaluation_phase" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "criteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criteria_scores" (
    "id" SERIAL NOT NULL,
    "criterion_id" INTEGER NOT NULL,
    "review_id" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "criteria_scores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviewers" ADD CONSTRAINT "reviewers_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "lecturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_proposal_suggestion_id_fkey" FOREIGN KEY ("proposal_suggestion_id") REFERENCES "proposal_suggestions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "reviewers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criteria_scores" ADD CONSTRAINT "criteria_scores_criterion_id_fkey" FOREIGN KEY ("criterion_id") REFERENCES "criteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criteria_scores" ADD CONSTRAINT "criteria_scores_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
