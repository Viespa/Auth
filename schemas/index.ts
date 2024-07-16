import * as z from 'zod';

export const ResetSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(8).max(100),
});


export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8).max(100),
    code: z.optional(z.string()),
});



export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8).max(100),
    name: z.string().min(2,{
        message: 'Please enter a valid name.',
    }).max(100),
});


export const HomeSchema = z.object({
   
    name: z.string().min(2,{
        message: 'Please enter a valid name.',
    }).max(100),
});