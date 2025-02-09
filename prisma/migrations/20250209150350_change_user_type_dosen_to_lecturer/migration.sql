/*
  Warnings:

  - The values [dosen] on the enum `user_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "user_type_new" AS ENUM ('ketua_rg', 'kaprodi', 'lecturer', 'admin');
ALTER TABLE "users" ALTER COLUMN "user_type" TYPE "user_type_new" USING ("user_type"::text::"user_type_new");
ALTER TYPE "user_type" RENAME TO "user_type_old";
ALTER TYPE "user_type_new" RENAME TO "user_type";
DROP TYPE "user_type_old";
COMMIT;
