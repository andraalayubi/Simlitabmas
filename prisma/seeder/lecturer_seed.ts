import { JsonArray } from "@prisma/client/runtime/library";
import { degree, user_type } from "prisma/interfaces";

const lecturers = [
    {
        name: "Mirza Ramadhani",
        phone_number: "085163142760",
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
        is_kaprodi: false,
        highest_degree: "S3" as degree,
        position_id: 1,
        user: {
            create: [
                { name: "Admin Mirza", email: "adminMirza@gmail.com", user_type: "admin" as user_type, password: "Mirza123!" },
                { name: "Dosen Mirza", email: "dosenMirza@gmail.com", user_type: "lecturer" as user_type, password: "Mirza123!" },
                { name: "Ketua RG Mirza", email: "ketuargMirza@gmail.com", user_type: "ketua_rg" as user_type, password: "Mirza123!" },
                { name: "Kaprodi Mirza", email: "kaprodiMirza@gmail.com", user_type: "kaprodi" as user_type, password: "Mirza123!" }
            ]
        }
    },
    {
        name: "Andra Al Ayubi",
        phone_number: "085163142760",
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
        is_kaprodi: false,
        highest_degree: "S2" as degree,
        position_id: 2,
        user: {
            create: [
                { name: "Admin Andra", email: "adminAndra@gmail.com", user_type: "admin" as user_type, password: "Andra123!" },
                { name: "Dosen Andra", email: "dosenAndra@gmail.com", user_type: "lecturer" as user_type, password: "Andra123!" },
                { name: "Ketua RG Andra", email: "ketuargAndra@gmail.com", user_type: "ketua_rg" as user_type, password: "Andra123!" },
                { name: "Kaprodi Andra", email: "kaprodiAndra@gmail.com", user_type: "kaprodi" as user_type, password: "Andra123!" },
            ]
        }
    },
    {
        name: "Hammam Mujahid",
        phone_number: "085163142760",
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
        is_kaprodi: false,
        highest_degree: "S2" as degree,
        position_id: 3,
        user: {
            create: [
                { name: "Admin Hammam", email: "adminHammam@gmail.com", user_type: "admin" as user_type, password: "Hammam123!" },
                { name: "Dosen Hammam", email: "dosenHammam@gmail.com", user_type: "lecturer" as user_type, password: "Hammam123!" },
                { name: "Ketua RG Hammam", email: "ketuargHammam@gmail.com", user_type: "ketua_rg" as user_type, password: "Hammam123!" },
            ]
        }
    },
    // Human Centric Multimedia (RG 4) / lecturer id 4
    {
        name: "Sritrusta Sukaridhoto, ST., Ph.D.",
        phone_number: "085163142760",
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
        highest_degree: "S3" as degree,
        position_id: 1,
        user: {
            create: [
                { name: "Dosen Sritrusta", email: "dosen.sritrusta@pens.ac.id", user_type: "lecturer", password: "DosenSritrusta2023!" },
                { name: "Ketua RG Sritrusta", email: "ketuarg.sritrusta@pens.ac.id", user_type: "ketua_rg", password: "KetuaRGSritrusta2023!" }
            ]
        }
    },

    // ACE-ATech (RG 5) / lecturer id 5
    {
        name: "Dr. Agus Indra Gunawan",
        phone_number: "085163142760",
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
        highest_degree: "S3" as degree,
        position_id: 2,
        user: {
            create: [
                { name: "Dosen Agus", email: "agus.gunawan@pens.ac.id", user_type: "lecturer", password: "DosenAgus2023!" },
                { name: "Ketua RG Agus", email: "ketuarg.agus@pens.ac.id", user_type: "ketua_rg", password: "KetuaRGAgus" }
            ]
        }
    },

    // Agile Product Development (RG 6) / lecturer id 6
    {
        name: "Umi Sa'adah",
        phone_number: "085163142760",
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
        highest_degree: "S2" as degree,
        position_id: 3,
        user: {
            create: [
                { name: "Dosen Umi", email: "umi.saadah@pens.ac.id", user_type: "lecturer", password: "DosenUmi2023!" },
                { name: "Ketua RG Umi", email: "ketuarg.umi@pens.ac.id", user_type: "ketua_rg", password: "KetuaRGUmi2023!" }
            ]
        }
    },

    // Bio Electrochemistry System (RG 7) / lecturer id 7
    {
        name: "Ri'fah Amalia",
        phone_number: "085163142760",
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
        highest_degree: "S2" as degree,
        position_id: 1,
        user: {
            create: [
                { name: "Dosen Rifah", email: "rifah.amalia@pens.ac.id", user_type: "lecturer" as user_type, password: "Rifah123!" },
                { name: "Ketua RG Rifah", email: "ketuarg.rifah@pens.ac.id", user_type: "ketua_rg" as user_type, password: "KetuaRGRifah2023!" }
            ]
        }
    },

    // Biosignal and Instrumentation Biomedic (RG 8) / lecturer id 8
    {
        name: "Rika Rokhana",
        phone_number: "085163142760",
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
        highest_degree: "S3" as degree,
        position_id: 2,
        user: {
            create: [
                { name: "Dosen Rika", email: "rika.rokhana@pens.ac.id", user_type: "lecturer" as user_type, password: "Rika123!" },
                { name: "Ketua RG Rika", email: "ketuarg.rika@pens.ac.id", user_type: "ketua_rg" as user_type, password: "KetuaRGRika2023!" }
            ]
        }
    },

    // Cyber Security (RG 9) / lecturer id 9
    {
        name: "Ferry Astika Saputra",
        phone_number: "085163142760",
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
        highest_degree: "S2" as degree,
        position_id: 3,
        user: {
            create: [
                { name: "Dosen Ferry", email: "ferry.astika@pens.ac.id", user_type: "lecturer" as user_type, password: "Ferry123!" },
                { name: "Ketua RG Ferry", email: "ketuarg.ferry@pens.ac.id", user_type: "ketua_rg" as user_type, password: "KetuaRGFerry2023!" }
            ]
        }
    },

    // Data Centric AI and e-Bussines System (RG 10) / lecturer id 10
    {
        name: "Arna Fariza",
        phone_number: "085163142760",
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
        highest_degree: "S2" as degree,
        position_id: 2,
        user: {
            create: [
                { name: "Dosen Arna", email: "arna.fariza@pens.ac.id", user_type: "lecturer" as user_type, password: "Arna123!" },
                { name: "Ketua RG Arna", email: "ketuarg.arna@pens.ac.id", user_type: "ketua_rg" as user_type, password: "KetuaRGArna2023!" }
            ]
        }
    },

    // Data Science for SDGs Applied Solutions (RG 11) / lecturer id 11
    {
        name: "Ronny Susetyoko",
        phone_number: "085163142760",
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
        highest_degree: "S2" as degree,
        position_id: 1,
        user: {
            create: [
                { name: "Dosen Ronny", email: "ronny.susetyoko@pens.ac.id", user_type: "lecturer" as user_type, password: "DosenRonny2023!" },
                { name: "Ketua RG Ronny", email: "ketuarg.ronny@pens.ac.id", user_type: "ketua_rg" as user_type, password: "KetuaRGRonny2023!" }
            ]
        }
    },

    // Digital Media (RG 12) / lecturer id 12
    {
        name: "Moh. Hasbi Assidigi",
        phone_number: "085163142760",
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
        highest_degree: "S2" as degree,
        position_id: 4,
        user: {
            create: [
                { name: "Dosen Hasbi", email: "hasbi.assidigi@pens.ac.id", user_type: "lecturer" as user_type, password: "DosenHasbi2023!" },
                { name: "Ketua RG Hashi", email: "ketuarg.hasbi@pens.ac.id", user_type: "ketua_rg" as user_type, password: "KetuaRGHasbi2023!" }
            ]
        }
    },

    // Embedded AI (RG 13) & Kaprodi Electornic Departement / lecturer id 13
    {
        name: "Dr. Arif Irwansyah, S.T., M.Eng",
        phone_number: "085163142760",
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
        highest_degree: "S3" as degree,
        position_id: 4,
        user: {
            create: [
                { name: "Admin Arif", email: "admin.arif@pens.ac.id", user_type: "admin" as user_type, password: "AdminArif2023!" },
                { name: "Dosen Arif", email: "arif.irwansyah@pens.ac.id", user_type: "lecturer" as user_type, password: "DosenArif2023!" },
                { name: "Ketua RG Arif", email: "ketuarg.arif@pens.ac.id", user_type: "ketua_rg" as user_type, password: "KetuaRGArif2023!" },
                { name: "Kaprodi Elektro Arif", email: "kaprodi.arif@pens.ac.id", user_type: "kaprodi" as user_type, password: "KaprodiArif2023!" }
            ]
        }
    },
    // Kaprodi IT  Departement  / lecturer id 14
    {
        name: "Prof. M. Udin Harun Al Rasyid , S.Kom., Ph.D",
        phone_number: "085163142760",
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
        highest_degree: "S3" as degree,
        position_id: 4,
        user: {
            create: [
                { name: "Admin Udin", email: "admin.udin@pens.ac.id", user_type: "admin" as user_type, password: "AdminUdin2023!" },
                { name: "Dosen Udin", email: "udin.harun@pens.ac.id", user_type: "lecturer" as user_type, password: "DosenUdin2023!" },
                { name: "Kaprodi IT Udin", email: "kaprodi.udin@pens.ac.id", user_type: "kaprodi" as user_type, password: "KaprodiUdin2023!" }
            ]
        }
    },
    // Kaprodi Mechatronic  Departement  /  lecturer id 15
    {
        name: "Mohammad Nasyir Tamara, S.ST., M.T.",
        phone_number: "085163142760",
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
        highest_degree: "S3" as degree,
        position_id: 4,
        user: {
            create: [
                { name: "Admin Nasyir", email: "admin.nasyir@pens.ac.id", user_type: "admin" as user_type, password: "AdminNasyir2023!" },
                { name: "Dosen Nasyir", email: "muhammad.nasyir@pens.ac.id", user_type: "lecturer" as user_type, password: "DosenNasyir2023!" },
                { name: "Kaprodi Mekatronika Nasyir", email: "kaprodi.nasyir@pens.ac.id", user_type: "kaprodi" as user_type, password: "KaprodiNasyir2023!" }
            ]
        }
    },
    // Kaprodi Multimedia Departement  / lecturer id 16
    {
        name: "Kholid Fathoni , S.Kom., MT.",
        phone_number: "085163142760",
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
        is_kaprodi: false,
        highest_degree: "S3" as degree,
        position_id: 4,
        user: {
            create: [
                { name: "Admin Kholid", email: "admin.kholid@pens.ac.id", user_type: "admin" as user_type, password: "AdminKholid2023!" },
                { name: "Dosen Kholid", email: "kholid.fathoni@pens.ac.id", user_type: "lecturer" as user_type, password: "DosenKholid2023!" },
                { name: "Kaprodi IT Kholid", email: "kaprodi.kholid@pens.ac.id", user_type: "kaprodi" as user_type, password: "KaprodiKholid2023!" }
            ]
        }
    },
    {
        name: "Budi Santoso, S.T., M.Eng.",
        phone_number: "085163142760",
        research_group_id: null,
        department_id: 3,
        nidn: "3122500001",
        nip: "33445570",
        degree: [
            {
                degree: "S1",
                code: "S.T",
                field: "Electrical Engineering",
                university: "Institut Teknologi Bandung",
                year: "2010"
            },
            {
                degree: "S2",
                code: "M.Eng",
                field: "Power Systems",
                university: "National University of Singapore",
                year: "2015"
            }
        ],
        is_ketua_rg: false,
        is_kaprodi: false,
        highest_degree: "S2" as degree,
        position_id: 2,
        user: {
            create: [
                {
                    name: "Dosen Budi",
                    email: "budi.santoso@pens.ac.id",
                    user_type: "lecturer",
                    password: "DosenBudi2023!"
                }
            ]
        }
    },
    {
        name: "Anisa Rahma, S.Kom., M.Kom.",
        phone_number: "085163142760",
        research_group_id: null,
        department_id: 1,
        nidn: "3122500002",
        nip: "33445571",
        degree: [
            {
                degree: "S1",
                code: "S.Kom",
                field: "Information Systems",
                university: "Universitas Indonesia",
                year: "2012"
            },
            {
                degree: "S2",
                code: "M.Kom",
                field: "Data Science",
                university: "Universitas Gadjah Mada",
                year: "2017"
            }
        ],
        is_ketua_rg: false,
        is_kaprodi: false,
        highest_degree: "S2" as degree,
        position_id: 3,
        user: {
            create: [
                {
                    name: "Dosen Anisa",
                    email: "anisa.rahma@pens.ac.id",
                    user_type: "lecturer",
                    password: "DosenAnisa2023!"
                }
            ]
        }
    },
    {
        name: "Hendra Pratama, S.T., M.Sc., Ph.D.",
        phone_number: "085163142760",
        research_group_id: null,
        department_id: 4,
        nidn: "3122500003",
        nip: "33445572",
        degree: [
            {
                degree: "S1",
                code: "S.T",
                field: "Mechanical Engineering",
                university: "Institut Teknologi Sepuluh Nopember",
                year: "2009"
            },
            {
                degree: "S2",
                code: "M.Sc",
                field: "Robotics",
                university: "Technical University of Munich",
                year: "2014"
            },
            {
                degree: "S3",
                code: "Ph.D",
                field: "Mechatronics",
                university: "ETH Zurich",
                year: "2020"
            }
        ],
        is_ketua_rg: false,
        is_kaprodi: false,
        highest_degree: "S3" as degree,
        position_id: 1,
        user: {
            create: [
                {
                    name: "Dosen Hendra",
                    email: "hendra.pratama@pens.ac.id",
                    user_type: "lecturer",
                    password: "DosenHendra2023!"
                }
            ]
        }
    },
    {
        name: "Dewi Anggraeni, S.Si., M.T.",
        phone_number: "085163142760",
        research_group_id: null,
        department_id: 2,
        nidn: "3122500004",
        nip: "33445573",
        degree: [
            {
                degree: "S1",
                code: "S.Si",
                field: "Computer Science",
                university: "Universitas Airlangga",
                year: "2013"
            },
            {
                degree: "S2",
                code: "M.T",
                field: "Information Technology",
                university: "University of Melbourne",
                year: "2016"
            }
        ],
        is_ketua_rg: false,
        is_kaprodi: false,
        highest_degree: "S2" as degree,
        position_id: 4,
        user: {
            create: [
                {
                    name: "Dosen Dewi",
                    email: "dewi.anggraeni@pens.ac.id",
                    user_type: "lecturer",
                    password: "DosenDewi2023!"
                }
            ]
        }
    },
    {
        name: "Rudi Hermawan, S.T., M.Eng., Ph.D.",
        phone_number: "085163142760",
        research_group_id: null,
        department_id: 1,
        nidn: "3122500005",
        nip: "33445574",
        degree: [
            {
                degree: "S1",
                code: "S.T",
                field: "Electrical Engineering",
                university: "Institut Teknologi Sepuluh Nopember",
                year: "2010"
            },
            {
                degree: "S2",
                code: "M.Eng",
                field: "Renewable Energy",
                university: "Delft University of Technology",
                year: "2015"
            },
            {
                degree: "S3",
                code: "Ph.D",
                field: "Energy Systems",
                university: "Massachusetts Institute of Technology",
                year: "2020"
            }
        ],
        is_ketua_rg: false,
        is_kaprodi: false,
        highest_degree: "S3" as degree,
        position_id: 3,
        user: {
            create: [
                {
                    name: "Dosen Rudi",
                    email: "rudi.hermawan@pens.ac.id",
                    user_type: "lecturer",
                    password: "DosenRudi2023!"
                }
            ]
        }
    },
    {
        name: "Fitria Wulandari, S.Kom., M.Kom.",
        phone_number: "085163142760",
        research_group_id: null,
        department_id: 4,
        nidn: "3122500006",
        nip: "33445575",
        degree: [
            {
                degree: "S1",
                code: "S.Kom",
                field: "Information Systems",
                university: "Universitas Gadjah Mada",
                year: "2014"
            },
            {
                degree: "S2",
                code: "M.Kom",
                field: "Cybersecurity",
                university: "Universitas Indonesia",
                year: "2019"
            }
        ],
        is_ketua_rg: false,
        is_kaprodi: false,
        highest_degree: "S2" as degree,
        position_id: 2,
        user: {
            create: [
                {
                    name: "Dosen Fitria",
                    email: "fitria.wulandari@pens.ac.id",
                    user_type: "lecturer",
                    password: "DosenFitria2023!"
                }
            ]
        }
    }

]


export default lecturers;
