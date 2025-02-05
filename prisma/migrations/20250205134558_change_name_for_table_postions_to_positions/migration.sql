/*
  Warnings:

  - You are about to drop the `postions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "lecturers" DROP CONSTRAINT "lecturers_position_id_fkey";

-- DropForeignKey
ALTER TABLE "position_schemas" DROP CONSTRAINT "position_schemas_position_id_fkey";

-- DropTable
DROP TABLE "postions";

-- CreateTable
CREATE TABLE "positions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lecturers" ADD CONSTRAINT "lecturers_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position_schemas" ADD CONSTRAINT "position_schemas_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
