import { proposal_suggestion_phase, proposal_suggestion_status } from "prisma/interfaces";

// same data for each proposal suggestion
const base_logbook = {
    create: [
        {
            name: 'Logbook Laporan Kemajuan',
            description: "Laporan Perkembangan Awal",
            file_url: '',
        },
        {
            name: 'Logbook Laporan Akhir',
            description: "Laporan Perkembangan Akhir",
            file_url: '',
        }
    ]
}

const base_final_report = {
    create: [
        {
            name: 'Laporan Kemajuan',
            description: "Laporan Kemajuan",
            file_url: '',
        },
        {
            name: 'Laporan Akhir',
            description: "Laporan Akhir",
            file_url: '',
        }
    ]
}

let proposalSuggestionsPengmas = [
    // 1
    {
        name: "Pelatihan Digital Marketing bagi UMKM Lokal di Era Industri 4.0",
        year_research_id: 1,
        schema_id: 1,
        lecturer_id: 16,
        department_id: 4,
        status: "menunggu_proposal" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pelatihan Digital Marketing bagi UMKM Lokal di Era Industri 4.0"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 16,
                name: "Kholid Fathoni , S.Kom., MT.",
                research_group_id: null,
                department_id: 4,
                nip: "33445569",
            }
        },
    },
    // 2
    {
        name: "Edukasi dan Implementasi Teknologi Hidroponik bagi Petani Perkotaan",
        year_research_id: 2, // 2024
        schema_id: 2,
        lecturer_id: 15,
        department_id: 3,
        status: "tersimpan" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Edukasi dan Implementasi Teknologi Hidroponik bagi Petani Perkotaan"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 15,
                name: "Mohammad Nasyir Tamara, S.ST., M.T.",
                research_group_id: null,
                department_id: 3,
                nip: "33445568",
            },
        },
    },
    // 3
    {
        name: "Pemberdayaan Ibu Rumah Tangga melalui Program Wirausaha Kuliner Sehat",
        year_research_id: 2, // 2025
        schema_id: 1,
        lecturer_id: 15,
        department_id: 3,
        status: "menunggu_kaprodi" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pemberdayaan Ibu Rumah Tangga melalui Program Wirausaha Kuliner Sehat"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 15,
                name: "Mohammad Nasyir Tamara, S.ST., M.T.",
                research_group_id: null,
                department_id: 3,
                nip: "33445568",
            },
        },
    },
    // 4
    {
        year_research_id: 1,
        schema_id: 2,
        name: "Penggunaan Internet Aman dan Bijak untuk Pelajar di Sekolah Dasar",
        lecturer_id: 14,
        department_id: 2,
        status: "ditolak" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Penggunaan Internet Aman dan Bijak untuk Pelajar di Sekolah Dasar"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 14,
                name: "Prof. M. Udin Harun Al Rasyid , S.Kom., Ph.D",
                research_group_id: null,
                department_id: 2,
                nip: "33445567",
            },
        },
    },
    // 5
    {
        name: "Workshop Fotografi dan Editing Konten Visual bagi Pelaku Usaha Kuliner",
        year_research_id: 2,
        schema_id: 2,
        lecturer_id: 16,
        department_id: 4,
        status: "diterima" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Workshop Fotografi dan Editing Konten Visual bagi Pelaku Usaha Kuliner"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 16,
                name: "Kholid Fathoni , S.Kom., MT.",
                research_group_id: null,
                department_id: 4,
                nip: "33445569",
            },
        },
    },
    // 6
    {
        name: "Pembuatan Aplikasi Mobile untuk Monitoring Kesehatan Lansia di Puskesmas",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 14,
        department_id: 2,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pembuatan Aplikasi Mobile untuk Monitoring Kesehatan Lansia di Puskesmas"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 14,
                name: "Prof. M. Udin Harun Al Rasyid , S.Kom., Ph.D",
                research_group_id: null,
                department_id: 2,
                nip: "33445567",
            },
        },
    },
    // 7
    {
        name: "Pelatihan Desain Grafis bagi Anak Muda sebagai Bekal Karier Kreatif",
        year_research_id: 2,
        schema_id: 2,
        lecturer_id: 16,
        department_id: 4,
        status: "menunggu_review" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pelatihan Desain Grafis bagi Anak Muda sebagai Bekal Karier Kreatif"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 16,
                name: "Kholid Fathoni , S.Kom., MT.",
                research_group_id: null,
                department_id: 4,
                nip: "33445569",
            },
        },
    },
    // 8
    {
        name: "Pengenalan dan Pemanfaatan AI untuk Peningkatan Efisiensi Administrasi Desa",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 14,
        department_id: 2,
        status: "ditolak" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pengenalan dan Pemanfaatan AI untuk Peningkatan Efisiensi Administrasi Desa"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 14,
                name: "Prof. M. Udin Harun Al Rasyid , S.Kom., Ph.D",
                research_group_id: null,
                department_id: 2,
                nip: "33445567",
            }
        },
    },
    // 9
    {
        name: "Workshop Pengelolaan Sampah Organik menjadi Pupuk Kompos bagi Masyarakat Desa",
        year_research_id: 2,
        schema_id: 2,
        lecturer_id: 15,
        department_id: 3,
        status: "diterima" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Workshop Pengelolaan Sampah Organik menjadi Pupuk Kompos bagi Masyarakat Desa"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 15,
                name: "Mohammad Nasyir Tamara, S.ST., M.T.",
                research_group_id: null,
                department_id: 3,
                nip: "33445568",
            }
        },
    },
    // 10
    {
        name: "Pemberdayaan Remaja Melalui Pelatihan Public Speaking dan Leadership",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 13,
        department_id: 1,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "penetapan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pemberdayaan Remaja Melalui Pelatihan Public Speaking dan Leadership"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 13,
                name: "Dr. Arif Irwansyah, S.T., M.Eng",
                research_group_id: null,
                department_id: 1,
                nip: "33445566",
            }
        },
    },
    // 11
    {
        name: "Instalasi Panel Surya Off-Grid untuk Desa Terpencil Berbasis Teknologi IoT",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 13,
        department_id: 1,
        status: "menunggu_revisi" as proposal_suggestion_status,
        phase: "penetapan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Instalasi Panel Surya Off-Grid untuk Desa Terpencil Berbasis Teknologi IoT"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 13,
                name: "Dr. Arif Irwansyah, S.T., M.Eng",
                research_group_id: null,
                department_id: 1,
                nip: "33445566",
            }
        },
    },
    // 12
    {
        name: "Pelatihan Perbaikan Alat Elektronik Rumah Tangga bagi Pemuda Desa",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 13,
        department_id: 1,
        status: "tersimpan" as proposal_suggestion_status,
        phase: "penetapan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pelatihan Perbaikan Alat Elektronik Rumah Tangga bagi Pemuda Desa"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 13,
                name: "Dr. Arif Irwansyah, S.T., M.Eng",
                research_group_id: null,
                department_id: 1,
                nip: "33445566",
            }
        },
    },
    // 13
    {
        name: "Sistem Penerangan Jalan Umum Tenaga Hybrid (Angin-Surya) untuk Kawasan Pedesaan",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 13,
        department_id: 1,
        status: "menunggu_laporan" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Sistem Penerangan Jalan Umum Tenaga Hybrid (Angin-Surya) untuk Kawasan Pedesaan"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 13,
                name: "Dr. Arif Irwansyah, S.T., M.Eng",
                research_group_id: null,
                department_id: 1,
                nip: "33445566",
            }
        },
    },
    // 14
    {
        name: "Workshop Pembuatan Charger Portabel Berbahan Dasar Limbah Baterai",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 13,
        department_id: 1,
        status: "tersimpan" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Workshop Pembuatan Charger Portabel Berbahan Dasar Limbah Baterai"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 13,
                name: "Dr. Arif Irwansyah, S.T., M.Eng",
                research_group_id: null,
                department_id: 1,
                nip: "33445566",
            }
        },
    },
    // 15
    {
        year_research_id: 2,
        schema_id: 2,
        name: "Pelatihan Pembuatan Aplikasi Pencatatan Keuangan UMKM Berbasis Android",
        lecturer_id: 14,
        department_id: 2,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pelatihan Pembuatan Aplikasi Pencatatan Keuangan UMKM Berbasis Android"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 14,
                name: "Prof. M. Udin Harun Al Rasyid , S.Kom., Ph.D",
                research_group_id: null,
                department_id: 2,
                nip: "33445567",
            },
        },
    },
    // 16
    {
        year_research_id: 2,
        schema_id: 2,
        name: "Sosialisasi Keamanan Data Pribadi dan Enkripsi untuk Komunitas Digital",
        lecturer_id: 14,
        department_id: 2,
        status: "menunggu_review" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Sosialisasi Keamanan Data Pribadi dan Enkripsi untuk Komunitas Digital"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 14,
                name: "Prof. M. Udin Harun Al Rasyid , S.Kom., Ph.D",
                research_group_id: null,
                department_id: 2,
                nip: "33445567",
            },
        },
    },
    // 17
    {
        year_research_id: 2,
        schema_id: 2,
        name: "Pengembangan Sistem Monitoring Tanaman Hidroponik Berbasis Raspberry Pi",
        lecturer_id: 14,
        department_id: 2,
        status: "ditolak" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pengembangan Sistem Monitoring Tanaman Hidroponik Berbasis Raspberry Pi"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 14,
                name: "Prof. M. Udin Harun Al Rasyid , S.Kom., Ph.D",
                research_group_id: null,
                department_id: 2,
                nip: "33445567",
            },
        },
    },
    // 18
    {
        year_research_id: 2,
        schema_id: 2,
        name: "Workshop Chatbot untuk Layanan Pelanggan Usaha Kecil",
        lecturer_id: 14,
        department_id: 2,
        status: "diterima" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Workshop Chatbot untuk Layanan Pelanggan Usaha Kecil"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 14,
                name: "Prof. M. Udin Harun Al Rasyid , S.Kom., Ph.D",
                research_group_id: null,
                department_id: 2,
                nip: "33445567",
            },
        },
    },
    // 19
    {
        year_research_id: 2,
        schema_id: 2,
        name: "Pelatihan Pemrograman Dasar Python bagi Siswa SMA/SMK",
        lecturer_id: 14,
        department_id: 2,
        status: "menunggu_laporan" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pelatihan Pemrograman Dasar Python bagi Siswa SMA/SMK"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 14,
                name: "Prof. M. Udin Harun Al Rasyid , S.Kom., Ph.D",
                research_group_id: null,
                department_id: 2,
                nip: "33445567",
            },
        },
    },
    // 20
    {
        name: "Konversi Mesin Diesel ke Biodiesel untuk Kapal Nelayan Tradisional",
        year_research_id: 2, 
        schema_id: 1,
        lecturer_id: 15,
        department_id: 3,
        status: "tersimpan" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Konversi Mesin Diesel ke Biodiesel untuk Kapal Nelayan Tradisional"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 15,
                name: "Mohammad Nasyir Tamara, S.ST., M.T.",
                research_group_id: null,
                department_id: 3,
                nip: "33445568",
            },
        },
    },
    // 21
    {
        name: "Pelatihan Perawatan Mesin Pertanian Berkelanjutan di Daerah Agraris",
        year_research_id: 2, 
        schema_id: 1,
        lecturer_id: 15,
        department_id: 3,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pelatihan Perawatan Mesin Pertanian Berkelanjutan di Daerah Agraris"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 15,
                name: "Mohammad Nasyir Tamara, S.ST., M.T.",
                research_group_id: null,
                department_id: 3,
                nip: "33445568",
            },
        },
    },
    // 22
    {
        name: "Pemasangan Biogas dari Limbah Ternak untuk Rumah Tangga Pedesaan",
        year_research_id: 2, 
        schema_id: 1,
        lecturer_id: 15,
        department_id: 3,
        status: "menunggu_review" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pemasangan Biogas dari Limbah Ternak untuk Rumah Tangga Pedesaan"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 15,
                name: "Mohammad Nasyir Tamara, S.ST., M.T.",
                research_group_id: null,
                department_id: 3,
                nip: "33445568",
            },
        },
    },
    // 23
    {
        name: "Workshop Energi Mikrohidro untuk Pembangkit Listrik Komunitas Pegunungan",
        year_research_id: 2, 
        schema_id: 1,
        lecturer_id: 15,
        department_id: 3,
        status: "ditolak" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Workshop Energi Mikrohidro untuk Pembangkit Listrik Komunitas Pegunungan"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 15,
                name: "Mohammad Nasyir Tamara, S.ST., M.T.",
                research_group_id: null,
                department_id: 3,
                nip: "33445568",
            },
        },
    },
    // 24
    {
        name: "Pelatihan Animasi 2D untuk Promosi Budaya Lokal melalui Media Sosial",
        year_research_id: 2,
        schema_id: 2,
        lecturer_id: 16,
        department_id: 4,
        status: "diterima" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pelatihan Animasi 2D untuk Promosi Budaya Lokal melalui Media Sosial"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 16,
                name: "Kholid Fathoni , S.Kom., MT.",
                research_group_id: null,
                department_id: 4,
                nip: "33445569",
            },
        },
    },
    // 25
    {
        name: "Pengembangan Konten Edukasi Interaktif tentang Sejarah Lokal Berbasis Augmented Reality",
        year_research_id: 2,
        schema_id: 2,
        lecturer_id: 16,
        department_id: 4,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pengembangan Konten Edukasi Interaktif tentang Sejarah Lokal Berbasis Augmented Reality"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 16,
                name: "Kholid Fathoni , S.Kom., MT.",
                research_group_id: null,
                department_id: 4,
                nip: "33445569",
            },
        },
    },
    // 26
    {
        name: "Sosialisasi Desain Kemasan Produk UMKM dengan Tools Digital Kreatif",
        year_research_id: 2,
        schema_id: 2,
        lecturer_id: 16,
        department_id: 4,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Sosialisasi Desain Kemasan Produk UMKM dengan Tools Digital Kreatif"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 16,
                name: "Kholid Fathoni , S.Kom., MT.",
                research_group_id: null,
                department_id: 4,
                nip: "33445569",
            },
        },
    },
];

export default proposalSuggestionsPengmas;
