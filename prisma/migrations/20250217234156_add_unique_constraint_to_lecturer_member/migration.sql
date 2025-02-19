/*
  Warnings:

  - A unique constraint covering the columns `[proposal_suggestion_id,lecturer_id]` on the table `lecturer_members` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "lecturer_members_proposal_suggestion_id_lecturer_id_key" ON "lecturer_members"("proposal_suggestion_id", "lecturer_id");
