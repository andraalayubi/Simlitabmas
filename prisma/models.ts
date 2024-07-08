// Enums
export enum UserType {
    KETUA_RG = 'ketua_rg',
    KAPRODI = 'kaprodi',
    DOSEN = 'dosen',
    ADMIN = 'admin',
}

export enum Gelar {
    S1 = 'S1',
    S2 = 'S2',
    S3 = 'S3',
}

export enum StatusUsulan {
    TERSIMPAN = 'tersimpan',
    MENUNGGU = 'menunggu',
    DITOLAK = 'ditolak',
    DITERIMA = 'diterima',
    AKTIF = 'aktif',
    SELESAI = 'selesai',
}

export enum TahapEvaluasi {
    PROPOSAL = 'proposal',
    PROGRESS = 'progress',
    AKHIR = 'akhir',
}

// Models
export interface User {
    id: number;
    dosen_id?: number;
    user_type: UserType;
    username: string;
    password: string;
    email: string;
    name: string;
    dosen?: Dosen;
}

export interface Dosen {
    id: number;
    research_group_id?: number;
    program_studi_id?: number;
    nidn: string;
    nip: string;
    gelar_tertinggi: Gelar;
    is_ketua_rg: boolean;
    jabatan_id?: number;
    ttd_url: string;
    research_group?: ResearchGroup;
    program_studi?: ProgramStudi;
    jabatan?: Jabatan;
    user?: User;
    usulan?: Usulan[];
    anggota_dosen?: AnggotaDosen[];
    review?: Review[];
}

export interface ResearchGroup {
    id: number;
    nama: string;
    deskripsi: string;
    dosen?: Dosen[];
    usulan?: Usulan[];
}

export interface ProgramStudi {
    id: number;
    nama: string;
    deskripsi: string;
    dosen?: Dosen[];
}

export interface TahunPenelitian {
    id: number;
    tahun: number;
    waktu_buka: Date;
    waktu_tutup: Date;
    usulan?: Usulan[];
}

export interface Jabatan {
    id: number;
    nama: string;
    dosen?: Dosen[];
    skema_jabatan?: SkemaJabatan[];
}

export interface SkemaJabatan {
    id: number;
    skema_id: number;
    jabatan_id: number;
    skema?: Skema;
    jabatan?: Jabatan;
}

export interface Skema {
    id: number;
    nama: string;
    deskripsi: string;
    maks_biaya: bigint;
    min_gelar_dosen: Gelar;
    is_mhs: boolean;
    is_mitra: boolean;
    is_regular_dosen: boolean;
    skema_jabatan?: SkemaJabatan[];
    usulan?: Usulan[];
    kategori_biaya?: KategoriBiaya[];
    penilaian?: Penilaian[];
    jenis_luaran?: JenisLuaran[];
}

export interface Usulan {
    id: number;
    tahun_id: number;
    skema_id: number;
    dosen_id: number;
    research_group_id: number;
    status_usulan: StatusUsulan;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
    tahun_penelitian?: TahunPenelitian;
    skema?: Skema;
    dosen?: Dosen;
    research_group?: ResearchGroup;
    proposal?: Proposal;
    anggota_dosen?: AnggotaDosen[];
    anggota_mahasiswa?: AnggotaMahasiswa[];
    anggota_mitra?: AnggotaMitra[];
    biaya_usulan?: BiayaUsulan[];
    dokumen_pendukung?: DokumenPendukung[];
    luaran_usulan?: LuaranUsulan[];
    review?: Review[];
}

export interface Proposal {
    id: number;
    usulan_id: number;
    judul_usulan: string;
    abstrak: string;
    keyword: string;
    latar_belakang: string;
    tujuan: string;
    metode: string;
    tinjauan_pustaka: string;
    daftar_pustaka: string;
    updated_at: Date;
    created_at: Date;
    usulan?: Usulan;
}

export interface AnggotaDosen {
    id: number;
    usulan_id: number;
    dosen_id: number;
    usulan?: Usulan;
    dosen?: Dosen;
}

export interface AnggotaMahasiswa {
    id: number;
    usulan_id: number;
    nama: string;
    nrp: string;
    usulan?: Usulan;
}

export interface AnggotaMitra {
    id: number;
    usulan_id: number;
    nama: string;
    keterangan: string;
    usulan?: Usulan;
}

export interface BiayaUsulan {
    id: number;
    usulan_id: number;
    kategori_biaya_id: number;
    jumlah_biaya: number;
    rincian_biaya: string;
    created_at: Date;
    usulan?: Usulan;
    kategori_biaya?: KategoriBiaya;
}

export interface KategoriBiaya {
    id: number;
    skema_id: number;
    nama_kategori: string;
    skema?: Skema;
    biaya_usulan?: BiayaUsulan[];
}

export interface DokumenPendukung {
    id: number;
    usulan_id: number;
    nama: string;
    konten?: string;
    file_url?: string;
    created_at: Date;
    usulan?: Usulan;
}

export interface LuaranUsulan {
    id: number;
    usulan_id: number;
    jenis_luaran_id: number;
    deskripsi_luaran: string;
    file_url: string;
    created_at: Date;
    usulan?: Usulan;
    jenis_luaran?: JenisLuaran;
}

export interface Log {
    id: number;
    tabel: string;
    audit: string;
    created_at: Date;
    user_id: number;
    user?: User;
}

export interface Penilaian {
    id: number;
    skema_id: number;
    tahap_evaluasi: TahapEvaluasi;
    aspek: string;
    skema?: Skema;
    review?: Review[];
}

export interface Review {
    id: number;
    penilaian_id: number;
    dosen_id: number;
    usulan_id: number;
    catatan: string;
    nilai: number;
    penilaian?: Penilaian;
    dosen?: Dosen;
    usulan?: Usulan;
}

export interface JenisLuaran {
    id: number;
    skema_id: number;
    nama_luaran: string;
    skema?: Skema;
    luaran_usulan?: LuaranUsulan[];
}
