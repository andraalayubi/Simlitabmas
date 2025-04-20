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
        is_kaprodi: true,
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
        is_kaprodi: true,
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
        is_kaprodi: true,
        position_id: 3,
        user: {
            create: [
                { name: "Admin Hammam", email: "adminHammam@gmail.com", user_type: 'admin' as user_type, password: "Hammam123!" },
                { name: "Dosen Hammam", email: "dosenHammam@gmail.com", user_type: 'lecturer' as user_type, password: "Hammam123!" },
                { name: "Ketua RG Hammam", email: "ketuargHammam@gmail.com", user_type: 'ketua_rg' as user_type, password: "Hammam123!" },
            ]
        }
    },
    // Human Centric Multimedia (RG 4) / lecturer id 4
    {
        name: "Sritrusta Sukaridhoto, ST., Ph.D.",
        research_group_id: 4,
        department_id: 4,
        nidn: "0412056701",
        nip: "196904121995021001",
        degree: [
            { degree: "S1", code: "S.T.", field: "Teknik Elektro", university: "ITS", year: "1995" },
            { degree: "S2", code: "M.T.", field: "Multimedia Engineering", university: "Tokyo Institute of Technology", year: "2001" },
            { degree: "S3", code: "Ph.D.", field: "Computer Science", university: "National University of Singapore", year: "2008" }
        ] as JsonArray,
        is_ketua_rg: true,
        is_kaprodi: false,
        position_id: 1,
        user: {
            create: [
                { name: "Dosen Sritrusta", email: "dosen.sritrusta@pens.ac.id", user_type: 'lecturer', password: "DosenSritrusta2023!" },
                { name: "Ketua RG Sritrusta", email: "ketuarg.sritrusta@pens.ac.id", user_type: 'ketua_rg', password: "KetuaRGSritrusta2023!" }
            ]
        }
    },

    // ACE-ATech (RG 5) / lecturer id 5
    {
        name: "Dr. Agus Indra Gunawan",
        research_group_id: 5,
        department_id: 3,
        nidn: "0413123456",
        nip: "197304131998031001",
        degree: [
            { degree: "S1", code: "S.T.", field: "Aquacultural Engineering", university: "IPB", year: "1998" },
            { degree: "S3", code: "Dr.Eng", field: "Applied Technology", university: "Kyushu University", year: "2010" }
        ] as JsonArray,
        is_ketua_rg: true,
        is_kaprodi: false,
        position_id: 2,
        user: {
            create: [
                { name: "Dosen Agus", email: "agus.gunawan@pens.ac.id", user_type: 'lecturer', password: "DosenAgus2023!" },
                { name: "Ketua RG Agus", email: "ketuarg.agus@pens.ac.id", user_type: 'ketua_rg', password: "KetuaRGAgus" }
            ]
        }
    },

    // Agile Product Development (RG 6) / lecturer id 6
    {
        name: "Umi Sa'adah",
        research_group_id: 6,
        department_id: 2,
        nidn: "0415123456",
        nip: "198004152000122001",
        degree: [
            { degree: "S1", code: "S.Kom", field: "Informatika", university: "ITS", year: "2000" },
            { degree: "S2", code: "M.Sc.", field: "Software Engineering", university: "Delft University of Technology", year: "2006" }
        ] as JsonArray,
        is_ketua_rg: true,
        is_kaprodi: false,
        position_id: 3,
        user: {
            create: [
                { name: "Dosen Umi", email: "umi.saadah@pens.ac.id", user_type: 'lecturer', password: "DosenUmi2023!" },
                { name: "Ketua RG Umi", email: "ketuarg.umi@pens.ac.id", user_type: 'ketua_rg', password: "KetuaRGUmi2023!" }
            ]
        }
    },

    // Bio Electrochemistry System (RG 7) / lecturer id 7
    {
        name: "Ri'fah Amalia",
        research_group_id: 7,
        department_id: 1,
        nidn: "3122500050",
        nip: "78901234",
        degree: [
            { degree: "S1", code: "S.T.", field: "Teknik Kimia", university: "ITB", year: "2008" },
            { degree: "S2", code: "M.T.", field: "Electrochemistry", university: "TU Delft", year: "2012" }
        ] as JsonArray,
        is_ketua_rg: true,
        is_kaprodi: false,
        position_id: 1,
        user: {
            create: [
                { name: "Dosen Rifah", email: "rifah.amalia@pens.ac.id", user_type: 'lecturer' as user_type, password: "Rifah123!" },
                { name: "Ketua RG Rifah", email: "ketuarg.rifah@pens.ac.id", user_type: 'ketua_rg' as user_type, password: "KetuaRGRifah2023!" }
            ]
        }
    },

    // Biosignal and Instrumentation Biomedic (RG 8) / lecturer id 8
    {
        name: "Rika Rokhana",
        research_group_id: 8,
        department_id: 3,
        nidn: "3122500051",
        nip: "89012345",
        degree: [
            { degree: "S1", code: "S.T.", field: "Biomedical Engineering", university: "ITS", year: "2007" },
            { degree: "S3", code: "Dr.", field: "Medical Instrumentation", university: "University of Tokyo", year: "2015" }
        ] as JsonArray,
        is_ketua_rg: true,
        is_kaprodi: false,
        position_id: 2,
        user: {
            create: [
                { name: "Dosen Rika", email: "rika.rokhana@pens.ac.id", user_type: 'lecturer' as user_type, password: "Rika123!" },
                { name: "Ketua RG Rika", email: "ketuarg.rika@pens.ac.id", user_type: 'ketua_rg' as user_type, password: "KetuaRGRika2023!" }
            ]
        }
    },

    // Cyber Security (RG 9) / lecturer id 9
    {
        name: "Ferry Astika Saputra",
        research_group_id: 9,
        department_id: 1,
        nidn: "3122500052",
        nip: "90123456",
        degree: [
            { degree: "S1", code: "S.Kom", field: "Cyber Security", university: "PENS", year: "2012" },
            { degree: "S2", code: "M.Sc.", field: "Network Security", university: "KAIST", year: "2016" }
        ] as JsonArray,
        is_ketua_rg: true,
        is_kaprodi: false,
        position_id: 3,
        user: {
            create: [
                { name: "Dosen Ferry", email: "ferry.astika@pens.ac.id", user_type: 'lecturer' as user_type, password: "Ferry123!" },
                { name: "Ketua RG Ferry", email: "ketuarg.ferry@pens.ac.id", user_type: 'ketua_rg' as user_type, password: "KetuaRGFerry2023!" }
            ]
        }
    },

    // Data Centric AI and e-Bussines System (RG 10) / lecturer id 10
    {
        name: "Arna Fariza",
        research_group_id: 10,
        department_id: 1,
        nidn: "3122500053",
        nip: "01234567",
        degree: [
            { degree: "S1", code: "S.Kom", field: "Information Systems", university: "ITS", year: "2013" },
            { degree: "S2", code: "M.Eng", field: "Business Intelligence", university: "NTU Singapore", year: "2017" }
        ] as JsonArray,
        is_ketua_rg: true,
        is_kaprodi: false,
        position_id: 2,
        user: {
            create: [
                { name: "Dosen Arna", email: "arna.fariza@pens.ac.id", user_type: 'lecturer' as user_type, password: "Arna123!" },
                { name: "Ketua RG Arna", email: "ketuarg.arna@pens.ac.id", user_type: 'ketua_rg' as user_type, password: "KetuaRGArna2023!" }
            ]
        }
    },

    // Data Science for SDGs Applied Solutions (RG 11) / lecturer id 11
    {
        name: "Ronny Susetyoko",
        research_group_id: 11,
        department_id: 2,
        nidn: "3122500054",
        nip: "11223344",
        degree: [
            {
                degree: "S1" as degree,
                code: "S.Si",
                field: "Data Science",
                university: "Institut Teknologi Sepuluh Nopember",
                year: "2010"
            },
            {
                degree: "S2" as degree,
                code: "M.Sc",
                field: "Applied Statistics",
                university: "National University of Singapore",
                year: "2015"
            }
        ] as JsonArray,
        is_ketua_rg: true,
        is_kaprodi: false,
        position_id: 1,
        user: {
            create: [
                { name: "Dosen Ronny", email: "ronny.susetyoko@pens.ac.id", user_type: 'lecturer' as user_type, password: "DosenRonny2023!" },
                { name: "Ketua RG Ronny", email: "ketuarg.ronny@pens.ac.id", user_type: 'ketua_rg' as user_type, password: "KetuaRGRonny2023!" }
            ]
        }
    },

    // Digital Media (RG 12) / lecturer id 12
    {
        name: "Moh. Hasbi Assidigi",
        research_group_id: 12,
        department_id: 4,
        nidn: "3122500055",
        nip: "22334455",
        degree: [
            {
                degree: "S1" as degree,
                code: "S.Kom",
                field: "Digital Media",
                university: "Politeknik Elektronika Negeri Surabaya",
                year: "2012"
            },
            {
                degree: "S2" as degree,
                code: "M.Ds",
                field: "Interactive Media",
                university: "RMIT University",
                year: "2017"
            }
        ] as JsonArray,
        is_ketua_rg: true,
        is_kaprodi: false,
        position_id: 4,
        user: {
            create: [
                { name: "Dosen Hasbi", email: "hasbi.assidigi@pens.ac.id", user_type: 'lecturer' as user_type, password: "DosenHasbi2023!" },
                { name: "Ketua RG Hashi", email: "ketuarg.hasbi@pens.ac.id", user_type: 'ketua_rg' as user_type, password: "KetuaRGHasbi2023!" }
            ]
        }
    },

    // Embedded AI (RG 13) & kaprodi elektro / lecturer id 13
    {
        name: "Dr. Arif Irwansyah, S.T., M.Eng",
        research_group_id: 13,
        department_id: 1,
        nidn: "3122500056",
        nip: "33445566",
        degree: [
            {
                degree: "S1" as degree,
                code: "S.T",
                field: "Computer Engineering",
                university: "Universitas Gadjah Mada",
                year: "2011"
            },
            {
                degree: "S2" as degree,
                code: "M.Eng",
                field: "Embedded Systems",
                university: "KAIST",
                year: "2015"
            },
            {
                degree: "S3" as degree,
                code: "Ph.D",
                field: "Artificial Intelligence",
                university: "University of Tokyo",
                year: "2020"
            }
        ] as JsonArray,
        is_ketua_rg: true,
        is_kaprodi: true,
        position_id: 4,
        user: {
            create: [
                { name: "Admin Arif", email: "admin.arif@pens.ac.id", user_type: 'admin' as user_type, password: "AdminArif2023!" },
                { name: "Dosen Arif", email: "arif.irwansyah@pens.ac.id", user_type: 'lecturer' as user_type, password: "DosenArif2023!" },
                { name: "Ketua RG Arif", email: "ketuarg.arif@pens.ac.id", user_type: 'ketua_rg' as user_type, password: "KetuaRGArif2023!" },
                { name: "Kaprodi Elektro Arif", email: "kaprodi.arif@pens.ac.id", user_type: 'kaprodi' as user_type, password: "KaprodiArif2023!" }
            ]
        }
    },
    // kaprodi it / lecturer id 14
    {
        name: "Prof. M. Udin Harun Al Rasyid , S.Kom., Ph.D",
        research_group_id: null,
        department_id: 2,
        nidn: "3122500057",
        nip: "33445567",
        degree: [
            {
                degree: "S1" as degree,
                code: "S.T",
                field: "Computer Engineering",
                university: "Universitas Gadjah Mada",
                year: "2011"
            },
            {
                degree: "S2" as degree,
                code: "M.Eng",
                field: "Embedded Systems",
                university: "KAIST",
                year: "2015"
            },
            {
                degree: "S3" as degree,
                code: "Ph.D",
                field: "Artificial Intelligence",
                university: "University of Tokyo",
                year: "2020"
            }
        ] as JsonArray,
        is_ketua_rg: false,
        is_kaprodi: true,
        position_id: 4,
        user: {
            create: [
                { name: "Admin Udin", email: "admin.udin@pens.ac.id", user_type: 'admin' as user_type, password: "AdminUdin2023!" },
                { name: "Dosen Udin", email: "udin.harun@pens.ac.id", user_type: 'lecturer' as user_type, password: "DosenUdin2023!" },
                { name: "Kaprodi IT Udin", email: "kaprodi.udin@pens.ac.id", user_type: 'kaprodi' as user_type, password: "KaprodiUdin2023!" }
            ]
        }
    },
    // kaprodi meka lecturer id 15
    {
        name: "Mohammad Nasyir Tamara, S.ST., M.T.",
        research_group_id: null,
        department_id: 3,
        nidn: "3122500058",
        nip: "33445568",
        degree: [
            {
                degree: "S1" as degree,
                code: "S.T",
                field: "Computer Engineering",
                university: "Universitas Gadjah Mada",
                year: "2011"
            },
            {
                degree: "S2" as degree,
                code: "M.Eng",
                field: "Embedded Systems",
                university: "KAIST",
                year: "2015"
            },
            {
                degree: "S3" as degree,
                code: "Ph.D",
                field: "Artificial Intelligence",
                university: "University of Tokyo",
                year: "2020"
            }
        ] as JsonArray,
        is_ketua_rg: false,
        is_kaprodi: true,
        position_id: 4,
        user: {
            create: [
                { name: "Admin Nasyir", email: "admin.nasyir@pens.ac.id", user_type: 'admin' as user_type, password: "AdminNasyir2023!" },
                { name: "Dosen Nasyir", email: "muhammad.nasyir@pens.ac.id", user_type: 'lecturer' as user_type, password: "DosenNasyir2023!" },
                { name: "Kaprodi Mekatronika Nasyir", email: "kaprodi.nasyir@pens.ac.id", user_type: 'kaprodi' as user_type, password: "KaprodiNasyir2023!" }
            ]
        }
    },
    // kaprodi multimedia lecturer id 16
    {
        name: "Kholid Fathoni , S.Kom., MT.",
        research_group_id: null,
        department_id: 4,
        nidn: "3122500059",
        nip: "33445569",
        degree: [
            {
                degree: "S1" as degree,
                code: "S.T",
                field: "Computer Engineering",
                university: "Universitas Gadjah Mada",
                year: "2011"
            },
            {
                degree: "S2" as degree,
                code: "M.Eng",
                field: "Embedded Systems",
                university: "KAIST",
                year: "2015"
            },
            {
                degree: "S3" as degree,
                code: "Ph.D",
                field: "Artificial Intelligence",
                university: "University of Tokyo",
                year: "2020"
            }
        ] as JsonArray,
        is_ketua_rg: false,
        is_kaprodi: true,
        position_id: 4,
        user: {
            create: [
                { name: "Admin Kholid", email: "admin.kholid@pens.ac.id", user_type: 'admin' as user_type, password: "AdminKholid2023!" },
                { name: "Dosen Kholid", email: "kholid.fathoni@pens.ac.id", user_type: 'lecturer' as user_type, password: "DosenKholid2023!" },
                { name: "Kaprodi IT Kholid", email: "kaprodi.kholid@pens.ac.id", user_type: 'kaprodi' as user_type, password: "KaprodiKholid2023!" }
            ]
        }
    }
]

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
]

