import { degree, PrismaClient } from '@prisma/client'

import { user_type } from "@prisma/client";
import { JsonArray } from '@prisma/client/runtime/library';
import bcrypt from "bcrypt";
import { proposal_suggestion_phase, proposal_suggestion_status } from 'prisma/interfaces';
import { evaluation_phase } from 'prisma/interfaces';
const prisma = new PrismaClient()

const lecturers = [
    {
        name: "Mirza Ramadhani",
        research_group_id: 1,
        department_id: 1,
        nidn: "3122500044",
        nip: "12345678",
        degree: [
            {
                degree: "S1" as degree,
                code: "S.Kom",
                field: "Computer Science",
                university: "MIT",
                year: "2027"
            },
            {
                degree: "S2" as degree,
                code: "M.Eng",
                field: "Engineering",
                university: "MIT",
                year: "2030"
            },
            {
                degree: "S3" as degree,
                code: "Dr.",
                field: "Computer Science",
                university: "MIT",
                year: "2034"
            },
        ] as JsonArray,
        is_ketua_rg: true,
        position_id: 1,
        user: {
            create: [
                { name: "Admin Mirza", email: "adminMirza@gmail.com", user_type: 'admin' as user_type, password: "Mirza123!" },
                { name: "Dosen Mirza", email: "dosenMirza@gmail.com", user_type: 'lecturer' as user_type, password: "Mirza123!" },
                { name: "Ketua RG Mirza", email: "ketuargMirza@gmail.com", user_type: 'ketua_rg' as user_type, password: "Mirza123!" },
                { name: "Kaprodi Mirza", email: "kaprodiMirza@gmail.com", user_type: 'kaprodi' as user_type, password: "Mirza123!" }
            ]
        }
    },
    {
        name: "Andra Al Ayubi",
        research_group_id: 2,
        department_id: 2,
        nidn: "3122500045",
        nip: "23456789",
        degree: [
            {
                degree: "S1" as degree,
                code: "S.Si",
                field: "Mathematics",
                university: "Harvard",
                year: "2025"
            },
            {
                degree: "S2" as degree,
                code: "M.Sc.",
                field: "Applied Mathematics",
                university: "Harvard",
                year: "2028"
            }
        ] as JsonArray,
        is_ketua_rg: true,
        position_id: 2,
        user: {
            create: [
                { name: "Admin Andra", email: "adminAndra@gmail.com", user_type: 'admin' as user_type, password: "Andra123!" },
                { name: "Dosen Andra", email: "dosenAndra@gmail.com", user_type: 'lecturer' as user_type, password: "Andra123!" },
                { name: "Ketua RG Andra", email: "ketuargAndra@gmail.com", user_type: 'ketua_rg' as user_type, password: "Andra123!" },
                { name: "Kaprodi Andra", email: "kaprodiAndra@gmail.com", user_type: 'kaprodi' as user_type, password: "Andra123!" },
            ]
        }
    },
    {
        name: "Hammam Mujahid",
        research_group_id: 3,
        department_id: 3,
        nidn: "3122500046",
        nip: "34567890",
        degree: [
            {
                degree: "S1" as degree,
                code: "S.Si",
                field: "Physics",
                university: "Stanford",
                year: "2023"
            },
            {
                degree: "S2" as degree,
                code: "Ph.D.",
                field: "Theoretical Physics",
                university: "Stanford",
                year: "2026"
            }
        ] as JsonArray,
        is_ketua_rg: true,
        position_id: 3,
        user: {
            create: [
                { name: "Admin Hammam", email: "adminHammam@gmail.com", user_type: 'admin' as user_type, password: "Hammam123!" },
                { name: "Dosen Hammam", email: "dosenHammam@gmail.com", user_type: 'lecturer' as user_type, password: "Hammam123!" },
                { name: "Ketua RG Hammam", email: "ketuargHammam@gmail.com", user_type: 'ketua_rg' as user_type, password: "Hammam123!" },
            ]
        }
    }
]


