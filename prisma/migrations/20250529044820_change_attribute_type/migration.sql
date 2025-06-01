/*
  Warnings:

  - The `status` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "status",
ADD COLUMN     "status" "proposal_suggestion_status";
