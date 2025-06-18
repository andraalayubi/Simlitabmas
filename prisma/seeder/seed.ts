import { degree, evaluation_phase, PrismaClient } from '@prisma/client'

import bcrypt from "bcrypt";
import proposalSuggestionsPenelitian from './penelitian_seed';
import proposalSuggestionsPengmas from './pengmas_seed';
import lecturers from './lecturer_seed';

const prisma = new PrismaClient()


const research_groups = [
    { name: "Mirza Research Group", description: "Mirza Research group" },
    { name: "Andra Research Group", description: "Andr Research group" },
    { name: "Hammam Research Group", description: "Hammam Research group" },
    { name: "Human Centric Multimedia", description: "Vision: To be centre of excellence in Research Groupin the field of Human Centric & Multimedia inNational and International " },
    { name: "ACE-ATech", description: "Aquacultural Engineering Applied-Technology (ACE-ATech) Research Group adalah sebuah komunitas penelitian lintas bidang keilmuan di PENS yang dibangun untuk mendukung penguatan sektor budidaya perairan (akuakultur) Indonesia yang maju, kuat dan mandiri." },
    { name: "Agile Product Development", description: "RG Agile Product Development adalah grup riset yang mengembangkan produk perangkat lunak berorientasi market dan memberikan nilai tambah kepada masyarakatdengan pendekatan metodologi Agile" },
    { name: "Bio Electrochemistry System", description: "Research Group Bio Electrochemsitry System merupakan kelompok riset yang berfokus pada pengembangan energy baru terbarukan yang meliputi bioenergy, electrochemistry dan energy storage" },
    { name: "Biosignal and Instrumentation Biomedic", description: "Biosignal & Medical Instrumentation karena berkaitan dengan pengolahan sinyal phisiology pada mahluk hidup, sehingga dengan menerapkan pengetahuan dan teknologi elektronika dan kedokteran dapat memecahkan masalah yang berkaitan dengan design dan realisasi instrumentasi untuk mengukur besaran physiology dengan harapan dapat membantu tenaga medis dalam diagnosa, pengobatan dan monitoring penyakit." },
    { name: "Cyber Security", description: "CSRG adalah pusat intelektual untuk mempelajari berbagai masalah dalam keamanan dunia maya dan bidang terkait, termasuk perang dunia maya dan perang dunia maya, strategi dunia maya nasional dan militer, perlindungan infrastruktur kritis, keamanan informasi, perang informasi, pengawasan digital, kejahatan dunia maya dan solusi keamanan pada sistem OT (Operation Technology) pada otomasi industri yang tehubung di Internet." },
    { name: "Data Centric AI and e-Bussines System", description: "This research group focuses on the processing and visualization of big data based on Establish in 2018 as Data Engineering and Process Optimization (Depro) About Data Centric Artificial Intelligent and e-Business System (DaCAIBS) integrated artificial intelligence in the business environment as a tool in decision support systems." },
    { name: "Data Science for SDGs Applied Solution", description: "Data Science for SDGs Applied Solutions" },
    { name: "Digital Media", description: "Mengeksplorasi alat dan teknologi baru di media digital untuk kehidupan yang lebih baik" },
    { name: "Embedded AI", description: "Embedded artificial intelligence (AI) is the application of machine and deep learning in software at the device level. Software can be programmed to provide both predictive and reactive intelligence, based on the data that is collected and analyzed." },
    { name: "Health Informatics", description: "Health Informatics research group aims at developing methods and technologies for the acquisition, processing, and study of patient data, which can come from hospital information system or user personalized data from wearable devices / application."},
    { name: "System and Automation", description: "This research group focuses information technologies and its automation"}
]

const departements = [
    { name: "Program Studi Teknik Elektro", description: "Program studi yang mempelajari teknik elektro dan aplikasinya." },
    { name: "Program Studi Teknik Informatika dan Komputer", description: "Program studi yang berfokus pada informatika dan ilmu komputer." },
    { name: "Program Studi Teknik Mekanika dan Energi", description: "Program studi yang mempelajari mekanika dan sistem energi." },
    { name: "Program Studi Teknologi Multimedia Kreatif", description: "Program studi yang berfokus pada multimedia dan industri kreatif." },
    { name: "Program Studi Informatika Kesehatan", description: "Program studi yang berfokus pada sistem informasi teknologi pada kesehatan"}
];


