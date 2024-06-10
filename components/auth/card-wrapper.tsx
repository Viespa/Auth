"use client"

import { 
    Card,
    CardContent,
    CardHeader,
    CardFooter,
 } from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";


interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonhref: string;
    showSocial?: boolean;
    headerTitle: string;
};

export const CardWrapper = ({ 
    children, 
    headerLabel, 
    backButtonLabel, 
    backButtonhref, 
    showSocial,
    headerTitle
}: CardWrapperProps) => {
    return (
        <div className="w-[400px] mx-auto my-auto">
            <CardHeader>
                <Header label={headerLabel} title={headerTitle} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonhref}></BackButton>
            </CardFooter>
        </div>
    );
}