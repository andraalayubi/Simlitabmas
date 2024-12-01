import { PrismaClient } from '@prisma/client'

import { user_type } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

const users = [
    { name: "Admin Andra", email: "adminAndra@gmail.com", user_type: 'admin' as user_type, password: "Andra123!" },
    { name: "Admin Mirza", email: "adminMirza@gmail.com", user_type: 'admin' as user_type, password: "Mirza123!" },
    { name: "Admin Hammam", email: "adminHammam@gmail.com", user_type: 'admin' as user_type, password: "Hammam123!" },
    { name: "Dosen Andra", email: "dosenAndra@gmail.com", user_type: 'dosen' as user_type, password: "Andra123!" },
    { name: "Dosen Mirza", email: "dosenMirza@gmail.com", user_type: 'dosen' as user_type, password: "Mirza123!" },
    { name: "Dosen Hammam", email: "dosenHammam@gmail.com", user_type: 'dosen' as user_type, password: "Hammam123!" },
    { name: "Ketua RG Andra", email: "ketuargAndra@gmail.com", user_type: 'ketua_rg' as user_type, password: "Andra123!" },
    { name: "Ketua RG Mirza", email: "ketuargMirza@gmail.com", user_type: 'ketua_rg' as user_type, password: "Mirza123!" },
    { name: "Ketua RG Hammam", email: "ketuargHammam@gmail.com", user_type: 'ketua_rg' as user_type, password: "Hammam123!" },
];

const research_groups  = [
    {name: "Human Centric Multimedia" , description: "Vision: To be centre of excellence in Research Groupin the field of Human Centric & Multimedia inNational and International "},
    {name: "ACE-ATech", description: "Aquacultural Engineering Applied-Technology (ACE-ATech) Research Group adalah sebuah komunitas penelitian lintas bidang keilmuan di PENS yang dibangun untuk mendukung penguatan sektor budidaya perairan (akuakultur) Indonesia yang maju, kuat dan mandiri."},
    {name: "Agile Product Development", description: "RG Agile Product Development adalah grup riset yang mengembangkan produk perangkat lunak berorientasi market dan memberikan nilai tambah kepada masyarakatdengan pendekatan metodologi Agile"},
    {name: "Bio Electrochemistry System", description: "Research Group Bio Electrochemsitry System merupakan kelompok riset yang berfokus pada pengembangan energy baru terbarukan yang meliputi bioenergy, electrochemistry dan energy storage"},
    {name: "Biosignal and Instrumentation Biomedic", description: "Biosignal & Medical Instrumentation karena berkaitan dengan pengolahan sinyal phisiology pada mahluk hidup, sehingga dengan menerapkan pengetahuan dan teknologi elektronika dan kedokteran dapat memecahkan masalah yang berkaitan dengan design dan realisasi instrumentasi untuk mengukur besaran physiology dengan harapan dapat membantu tenaga medis dalam diagnosa, pengobatan dan monitoring penyakit."},
    {name: "Cyber Security", description: "CSRG adalah pusat intelektual untuk mempelajari berbagai masalah dalam keamanan dunia maya dan bidang terkait, termasuk perang dunia maya dan perang dunia maya, strategi dunia maya nasional dan militer, perlindungan infrastruktur kritis, keamanan informasi, perang informasi, pengawasan digital, kejahatan dunia maya dan solusi keamanan pada sistem OT (Operation Technology) pada otomasi industri yang tehubung di Internet."},
    {name: "Data Centric AI and e-Bussines System", description: "This research group focuses on the processing and visualization of big data based on Establish in 2018 as Data Engineering and Process Optimization (Depro) About Data Centric Artificial Intelligent and e-Business System (DaCAIBS) integrated artificial intelligence in the business environment as a tool in decision support systems."},
    {name: "Data Science for SDGs Applied Solution", description: "Data Science for SDGs Applied Solutions"},
    {name: "Digital Media", description: "Mengeksplorasi alat dan teknologi baru di media digital untuk kehidupan yang lebih baik"},
    {name: "Edutaiment Computing", description: "The Edutainment Computing Research Group is a research forum that develops technological innovations in the education-entertainment field"},
    {name: "Embedded AI", description: "Embedded artificial intelligence (AI) is the application of machine and deep learning in software at the device level. Software can be programmed to provide both predictive and reactive intelligence, based on the data that is collected and analyzed."},
]

const year_researches = [
    { year: 2023, open_date: new Date("2023-01-01"), closed_date: new Date("2023-12-31")},
    { year: 2024, open_date: new Date("2024-01-01"), closed_date: new Date("2024-12-31")},
    { year: 2025, open_date: new Date("2025-01-01"), closed_date: new Date("2025-12-31")},
    { year: 2026, open_date: new Date("2026-01-01"), closed_date: new Date("2026-12-31")},
];

const positions = [
    { name: "Professor", description: "A senior academic position for conducting advanced research and teaching." },
    { name: "Associate Professor", description: "An academic position supporting research and lecturing responsibilities." },
    { name: "Lecturer", description: "A position for teaching and contributing to research activities." }
];

const schemas = [
    { name: "Skema Dasar", description: "Penelitian atau pengabdian yang berfokus pada eksplorasi, penemuan, dan pemahaman konsep, teori, atau fenomena ilmiah tanpa memprioritaskan aplikasi praktis langsung.",  max_cost: 500000,  min_degree: "Bachelor",  is_student: true,  is_partner: true,  is_lecturer: true },
    { name: "Skema Terapan", description: "Penelitian atau pengabdian yang dirancang untuk memecahkan masalah praktis atau menghasilkan produk yang dapat langsung dimanfaatkan oleh masyarakat atau industri.",  max_cost: 1000000,  min_degree: "Bachelor",  is_student: true,  is_partner: true,  is_lecturer: true }
];

const position_schemas = [
    { schema_id: 1, position_id: 1 },
    { schema_id: 1, position_id: 2 },
    { schema_id: 1, position_id: 3 },
    { schema_id: 2, position_id: 1 },
    { schema_id: 2, position_id: 2 },
    { schema_id: 2, position_id: 3 }
];

const departments = [
    { name: "Departemen Teknik Elektro", description: "Menaungi program studi terkait teknik elektro dan aplikasinya." },
    { name: "Departemen Teknik Informatika dan Komputer", description: "Menaungi program studi yang berfokus pada informatika dan ilmu komputer." },
    { name: "Departemen Teknik Mekanika dan Energi", description: "Menaungi program studi yang berkaitan dengan mekanika dan sistem energi." },
    { name: "Departemen Teknologi Multimedia Kreatif", description: "Menaungi program studi yang berfokus pada multimedia dan industri kreatif." },
    { name: "Departemen Program Pendidikan Jarak Jauh", description: "Menyediakan program studi melalui metode pembelajaran jarak jauh." }
];

const proposal_suggestions = [
    
]

const main = async () => {
    try {
        // Hash password sekaligus dan buat objek user baru
        const hashedUsers = await Promise.all(
            users.map(async (user) => ({
                name: user.name,
                user_type: user.user_type,
                password: await bcrypt.hash(user.password, 10),
                username: null,
                email: user.email,
            }))
        );

        // Buat semua user sekaligus dengan createMany
        await prisma.user.createMany({
            data: hashedUsers,
            skipDuplicates: true,
        });
        console.log("Inserting users...");

        console.log("Seeding selesai.");
    } catch (error) {
        console.error("Terjadi kesalahan saat seeding:", error);
    } finally {
        await prisma.$disconnect();
    }
};

main();