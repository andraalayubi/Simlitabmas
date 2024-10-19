// File: services/userService.ts
import prisma from '../client/prisma'
import { user } from '../../../prisma/interfaces';


export const getFilteredUsers = async (filters: Partial<user>): Promise<user[]> => {
    const users = await prisma.user.findMany({
        where: {
            ...(filters.id && { id: { equals: filters.id } }),
            ...(filters.email && { email: { equals: filters.email } }),  // Email adalah string
            ...(filters.user_type && { user_type: filters.user_type }),
        },
    });

    return users;
};