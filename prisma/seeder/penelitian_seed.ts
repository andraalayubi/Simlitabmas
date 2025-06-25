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

let proposalSuggestionsPenelitian = [
    // 1
    {
        name: "Pengembangan UI/UX pada CRM Pengabdian Masyarakat",
        year_research_id: 1,
        schema_id: 1, // Skema Dasar
        lecturer_id: 4,
        research_group_id: 4, // Human Centric
        department_id: 4,
        status: "menunggu_proposal" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pengembangan UI/UX pada CRM Pengabdian Masyarakat"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 4,
                    name: "Sritrusta Sukaridhoto, ST., Ph.D.",
                    research_group_id: 4,
                    department_id: 4,
                    nip: "196904121995021001",
                },
                {
                    lecturer_id: 5,
                    name: "Dr. Agus Indra Gunawan",
                    research_group_id: 5,
                    department_id: 3,
                    nip: "197304131998031001",
                }
            ],
        },
    },
    // 2
    {
        name: "Integrasi Machine Learning untuk Analisis Data Akuakultur",
        year_research_id: 1,
        schema_id: 2, // Skema Terapan
        lecturer_id: 5,
        research_group_id: 5, // ACE-ATech
        department_id: 3,
        status: "tersimpan" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Integrasi Machine Learning untuk Analisis Data Akuakultur"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 5,
                    name: "Dr. Agus Indra Gunawan",
                    research_group_id: 5,
                    department_id: 3,
                    nip: "197304131998031001",
                },
                {
                    lecturer_id: 6,
                    name: "Umi Sa'adah",
                    research_group_id: 6,
                    department_id: 2,
                    nip: "198004152000122001",
                }
            ],
        },
    },
    // 3
    {
        name: "Metodologi Agile dalam Pengembangan Perangkat Lunak Akademik",
        year_research_id: 1,
        schema_id: 1,
        lecturer_id: 6,
        research_group_id: 6,
        department_id: 2,
        status: "menunggu_rg" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Metodologi Agile dalam Pengembangan Perangkat Lunak Akademik"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 6,
                    name: "Umi Sa'adah",
                    research_group_id: 6,
                    department_id: 2,
                    nip: "198004152000122001",
                },
                {
                    lecturer_id: 7,
                    name: "Ri'fah Amalia",
                    research_group_id: 7,
                    department_id: 1,
                    nip: "78901234",
                }
            ],
        },
    },
    // 4
    {
        year_research_id: 1,
        schema_id: 1,
        name: "Pemanfaatan Biofuel sebagai Alternatif Energi Ramah Lingkungan",
        lecturer_id: 7,
        research_group_id: 7, // Bio Electrochemistry System
        department_id: 1,
        status: "ditolak" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pemanfaatan Biofuel sebagai Alternatif Energi Ramah Lingkungan"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 7,
                    name: "Ri'fah Amalia",
                    research_group_id: 7,
                    department_id: 1,
                    nip: "78901234",
                },
                {
                    lecturer_id: 8,
                    name: "Arna Fariza",
                    research_group_id: 8,
                    department_id: 2,
                    nip: "01234567",
                }
            ],
        },
    },
    //5
    {
        name: "Analisis Sinyal Biomedik untuk Diagnosa Dini Penyakit",
        year_research_id: 1,
        schema_id: 1,
        lecturer_id: 8,
        research_group_id: 8, // Biosignal and Instrumentation Biomedic
        department_id: 3,
        status: "diterima" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Analisis Sinyal Biomedik untuk Diagnosa Dini Penyakit"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 8,
                    name: "Rika Rokhana",
                    research_group_id: 8,
                    department_id: 3,
                    nip: "89012345",
                },
                {
                    lecturer_id: 9,
                    name: "Ferry Astika Saputra",
                    research_group_id: 9,
                    department_id: 2,
                    nip: "90123456",
                }
            ],
        },
    },
    // 6
    {
        name: "Keamanan Siber pada Infrastruktur Kritis Nasional",
        year_research_id: 1,
        schema_id: 2,
        lecturer_id: 9,
        research_group_id: 9, // Cyber Security
        department_id: 1,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Keamanan Siber pada Infrastruktur Kritis Nasional"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 9,
                    name: "Ferry Astika Saputra",
                    research_group_id: 9,
                    department_id: 2,
                    nip: "90123456",
                },
                {
                    lecturer_id: 10,
                    name: "Arna Fariza",
                    research_group_id: 10,
                    department_id: 2,
                    nip: "01234567",
                }
            ],
        },
    },
    // 7
    {
        name: "Optimalisasi AI dalam Sistem e-Bisnis",
        year_research_id: 1,
        schema_id: 1,
        lecturer_id: 10,
        research_group_id: 10,
        department_id: 1,
        status: "menunggu_review" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Optimalisasi AI dalam Sistem e-Bisnis"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 10,
                    name: "Arna Fariza",
                    research_group_id: 10,
                    department_id: 2,
                    nip: "01234567",
                },
                {
                    lecturer_id: 11,
                    name: "Ronny Susetyoko",
                    research_group_id: 11,
                    department_id: 2,
                    nip: "11223344",
                }
            ],
        },
    },
    // 8
    {
        name: "Pemanfaatan Data Science untuk Pencapaian SDGs",
        year_research_id: 1,
        schema_id: 2,
        lecturer_id: 11,
        research_group_id: 11,
        department_id: 2,
        status: "ditolak" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pemanfaatan Data Science untuk Pencapaian SDGs"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 11,
                    name: "Ronny Susetyoko",
                    research_group_id: 11,
                    department_id: 2,
                    nip: "11223344",
                },
                {
                    lecturer_id: 12,
                    name: "Ronny Susetyoko",
                    research_group_id: 12,
                    department_id: 2,
                    nip: "11223344",
                }
            ],
        },
    },
    // 9
    {
        name: "Inovasi Digital Media untuk Pembelajaran Interaktif",
        year_research_id: 1,
        schema_id: 1,
        lecturer_id: 12,
        research_group_id: 12, // Digital Media
        department_id: 4,
        status: "diterima" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Inovasi Digital Media untuk Pembelajaran Interaktif"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 12,
                    name: "Moh. Hasbi Assidigi",
                    research_group_id: 12,
                    department_id: 4,
                    nip: "22334455",
                },
                {
                    lecturer_id: 13,
                    name: "Moh. Hasbi Assidigi",
                    research_group_id: 12,
                    department_id: 4,
                    nip: "22334455",
                }
            ],
        },
    },
    // 10
    {
        name: "Pengembangan Antarmuka Multimedia Responsif untuk Penyandang Disabilitas Sensorik",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 4,
        research_group_id: 4,
        department_id: 4,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "penetapan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pengembangan Antarmuka Multimedia Responsif untuk Penyandang Disabilitas Sensorik"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 4,
                    name: "Sritrusta Sukaridhoto, ST., Ph.D.",
                    research_group_id: 4,
                    department_id: 4,
                    nip: "196904121995021001",
                },
                {
                    lecturer_id: 5,
                    name: "Dr. Agus Indra Gunawan",
                    research_group_id: 5,
                    department_id: 3,
                    nip: "197304131998031001",
                }
            ],
        },
    },
    // 11
    {
        name: "Sistem IoT untuk Optimasi Kualitas Air pada Budidaya Udang Skala Industri",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 5,
        research_group_id: 5,
        department_id: 3,
        status: "menunggu_revisi" as proposal_suggestion_status,
        phase: "penetapan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Sistem IoT untuk Optimasi Kualitas Air pada Budidaya Udang Skala Industri",
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 5,
                    name: "Dr. Agus Indra Gunawan",
                    research_group_id: 5,
                    department_id: 3,
                    nip: "197304131998031001",
                },
                {
                    lecturer_id: 6,
                    name: "Umi Sa'adah",
                    research_group_id: 6,
                    department_id: 2,
                    nip: "198004152000122001",
                }
            ],
        },
    },
    // 12
    {
        name: "Implementasi Framework Scrum dalam Pengembangan Aplikasi Edukasi Berbasis Gamifikasi",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 6,
        research_group_id: 6,
        department_id: 2,
        status: "tersimpan" as proposal_suggestion_status,
        phase: "penetapan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Implementasi Framework Scrum dalam Pengembangan Aplikasi Edukasi Berbasis Gamifikasi"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 6,
                    name: "Umi Sa'adah",
                    research_group_id: 6,
                    department_id: 2,
                    nip: "198004152000122001",
                },
                {
                    lecturer_id: 7,
                    name: "Ri'fah Amalia",
                    research_group_id: 7,
                    department_id: 1,
                    nip: "78901234",
                }
            ],
        },
    },
    // 13
    {
        name: "Pengembangan Biobaterai Berbasis Mikroorganisme untuk Penyimpanan Energi Terbarukan",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 7,
        research_group_id: 7,
        department_id: 1,
        status: "menunggu_laporan" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pengembangan Biobaterai Berbasis Mikroorganisme untuk Penyimpanan Energi Terbarukan"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 7,
                    name: "Ri'fah Amalia",
                    research_group_id: 7,
                    department_id: 1,
                    nip: "78901234",
                },
                {
                    lecturer_id: 8,
                    name: "Arna Fariza",
                    research_group_id: 8,
                    department_id: 2,
                    nip: "01234567",
                }
            ],
        },
    },
    // 14
    {
        name: "Desain Wearable Device untuk Deteksi Dini Gangguan Irama Jantung dengan Analisis Sinyal ECG",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 8,
        research_group_id: 8,
        department_id: 3,
        status: "tersimpan" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Desain Wearable Device untuk Deteksi Dini Gangguan Irama Jantung dengan Analisis Sinyal ECG"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 8,
                    name: "Rika Rokhana",
                    research_group_id: 8,
                    department_id: 3,
                    nip: "89012345",
                },
                {
                    lecturer_id: 9,
                    name: "Ferry Astika Saputra",
                    research_group_id: 9,
                    department_id: 2,
                    nip: "90123456",
                }
            ],
        },
    },
    // 15
    {
        name: "Rancangan Sistem Deteksi Intrusi Berbasis AI untuk Jaringan Industri 4.0",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 9,
        research_group_id: 9,
        department_id: 1,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Rancangan Sistem Deteksi Intrusi Berbasis AI untuk Jaringan Industri 4.0"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 9,
                    name: "Ferry Astika Saputra",
                    research_group_id: 9,
                    department_id: 2,
                    nip: "90123456",
                },
                {
                    lecturer_id: 10,
                    name: "Arna Fariza",
                    research_group_id: 10,
                    department_id: 2,
                    nip: "01234567",
                }
            ],
        },
    },
    // 16
    {
        name: "Integrasi NLP dalam Sistem Rekomendasi Produk untuk Marketplace Lokal",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 10,
        research_group_id: 10,
        department_id: 1,
        status: "menunggu_review" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Integrasi NLP dalam Sistem Rekomendasi Produk untuk Marketplace Lokal"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 10,
                    name: "Arna Fariza",
                    research_group_id: 10,
                    department_id: 2,
                    nip: "01234567",
                },
                {
                    lecturer_id: 11,
                    name: "Ronny Susetyoko",
                    research_group_id: 11,
                    department_id: 2,
                    nip: "11223344",
                }
            ],
        },
    },
    // 17
    {
        name: "Prediksi Ketahanan Pangan Regional Menggunakan Analisis Data Satelit dan Machine Learning",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 11,
        research_group_id: 11,
        department_id: 2,
        status: "ditolak" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Prediksi Ketahanan Pangan Regional Menggunakan Analisis Data Satelit dan Machine Learning"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 11,
                    name: "Ronny Susetyoko",
                    research_group_id: 11,
                    department_id: 2,
                    nip: "11223344",
                },
                {
                    lecturer_id: 12,
                    name: "Moh. Hasbi Assidigi",
                    research_group_id: 12,
                    department_id: 4,
                    nip: "22334455",
                }
            ],
        },
    },
    // 18
    {
        name: "Augmented Reality untuk Visualisasi Interaktif Warisan Budaya Indonesia",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 12,
        research_group_id: 12,
        department_id: 4,
        status: "diterima" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Augmented Reality untuk Visualisasi Interaktif Warisan Budaya Indonesia"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 12,
                    name: "Moh. Hasbi Assidigi",
                    research_group_id: 12,
                    department_id: 4,
                    nip: "22334455",
                },
                {
                    lecturer_id: 5,
                    name: "Dr. Agus Indra Gunawan",
                    research_group_id: 13,
                    department_id: 3,
                    nip: "197304131998031001",
                }
            ],
        },
    },
    // 19
    {
        name: "Optimasi Konsumsi Daya pada Sensor Cerdas Pertanian Berbasis TinyML",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 10,
        research_group_id: 10,
        department_id: 1,
        status: "menunggu_laporan" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Optimasi Konsumsi Daya pada Sensor Cerdas Pertanian Berbasis TinyML"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 10,
                    name: "Arna Fariza",
                    research_group_id: 10,
                    department_id: 2,
                    nip: "01234567",
                },
                {
                    lecturer_id: 14,
                    name: "Moh. Hasbi Assidigi",
                    research_group_id: null,
                    department_id: 4,
                    nip: "22334455",
                }
            ],
        },
    },
    // 20
    {
        name: "Studi User Experience pada Aplikasi Konferensi Virtual untuk Pendidikan Jarak Jauh",
        year_research_id: 2,
        schema_id: 2,
        lecturer_id: 4,
        research_group_id: 4,
        department_id: 4,
        status: "tersimpan" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Studi User Experience pada Aplikasi Konferensi Virtual untuk Pendidikan Jarak Jauh"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 4,
                    name: "Sritrusta Sukaridhoto, ST., Ph.D.",
                    research_group_id: 4,
                    department_id: 4,
                    nip: "196904121995021001",
                },
                {
                    lecturer_id: 5,
                    name: "Dr. Agus Indra Gunawan",
                    research_group_id: 5,
                    department_id: 3,
                    nip: "197304131998031001",
                }
            ],
        },
    },
    // 21
    {
        name: "Prototipe Autonomous Drone untuk Monitoring Kesehatan Tambak Ikan",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 5,
        research_group_id: 5,
        department_id: 3,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Prototipe Autonomous Drone untuk Monitoring Kesehatan Tambak Ikan"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 5,
                    name: "Dr. Agus Indra Gunawan",
                    research_group_id: 5,
                    department_id: 3,
                    nip: "197304131998031001",
                },
                {
                    lecturer_id: 6,
                    name: "Umi Sa'adah",
                    research_group_id: 6,
                    department_id: 2,
                    nip: "198004152000122001",
                }
            ],
        },
    },
    // 22
    {
        name: "Adaptasi Metode Kanban dalam Pengembangan Aplikasi Kesehatan Mental",
        year_research_id: 2,
        schema_id: 2,
        lecturer_id: 6,
        research_group_id: 6,
        department_id: 2,
        status: "menunggu_review" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Adaptasi Metode Kanban dalam Pengembangan Aplikasi Kesehatan Mental"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 6,
                    name: "Umi Sa'adah",
                    research_group_id: 6,
                    department_id: 2,
                    nip: "198004152000122001",
                },
                {
                    lecturer_id: 7,
                    name: "Ri'fah Amalia",
                    research_group_id: 7,
                    department_id: 1,
                    nip: "78901234",
                }
            ],
        },
    },
    // 23
    {
        name: "Konversi Limbah Pertanian menjadi Biofuel Berbasis Teknologi Elektrokimia",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 7,
        research_group_id: 7,
        department_id: 1,
        status: "ditolak" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Konversi Limbah Pertanian menjadi Biofuel Berbasis Teknologi Elektrokimia"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 7,
                    name: "Ri'fah Amalia",
                    research_group_id: 7,
                    department_id: 1,
                    nip: "78901234",
                },
                {
                    lecturer_id: 8,
                    name: "Rika Rokhana",
                    research_group_id: 8,
                    department_id: 3,
                    nip: "89012345",
                }
            ],
        },
    },
    // 25
    {
        name: "Inovasi Alat Pulse Oximeter Portabel dengan Integrasi Cloud Computing",
        year_research_id: 2,
        schema_id: 3,
        lecturer_id: 8,
        research_group_id: 8,
        department_id: 3,
        status: "diterima" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Inovasi Alat Pulse Oximeter Portabel dengan Integrasi Cloud Computing"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 8,
                    name: "Rika Rokhana",
                    research_group_id: 8,
                    department_id: 3,
                    nip: "89012345",
                },
                {
                    lecturer_id: 9,
                    name: "Ferry Astika Saputra",
                    research_group_id: 9,
                    department_id: 2,
                    nip: "90123456",
                }
            ],
        },
    },
    // 25
    {
        name: "Analisis Kerentanan Zero-Day pada Sistem SCADA di Pembangkit Listrik",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 9,
        research_group_id: 9,
        department_id: 1,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Analisis Kerentanan Zero-Day pada Sistem SCADA di Pembangkit Listrik"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 9,
                    name: "Ferry Astika Saputra",
                    research_group_id: 9,
                    department_id: 2,
                    nip: "90123456",
                },
                {
                    lecturer_id: 10,
                    name: "Arna Fariza",
                    research_group_id: 10,
                    department_id: 1,
                    nip: "01234567",
                }
            ],
        },
    },
    // 26
    {
        name: "Model Prediksi Dampak Perubahan Iklim terhadap Keanekaragaman Hayati Laut",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 11,
        research_group_id: 11,
        department_id: 2,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Model Prediksi Dampak Perubahan Iklim terhadap Keanekaragaman Hayati Laut"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 11,
                    name: "Ronny Susetyoko",
                    research_group_id: 11,
                    department_id: 2,
                    nip: "11223344",
                },
                {
                    lecturer_id: 5,
                    name: "Dr. Agus Indra Gunawan",
                    research_group_id: 12,
                    department_id: 3,
                    nip: "197304131998031001",
                }
            ],
        },
    },

    // 27
    {
        name: "Numerical analysis of ultrasound propagation and reflection intensity for biological acoustic impedance microscope",
        year_research_id: 2,
        schema_id: 3,
        lecturer_id: 5,
        research_group_id: 5,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Numerical analysis of ultrasound propagation and reflection intensity for biological acoustic impedance microscope"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 5,
                    name: "Dr. Agus Indra Gunawan",
                    research_group_id: 5,
                    department_id: 1,
                    nip: "197304131998031001",
                }
            ],
        },
    },

    // 28
    {
        name: "Numerical analysis of acoustic impedance microscope utilizing acoustic lens transducer to examine cultured cells",
        year_research_id: 12, // 2015
        schema_id: 3,
        lecturer_id: 5,
        research_group_id: 5,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Numerical analysis of acoustic impedance microscope utilizing acoustic lens transducer to examine cultured cells"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 5,
                    name: "Dr. Agus Indra Gunawan",
                    research_group_id: 5,
                    department_id: 1,
                    nip: "197304131998031001",
                }
            ],
        },
    },

    // 29
    {
        name: "A Study for Estimation of Bio Organism Content in Aquaculture Pond Based on Image Color and Light Intensity",
        year_research_id: 8, // 2019
        schema_id: 3,
        lecturer_id: 5,
        research_group_id: 5,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "A Study for Estimation of Bio Organism Content in Aquaculture Pond Based on Image Color and Light Intensity"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 5,
                    name: "Dr. Agus Indra Gunawan",
                    research_group_id: 5,
                    department_id: 1,
                    nip: "197304131998031001",
                }
            ],
        },
    },

    // 30
    {
        name: "Characterizing acoustic impedance of several saline solution utilizing range finder acoustic sensor",
        year_research_id: 10, // 2017
        schema_id: 3,
        lecturer_id: 5,
        research_group_id: 5,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Characterizing acoustic impedance of several saline solution utilizing range finder acoustic sensor"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 5,
                    name: "Dr. Agus Indra Gunawan",
                    research_group_id: 5,
                    department_id: 1,
                    nip: "197304131998031001",
                }
            ],
        },
    },

    // 31
    {
        name: "Melanoma image classification based on MobileNetV2 network",
        year_research_id: 5, // 2022
        schema_id: 3,
        lecturer_id: 8,
        research_group_id: 8,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Melanoma image classification based on MobileNetV2 network"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 8,
                    name: "Rika Rokhana",
                    research_group_id: 8,
                    department_id: 1,
                    nip: "89012345",
                }
            ],
        },
    },

    // 32
    {
        name: "Convolutional neural network untuk pendeteksian patah tulang femur pada citra ultrasonik b–mode",
        year_research_id: 8, // 2019
        schema_id: 3,
        lecturer_id: 8,
        research_group_id: 8,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Convolutional neural network untuk pendeteksian patah tulang femur pada citra ultrasonik b–mode"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 8,
                    name: "Rika Rokhana",
                    research_group_id: 8,
                    department_id: 1,
                    nip: "89012345",
                }
            ],
        },
    },

    // 33
    {
        name: "Deep convolutional neural network for melanoma image classification",
        year_research_id: 7, // 2020
        schema_id: 3,
        lecturer_id: 8,
        research_group_id: 8,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Deep convolutional neural network for melanoma image classification"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 8,
                    name: "Rika Rokhana",
                    research_group_id: 8,
                    department_id: 1,
                    nip: "89012345",
                }
            ],
        },
    },

    // 34
    {
        name: "Deteksi Penyakit Mata Pada Citra Fundus Menggunakan Convolutional Neural Network (CNN).",
        year_research_id: 5, // 2022
        schema_id: 3,
        lecturer_id: 8,
        research_group_id: 8,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Deteksi Penyakit Mata Pada Citra Fundus Menggunakan Convolutional Neural Network (CNN)."
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 8,
                    name: "Rika Rokhana",
                    research_group_id: 8,
                    department_id: 1,
                    nip: "89012345",
                }
            ],
        },
    },

    // 35
    {
        name: "Multi-class image classification based on mobilenetv2 for detecting the proper use of face mask",
        year_research_id: 6, // 2021
        schema_id: 3,
        lecturer_id: 8,
        research_group_id: 8,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Multi-class image classification based on mobilenetv2 for detecting the proper use of face mask"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 8,
                    name: "Rika Rokhana",
                    research_group_id: 8,
                    department_id: 1,
                    nip: "89012345",
                }
            ],
        },
    },

    // 36
    {
        name: "Identifikasi Kerusakan Pankreas Melalui Iridology Menggunakan Metode Bayes Untuk Pengenalan Diabetes Mellitus",
        year_research_id: 12, // 2015
        schema_id: 3,
        lecturer_id: 32,
        research_group_id: 8,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Identifikasi Kerusakan Pankreas Melalui Iridology Menggunakan Metode Bayes Untuk Pengenalan Diabetes Mellitus"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 32,
                    name: "Moch. Rochmad, S.T., M.T.,",
                    research_group_id: 8,
                    department_id: 1,
                    nip: "198103202000121002",
                }
            ],
        },
    },

    // 37
    {
        name: "Deteksi semangat hidup seseorang melalui pengenalan pola iris mata berbasis artificial neural network",
        year_research_id: 12, // 2015
        schema_id: 3,
        lecturer_id: 32,
        research_group_id: 8,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Deteksi semangat hidup seseorang melalui pengenalan pola iris mata berbasis artificial neural network"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 32,
                    name: "Moch. Rochmad, S.T., M.T.,",
                    research_group_id: 8,
                    department_id: 1,
                    nip: "198103202000121002",
                }
            ],
        },
    },

    // 38
    {
        name: "IMPLEMENTATION EYES MOVEMENT TO HELP COMMUNICATION PERSONS DISABILITIES",
        year_research_id: 9, // 2018
        schema_id: 3,
        lecturer_id: 32,
        research_group_id: 8,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "IMPLEMENTATION EYES MOVEMENT TO HELP COMMUNICATION PERSONS DISABILITIES"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 32,
                    name: "Moch. Rochmad, S.T., M.T.,",
                    research_group_id: 8,
                    department_id: 1,
                    nip: "198103202000121002",
                }
            ],
        },
    },

    // 39
    {
        name: "Pemanfaatan modul wireless X-bee pro untuk Electrocardiograf (ECG) Terhubung ke Personal Computer (PC)",
        year_research_id: 13, // 2009 (diasumsikan id 13 untuk tahun 2009)
        schema_id: 3,
        lecturer_id: 32,
        research_group_id: 8,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pemanfaatan modul wireless X-bee pro untuk Electrocardiograf (ECG) Terhubung ke Personal Computer (PC)"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 32,
                    name: "Moch. Rochmad, S.T., M.T.,",
                    research_group_id: 8,
                    department_id: 1,
                    nip: "198103202000121002",
                }
            ],
        },
    },

    // 40
    {
        name: "Design and analyze detector stress level based oxihaemoglobin (HbO2) in blood",
        year_research_id: 13, // 2009
        schema_id: 3,
        lecturer_id: 32,
        research_group_id: 8,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Design and analyze detector stress level based oxihaemoglobin (HbO2) in blood"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 32,
                    name: "Moch. Rochmad, S.T., M.T.,",
                    research_group_id: 8,
                    department_id: 1,
                    nip: "198103202000121002",
                }
            ],
        },
    },

    // 41
    {
        name: "Rancang Bangun Alat Ukur Kadar Gula Darah, Kolestrol, dan Asam Urat Non-Invasif Berbasis Internet of Things (IoT)",
        year_research_id: 1, // 2023
        schema_id: 3,
        lecturer_id: 32,
        research_group_id: 8,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Rancang Bangun Alat Ukur Kadar Gula Darah, Kolestrol, dan Asam Urat Non-Invasif Berbasis Internet of Things (IoT)"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 32,
                    name: "Moch. Rochmad, S.T., M.T.,",
                    research_group_id: 8,
                    department_id: 1,
                    nip: "198103202000121002",
                }
            ],
        },
    },

    // 42
    {
        name: "Performansi Neuro Fuzzy untuk Peramalan Data Time Series",
        year_research_id: 12,
        schema_id: 3,
        lecturer_id: 10,
        research_group_id: 10,
        department_id: 2,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Performansi Neuro Fuzzy untuk Peramalan Data Time Series"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 10,
                    name: "Arna Fariza",
                    research_group_id: 10,
                    department_id: 2,
                    nip: "3122500053",
                }
            ],
        },
    },
    // 43
    {
        name: "Age estimation system using deep residual network classification method",
        year_research_id: 8,
        schema_id: 3,
        lecturer_id: 10,
        research_group_id: 10,
        department_id: 2,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Age estimation system using deep residual network classification method"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 10,
                    name: "Arna Fariza",
                    research_group_id: 10,
                    department_id: 2,
                    nip: "3122500053",
                }
            ],
        },
    },
    // 44
    {
        name: "Prediksi Curah Hujan Menggunakan Long Short Term Memory",
        year_research_id: 5,
        schema_id: 3,
        lecturer_id: 10,
        research_group_id: 10,
        department_id: 2,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Prediksi Curah Hujan Menggunakan Long Short Term Memory"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 10,
                    name: "Arna Fariza",
                    research_group_id: 10,
                    department_id: 2,
                    nip: "3122500053",
                }
            ],
        },
    },
    // 45
    {
        name: "Automatic tooth and background segmentation in dental x-ray using U-Net convolution network",
        year_research_id: 7,
        schema_id: 3,
        lecturer_id: 10,
        research_group_id: 10,
        department_id: 2,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Automatic tooth and background segmentation in dental x-ray using U-Net convolution network"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 10,
                    name: "Arna Fariza",
                    research_group_id: 10,
                    department_id: 2,
                    nip: "3122500053",
                }
            ],
        },
    },
    // 46
    {
        name: "Urban flood risk assessment in sidoarjo, indonesia, using fuzzy multi-criteria decision making",
        year_research_id: 7,
        schema_id: 3,
        lecturer_id: 10,
        research_group_id: 10,
        department_id: 2,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Urban flood risk assessment in sidoarjo, indonesia, using fuzzy multi-criteria decision making"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: [
                {
                    lecturer_id: 10,
                    name: "Arna Fariza",
                    research_group_id: 10,
                    department_id: 2,
                    nip: "3122500053",
                }
            ],
        },
    },
    
];


export default proposalSuggestionsPenelitian;