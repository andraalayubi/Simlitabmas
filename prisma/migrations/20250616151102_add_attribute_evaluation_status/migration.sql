/*
  Warnings:

  - The `status` column on the `evaluations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "evaluation_status" AS ENUM ('menunggu_admin', 'menunggu_review', 'ditolak', 'diterima', 'selesai', 'selesai_dengan_revisi');

-- AlterTable
ALTER TABLE "evaluations" DROP COLUMN "status",
ADD COLUMN     "status" "evaluation_status";