const research_groups = [
    { name: "Human Centric Multimedia", description: "Vision: To be centre of excellence in Research Groupin the field of Human Centric & Multimedia inNational and International " },
    { name: "ACE-ATech", description: "Aquacultural Engineering Applied-Technology (ACE-ATech) Research Group adalah sebuah komunitas penelitian lintas bidang keilmuan di PENS yang dibangun untuk mendukung penguatan sektor budidaya perairan (akuakultur) Indonesia yang maju, kuat dan mandiri." },
    { name: "Agile Product Development", description: "RG Agile Product Development adalah grup riset yang mengembangkan produk perangkat lunak berorientasi market dan memberikan nilai tambah kepada masyarakatdengan pendekatan metodologi Agile" },
    { name: "Bio Electrochemistry System", description: "Research Group Bio Electrochemsitry System merupakan kelompok riset yang berfokus pada pengembangan energy baru terbarukan yang meliputi bioenergy, electrochemistry dan energy storage" },
    { name: "Biosignal and Instrumentation Biomedic", description: "Biosignal & Medical Instrumentation karena berkaitan dengan pengolahan sinyal phisiology pada mahluk hidup, sehingga dengan menerapkan pengetahuan dan teknologi elektronika dan kedokteran dapat memecahkan masalah yang berkaitan dengan design dan realisasi instrumentasi untuk mengukur besaran physiology dengan harapan dapat membantu tenaga medis dalam diagnosa, pengobatan dan monitoring penyakit." },
    { name: "Cyber Security", description: "CSRG adalah pusat intelektual untuk mempelajari berbagai masalah dalam keamanan dunia maya dan bidang terkait, termasuk perang dunia maya dan perang dunia maya, strategi dunia maya nasional dan militer, perlindungan infrastruktur kritis, keamanan informasi, perang informasi, pengawasan digital, kejahatan dunia maya dan solusi keamanan pada sistem OT (Operation Technology) pada otomasi industri yang tehubung di Internet." },
    { name: "Data Centric AI and e-Bussines System", description: "This research group focuses on the processing and visualization of big data based on Establish in 2018 as Data Engineering and Process Optimization (Depro) About Data Centric Artificial Intelligent and e-Business System (DaCAIBS) integrated artificial intelligence in the business environment as a tool in decision support systems." },
    { name: "Data Science for SDGs Applied Solution", description: "Data Science for SDGs Applied Solutions" },
    { name: "Digital Media", description: "Mengeksplorasi alat dan teknologi baru di media digital untuk kehidupan yang lebih baik" },
    { name: "Edutaiment Computing", description: "The Edutainment Computing Research Group is a research forum that develops technological innovations in the education-entertainment field" },
    { name: "Embedded AI", description: "Embedded artificial intelligence (AI) is the application of machine and deep learning in software at the device level. Software can be programmed to provide both predictive and reactive intelligence, based on the data that is collected and analyzed." },
]

const year_researches = [
    { year: 2023, open_date: new Date("2023-01-01"), closed_date: new Date("2023-12-31") },
    { year: 2024, open_date: new Date("2024-01-01"), closed_date: new Date("2024-12-31") },
    { year: 2025, open_date: new Date("2025-01-01"), closed_date: new Date("2025-12-31") },
    { year: 2026, open_date: new Date("2026-01-01"), closed_date: new Date("2026-12-31") },
];

const positions = [
    { name: "Professor", description: "A senior academic position for conducting advanced research and teaching." },
    { name: "Associate Professor", description: "An academic position supporting research and lecturing responsibilities." },
    { name: "Lecturer", description: "A position for teaching and contributing to research activities." }
];

const schemas = [
    { name: "Skema Dasar", description: "Penelitian atau pengabdian yang berfokus pada eksplorasi, penemuan, dan pemahaman konsep, teori, atau fenomena ilmiah tanpa memprioritaskan aplikasi praktis langsung.", max_cost: 500000, min_degree: "S1" as degree, is_student: true, is_partner: true, is_lecturer: true },
    { name: "Skema Terapan", description: "Penelitian atau pengabdian yang dirancang untuk memecahkan masalah praktis atau menghasilkan produk yang dapat langsung dimanfaatkan oleh masyarakat atau industri.", max_cost: 1000000, min_degree: "S1" as degree, is_student: true, is_partner: true, is_lecturer: true }
];

