/*
  Warnings:

  - You are about to drop the column `user_id` on the `lecturers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "lecturers" DROP CONSTRAINT "lecturers_user_id_fkey";

-- AlterTable
ALTER TABLE "lecturers" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lecturer_id" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "lecturers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
