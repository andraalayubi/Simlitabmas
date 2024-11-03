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


const main = async () => {
    try {
        // Hapus semua data user yang ada sebelumnya
        await prisma.user.deleteMany();

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
        });

        console.log("Seeding selesai.");
    } catch (error) {
        console.error("Terjadi kesalahan saat seeding:", error);
    } finally {
        await prisma.$disconnect();
    }
};

main();
