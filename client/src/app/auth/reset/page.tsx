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
import { useSearchParams, useRouter } from 'next/navigation';
import { resetPassword } from "@/services/auth";

// Define the form validation schema using Zod
const resetPasswordFormSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters long" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async ({ password }) => {
    setLoading(true);
    try {
      if (!token) {
        throw new Error("Invalid or missing token");
      }
      await resetPassword(token, password);
      toast({
        title: "Success!",
        description: "Password reset successfully!",
        variant: "default",
      });
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000); 
      form.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        try {
          const errorDetails = JSON.parse(error.message);
          const message = Array.isArray(errorDetails.message) ? errorDetails.message.join(", ") : errorDetails.message;
          toast({
            title: "Error",
            description: message || 'Failed to reset password',
            variant: "destructive",
          });
        } catch (jsonError) {
          toast({
            title: "Error",
            description: 'Failed to reset password',
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
        <Card className="mx-auto max-w-sm w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
              Enter your new password below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="New Password" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="Confirm Password" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                  <LoadingButton type="submit" className="w-full" loading={loading}>Reset Password</LoadingButton>
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
