/*
  Warnings:

  - You are about to drop the `anggota_dosen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `anggota_mahasiswa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `anggota_mitra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `biaya_usulan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dokumen_pendukung` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dosen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jabatan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jenis_luaran` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kategori_biaya` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `luaran_usulan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `penilaian` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `program_studi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `proposal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `research_group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skema` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skema_jabatan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tahun_penelitian` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usulan` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "config_type" AS ENUM ('system', 'user', 'proposal');

-- CreateEnum
CREATE TYPE "proposal_suggestion_status" AS ENUM ('tersimpan', 'menunggu', 'ditolak', 'diterima', 'aktif', 'selesai');

-- CreateEnum
CREATE TYPE "degree" AS ENUM ('S1', 'S2', 'S3');

-- CreateEnum
CREATE TYPE "evaluation_phase" AS ENUM ('proposal', 'progress_1', 'progress_2', 'progress_3', 'final');

-- DropForeignKey
ALTER TABLE "anggota_dosen" DROP CONSTRAINT "anggota_dosen_dosen_id_fkey";

-- DropForeignKey
ALTER TABLE "anggota_dosen" DROP CONSTRAINT "anggota_dosen_usulan_id_fkey";

-- DropForeignKey
ALTER TABLE "anggota_mahasiswa" DROP CONSTRAINT "anggota_mahasiswa_usulan_id_fkey";

-- DropForeignKey
ALTER TABLE "anggota_mitra" DROP CONSTRAINT "anggota_mitra_usulan_id_fkey";

-- DropForeignKey
ALTER TABLE "biaya_usulan" DROP CONSTRAINT "biaya_usulan_kategori_biaya_id_fkey";

-- DropForeignKey
ALTER TABLE "biaya_usulan" DROP CONSTRAINT "biaya_usulan_usulan_id_fkey";

-- DropForeignKey
ALTER TABLE "dokumen_pendukung" DROP CONSTRAINT "dokumen_pendukung_usulan_id_fkey";

-- DropForeignKey
ALTER TABLE "dosen" DROP CONSTRAINT "dosen_jabatan_id_fkey";

-- DropForeignKey
ALTER TABLE "dosen" DROP CONSTRAINT "dosen_program_studi_id_fkey";

-- DropForeignKey
ALTER TABLE "dosen" DROP CONSTRAINT "dosen_research_group_id_fkey";

-- DropForeignKey
ALTER TABLE "jenis_luaran" DROP CONSTRAINT "jenis_luaran_skema_id_fkey";

-- DropForeignKey
ALTER TABLE "kategori_biaya" DROP CONSTRAINT "kategori_biaya_skema_id_fkey";

-- DropForeignKey
ALTER TABLE "log" DROP CONSTRAINT "log_user_id_fkey";

-- DropForeignKey
ALTER TABLE "luaran_usulan" DROP CONSTRAINT "luaran_usulan_jenis_luaran_id_fkey";

-- DropForeignKey
ALTER TABLE "luaran_usulan" DROP CONSTRAINT "luaran_usulan_usulan_id_fkey";

-- DropForeignKey
ALTER TABLE "penilaian" DROP CONSTRAINT "penilaian_skema_id_fkey";

-- DropForeignKey
ALTER TABLE "proposal" DROP CONSTRAINT "proposal_usulan_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_dosen_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_penilaian_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_usulan_id_fkey";

-- DropForeignKey
ALTER TABLE "skema_jabatan" DROP CONSTRAINT "skema_jabatan_jabatan_id_fkey";

-- DropForeignKey
ALTER TABLE "skema_jabatan" DROP CONSTRAINT "skema_jabatan_skema_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_dosen_id_fkey";

-- DropForeignKey
ALTER TABLE "usulan" DROP CONSTRAINT "usulan_dosen_id_fkey";

-- DropForeignKey
ALTER TABLE "usulan" DROP CONSTRAINT "usulan_research_group_id_fkey";

-- DropForeignKey
ALTER TABLE "usulan" DROP CONSTRAINT "usulan_skema_id_fkey";

-- DropForeignKey
ALTER TABLE "usulan" DROP CONSTRAINT "usulan_tahun_id_fkey";

-- DropTable
DROP TABLE "anggota_dosen";

-- DropTable
DROP TABLE "anggota_mahasiswa";

-- DropTable
DROP TABLE "anggota_mitra";

-- DropTable
DROP TABLE "biaya_usulan";

-- DropTable
DROP TABLE "dokumen_pendukung";

-- DropTable
DROP TABLE "dosen";

-- DropTable
DROP TABLE "jabatan";

-- DropTable
DROP TABLE "jenis_luaran";

-- DropTable
DROP TABLE "kategori_biaya";

-- DropTable
DROP TABLE "log";

-- DropTable
DROP TABLE "luaran_usulan";

-- DropTable
DROP TABLE "penilaian";

-- DropTable
DROP TABLE "program_studi";

-- DropTable
DROP TABLE "proposal";

-- DropTable
DROP TABLE "research_group";

-- DropTable
DROP TABLE "review";

-- DropTable
DROP TABLE "skema";

-- DropTable
DROP TABLE "skema_jabatan";

-- DropTable
DROP TABLE "tahun_penelitian";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "usulan";

-- DropEnum
DROP TYPE "gelar";

-- DropEnum
DROP TYPE "status_usulan";

-- DropEnum
DROP TYPE "tahap_evaluasi";

-- CreateTable
CREATE TABLE "configs" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "value" JSONB,
    "file" TEXT,
    "default" BOOLEAN,
    "config_type" "config_type",

    CONSTRAINT "configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "user_type" "user_type",
    "password" TEXT,
    "username" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "lecturer_id" INTEGER NOT NULL,
    "bio" TEXT,
    "gender" TEXT,
    "profile_pic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecturers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "research_group_id" INTEGER,
    "department_id" INTEGER,
    "nidn" TEXT,
    "nip" TEXT,
    "degree" JSONB,
    "is_ketua_rg" BOOLEAN,
    "position_id" INTEGER,
    "signature_url" TEXT,
    "user_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "lecturers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "research_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "year_researches" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "open_date" TIMESTAMP(3) NOT NULL,
    "closed_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "year_researches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "postions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "position_schemas" (
    "id" SERIAL NOT NULL,
    "schema_id" INTEGER NOT NULL,
    "position_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "position_schemas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schemas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "max_cost" BIGINT,
    "min_degree" "degree",
    "is_student" BOOLEAN,
    "is_partner" BOOLEAN,
    "is_lecturer" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "schemas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposal_suggestions" (
    "id" SERIAL NOT NULL,
    "year_research_id" INTEGER,
    "schema_id" INTEGER,
    "lecturer_id" INTEGER,
    "research_group_id" INTEGER,
    "status" "proposal_suggestion_status",
    "is_active" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "proposal_suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposals" (
    "id" SERIAL NOT NULL,
    "proposal_suggestion_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" JSONB,
    "keyword" JSONB,
    "background" JSONB,
    "purpose" JSONB,
    "method" JSONB,
    "literature_review" JSONB,
    "bibliography" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "proposals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecturer_members" (
    "id" SERIAL NOT NULL,
    "proposal_suggestion_id" INTEGER NOT NULL,
    "lecturer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "research_group_id" INTEGER,
    "department_id" INTEGER,
    "nip" TEXT,
    "degree" JSONB,
    "is_ketua_rg" BOOLEAN,
    "position_id" INTEGER,
    "signature_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "lecturer_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_members" (
    "id" SERIAL NOT NULL,
    "proposal_suggestion_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nrp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "student_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_members" (
    "id" SERIAL NOT NULL,
    "proposal_suggestion_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "vendor_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suggestion_costs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "proposal_suggestion_id" INTEGER NOT NULL,
    "cost_category_id" INTEGER NOT NULL,
    "total" DOUBLE PRECISION,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "suggestion_costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_categories" (
    "id" SERIAL NOT NULL,
    "schema_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "cost_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "additional_documents" (
    "id" SERIAL NOT NULL,
    "proposal_suggestion_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "file_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "additional_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "external_documents" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "proposal_suggestion_id" INTEGER NOT NULL,
    "external_document_category_id" INTEGER NOT NULL,
    "description" TEXT,
    "file_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "external_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "table" TEXT NOT NULL,
    "audit" TEXT,
    "user_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "schema_id" INTEGER NOT NULL,
    "evaluation_phase" "evaluation_phase",
    "score_weight" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "evaluation_id" INTEGER NOT NULL,
    "lecturer_id" INTEGER NOT NULL,
    "proposal_suggestion_id" INTEGER NOT NULL,
    "note" TEXT,
    "score" DOUBLE PRECISION,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "external_document_categories" (
    "id" SERIAL NOT NULL,
    "schema_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "external_document_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_user_id_key" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_user_id_key" ON "user_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_lecturer_id_key" ON "user_profiles"("lecturer_id");

-- CreateIndex
CREATE UNIQUE INDEX "proposals_proposal_suggestion_id_key" ON "proposals"("proposal_suggestion_id");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "lecturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturers" ADD CONSTRAINT "lecturers_research_group_id_fkey" FOREIGN KEY ("research_group_id") REFERENCES "research_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturers" ADD CONSTRAINT "lecturers_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturers" ADD CONSTRAINT "lecturers_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "postions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturers" ADD CONSTRAINT "lecturers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position_schemas" ADD CONSTRAINT "position_schemas_schema_id_fkey" FOREIGN KEY ("schema_id") REFERENCES "schemas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position_schemas" ADD CONSTRAINT "position_schemas_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "postions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposal_suggestions" ADD CONSTRAINT "proposal_suggestions_year_research_id_fkey" FOREIGN KEY ("year_research_id") REFERENCES "year_researches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposal_suggestions" ADD CONSTRAINT "proposal_suggestions_schema_id_fkey" FOREIGN KEY ("schema_id") REFERENCES "schemas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposal_suggestions" ADD CONSTRAINT "proposal_suggestions_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "lecturers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposal_suggestions" ADD CONSTRAINT "proposal_suggestions_research_group_id_fkey" FOREIGN KEY ("research_group_id") REFERENCES "research_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_proposal_suggestion_id_fkey" FOREIGN KEY ("proposal_suggestion_id") REFERENCES "proposal_suggestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturer_members" ADD CONSTRAINT "lecturer_members_proposal_suggestion_id_fkey" FOREIGN KEY ("proposal_suggestion_id") REFERENCES "proposal_suggestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturer_members" ADD CONSTRAINT "lecturer_members_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "lecturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_members" ADD CONSTRAINT "student_members_proposal_suggestion_id_fkey" FOREIGN KEY ("proposal_suggestion_id") REFERENCES "proposal_suggestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_members" ADD CONSTRAINT "vendor_members_proposal_suggestion_id_fkey" FOREIGN KEY ("proposal_suggestion_id") REFERENCES "proposal_suggestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suggestion_costs" ADD CONSTRAINT "suggestion_costs_proposal_suggestion_id_fkey" FOREIGN KEY ("proposal_suggestion_id") REFERENCES "proposal_suggestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suggestion_costs" ADD CONSTRAINT "suggestion_costs_cost_category_id_fkey" FOREIGN KEY ("cost_category_id") REFERENCES "cost_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_categories" ADD CONSTRAINT "cost_categories_schema_id_fkey" FOREIGN KEY ("schema_id") REFERENCES "schemas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "additional_documents" ADD CONSTRAINT "additional_documents_proposal_suggestion_id_fkey" FOREIGN KEY ("proposal_suggestion_id") REFERENCES "proposal_suggestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_documents" ADD CONSTRAINT "external_documents_proposal_suggestion_id_fkey" FOREIGN KEY ("proposal_suggestion_id") REFERENCES "proposal_suggestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_documents" ADD CONSTRAINT "external_documents_external_document_category_id_fkey" FOREIGN KEY ("external_document_category_id") REFERENCES "external_document_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_schema_id_fkey" FOREIGN KEY ("schema_id") REFERENCES "schemas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "evaluations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "lecturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_proposal_suggestion_id_fkey" FOREIGN KEY ("proposal_suggestion_id") REFERENCES "proposal_suggestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_document_categories" ADD CONSTRAINT "external_document_categories_schema_id_fkey" FOREIGN KEY ("schema_id") REFERENCES "schemas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
