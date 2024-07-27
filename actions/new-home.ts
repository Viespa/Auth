"use server";

import * as z from 'zod';
import { HomeSchema } from "@/schemas";
import { checkUserInAnyHomeGroup, createHomeGroup, getHomeGroupsByUserId } from '@/data/select-home';
export const newHome = async (
    values: z.infer<typeof HomeSchema>) => {
    const validateFields = HomeSchema.safeParse(values);
    if (!validateFields.success) {
        return { error: 'Invalid fields' };
    }
    const { name } = validateFields.data;
    
    // Create a new home

    const newHome = createHomeGroup(name, 'clxhrvuu10000142j23hmul7d');
    if (!newHome) {
        return { error: 'Failed to create home' };
    }

    return { success: 'Home created!' };
}


export const checkAnyHome = async (userId: string) => {
    // Check if user is in any home
    const home = await checkUserInAnyHomeGroup(userId);
    if (!home) {
        return false;
    }

    return true;
}

export const getHome = async (userId: string) => {
    // Get user home
    const home = await getHomeGroupsByUserId(userId);
    if (!home) {
        return null;
    }

    return home;
}