"use server";

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';

export const verifyEmail = async (token:string) => {
    const verificationToken = await getVerificationTokenByToken(token);

    if (!verificationToken) {
        return { error: 'Invalid token' };
    }

    const hasExpired = new Date(verificationToken.expires) < new Date();

    if (hasExpired) {
        return { error: 'Token expired' };
    }

    const existingUser = await getUserByEmail(verificationToken.email);

    if (!existingUser) {
        return { error: 'Email not found' };
    }

    await db.user.update({
        where: { email: verificationToken.email },
        data: { 
            emailVerified: new Date(),
            email: verificationToken.email
        },
    });

    await db.verificationToken.delete({ where: { id: verificationToken.id } });

    return { success: 'Email verified' };
}

