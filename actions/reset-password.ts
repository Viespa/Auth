"use server";

import * as z from 'zod';

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/token';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);

  if(!validateFields.success) {
    return { error: "Invalid email" };
  }

  const { email} = validateFields.data;

  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "Email not found" };
  }

  const token = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(token.email, token.token);

  return { success: "Password reset email sent" };
}