/*
  Warnings:

  - You are about to alter the column `max_cost` on the `schemas` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(20,2)`.

*/
-- AlterTable
ALTER TABLE "schemas" ALTER COLUMN "max_cost" SET DATA TYPE DECIMAL(20,2);
