"use client";


import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ModeToggle } from "@/helper/darkmode";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from '@/components/ui/loading-button';
import { register } from "@/services/auth";
import { PasswordInput } from "@/components/ui/password-input";
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";

// Define the form validation schema using Zod
const signUpFormSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters long" }),
  phoneNumber: z.string().nonempty({ message: "Phone number is required" }),
  addressLine1: z.string().nonempty({ message: "Address line 1 is required" }),
  addressLine2: z.string().optional(),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  country: z.string().nonempty({ message: "Country is required" }),
  role: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

type ApiErrorResponse = {
  message: string;
};

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export default function SignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      dateOfBirth: new Date(),
      country: "",
      role: "user"
    }
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    setLoading(true);
    const payload = {
      ...data,
      dateOfBirth: selectedDate?.toISOString() || new Date().toISOString(),
      role: 'user'
    };

    try {
      const response = await register(payload);
      console.log(response)
      toast({
        title: "Success!",
        description: "Account created successfully!",
        variant: "default",
      });
      setLoading(false);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoading(false);
        try {
          const errorDetails = JSON.parse(error.message);
          const message = Array.isArray(errorDetails.message) ? errorDetails.message.join(", ") : errorDetails.message;
          toast({
            title: "Error",
            description: message || 'Failed to create an account',
            variant: "destructive",
          });
        } catch (jsonError) {
          toast({
            title: "Error",
            description: 'Failed to create an account',
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
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="John" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Doe" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="john@example.com" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput id="password" value={field.value} onChange={field.onChange} autoComplete="new-password" />
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
                        <PasswordInput id="confirm_password" value={field.value} onChange={field.onChange} autoComplete="new-password" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="+23057901383" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="123 Main Street" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Apt 4B" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <CalendarDatePicker
                          date={{ from: selectedDate || new Date(), to: selectedDate || new Date() }}
                          onDateSelect={(date) => {
                            setSelectedDate(date.from);
                            field.onChange(date.from);
                          }}
                          variant="outline"
                          numberOfMonths={1}
                          className="min-w-[250px]"
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Mauritius" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                  <LoadingButton type="submit" className="w-full" loading={loading}>Create Account</LoadingButton>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="text-center text-sm mb-5">
          Don’t have an account? <Link href="/auth/signup" className="underline">Sign up</Link>
        </div>
      </div>
    </div>
  )
}
