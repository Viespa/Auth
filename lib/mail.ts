import { Resend } from "resend";
import { ConfirmEmailTemplate } from "@/components/emails/confirm-email";
import { ResetPasswordTemplate } from "@/components/emails/reset-password";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.URL}/auth/verify-email?token=${token}`;

    await resend.emails.send
        ({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Confirm your email",
            react: ConfirmEmailTemplate({ confirmLink: confirmLink })
        })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${process.env.URL}/auth/reset-password?token=${token}`;

    await resend.emails.send
        ({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Reset your password",
            react: ResetPasswordTemplate({ resetLink: resetLink })
        })
}
