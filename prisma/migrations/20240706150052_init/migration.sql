-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('ketua_rg', 'kaprodi', 'dosen', 'admin');

-- CreateEnum
CREATE TYPE "gelar" AS ENUM ('S1', 'S2', 'S3');

-- CreateEnum
CREATE TYPE "status_usulan" AS ENUM ('tersimpan', 'menunggu', 'ditolak', 'diterima', 'aktif', 'selesai');

-- CreateEnum
CREATE TYPE "tahap_evaluasi" AS ENUM ('proposal', 'progress', 'akhir');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "dosen_id" INTEGER,
    "user_type" "user_type" NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dosen" (
    "id" SERIAL NOT NULL,
    "research_group_id" INTEGER,
    "program_studi_id" INTEGER,
    "nidn" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "gelar_tertinggi" "gelar" NOT NULL,
    "is_ketua_rg" BOOLEAN NOT NULL,
    "jabatan_id" INTEGER,
    "ttd_url" TEXT NOT NULL,

    CONSTRAINT "dosen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_group" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "research_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program_studi" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "program_studi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tahun_penelitian" (
    "id" SERIAL NOT NULL,
    "tahun" INTEGER NOT NULL,
    "waktu_buka" TIMESTAMP(3) NOT NULL,
    "waktu_tutup" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tahun_penelitian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jabatan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skema_jabatan" (
    "id" SERIAL NOT NULL,
    "skema_id" INTEGER NOT NULL,
    "jabatan_id" INTEGER NOT NULL,

    CONSTRAINT "skema_jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skema" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "maks_biaya" BIGINT NOT NULL,
    "min_gelar_dosen" "gelar" NOT NULL,
    "is_mhs" BOOLEAN NOT NULL,
    "is_mitra" BOOLEAN NOT NULL,
    "is_regular_dosen" BOOLEAN NOT NULL,

    CONSTRAINT "skema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usulan" (
    "id" SERIAL NOT NULL,
    "tahun_id" INTEGER NOT NULL,
    "skema_id" INTEGER NOT NULL,
    "dosen_id" INTEGER NOT NULL,
    "research_group_id" INTEGER NOT NULL,
    "status_usulan" "status_usulan" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "usulan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposal" (
    "id" SERIAL NOT NULL,
    "usulan_id" INTEGER NOT NULL,
    "judul_usulan" TEXT NOT NULL,
    "abstrak" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "latar_belakang" TEXT NOT NULL,
    "tujuan" TEXT NOT NULL,
    "metode" TEXT NOT NULL,
    "tinjauan_pustaka" TEXT NOT NULL,
    "daftar_pustaka" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anggota_dosen" (
    "id" SERIAL NOT NULL,
    "usulan_id" INTEGER NOT NULL,
    "dosen_id" INTEGER NOT NULL,

    CONSTRAINT "anggota_dosen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anggota_mahasiswa" (
    "id" SERIAL NOT NULL,
    "usulan_id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "nrp" TEXT NOT NULL,

    CONSTRAINT "anggota_mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anggota_mitra" (
    "id" SERIAL NOT NULL,
    "usulan_id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,

    CONSTRAINT "anggota_mitra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "biaya_usulan" (
    "id" SERIAL NOT NULL,
    "usulan_id" INTEGER NOT NULL,
    "kategori_biaya_id" INTEGER NOT NULL,
    "jumlah_biaya" DOUBLE PRECISION NOT NULL,
    "rincian_biaya" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "biaya_usulan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori_biaya" (
    "id" SERIAL NOT NULL,
    "skema_id" INTEGER NOT NULL,
    "nama_kategori" TEXT NOT NULL,

    CONSTRAINT "kategori_biaya_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dokumen_pendukung" (
    "id" SERIAL NOT NULL,
    "usulan_id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "konten" TEXT,
    "file_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dokumen_pendukung_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "luaran_usulan" (
    "id" SERIAL NOT NULL,
    "usulan_id" INTEGER NOT NULL,
    "jenis_luaran_id" INTEGER NOT NULL,
    "deskripsi_luaran" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "luaran_usulan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log" (
    "id" SERIAL NOT NULL,
    "tabel" TEXT NOT NULL,
    "audit" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penilaian" (
    "id" SERIAL NOT NULL,
    "skema_id" INTEGER NOT NULL,
    "tahap_evaluasi" "tahap_evaluasi" NOT NULL,
    "aspek" TEXT NOT NULL,

    CONSTRAINT "penilaian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "penilaian_id" INTEGER NOT NULL,
    "dosen_id" INTEGER NOT NULL,
    "usulan_id" INTEGER NOT NULL,
    "catatan" TEXT NOT NULL,
    "nilai" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jenis_luaran" (
    "id" SERIAL NOT NULL,
    "skema_id" INTEGER NOT NULL,
    "nama_luaran" TEXT NOT NULL,

    CONSTRAINT "jenis_luaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "proposal_usulan_id_key" ON "proposal"("usulan_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "dosen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dosen" ADD CONSTRAINT "dosen_research_group_id_fkey" FOREIGN KEY ("research_group_id") REFERENCES "research_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dosen" ADD CONSTRAINT "dosen_program_studi_id_fkey" FOREIGN KEY ("program_studi_id") REFERENCES "program_studi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dosen" ADD CONSTRAINT "dosen_jabatan_id_fkey" FOREIGN KEY ("jabatan_id") REFERENCES "jabatan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skema_jabatan" ADD CONSTRAINT "skema_jabatan_skema_id_fkey" FOREIGN KEY ("skema_id") REFERENCES "skema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skema_jabatan" ADD CONSTRAINT "skema_jabatan_jabatan_id_fkey" FOREIGN KEY ("jabatan_id") REFERENCES "jabatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usulan" ADD CONSTRAINT "usulan_tahun_id_fkey" FOREIGN KEY ("tahun_id") REFERENCES "tahun_penelitian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usulan" ADD CONSTRAINT "usulan_skema_id_fkey" FOREIGN KEY ("skema_id") REFERENCES "skema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usulan" ADD CONSTRAINT "usulan_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "dosen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usulan" ADD CONSTRAINT "usulan_research_group_id_fkey" FOREIGN KEY ("research_group_id") REFERENCES "research_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposal" ADD CONSTRAINT "proposal_usulan_id_fkey" FOREIGN KEY ("usulan_id") REFERENCES "usulan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggota_dosen" ADD CONSTRAINT "anggota_dosen_usulan_id_fkey" FOREIGN KEY ("usulan_id") REFERENCES "usulan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggota_dosen" ADD CONSTRAINT "anggota_dosen_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "dosen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggota_mahasiswa" ADD CONSTRAINT "anggota_mahasiswa_usulan_id_fkey" FOREIGN KEY ("usulan_id") REFERENCES "usulan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggota_mitra" ADD CONSTRAINT "anggota_mitra_usulan_id_fkey" FOREIGN KEY ("usulan_id") REFERENCES "usulan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "biaya_usulan" ADD CONSTRAINT "biaya_usulan_usulan_id_fkey" FOREIGN KEY ("usulan_id") REFERENCES "usulan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "biaya_usulan" ADD CONSTRAINT "biaya_usulan_kategori_biaya_id_fkey" FOREIGN KEY ("kategori_biaya_id") REFERENCES "kategori_biaya"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kategori_biaya" ADD CONSTRAINT "kategori_biaya_skema_id_fkey" FOREIGN KEY ("skema_id") REFERENCES "skema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dokumen_pendukung" ADD CONSTRAINT "dokumen_pendukung_usulan_id_fkey" FOREIGN KEY ("usulan_id") REFERENCES "usulan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "luaran_usulan" ADD CONSTRAINT "luaran_usulan_usulan_id_fkey" FOREIGN KEY ("usulan_id") REFERENCES "usulan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "luaran_usulan" ADD CONSTRAINT "luaran_usulan_jenis_luaran_id_fkey" FOREIGN KEY ("jenis_luaran_id") REFERENCES "jenis_luaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penilaian" ADD CONSTRAINT "penilaian_skema_id_fkey" FOREIGN KEY ("skema_id") REFERENCES "skema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_penilaian_id_fkey" FOREIGN KEY ("penilaian_id") REFERENCES "penilaian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "dosen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_usulan_id_fkey" FOREIGN KEY ("usulan_id") REFERENCES "usulan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jenis_luaran" ADD CONSTRAINT "jenis_luaran_skema_id_fkey" FOREIGN KEY ("skema_id") REFERENCES "skema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
