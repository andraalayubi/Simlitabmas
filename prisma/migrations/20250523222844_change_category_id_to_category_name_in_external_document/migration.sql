/*
  Warnings:

  - You are about to drop the column `external_document_category_id` on the `external_documents` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "external_documents" DROP CONSTRAINT "external_documents_external_document_category_id_fkey";

-- AlterTable
ALTER TABLE "external_documents" DROP COLUMN "external_document_category_id",
ADD COLUMN     "category_name" TEXT;
