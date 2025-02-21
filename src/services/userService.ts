import prisma from '../client/prisma';
import bcrypt from 'bcrypt';
import { user_type, user } from 'prisma/interfaces';

const addNewUser = async (user: user) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password!, 10);
        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                user_type: user.user_type,
                username: user.username,
                email: user.email,
                password: hashedPassword,
            },
        });
        return newUser;
    } catch (error) {
        throw new Error('Error creating user');
    }
};

// Dapatkan pengguna berdasarkan email
const getUserByEmail = async (email: string, user_type: user_type) => {
    return await prisma.user.findUnique({
        where: { email: email, user_type: user_type, deleted: false },
        include: { lecturer: true },
    });
};

// Dapatkan pengguna berdasarkan username
const getUserByUsername = async (username: string, user_type: user_type) => {
    return await prisma.user.findUnique({
        where: { username: username, user_type: user_type, deleted: false },
        include: { lecturer: true },
    });
};

// Mendapatkan pengguna dengan beberapa kondisi filter
const getFilteredUsers = async (filters: Partial<user>): Promise<user[]> => {
    return await prisma.user.findMany({
        where: {
            ...(filters.id && { id: filters.id }),
            ...(filters.email && { email: filters.email }),
            ...(filters.user_type && { user_type: filters.user_type }),
            deleted: false,
        },
    });
};

const remove = async (lecturer_id: number) => {
    return await prisma.user.updateMany({
        where: { lecturer_id: lecturer_id },
        data: { deleted: true }
    })
}

const userService = {
    getUserByEmail,
    addNewUser,
    getUserByUsername,
    getFilteredUsers,
    remove,
};

export default userService;
