import { degree, PrismaClient, proposal_suggestion_status } from '@prisma/client'

import { user_type } from "@prisma/client";
import { JsonArray } from '@prisma/client/runtime/library';
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

const lecturers = [
    {
        name: "Mirza Ramadhani",
        nidn: "3122500044",
        nip: "12345678",
        degree: [
            {
                degree: "S1" as degree,
                code: "S.",
                field: "Computer Science",
                university: "MIT",
                year: "2027"
            },
            {
                degree: "S2" as degree,
                code: "Dr.",
                field: "Computer Science",
                university: "MIT",
                year: "2030"
            },
        ] as JsonArray,
        is_ketua_rg: true,
        user: {
            create: [
                { name: "Admin Mirza", email: "adminMirza@gmail.com", user_type: 'admin' as user_type, password: "Mirza123!" },
                { name: "Dosen Mirza", email: "dosenMirza@gmail.com", user_type: 'dosen' as user_type, password: "Mirza123!" },
                { name: "Ketua RG Mirza", email: "ketuargMirza@gmail.com", user_type: 'ketua_rg' as user_type, password: "Mirza123!" },
            ]
        }
    },
    {
        name: "Andra Al Ayubi",
        nidn: "3122500045",
        nip: "23456789",
        degree: [
            {
                degree: "S1" as degree,
                code: "S.",
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
        user: {
            create: [
                { name: "Admin Andra", email: "adminAndra@gmail.com", user_type: 'admin' as user_type, password: "Andra123!" },
                { name: "Dosen Andra", email: "dosenAndra@gmail.com", user_type: 'dosen' as user_type, password: "Andra123!" },
                { name: "Ketua RG Andra", email: "ketuargAndra@gmail.com", user_type: 'ketua_rg' as user_type, password: "Andra123!" },
            ]
        }
    },
    {
        name: "Hammam Mujahid",
        nidn: "3122500046",
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
        user: {
            create: [
                { name: "Admin Hammam", email: "adminHammam@gmail.com", user_type: 'admin' as user_type, password: "Hammam123!" },
                { name: "Dosen Hammam", email: "dosenHammam@gmail.com", user_type: 'dosen' as user_type, password: "Hammam123!" },
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

const proposalSuggestions = [
    {
        name: "Pengembangan UI/UX pada CRM Pengabdian Masyarakat",
        year_research_id: 1, // 2023
        schema_id: 1, // Skema Dasar
        lecturer_id: 1, // Mirza Ramadhani
        research_group_id: 1, // Human Centric Multimedia
        status: "menunggu" as proposal_suggestion_status,
        is_active: true,
        proposal: {
            create: {
                name: "Pengembangan UI/UX pada CRM Pengabdian Masyarakat",
                title: "Pengembangan UI/UX pada CRM Pengabdian Masyarakat"

            }
        }
    },
    {
        name: "Integrasi Machine Learning untuk Analisis Data Akuakultur",
        year_research_id: 2, // 2024
        schema_id: 2, // Skema Terapan
        lecturer_id: 1,
        research_group_id: 2, // ACE-ATech
        status: "aktif" as proposal_suggestion_status,
        is_active: true,
        proposal: {
            create: {
                name: "Integrasi Machine Learning untuk Analisis Data Akuakultur",
                title: "Integrasi Machine Learning untuk Analisis Data Akuakultur"
            }
        }
    },
    {
        name: "Metodologi Agile dalam Pengembangan Perangkat Lunak Akademik",
        year_research_id: 3, // 2025
        schema_id: 1,
        lecturer_id: 1,
        research_group_id: 3, // Agile Product Development
        status: "diterima" as proposal_suggestion_status,
        is_active: false,
        proposal: {
            create: {
                name: "Metodologi Agile dalam Pengembangan Perangkat Lunak Akademik",
                title: "Metodologi Agile dalam Pengembangan Perangkat Lunak Akademik"
            }
        }
    },

    {
        year_research_id: 1,
        schema_id: 2,
        name: "Pemanfaatan Biofuel sebagai Alternatif Energi Ramah Lingkungan",
        lecturer_id: 2,
        research_group_id: 4, // Bio Electrochemistry System
        status: "menunggu" as proposal_suggestion_status,
        is_active: true,
        proposal: {
            create: {
                name: "Pemanfaatan Biofuel sebagai Alternatif Energi Ramah Lingkungan",
                title: "Pemanfaatan Biofuel sebagai Alternatif Energi Ramah Lingkungan"
            }
        }
    },
    {
        name: "Analisis Sinyal Biomedik untuk Diagnosa Dini Penyakit",
        year_research_id: 2,
        schema_id: 1,
        lecturer_id: 2,
        research_group_id: 5, // Biosignal and Instrumentation Biomedic
        status: "aktif" as proposal_suggestion_status,
        is_active: true,
        proposal: {
            create: {
                name: "Analisis Sinyal Biomedik untuk Diagnosa Dini Penyakit",
                title: "Analisis Sinyal Biomedik untuk Diagnosa Dini Penyakit",
            }
        }
    },
    {
        name: "Keamanan Siber pada Infrastruktur Kritis Nasional",
        year_research_id: 3,
        schema_id: 2,
        lecturer_id: 2,
        research_group_id: 6, // Cyber Security
        status: "diterima" as proposal_suggestion_status,
        is_active: false,
        proposal: {
            create: {
                name: "Keamanan Siber pada Infrastruktur Kritis Nasional",
                title: "Keamanan Siber pada Infrastruktur Kritis Nasional",
            }
        }
    },

    {
        name: "Optimalisasi AI dalam Sistem e-Bisnis",
        year_research_id: 1,
        schema_id: 1,
        lecturer_id: 3,
        research_group_id: 7, // Data Centric AI and e-Business System
        status: "menunggu" as proposal_suggestion_status,
        is_active: true,
        proposal: {
            create: {
                name: "Optimalisasi AI dalam Sistem e-Bisnis",
                title: "Optimalisasi AI dalam Sistem e-Bisnis",
            }
        }
    },
    {
        name: "Pemanfaatan Data Science untuk Pencapaian SDGs",
        year_research_id: 2,
        schema_id: 2,
        lecturer_id: 3,
        research_group_id: 8, // Data Science for SDGs Applied Solution
        status: "aktif" as proposal_suggestion_status,
        is_active: true,
        proposal: {
            create: {
                name: "Pemanfaatan Data Science untuk Pencapaian SDGs",
                title: "Pemanfaatan Data Science untuk Pencapaian SDGs",
            }
        }
    },
    {
        name: "Inovasi Digital Media untuk Pembelajaran Interaktif",
        year_research_id: 3,
        schema_id: 1,
        lecturer_id: 3,
        research_group_id: 9, // Digital Media
        status: "diterima" as proposal_suggestion_status,
        is_active: false,
        proposal: {
            create: {
                name: "Inovasi Digital Media untuk Pembelajaran Interaktif",
                title: "Inovasi Digital Media untuk Pembelajaran Interaktif"
            }
        }
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
                "proposal_suggestions"
            RESTART IDENTITY CASCADE;
        `);

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

        // insert positions
        await prisma.position.createMany({
            data: positions,
            skipDuplicates: true,
        });
        console.log("Inserting positions...");

        // insert position schemas
        await prisma.position_schema.createMany({
            data: position_schemas,
            skipDuplicates: true,
        });
        console.log("Inserting position schemas...");

        // insert proposal suggestions and proposals
        await prisma.$transaction(
            proposalSuggestions.map((suggestion) =>
              prisma.proposal_suggestion.create({
                data: suggestion,
              })
            )
          );
        console.log("Inserting proposal suggestion and proposals...");

        console.log("Seeding selesai.");
    } catch (error) {
        console.error("Terjadi kesalahan saat seeding:", error);
    } finally {
        await prisma.$disconnect();
    }
};

main();