const position_schemas = [
    { schema_id: 1, position_id: 1 },
    { schema_id: 1, position_id: 2 },
    { schema_id: 1, position_id: 3 },
    { schema_id: 2, position_id: 1 },
    { schema_id: 2, position_id: 2 },
    { schema_id: 2, position_id: 3 }
];

const departements = [
    { name: "Departemen Teknik Elektro", description: "Menaungi program studi terkait teknik elektro dan aplikasinya." },
    { name: "Departemen Teknik Informatika dan Komputer", description: "Menaungi program studi yang berfokus pada informatika dan ilmu komputer." },
    { name: "Departemen Teknik Mekanika dan Energi", description: "Menaungi program studi yang berkaitan dengan mekanika dan sistem energi." },
    { name: "Departemen Teknologi Multimedia Kreatif", description: "Menaungi program studi yang berfokus pada multimedia dan industri kreatif." },
    { name: "Departemen Program Pendidikan Jarak Jauh", description: "Menyediakan program studi melalui metode pembelajaran jarak jauh." }
];

const evaluations = [
    {
        schema_id: 1,
        evaluation_phase: "evaluasi_proposal" as evaluation_phase,
        name: "Evaluasi Proposal Skema 1"
    },
    {
        schema_id: 1,
        evaluation_phase: "evaluasi_monev" as evaluation_phase,
        name: "Evaluasi Monev Skema 1"
    },
    {
        schema_id: 1,
        evaluation_phase: "evaluasi_akhir" as evaluation_phase,
        name: "Evaluasi Akhir Skema 1"
    },
    {
        schema_id: 2,
        evaluation_phase: "evaluasi_proposal" as evaluation_phase,
        name: "Evaluasi Proposal Skema 2"
    },
    {
        schema_id: 2,
        evaluation_phase: "evaluasi_monev" as evaluation_phase,
        name: "Evaluasi Monev Skema 2"
    },
    {
        schema_id: 2,
        evaluation_phase: "evaluasi_akhir" as evaluation_phase,
        name: "Evaluasi Akhir Skema 2"
    },
]

