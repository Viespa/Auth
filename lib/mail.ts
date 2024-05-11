import { Resend } from "resend";
import { ConfirmEmailTemplate } from "@/components/emails/confirm-email";

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