const year_researches = [
    { year: 2023, open_date: new Date("2023-01-01"), closed_date: new Date("2023-12-31"), is_active: false },
    { year: 2024, open_date: new Date("2024-01-01"), closed_date: new Date("2024-12-31"), is_active: false },
    { year: 2025, open_date: new Date("2025-01-01"), closed_date: new Date("2025-12-31"), is_active: true },
    { year: 2026, open_date: new Date("2026-01-01"), closed_date: new Date("2026-12-31"), is_active: false },
];


const configuration = {
    year_research_id: 3
}

const positions = [
    { name: "Lecturer", description: "A position for teaching and contributing to research activities." },
    {
        name: "Guru Besar",
        description: "Jabatan akademik tertinggi dengan kewajiban utama melakukan penelitian unggulan, membimbing penelitian doktoral, dan berkontribusi secara signifikan dalam pengembangan ilmu pengetahuan di tingkat nasional maupun internasional."
    },
    {
        name: "Lektor Kepala",
        description: "Jabatan akademik madya yang berperan aktif dalam penelitian, menjadi pembimbing utama mahasiswa magister dan doktor, serta menghasilkan publikasi ilmiah bereputasi nasional dan internasional."
    },
    {
        name: "Lektor",
        description: "Jabatan akademik yang mendukung kegiatan penelitian, aktif dalam publikasi ilmiah, serta terlibat dalam bimbingan tugas akhir dan penelitian mahasiswa tingkat sarjana dan magister."
    },
    {
        name: "Asisten Ahli",
        description: "Jabatan akademik awal yang mulai terlibat dalam kegiatan penelitian, mendukung penulisan karya ilmiah, serta berpartisipasi dalam kegiatan ilmiah dan seminar akademik."
    }
];

const schemas = [
    { name: "Skema Dasar", type: "penelitian", is_active: true, description: "Penelitian atau pengabdian yang berfokus pada eksplorasi, penemuan, dan pemahaman konsep, teori, atau fenomena ilmiah tanpa memprioritaskan aplikasi praktis langsung.", max_cost: 500000, min_degree: "S1" as degree, is_student: true, is_partner: true, is_lecturer: true },
    { name: "Skema Terapan", type: "penelitian", is_active: true, description: "Penelitian atau pengabdian yang dirancang untuk memecahkan masalah praktis atau menghasilkan produk yang dapat langsung dimanfaatkan oleh masyarakat atau industri.", max_cost: 1000000, min_degree: "S1" as degree, is_student: true, is_partner: true, is_lecturer: true },
    { name: "Skema Pengembangan", type: "penelitian", is_active: false, description: "Penelitian atau pengabdian yang dirancang untuk memecahkan masalah praktis atau menghasilkan produk yang dapat langsung dimanfaatkan oleh masyarakat atau industri.", max_cost: 1000000, min_degree: "S1" as degree, is_student: true, is_partner: true, is_lecturer: true },
    { name: "Skema Pemberdayaan Masyarakat", type: "pengmas", is_active: true, description: "Pengabdian kepada masyarakat yang berfokus pada pemberdayaan, pelatihan, atau pendampingan masyarakat untuk meningkatkan kapasitas, kesejahteraan, atau kemandirian.", max_cost: 800000, min_degree: "S1" as degree, is_student: true, is_partner: true, is_lecturer: true },
    { name: "Skema Inovasi Sosial", type: "pengmas", is_active: true, description: "Pengabdian kepada masyarakat yang menitikberatkan pada penciptaan solusi inovatif untuk permasalahan sosial di masyarakat.", max_cost: 1200000, min_degree: "S1" as degree, is_student: true, is_partner: true, is_lecturer: true }
];

const position_schemas = [
    { schema_id: 1, position_id: 1 },
    { schema_id: 1, position_id: 2 },
    { schema_id: 1, position_id: 3 },
    { schema_id: 2, position_id: 1 },
    { schema_id: 2, position_id: 2 },
    { schema_id: 2, position_id: 3 },
    { schema_id: 3, position_id: 2 },
    { schema_id: 3, position_id: 3 },
    { schema_id: 3, position_id: 4 },
    { schema_id: 3, position_id: 5 },
];

