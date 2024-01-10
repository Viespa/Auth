"use client"

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export const Social = () => {
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button  className="w-full" variant="outline" size="lg" onClick={() => {}}>
                <FcGoogle className="text-xl h-5 w-5" />
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={() => {}}>
                <FaGithub className="text-xl h-5 w-5" />
            </Button>
        </div>
    )
}

export default Social;