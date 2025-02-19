/*
  Warnings:

  - A unique constraint covering the columns `[proposal_suggestion_id,name,nrp,department_id]` on the table `student_members` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `department_id` to the `student_members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student_members" ADD COLUMN     "department_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "student_members_proposal_suggestion_id_name_nrp_department__key" ON "student_members"("proposal_suggestion_id", "name", "nrp", "department_id");

-- AddForeignKey
ALTER TABLE "student_members" ADD CONSTRAINT "student_members_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