const external_document_categories = [
    { name: "Publikasi Ilmiah", schema_id: 1, description: "Artikel jurnal ilimiah terindeks" },
    { name: "Buku Teks", schema_id: 1, description: "Karya tulis yang menguraikan teori dasar, model konseptual, atau kajian mendalam suatu bidang ilmu" },
    { name: "Presentasi", schema_id: 1, description: "Makalah yang dipresentasikan dalam forum-forum akademik dan seminar" },
    { name: "Standar Teoritis", schema_id: 1, description: "Dokumen atau pedoman yang mendefinisikan kerangka konseptual untuk penelitian lanjutan di bidang tertentu." },
    { name: "Artikel Jurnal", schema_id: 2, description: "Publikasi yang membahas aplikasi teori dalam menyelesaikan persoalan praktis." },
    { name: "Prototype", schema_id: 2, description: "Hasil rancangan awal atau model uji yang menunjukkan kemampuan penerapan hasil penelitian dalam memecahkan masalah tertentu." },
    { name: "Panduan Praktis", schema_id: 2, description: "Dokumentasi yang berisi pedoman atau strategi implementasi solusi berbasis penelitian untuk pihak-pihak terkait." },
    { name: "Paten dan Hak Kekayaan Intelektual (HKI)", schema_id: 3, description: "Dokumen paten atas inovasi teknologi atau metodologi baru yang dihasilkan dari penelitian pengembangan." },
    { name: "SOP dan Pedoman Operasional", schema_id: 3, description: "Standar operasional prosedur, modul pelatihan, atau materi pendukung yang disusun untuk mendukung implementasi dan pengembangan lebih lanjut dari produk atau teknologi yang dikembangkan." },
    { name: "Kemitraan atau Transfer Teknologi", schema_id: 3, description: "Dokumen perjanjian kerja sama dengan pihak industri atau lembaga lain sebagai bentuk penerapan hasil penelitian ke dalam produk atau layanan komersial." },
    { name: "Modul/Buku Panduan", schema_id: 4, description: "Materi edukasi praktis (cetak/digital) untuk masyarakat, seperti panduan pelatihan, buku kesehatan, atau teknik pertanian." },
    { name: "Pelatihan dan Sertifikasi", schema_id: 4, description: "Program pelatihan keterampilan (contoh: kewirausahaan, teknologi) dengan sertifikat bagi peserta." },
    { name: "Produk Teknologi Tepat Guna", schema_id: 4, description: "Alat/sistem inovatif yang dibuat untuk memecahkan masalah masyarakat, misalnya alat pertanian atau sistem penyaringan air." },
    { name: "Video Dokumentasi", schema_id: 4, description: "Rekaman kegiatan, wawancara mitra, dan hasil program yang diunggah ke media sosial/website." },
    { name: "Modul/Buku Panduan", schema_id: 5, description: "Materi edukasi praktis (cetak/digital) untuk masyarakat, seperti panduan pelatihan, buku kesehatan, atau teknik pertanian." },
    { name: "Pelatihan dan Sertifikasi", schema_id: 5, description: "Program pelatihan keterampilan (contoh: kewirausahaan, teknologi) dengan sertifikat bagi peserta." },
    { name: "Produk Teknologi Tepat Guna", schema_id: 5, description: "Alat/sistem inovatif yang dibuat untuk memecahkan masalah masyarakat, misalnya alat pertanian atau sistem penyaringan air." },
    { name: "Video Dokumentasi", schema_id: 5, description: "Rekaman kegiatan, wawancara mitra, dan hasil program yang diunggah ke media sosial/website." }
]