const proposalSuggestionsPenelitian = [
    {
        name: "Pengembangan UI/UX pada CRM Pengabdian Masyarakat",
        year_research_id: 1, // 2023
        schema_id: 1, // Skema Dasar
        lecturer_id: 1, // Mirza Ramadhani
        research_group_id: 1, // Human Centric Multimedia
        department_id: 1,
        status: "menunggu_proposal" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pengembangan UI/UX pada CRM Pengabdian Masyarakat"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 1, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Mirza Ramadhani",
                research_group_id: 1,
                department_id: 1,
                nip: "12345678",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Kom",
                        field: "Computer Science",
                        university: "MIT",
                        year: "2027"
                    },
                    {
                        degree: "S2" as degree,
                        code: "M.Eng",
                        field: "Engineering",
                        university: "MIT",
                        year: "2030"
                    },
                    {
                        degree: "S3" as degree,
                        code: "Dr.",
                        field: "Computer Science",
                        university: "MIT",
                        year: "2034"
                    },
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 1,
            },
        },
    },
    {
        name: "Integrasi Machine Learning untuk Analisis Data Akuakultur",
        year_research_id: 2, // 2024
        schema_id: 2, // Skema Terapan
        lecturer_id: 1,
        research_group_id: 2, // ACE-ATech
        department_id: 1,
        status: "menunggu_revisi" as proposal_suggestion_status,
        phase: "penetapan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Integrasi Machine Learning untuk Analisis Data Akuakultur"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 1, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Mirza Ramadhani",
                research_group_id: 1,
                department_id: 1,
                nip: "12345678",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Kom",
                        field: "Computer Science",
                        university: "MIT",
                        year: "2027"
                    },
                    {
                        degree: "S2" as degree,
                        code: "M.Eng",
                        field: "Engineering",
                        university: "MIT",
                        year: "2030"
                    },
                    {
                        degree: "S3" as degree,
                        code: "Dr.",
                        field: "Computer Science",
                        university: "MIT",
                        year: "2034"
                    },
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 1,
            },
        },
    },
    {
        name: "Metodologi Agile dalam Pengembangan Perangkat Lunak Akademik",
        year_research_id: 3, // 2025
        schema_id: 1,
        lecturer_id: 1,
        research_group_id: 3, // Agile Product Development
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Metodologi Agile dalam Pengembangan Perangkat Lunak Akademik"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 1, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Mirza Ramadhani",
                research_group_id: 1,
                department_id: 1,
                nip: "12345678",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Kom",
                        field: "Computer Science",
                        university: "MIT",
                        year: "2027"
                    },
                    {
                        degree: "S2" as degree,
                        code: "M.Eng",
                        field: "Engineering",
                        university: "MIT",
                        year: "2030"
                    },
                    {
                        degree: "S3" as degree,
                        code: "Dr.",
                        field: "Computer Science",
                        university: "MIT",
                        year: "2034"
                    },
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 1,
            },
        },
    },
    {
        year_research_id: 1,
        schema_id: 2,
        name: "Pemanfaatan Biofuel sebagai Alternatif Energi Ramah Lingkungan",
        lecturer_id: 2,
        research_group_id: 4, // Bio Electrochemistry System
        department_id: 2,
        status: "menunggu_rg" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pemanfaatan Biofuel sebagai Alternatif Energi Ramah Lingkungan"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 2, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Andra Al Ayubi",
                research_group_id: 2,
                department_id: 2,
                nip: "23456789",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Si",
                        field: "Mathematics",
                        university: "Harvard",
                        year: "2025"
                    },
                    {
                        degree: "S2" as degree,
                        code: "M.Sc.",
                        field: "Applied Mathematics",
                        university: "Harvard",
                        year: "2028"
                    }
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 2,
            },
        },
    },
    {
        name: "Analisis Sinyal Biomedik untuk Diagnosa Dini Penyakit",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 2,
        research_group_id: 5, // Biosignal and Instrumentation Biomedic
        department_id: 2,
        status: "menunggu_review" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Analisis Sinyal Biomedik untuk Diagnosa Dini Penyakit"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 2, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Andra Al Ayubi",
                research_group_id: 2,
                department_id: 2,
                nip: "23456789",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Si",
                        field: "Mathematics",
                        university: "Harvard",
                        year: "2025"
                    },
                    {
                        degree: "S2" as degree,
                        code: "M.Sc.",
                        field: "Applied Mathematics",
                        university: "Harvard",
                        year: "2028"
                    }
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 2,
            },
        },
    },
    {
        name: "Keamanan Siber pada Infrastruktur Kritis Nasional",
        year_research_id: 3,
        schema_id: 2,
        lecturer_id: 2,
        research_group_id: 6, // Cyber Security
        department_id: 2,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Keamanan Siber pada Infrastruktur Kritis Nasional"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 2, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Andra Al Ayubi",
                research_group_id: 2,
                department_id: 2,
                nip: "23456789",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Si",
                        field: "Mathematics",
                        university: "Harvard",
                        year: "2025"
                    },
                    {
                        degree: "S2" as degree,
                        code: "M.Sc.",
                        field: "Applied Mathematics",
                        university: "Harvard",
                        year: "2028"
                    }
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 2,
            },
        },
    },
    {
        name: "Optimalisasi AI dalam Sistem e-Bisnis",
        year_research_id: 1,
        schema_id: 1,
        lecturer_id: 3,
        research_group_id: 7, // Data Centric AI and e-Business System
        department_id: 3,
        status: "diterima" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Optimalisasi AI dalam Sistem e-Bisnis"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 3,
                name: "Hammam Mujahid",
                research_group_id: 3,
                department_id: 3,
                nip: "34567890",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Si",
                        field: "Physics",
                        university: "Stanford",
                        year: "2023"
                    },
                    {
                        degree: "S2" as degree,
                        code: "Ph.D.",
                        field: "Theoretical Physics",
                        university: "Stanford",
                        year: "2026"
                    }
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 3,
            }
        },
    },
    {
        name: "Pemanfaatan Data Science untuk Pencapaian SDGs",
        year_research_id: 2,
        schema_id: 2,
        lecturer_id: 3,
        research_group_id: 8, // Data Science for SDGs Applied Solution
        department_id: 3,
        status: "ditolak" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pemanfaatan Data Science untuk Pencapaian SDGs"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 3,
                name: "Hammam Mujahid",
                research_group_id: 3,
                department_id: 3,
                nip: "34567890",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Si",
                        field: "Physics",
                        university: "Stanford",
                        year: "2023"
                    },
                    {
                        degree: "S2" as degree,
                        code: "Ph.D.",
                        field: "Theoretical Physics",
                        university: "Stanford",
                        year: "2026"
                    }
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 3,
            }
        },
    },
    {
        name: "Inovasi Digital Media untuk Pembelajaran Interaktif",
        year_research_id: 3,
        schema_id: 1,
        lecturer_id: 3,
        research_group_id: 9, // Digital Media
        department_id: 3,
        status: "diterima" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Inovasi Digital Media untuk Pembelajaran Interaktif"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 3,
                name: "Hammam Mujahid",
                research_group_id: 3,
                department_id: 3,
                nip: "34567890",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Si",
                        field: "Physics",
                        university: "Stanford",
                        year: "2023"
                    },
                    {
                        degree: "S2" as degree,
                        code: "Ph.D.",
                        field: "Theoretical Physics",
                        university: "Stanford",
                        year: "2026"
                    }
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 3,
            }
        },
    }
];

