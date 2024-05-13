"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";

export const NewVerificationForm = () => {
    return(
    <CardWrapper 
       wsa
        >
        <h1>Verify your email</h1>
        <p>We have sent you a new verification email. Please check your inbox and follow the instructions to verify your email.</p>
    </CardWrapper>
    );
};