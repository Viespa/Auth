"use server";

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';
import { sendTwoFactorEmail, sendVerificationEmail } from '@/lib/mail';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { generateVerificationToken } from '@/lib/token';
import { getUserByEmail } from '@/data/user';
import { getTwoFactorToken } from '@/lib/token';
import { getTwoFactorByEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export const login = async ( values: z.infer<typeof LoginSchema> ) => {
   const validateFields = LoginSchema.safeParse( values ); 

   if ( !validateFields.success ) {
       return { error: 'Invalid fields' };
   }
   
   const { email, password, code } = validateFields.data;

   const existingUser = await getUserByEmail( email );

   if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Invalid credentials!' };
   }

   if(!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken( existingUser.email );

    await sendVerificationEmail( existingUser.email , verificationToken.token );

    return { success: 'Confirmation email sent!'};
   }

   if(existingUser.isTwoFactorEnabled && existingUser.email){

    if(code){
        const twoFactorToken = await getTwoFactorByEmail( existingUser.email);

        if(!twoFactorToken){
            return { error: 'Invalid two-factor code!' };
        }

        if(twoFactorToken.token !== code){
            return { error: 'Invalid two-factor code!' };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if(hasExpired){
            return { error: 'Two-factor code has expired!' };
        }

        await db.twoFactorToken.delete({
            where: {
                id: twoFactorToken.id
            }
        })

        const existingConfirmation = await getTwoFactorConfirmationByUserId( existingUser.id );
        

        if(existingConfirmation){
            await db.twoFactorConfirmation.delete({
                where: {
                    id: existingConfirmation.id
                }
            })
        }

        await db.twoFactorConfirmation.create({
            data: {
                userId: existingUser.id
            }
        })
    }else{

        const twoFactorToken = await getTwoFactorToken( existingUser.email );

        await sendTwoFactorEmail( twoFactorToken.email, twoFactorToken.token );

        return { twoFactor: true };
    }
   }

   try {
       await signIn( 'credentials',{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
   } catch ( error ) {  
       if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: 'Invalid credentials' };
                default:
                    return { error: 'An error occurred' };
            }
       }

       throw error;
    }
};