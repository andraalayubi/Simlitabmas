-- DropForeignKey
ALTER TABLE "external_documents" DROP CONSTRAINT "external_documents_external_document_category_id_fkey";

-- AlterTable
ALTER TABLE "external_documents" ADD COLUMN     "status" TEXT,
ALTER COLUMN "external_document_category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "external_documents" ADD CONSTRAINT "external_documents_external_document_category_id_fkey" FOREIGN KEY ("external_document_category_id") REFERENCES "external_document_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
