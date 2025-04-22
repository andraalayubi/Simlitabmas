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


const proposalSuggestionsPenelitian = [
    {
        name: "Pengembangan UI/UX pada CRM Pengabdian Masyarakat",
        year_research_id: 1,
        schema_id: 1, // Skema Dasar
        lecturer_id: 4,
        research_group_id: 4, // Human Centric
        department_id: null,
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
            create: {
                lecturer_id: 4,
                name: "Sritrusta Sukaridhoto, ST., Ph.D.",
                research_group_id: 4,
                department_id: 4,
                nip: "196904121995021001",
            },
        },
    },
    {
        name: "Integrasi Machine Learning untuk Analisis Data Akuakultur",
        year_research_id: 1,
        schema_id: 2, // Skema Terapan
        lecturer_id: 5,
        research_group_id: 5, // ACE-ATech
        department_id: null,
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
            create: {
                lecturer_id: 5,
                name: "Dr. Agus Indra Gunawan",
                research_group_id: 5,
                department_id: 3,
                nip: "197304131998031001",
            },
        },
    },
    {
        name: "Metodologi Agile dalam Pengembangan Perangkat Lunak Akademik",
        year_research_id: 1,
        schema_id: 1,
        lecturer_id: 6,
        research_group_id: 6,
        department_id: null,
        status: "menunggu_rg" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Metodologi Agile dalam Pengembangan Perangkat Lunak Akademik"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 6,
                name: "Umi Sa'adah",
                research_group_id: 6,
                department_id: 2,
                nip: "198004152000122001",
            },
        },
    },
    {
        year_research_id: 1,
        schema_id: 1,
        name: "Pemanfaatan Biofuel sebagai Alternatif Energi Ramah Lingkungan",
        lecturer_id: 7,
        research_group_id: 7, // Bio Electrochemistry System
        department_id: null,
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
            create: {
                lecturer_id: 7,
                name: "Ri'fah Amalia",
                research_group_id: 7,
                department_id: 1,
                nip: "78901234",
            },
        },
    },
    {
        name: "Analisis Sinyal Biomedik untuk Diagnosa Dini Penyakit",
        year_research_id: 1,
        schema_id: 1,
        lecturer_id: 8,
        research_group_id: 8, // Biosignal and Instrumentation Biomedic
        department_id: null,
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
            create: {
                lecturer_id: 8,
                name: "Rika Rokhana",
                research_group_id: 8,
                department_id: 3,
                nip: "89012345",
            },
        },
    },
    {
        name: "Keamanan Siber pada Infrastruktur Kritis Nasional",
        year_research_id: 1,
        schema_id: 2,
        lecturer_id: 9,
        research_group_id: 9, // Cyber Security
        department_id: null,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Keamanan Siber pada Infrastruktur Kritis Nasional"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 9,
                name: "Ferry Astika Saputra",
                research_group_id: 9,
                department_id: 2,
                nip: "90123456",
            },
        },
    },
    {
        name: "Optimalisasi AI dalam Sistem e-Bisnis",
        year_research_id: 1,
        schema_id: 1,
        lecturer_id: 10,
        research_group_id: 10,
        department_id: null,
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
            create: {
                lecturer_id: 10,
                name: "Arna Fariza",
                research_group_id: 10,
                department_id: 2,
                nip: "01234567",
            }
        },
    },
    {
        name: "Pemanfaatan Data Science untuk Pencapaian SDGs",
        year_research_id: 1,
        schema_id: 2,
        lecturer_id: 11,
        research_group_id: 11,
        department_id: null,
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
            create: {
                lecturer_id: 11,
                name: "Ronny Susetyoko",
                research_group_id: 11,
                department_id: 2,
                nip: "11223344",
            }
        },
    },
    {
        name: "Inovasi Digital Media untuk Pembelajaran Interaktif",
        year_research_id: 1,
        schema_id: 1,
        lecturer_id: 12,
        research_group_id: 12, // Digital Media
        department_id: null,
        status: "diterima" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Inovasi Digital Media untuk Pembelajaran Interaktif"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 12,
                name: "Moh. Hasbi Assidigi",
                research_group_id: 12,
                department_id: 4,
                nip: "22334455",
            }
        },
    },
    {
        name: "Pengembangan Antarmuka Multimedia Responsif untuk Penyandang Disabilitas Sensorik",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 4,
        research_group_id: 4,
        department_id: null,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "penetapan" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Pengembangan Antarmuka Multimedia Responsif untuk Penyandang Disabilitas Sensorik"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 4,
                name: "Sritrusta Sukaridhoto, ST., Ph.D.",
                research_group_id: 4,
                department_id: 4,
                nip: "196904121995021001",
            },
        },
    },
    {
        name: "Sistem IoT untuk Optimasi Kualitas Air pada Budidaya Udang Skala Industri",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 5,
        research_group_id: 5,
        department_id: null,
        status: "menunggu_revisi" as proposal_suggestion_status,
        phase: "penetapan" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Sistem IoT untuk Optimasi Kualitas Air pada Budidaya Udang Skala Industri",
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 5,
                name: "Dr. Agus Indra Gunawan",
                research_group_id: 5,
                department_id: 3,
                nip: "197304131998031001",
            },
        },
    },
    {
        name: "Implementasi Framework Scrum dalam Pengembangan Aplikasi Edukasi Berbasis Gamifikasi",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 6,
        research_group_id: 6,
        department_id: null,
        status: "tersimpan" as proposal_suggestion_status,
        phase: "penetapan" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Implementasi Framework Scrum dalam Pengembangan Aplikasi Edukasi Berbasis Gamifikasi"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 6,
                name: "Umi Sa'adah",
                research_group_id: 6,
                department_id: 2,
                nip: "198004152000122001",
            },
        },
    },
    {
        name: "Pengembangan Biobaterai Berbasis Mikroorganisme untuk Penyimpanan Energi Terbarukan",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 7,
        research_group_id: 7,
        department_id: null,
        status: "menunggu_laporan" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Pengembangan Biobaterai Berbasis Mikroorganisme untuk Penyimpanan Energi Terbarukan"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 7,
                name: "Ri'fah Amalia",
                research_group_id: 7,
                department_id: 1,
                nip: "78901234",
            },
        },
    },
    {
        name: "Desain Wearable Device untuk Deteksi Dini Gangguan Irama Jantung dengan Analisis Sinyal ECG",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 8,
        research_group_id: 8,
        department_id: null,
        status: "tersimpan" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Desain Wearable Device untuk Deteksi Dini Gangguan Irama Jantung dengan Analisis Sinyal ECG"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 8,
                name: "Rika Rokhana",
                research_group_id: 8,
                department_id: 3,
                nip: "89012345",
            },
        },
    },
    {
        name: "Rancangan Sistem Deteksi Intrusi Berbasis AI untuk Jaringan Industri 4.0",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 9,
        research_group_id: 9,
        department_id: null,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Rancangan Sistem Deteksi Intrusi Berbasis AI untuk Jaringan Industri 4.0"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 9,
                name: "Ferry Astika Saputra",
                research_group_id: 9,
                department_id: 2,
                nip: "90123456",
            },
        },
    },
    {
        name: "Integrasi NLP dalam Sistem Rekomendasi Produk untuk Marketplace Lokal",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 10,
        research_group_id: 10,
        department_id: null,
        status: "menunggu_review" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Integrasi NLP dalam Sistem Rekomendasi Produk untuk Marketplace Lokal"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 10,
                name: "Arna Fariza",
                research_group_id: 10,
                department_id: 2,
                nip: "01234567",
            }
        },
    },
    {
        name: "Prediksi Ketahanan Pangan Regional Menggunakan Analisis Data Satelit dan Machine Learning",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 11,
        research_group_id: 11,
        department_id: null,
        status: "ditolak" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Prediksi Ketahanan Pangan Regional Menggunakan Analisis Data Satelit dan Machine Learning"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 11,
                name: "Ronny Susetyoko",
                research_group_id: 11,
                department_id: 2,
                nip: "11223344",
            }
        },
    },
    {
        name: "Augmented Reality untuk Visualisasi Interaktif Warisan Budaya Indonesia",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 12,
        research_group_id: 12,
        department_id: null,
        status: "diterima" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Augmented Reality untuk Visualisasi Interaktif Warisan Budaya Indonesia"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 12,
                name: "Moh. Hasbi Assidigi",
                research_group_id: 12,
                department_id: 4,
                nip: "22334455",

            }
        },
    },
    {
        name: "Optimasi Konsumsi Daya pada Sensor Cerdas Pertanian Berbasis TinyML",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 10,
        research_group_id: 10,
        department_id: null,
        status: "menunggu_laporan" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Optimasi Konsumsi Daya pada Sensor Cerdas Pertanian Berbasis TinyML"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 10,
                name: "Arna Fariza",
                research_group_id: 10,
                department_id: 2,
                nip: "01234567",
            }
        },
    },
    {
        name: "Studi User Experience pada Aplikasi Konferensi Virtual untuk Pendidikan Jarak Jauh",
        year_research_id: 2,
        schema_id: 2,
        lecturer_id: 4,
        research_group_id: 4,
        department_id: null,
        status: "tersimpan" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Studi User Experience pada Aplikasi Konferensi Virtual untuk Pendidikan Jarak Jauh"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 4,
                name: "Sritrusta Sukaridhoto, ST., Ph.D.",
                research_group_id: 4,
                department_id: 4,
                nip: "196904121995021001",
            },
        },
    },
    {
        name: "Prototipe Autonomous Drone untuk Monitoring Kesehatan Tambak Ikan",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 5,
        research_group_id: 5,
        department_id: null,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Prototipe Autonomous Drone untuk Monitoring Kesehatan Tambak Ikan"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 5,
                name: "Dr. Agus Indra Gunawan",
                research_group_id: 5,
                department_id: 3,
                nip: "197304131998031001",
            },
        },
    },
    {
        name: "Adaptasi Metode Kanban dalam Pengembangan Aplikasi Kesehatan Mental",
        year_research_id: 2,
        schema_id: 2,
        lecturer_id: 6,
        research_group_id: 6,
        department_id: null,
        status: "menunggu_review" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Adaptasi Metode Kanban dalam Pengembangan Aplikasi Kesehatan Mental"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 6,
                name: "Umi Sa'adah",
                research_group_id: 6,
                department_id: 2,
                nip: "198004152000122001",
            },
        },
    },
    {
        name: "Konversi Limbah Pertanian menjadi Biofuel Berbasis Teknologi Elektrokimia",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 7,
        research_group_id: 7,
        department_id: null,
        status: "ditolak" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Konversi Limbah Pertanian menjadi Biofuel Berbasis Teknologi Elektrokimia"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 7,
                name: "Ri'fah Amalia",
                research_group_id: 7,
                department_id: 1,
                nip: "78901234",
            },
        },
    },
    {
        name: "Inovasi Alat Pulse Oximeter Portabel dengan Integrasi Cloud Computing",
        year_research_id: 2,
        schema_id: 3,
        lecturer_id: 8,
        research_group_id: 8,
        department_id: null,
        status: "diterima" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Inovasi Alat Pulse Oximeter Portabel dengan Integrasi Cloud Computing"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 8,
                name: "Rika Rokhana",
                research_group_id: 8,
                department_id: 3,
                nip: "89012345",
            },
        },
    },
    {
        name: "Analisis Kerentanan Zero-Day pada Sistem SCADA di Pembangkit Listrik",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 9,
        research_group_id: 9,
        department_id: null,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Analisis Kerentanan Zero-Day pada Sistem SCADA di Pembangkit Listrik"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 9,
                name: "Ferry Astika Saputra",
                research_group_id: 9,
                department_id: 2,
                nip: "90123456",
            },
        },
    },
    {
        name: "Model Prediksi Dampak Perubahan Iklim terhadap Keanekaragaman Hayati Laut",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 11,
        research_group_id: 11,
        department_id: null,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Model Prediksi Dampak Perubahan Iklim terhadap Keanekaragaman Hayati Laut"
            }
        },
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 11,
                name: "Ronny Susetyoko",
                research_group_id: 11,
                department_id: 2,
                nip: "11223344",
            }
        },
    },
];


export default proposalSuggestionsPenelitian;