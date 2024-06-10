import { Poppins } from "next/font/google";

import { cn }  from "@/lib/utils";


const font = Poppins({
    subsets: ['latin'],
    weight: ['600']
});
interface HeaderProps {
    label: string;
    title: string; // Add a new prop for the title
}

export const Header = ({ label, title }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center">
             <h1 className={cn( "text-3xl font-semibold text-center mb-4",
             font.className,
             )}>
              {title}
            </h1>
            <p className="text-muted-foreground text-sm">
            {label}
            </p>
        </div>
       
    )
}