const proposalSuggestionsPengmas = [
    {
        name: "Pelatihan Digital Marketing bagi UMKM Lokal di Era Industri 4.0",
        year_research_id: 1, // 2023
        schema_id: 1, // Skema Dasar
        lecturer_id: 1, // Mirza Ramadhani
        department_id: 1,
        status: "diterima" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pelatihan Digital Marketing bagi UMKM Lokal di Era Industri 4.0"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 1, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Mirza Ramadhani",
                research_group_id: 1,
                department_id: 1,
                nip: "12345678",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Kom",
                        field: "Computer Science",
                        university: "MIT",
                        year: "2027"
                    },
                    {
                        degree: "S2" as degree,
                        code: "M.Eng",
                        field: "Engineering",
                        university: "MIT",
                        year: "2030"
                    },
                    {
                        degree: "S3" as degree,
                        code: "Dr.",
                        field: "Computer Science",
                        university: "MIT",
                        year: "2034"
                    },
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 1,
            },
        },
    },
    {
        name: "Edukasi dan Implementasi Teknologi Hidroponik bagi Petani Perkotaan",
        year_research_id: 2, // 2024
        schema_id: 2, // Skema Terapan
        lecturer_id: 1,
        department_id: 1,
        status: "selesai" as proposal_suggestion_status,
        phase: "penetapan_akhir" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Edukasi dan Implementasi Teknologi Hidroponik bagi Petani Perkotaan"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 1, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Mirza Ramadhani",
                research_group_id: 1,
                department_id: 1,
                nip: "12345678",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Kom",
                        field: "Computer Science",
                        university: "MIT",
                        year: "2027"
                    },
                    {
                        degree: "S2" as degree,
                        code: "M.Eng",
                        field: "Engineering",
                        university: "MIT",
                        year: "2030"
                    },
                    {
                        degree: "S3" as degree,
                        code: "Dr.",
                        field: "Computer Science",
                        university: "MIT",
                        year: "2034"
                    },
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 1,
            },
        },
    },
    {
        name: "Pemberdayaan Ibu Rumah Tangga melalui Program Wirausaha Kuliner Sehat",
        year_research_id: 3, // 2025
        schema_id: 1,
        lecturer_id: 1,
        department_id: 1,
        status: "menunggu_proposal" as proposal_suggestion_status,
        phase: "pengajuan" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Pemberdayaan Ibu Rumah Tangga melalui Program Wirausaha Kuliner Sehat"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 1, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Mirza Ramadhani",
                research_group_id: 1,
                department_id: 1,
                nip: "12345678",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Kom",
                        field: "Computer Science",
                        university: "MIT",
                        year: "2027"
                    },
                    {
                        degree: "S2" as degree,
                        code: "M.Eng",
                        field: "Engineering",
                        university: "MIT",
                        year: "2030"
                    },
                    {
                        degree: "S3" as degree,
                        code: "Dr.",
                        field: "Computer Science",
                        university: "MIT",
                        year: "2034"
                    },
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 1,
            },
        },
    },
    {
        year_research_id: 1,
        schema_id: 2,
        name: "Penggunaan Internet Aman dan Bijak untuk Pelajar di Sekolah Dasar",
        lecturer_id: 2,
        department_id: 2,
        status: "menunggu_revisi" as proposal_suggestion_status,
        phase: "penetapan" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Penggunaan Internet Aman dan Bijak untuk Pelajar di Sekolah Dasar"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 2, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Andra Al Ayubi",
                research_group_id: 2,
                department_id: 2,
                nip: "23456789",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Si",
                        field: "Mathematics",
                        university: "Harvard",
                        year: "2025"
                    },
                    {
                        degree: "S2" as degree,
                        code: "M.Sc.",
                        field: "Applied Mathematics",
                        university: "Harvard",
                        year: "2028"
                    }
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 2,
            },
        },
    },
    {
        name: "Pembuatan Aplikasi Mobile untuk Monitoring Kesehatan Lansia di Puskesmas",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 2,
        department_id: 2,
        status: "menunggu_review" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pembuatan Aplikasi Mobile untuk Monitoring Kesehatan Lansia di Puskesmas"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 2, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Andra Al Ayubi",
                research_group_id: 2,
                department_id: 2,
                nip: "23456789",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Si",
                        field: "Mathematics",
                        university: "Harvard",
                        year: "2025"
                    },
                    {
                        degree: "S2" as degree,
                        code: "M.Sc.",
                        field: "Applied Mathematics",
                        university: "Harvard",
                        year: "2028"
                    }
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 2,
            },
        },
    },
    {
        name: "Pelatihan Desain Grafis bagi Anak Muda sebagai Bekal Karier Kreatif",
        year_research_id: 3,
        schema_id: 2,
        lecturer_id: 2,
        department_id: 2,
        status: "menunggu_admin" as proposal_suggestion_status,
        phase: "monev" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Pelatihan Desain Grafis bagi Anak Muda sebagai Bekal Karier Kreatif"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 2, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Andra Al Ayubi",
                research_group_id: 2,
                department_id: 2,
                nip: "23456789",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.Si",
                        field: "Mathematics",
                        university: "Harvard",
                        year: "2025"
                    },
                    {
                        degree: "S2" as degree,
                        code: "M.Sc.",
                        field: "Applied Mathematics",
                        university: "Harvard",
                        year: "2028"
                    }
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 2,
            },
        },
    },
    {
        name: "Pengenalan dan Pemanfaatan AI untuk Peningkatan Efisiensi Administrasi Desa",
        year_research_id: 1,
        schema_id: 1,
        lecturer_id: 3,
        department_id: 3,
        status: "diterima" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Pengenalan dan Pemanfaatan AI untuk Peningkatan Efisiensi Administrasi Desa"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 3,
                name: "Hammam Mujahid",
                research_group_id: 3,
                department_id: 3,
                nip: "34567890",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.",
                        field: "Physics",
                        university: "Stanford",
                        year: "2023"
                    },
                    {
                        degree: "S2" as degree,
                        code: "Ph.D.",
                        field: "Theoretical Physics",
                        university: "Stanford",
                        year: "2026"
                    }
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 3,
            }
        },
    },
    {
        name: "Workshop Pengelolaan Sampah Organik menjadi Pupuk Kompos bagi Masyarakat Desa",
        year_research_id: 2,
        schema_id: 2,
        lecturer_id: 3,
        department_id: 3,
        status: "ditolak" as proposal_suggestion_status,
        phase: "evaluasi_proposal" as proposal_suggestion_phase,
        is_active: true,
        proposal: {
            create: {
                name: "Workshop Pengelolaan Sampah Organik menjadi Pupuk Kompos bagi Masyarakat Desa"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 3,
                name: "Hammam Mujahid",
                research_group_id: 3,
                department_id: 3,
                nip: "34567890",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.",
                        field: "Physics",
                        university: "Stanford",
                        year: "2023"
                    },
                    {
                        degree: "S2" as degree,
                        code: "Ph.D.",
                        field: "Theoretical Physics",
                        university: "Stanford",
                        year: "2026"
                    }
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 3,
            }
        },
    },
    {
        name: "Pemberdayaan Remaja Melalui Pelatihan Public Speaking dan Leadership",
        year_research_id: 3,
        schema_id: 1,
        lecturer_id: 3,
        department_id: 3,
        status: "diterima" as proposal_suggestion_status,
        phase: "evaluasi_akhir" as proposal_suggestion_phase,
        is_active: false,
        proposal: {
            create: {
                name: "Pemberdayaan Remaja Melalui Pelatihan Public Speaking dan Leadership"
            }
        },
        lecturer_member: {
            create: {
                lecturer_id: 3,
                name: "Hammam Mujahid",
                research_group_id: 3,
                department_id: 3,
                nip: "34567890",
                degree: [
                    {
                        degree: "S1" as degree,
                        code: "S.",
                        field: "Physics",
                        university: "Stanford",
                        year: "2023"
                    },
                    {
                        degree: "S2" as degree,
                        code: "Ph.D.",
                        field: "Theoretical Physics",
                        university: "Stanford",
                        year: "2026"
                    }
                ] as JsonArray,
                is_ketua_rg: true,
                position_id: 3,
            }
        },
    }
];

