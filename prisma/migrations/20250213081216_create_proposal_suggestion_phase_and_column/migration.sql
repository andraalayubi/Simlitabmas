-- CreateEnum
CREATE TYPE "proposal_suggestion_phase" AS ENUM ('pengajuan', 'penetapan', 'pelaksanaan', 'publikasi');

-- AlterTable
ALTER TABLE "proposal_suggestions" ADD COLUMN     "phase" "proposal_suggestion_phase";
