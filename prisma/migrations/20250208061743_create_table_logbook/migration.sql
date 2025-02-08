-- CreateTable
CREATE TABLE "logbooks" (
    "id" SERIAL NOT NULL,
    "proposal_suggestion_id" INTEGER NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "file_url" TEXT,
    "progress" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "logbooks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "logbooks" ADD CONSTRAINT "logbooks_proposal_suggestion_id_fkey" FOREIGN KEY ("proposal_suggestion_id") REFERENCES "proposal_suggestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