const year_researches = [
    { year: 2023, open_date: new Date("2023-01-01"), closed_date: new Date("2023-12-31") },
    { year: 2024, open_date: new Date("2024-01-01"), closed_date: new Date("2024-12-31") },
    { year: 2025, open_date: new Date("2025-01-01"), closed_date: new Date("2025-12-31") },
    { year: 2026, open_date: new Date("2026-01-01"), closed_date: new Date("2026-12-31") },
];

const positions = [
    // { name: "Professor", description: "A senior academic position for conducting advanced research and teaching." },
    // { name: "Associate Professor", description: "An academic position supporting research and lecturing responsibilities." },
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
    { name: "Skema Dasar", description: "Penelitian atau pengabdian yang berfokus pada eksplorasi, penemuan, dan pemahaman konsep, teori, atau fenomena ilmiah tanpa memprioritaskan aplikasi praktis langsung.", max_cost: 500000, min_degree: "S1" as degree, is_student: true, is_partner: true, is_lecturer: true },
    { name: "Skema Terapan", description: "Penelitian atau pengabdian yang dirancang untuk memecahkan masalah praktis atau menghasilkan produk yang dapat langsung dimanfaatkan oleh masyarakat atau industri.", max_cost: 1000000, min_degree: "S1" as degree, is_student: true, is_partner: true, is_lecturer: true },
    { name: "Skema Pengembangan", description: "Penelitian atau pengabdian yang dirancang untuk memecahkan masalah praktis atau menghasilkan produk yang dapat langsung dimanfaatkan oleh masyarakat atau industri.", max_cost: 1000000, min_degree: "S1" as degree, is_student: true, is_partner: true, is_lecturer: true }
];

