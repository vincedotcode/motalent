import * as React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProfileCardItem {
    title: string;
    description: string;
    icon: LucideIcon;
    link: string;
}

export function ProfileCards({ items }: { items: ProfileCardItem[] }) {
    return (
        <div className="max-w-5xl mx-auto px-8 grid gap-6 grid-cols-1 md:grid-cols-3">
            {items.map((item, index) => (
                <Link href={item.link} key={index} className="block h-full">
                    <ProfileCard item={item} />
                </Link>
            ))}
        </div>
    );
}

function ProfileCard({ item }: { item: ProfileCardItem }) {
    return (
        <Card className="hover:shadow-xl hover:transform hover:-translate-y-2 transition duration-300 ease-in-out cursor-pointer h-full flex flex-col justify-between">
            <CardHeader className="flex items-center h-full p-6">
                <item.icon className="w-10 h-10 text-primary mr-4" />
                <div className="flex flex-col justify-center">
                    <CardTitle className="text-lg font-semibold mb-2">{item.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{item.description}</CardDescription>
                </div>
            </CardHeader>
        </Card>
    );
}
