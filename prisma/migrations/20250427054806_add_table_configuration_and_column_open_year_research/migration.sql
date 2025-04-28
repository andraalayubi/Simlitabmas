-- AlterTable
ALTER TABLE "proposal_suggestions" ADD COLUMN     "open" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "configurations" (
    "id" SERIAL NOT NULL,
    "year_research_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configurations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "configurations_year_research_id_key" ON "configurations"("year_research_id");

-- AddForeignKey
ALTER TABLE "configurations" ADD CONSTRAINT "configurations_year_research_id_fkey" FOREIGN KEY ("year_research_id") REFERENCES "year_researches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