const position_schemas = [
    { schema_id: 1, position_id: 1 },
    { schema_id: 1, position_id: 2 },
    { schema_id: 1, position_id: 3 },
    { schema_id: 2, position_id: 1 },
    { schema_id: 2, position_id: 2 },
    { schema_id: 2, position_id: 3 }
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
    { name: "Kemitraan atau Transfer Teknologi", schema_id: 3, description: "Dokumen perjanjian kerja sama dengan pihak industri atau lembaga lain sebagai bentuk penerapan hasil penelitian ke dalam produk atau layanan komersial." }
]

const departements = [
    { name: "Departemen Teknik Elektro", description: "Menaungi program studi terkait teknik elektro dan aplikasinya." },
    { name: "Departemen Teknik Informatika dan Komputer", description: "Menaungi program studi yang berfokus pada informatika dan ilmu komputer." },
    { name: "Departemen Teknik Mekanika dan Energi", description: "Menaungi program studi yang berkaitan dengan mekanika dan sistem energi." },
    { name: "Departemen Teknologi Multimedia Kreatif", description: "Menaungi program studi yang berfokus pada multimedia dan industri kreatif." },
    // { name: "Departemen Program Pendidikan Jarak Jauh", description: "Menyediakan program studi melalui metode pembelajaran jarak jauh." }
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
                lecturer_id: 1,
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
        department_id: 2,
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
        department_id: 2,
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
                lecturer_id: 1,
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
                lecturer_id: 1,
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
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 1, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Mirza Ramadhani",
                research_group_id: 1,
                department_id: 1,
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
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 1, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Mirza Ramadhani",
                research_group_id: 1,
                department_id: 1,
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
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 1, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Mirza Ramadhani",
                research_group_id: 1,
                department_id: 1,
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
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 2, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Andra Al Ayubi",
                research_group_id: 2,
                department_id: 2,
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
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 2, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Andra Al Ayubi",
                research_group_id: 2,
                department_id: 2,
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
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 2, // Sama dengan lecturer_id pada proposal_suggestion
                name: "Andra Al Ayubi",
                research_group_id: 2,
                department_id: 2,
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
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 3,
                name: "Hammam Mujahid",
                research_group_id: 3,
                department_id: 3,
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
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 3,
                name: "Hammam Mujahid",
                research_group_id: 3,
                department_id: 3,
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
        logbook: base_logbook,
        final_report: base_final_report,
        lecturer_member: {
            create: {
                lecturer_id: 3,
                name: "Hammam Mujahid",
                research_group_id: 3,
                department_id: 3,
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

        // insert external document category
        await prisma.external_document_category.createMany({
            data: external_document_categories
        })
        console.log("Inserting external category...");

        console.log("Seeding selesai.");
    } catch (error) {
        console.error("Terjadi kesalahan saat seeding:", error);
    } finally {
        await prisma.$disconnect();
    }
};

main();