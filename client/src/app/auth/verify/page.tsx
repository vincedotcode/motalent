"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { verifyEmail } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ModeToggle } from "@/helper/darkmode";
import { ChevronLeft } from 'lucide-react';
export default function VerifyEmail() {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    console.log(token)


    useEffect(() => {
        if (token) {
            verifyUserEmail(token);
        }
    }, [token]);

    const verifyUserEmail = async (token: string) => {
        try {
            await verifyEmail(token);
            toast({
                title: "Success!",
                description: "Email verified successfully!",
                variant: "default",
            });
            setLoading(false);
            router.push('/auth/login');
        } catch (error: unknown) {
            setLoading(false);
            if (error instanceof Error) {
                try {
                    const errorDetails = JSON.parse(error.message);
                    const message = Array.isArray(errorDetails.message) ? errorDetails.message.join(", ") : errorDetails.message;
                    setErrorMessage(message || 'Failed to verify email');
                    toast({
                        title: "Error",
                        description: message || 'Failed to verify email',
                        variant: "destructive",
                    });
                } catch (jsonError) {
                    setErrorMessage('Failed to verify email');
                    toast({
                        title: "Error",
                        description: 'Failed to verify email',
                        variant: "destructive",
                    });
                }
            } else {
                setErrorMessage('An unexpected error occurred');
                toast({
                    title: "Error",
                    description: 'An unexpected error occurred',
                    variant: "destructive",
                });
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col w-full">
                <div className="self-start mb-16 mt-3 flex justify-between w-full">
                    <Link href="/">
                        <Button className="mx-3">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                    </Link>
                    <div className="mx-3">
                        <ModeToggle />
                    </div>
                </div>
                <Card className="mx-auto max-w-2xl w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl">Email Verification</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p>Verifying your email...</p>
                        ) : errorMessage ? (
                            <div className="text-center text-red-500">
                                <p>{errorMessage}</p>
                                <Link href="/">
                                    <Button variant="destructive" className="mt-4">Go to Homepage</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="text-center">
                                <p>Your email has been verified successfully.</p>
                                <Link href="/auth/login">
                                    <Button className="mt-4">Go to Login</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>

    );
}
