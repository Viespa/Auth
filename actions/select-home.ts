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
            image: '/public/home-group-default.png',
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


export const checkUserInAnyHomeGroup = async (userId: string) => {
    try {
        const groups = await db.homeGroup.findMany({
            where: {
            OR: [
                {
                members: {
                    some: {
                    id: userId,
                    },
                },
                },
                {
                owner: {
                    some: {
                        id: userId,
                    },
                },
                },
            ],
            },
        });
        if (groups.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}