/*
  Warnings:

  - The values [proposal,progress_1,progress_2,progress_3,final] on the enum `evaluation_phase` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "evaluation_phase_new" AS ENUM ('evaluasi_proposal', 'evaluasi_monev', 'evaluasi_akhir');
ALTER TABLE "evaluations" ALTER COLUMN "evaluation_phase" TYPE "evaluation_phase_new" USING ("evaluation_phase"::text::"evaluation_phase_new");
ALTER TYPE "evaluation_phase" RENAME TO "evaluation_phase_old";
ALTER TYPE "evaluation_phase_new" RENAME TO "evaluation_phase";
DROP TYPE "evaluation_phase_old";
COMMIT;

-- AlterTable
ALTER TABLE "evaluations" ADD COLUMN     "name" TEXT;
