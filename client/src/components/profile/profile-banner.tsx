"use client";
import { getUserData } from "@/hooks/useAuth"

export default function ProfileBanner() {

    const user = getUserData();


    return (
        <div className="relative h-500 w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#000000] bg-[radial-gradient(#4f4f4f2e_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
            <div className="container relative mx-auto px-4 md:px-6 space-y-8 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                    Hello! {user?.firstName} {user?.lastName}
                </h1>
            </div>
        </div>
    )
}