const main = async () => {
    try {
        console.log("deleting all data and reset iteration...")
        // delete all data and restart id iteration
        await prisma.$executeRawUnsafe(`
            TRUNCATE TABLE 
                "lecturers", 
                "users", 
                "research_groups", 
                "departments", 
                "year_researches", 
                "schemas", 
                "positions", 
                "position_schemas", 
                "proposal_suggestions",
                "evaluations"
            RESTART IDENTITY CASCADE;
        `);

        // insert research groups
        await prisma.research_group.createMany({
            data: research_groups,
            skipDuplicates: true,
        })
        console.log("Inserting research groups...");

        // insert departement
        await prisma.department.createMany({
            data: departements,
            skipDuplicates: true,
        })
        console.log("Inserting departement...");

        // insert positions
        await prisma.position.createMany({
            data: positions,
            skipDuplicates: true,
        });
        console.log("Inserting positions...");

        for (const lecturer of lecturers) {

            const existingLecturer = await prisma.lecturer.findUnique({
                where: { nidn: lecturer.nidn },
            });

            if (existingLecturer) {
                console.log(`Lecturer with NIDN ${lecturer.nidn} already exists. Skipping.`);
                continue;
            }


            // Hash passwords for all users of the lecturer
            const hashedUsers = await Promise.all(
                lecturer.user.create.map(async (userItem) => ({
                    name: userItem.name,
                    user_type: userItem.user_type,
                    password: await bcrypt.hash(userItem.password, 10),
                    username: null,
                    email: userItem.email,
                }))
            );

            lecturer.user.create = hashedUsers

            // continue if exist

            await prisma.lecturer.create({
                data: lecturer,
            })
        }
        console.log("Inserting lecturer and users...");

        // insert year research
        await prisma.year_research.createMany({
            data: year_researches,
            skipDuplicates: true,
        })
        console.log("Inserting year research...");

        // insert schemas
        await prisma.schema.createMany({
            data: schemas,
            skipDuplicates: true,
        })

        // insert position schemas
        await prisma.position_schema.createMany({
            data: position_schemas,
            skipDuplicates: true,
        });
        console.log("Inserting position schemas...");

        // insert proposal suggestions and proposals for penelitian
        await prisma.$transaction(
            proposalSuggestionsPenelitian.map((suggestion) =>
                prisma.proposal_suggestion.create({
                    data: suggestion,
                })
            )
        );
        console.log("Inserting proposal suggestion and proposals for penelitian...");

        // insert proposal suggestions and proposals for pengmas
        await prisma.$transaction(
            proposalSuggestionsPengmas.map((suggestion) =>
                prisma.proposal_suggestion.create({
                    data: suggestion,
                })
            )
        );
        console.log("Inserting proposal suggestion and proposals for pengmas...");

        // insert evaluations
        await prisma.evaluation.createMany({
            data: evaluations
        })
        console.log("Inserting evaluations...");

        console.log("Seeding selesai.");
    } catch (error) {
        console.error("Terjadi kesalahan saat seeding:", error);
    } finally {
        await prisma.$disconnect();
    }
};

main();