const criteria = [
    { name: "Relevansi", category: "penelitian", phase: evaluation_phase.evaluasi_proposal},
    { name: "Kualitas", category: "penelitian", phase: evaluation_phase.evaluasi_proposal},
    { name: "Inovasi", category: "penelitian", phase: evaluation_phase.evaluasi_proposal},
    { name: "Feasibilitas", category: "penelitian", phase: evaluation_phase.evaluasi_proposal},
    { name: "Luaran yang Dijanjikan", category: "penelitian", phase: evaluation_phase.evaluasi_proposal},
    { name: "Progress Pencapaian", category: "penelitian", phase: evaluation_phase.evaluasi_monev},
    { name: "Efektivitas Metode", category: "penelitian", phase: evaluation_phase.evaluasi_monev},
    { name: "Pemanfaatan Anggaran", category: "penelitian", phase: evaluation_phase.evaluasi_monev},
    { name: "Dokumentasi dan Laporan", category: "penelitian", phase: evaluation_phase.evaluasi_monev},
    { name: "Tantangan dan Solusi", category: "penelitian", phase: evaluation_phase.evaluasi_monev},
    { name: "Kualitas Hasil", category: "penelitian", phase: evaluation_phase.evaluasi_akhir},
    { name: "Dampak Nyata", category: "penelitian", phase: evaluation_phase.evaluasi_akhir},
    { name: "Keberlanjutan", category: "penelitian", phase: evaluation_phase.evaluasi_akhir},
    { name: "Publikasi dan Disemasi", category: "penelitian", phase: evaluation_phase.evaluasi_akhir},
    { name: "Evaluasi Keseluruhan", category: "penelitian", phase: evaluation_phase.evaluasi_akhir},
    { name: "Relevansi", category: "pengmas", phase: evaluation_phase.evaluasi_proposal},
    { name: "Kualitas Program", category: "pengmas", phase: evaluation_phase.evaluasi_proposal},
    { name: "Inovasi", category: "pengmas", phase: evaluation_phase.evaluasi_proposal},
    { name: "Keberlanjutan", category: "pengmas", phase: evaluation_phase.evaluasi_proposal},
    { name: "Implementasi Program", category: "pengmas", phase: evaluation_phase.evaluasi_monev},
    { name: "Respon Masyarakat", category: "pengmas", phase: evaluation_phase.evaluasi_monev},
    { name: "Efektivitas Metode", category: "pengmas", phase: evaluation_phase.evaluasi_monev},
    { name: "Pemanfaatan Sumber Daya", category: "pengmas", phase: evaluation_phase.evaluasi_monev},
    { name: "Dokumentasi dan Laporan", category: "pengmas", phase: evaluation_phase.evaluasi_monev},
    { name: "Dampak Nyata", category: "pengmas", phase: evaluation_phase.evaluasi_akhir},
    { name: "Keberlanjutan Program", category: "pengmas", phase: evaluation_phase.evaluasi_akhir},
    { name: "Kepuasan Masyarakat", category: "pengmas", phase: evaluation_phase.evaluasi_akhir},
    { name: "Disemasi dan Publikasi", category: "pengmas", phase: evaluation_phase.evaluasi_akhir},
    { name: "Evaluasi Keseluruhan", category: "pengmas", phase: evaluation_phase.evaluasi_akhir},
]

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
                "configurations",
                "criteria"
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


        const active_configuration = await prisma.configuration.create({
            data: configuration,
        })
        console.log("Inserting configuration...");

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
            proposalSuggestionsPenelitian.map((suggestion) => {
                const is_active = suggestion.year_research_id === active_configuration.year_research_id;

                return prisma.proposal_suggestion.create({
                    data: {
                        ...suggestion,
                        open: is_active,
                    },
                });
            })
        );

        // insert proposal suggestions and proposals for pengmas
        await prisma.$transaction(
            proposalSuggestionsPengmas.map((suggestion) => {
                const is_active = suggestion.year_research_id === active_configuration.year_research_id;

                return prisma.proposal_suggestion.create({
                    data: {
                        ...suggestion,
                        open: is_active,
                    },
                })
            })
        );
        console.log("Inserting proposal suggestion and proposals for pengmas...");

        // insert external document category
        await prisma.external_document_category.createMany({
            data: external_document_categories
        })
        console.log("Inserting external category...");

        // insert criterion
        await prisma.criterion.createMany({
            data: criteria,
            skipDuplicates: true,
        })
        console.log("Inserting criterion...");

        console.log("Seeding selesai.");
    } catch (error) {
        console.error("Terjadi kesalahan saat seeding:", error);
    } finally {
        await prisma.$disconnect();
    }
};

main();