"use server";

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token: string | null
) => {
    if (!token) {
        return { error: 'Invalid token' };
    }

    const validateFields = NewPasswordSchema.safeParse(values);

    if(!validateFields.success) {
        return { error: 'Invalid password' };
    }

    const { password } = validateFields.data;

    const existingToken = await getPasswordResetToken(token);

    if (!existingToken) {
        return { error: 'Invalid token' };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: 'Token has expired' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: 'Email does not exist' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            password: hashedPassword,
        },
    });

    if (!updatedUser) {
        return { error: 'Failed to update password' };
    }

    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return { success: 'Password updated' };
}
    
