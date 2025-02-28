/*
  Warnings:

  - The values [pelaksanaan,publikasi] on the enum `proposal_suggestion_phase` will be removed. If these variants are still used in the database, this will fail.
  - The values [aktif] on the enum `proposal_suggestion_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "proposal_suggestion_phase_new" AS ENUM ('pengajuan', 'evaluasi_proposal', 'penetapan', 'monev', 'evaluasi_akhir', 'penetapan_akhir');
ALTER TABLE "proposal_suggestions" ALTER COLUMN "phase" TYPE "proposal_suggestion_phase_new" USING ("phase"::text::"proposal_suggestion_phase_new");
ALTER TYPE "proposal_suggestion_phase" RENAME TO "proposal_suggestion_phase_old";
ALTER TYPE "proposal_suggestion_phase_new" RENAME TO "proposal_suggestion_phase";
DROP TYPE "proposal_suggestion_phase_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "proposal_suggestion_status_new" AS ENUM ('menunggu_proposal', 'menunggu_rg', 'menunggu_admin', 'menunggu_review', 'menunggu_revisi', 'menunggu_laporan', 'tersimpan', 'menunggu', 'ditolak', 'diterima', 'selesai');
ALTER TABLE "proposal_suggestions" ALTER COLUMN "status" TYPE "proposal_suggestion_status_new" USING ("status"::text::"proposal_suggestion_status_new");
ALTER TYPE "proposal_suggestion_status" RENAME TO "proposal_suggestion_status_old";
ALTER TYPE "proposal_suggestion_status_new" RENAME TO "proposal_suggestion_status";
DROP TYPE "proposal_suggestion_status_old";
COMMIT;
