"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";

import { SyncLoader  } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { verifyEmail } from "@/actions/new-verification";

import { FormError } from "@/components/form-error";
import { FormSucces } from "@/components/form-succes";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [succes, setSuccess] = useState<string | undefined>("");

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (!token){
            setError("No token provided");
            return;
        }; 
        verifyEmail(token)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            }).catch((error) => {
                setError("An error occurred");
            }

        );
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="We have sent you a new verification email. Please check your inbox and follow the instructions to verify your email."
            backButtonLabel="Back to Login"
            backButtonhref="/auth/login"
            showSocial={false}
            headerTitle="Verify your email"
        >
            <div className="flex flex-col space-y-4">
                <div>
                    {!succes && !error && (
                        <SyncLoader  color="#2563EB" />
                    )}
                    <FormError message={error} />
                    <FormSucces message={succes} />
                </div>
                
            </div>
        </CardWrapper>
    );
};