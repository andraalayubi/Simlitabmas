-- CreateTable
CREATE TABLE "final_reports" (
    "id" SERIAL NOT NULL,
    "proposal_suggestion_id" INTEGER NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "file_url" TEXT,
    "phase" "proposal_suggestion_phase",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "final_reports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "final_reports" ADD CONSTRAINT "final_reports_proposal_suggestion_id_fkey" FOREIGN KEY ("proposal_suggestion_id") REFERENCES "proposal_suggestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
