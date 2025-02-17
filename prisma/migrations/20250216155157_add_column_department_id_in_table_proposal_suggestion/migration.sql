-- AlterTable
ALTER TABLE "proposal_suggestions" ADD COLUMN     "department_id" INTEGER;

-- AddForeignKey
ALTER TABLE "proposal_suggestions" ADD CONSTRAINT "proposal_suggestions_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
