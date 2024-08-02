"use client";

import Link from "next/link";
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ModeToggle } from "@/helper/darkmode";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from '@/components/ui/loading-button';
import { forgotPassword } from "@/services/auth";
import { useRouter } from "next/navigation";
// Define the form validation schema using Zod
const forgotPasswordFormSchema = z.object({
    email: z.string().nonempty({ message: "Email is required" }).email({ message: "Invalid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async ({ email }) => {
        setLoading(true);
        try {
            await forgotPassword(email);
            toast({
                title: "Success!",
                description: "Reset password email sent!",
                variant: "default",
            });
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error: unknown) {
            if (error instanceof Error) {
                try {
                    const errorDetails = JSON.parse(error.message);
                    const message = Array.isArray(errorDetails.message) ? errorDetails.message.join(", ") : errorDetails.message;
                    toast({
                        title: "Error",
                        description: message || 'Failed to send reset password email',
                        variant: "destructive",
                    });
                } catch (jsonError) {
                    toast({
                        title: "Error",
                        description: 'Failed to send reset password email',
                        variant: "destructive",
                    });
                }
            } else {
                toast({
                    title: "Error",
                    description: 'An unexpected error occurred',
                    variant: "destructive",
                });
            }
        } finally {
            form.reset();
            setLoading(false);
        }
    };

    return (
        <div className="h-screen">
            <div className="flex items-center justify-center flex-col">
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
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Forgot Password</CardTitle>
                        <CardDescription>
                            Enter your email below to receive a password reset link.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" placeholder="example@example.com" />
                                            </FormControl>
                                            {fieldState.error && (
                                                <FormMessage>{fieldState.error.message}</FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-center">
                                    <LoadingButton type="submit" className="w-full" loading={loading}>Send Reset Link</LoadingButton>
                                </div>
                                <div className="mt-4 text-center">
                                    <Link href="/auth/login" className="text-sm underline">Back to Login</Link>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
