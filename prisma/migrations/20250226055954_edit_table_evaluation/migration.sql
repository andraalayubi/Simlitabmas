/*
  Warnings:

  - You are about to drop the column `name` on the `evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `score_weight` on the `evaluations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "evaluations" DROP CONSTRAINT "evaluations_schema_id_fkey";

-- AlterTable
ALTER TABLE "evaluations" DROP COLUMN "name",
DROP COLUMN "score_weight",
ALTER COLUMN "schema_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_schema_id_fkey" FOREIGN KEY ("schema_id") REFERENCES "schemas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
