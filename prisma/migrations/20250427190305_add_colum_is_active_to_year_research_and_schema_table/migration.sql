-- AlterTable
ALTER TABLE "schemas" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "year_researches" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
