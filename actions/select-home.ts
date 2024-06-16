import { db } from '@/lib/db';


export const getHomeGroupsByUserId = async (userId: string) => {
    try {
        const groups = await db.homeGroup.findMany({
            where: {
                members: {
                    some: {
                        id: userId,
                    },
                },
            },
        });
        return groups;
    } catch (error) {
        return null;
    }
}

export const createHomeGroup = async (name: string, userId: string) => {
    try {
        const group = await db.homeGroup.create({
            data: {
                name,
                members: {
                    connect: {
                        id: userId,
                    },
                },
                owner: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return group;
    } catch (error) {
        return null;
    }
}
