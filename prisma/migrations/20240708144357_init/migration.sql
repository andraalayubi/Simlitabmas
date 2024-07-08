/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - Added the required column `nama` to the `dosen` table without a default value. This is not possible if the table is not empty.
  - Made the column `dosen_id` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_dosen_id_fkey";

-- AlterTable
ALTER TABLE "dosen" ADD COLUMN     "nama" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "name",
DROP COLUMN "username",
ALTER COLUMN "dosen_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "dosen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
