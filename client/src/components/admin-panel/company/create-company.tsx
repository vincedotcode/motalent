'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createCompany } from '@/services/company';
import { Company } from '@/helper/types';
import { LoadingButton } from '@/components/ui/loading-button';

const industryOptions = [
  'Software Development',
  'Information Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Hospitality',
  'Transportation',
  'Construction',
  'Agriculture',
  'Energy',
  'Media',
  'Telecommunications',
  'Real Estate',
  'Other',
] as const;

type Industry = (typeof industryOptions)[number];

const companySchema = z.object({
  name: z.string().min(1, { message: 'Company name is required' }),
  description: z.string().optional(),
  website: z
    .string()
    .url({ message: 'Invalid URL' })
    .or(z.literal(''))
    .optional(),
  addressLine1: z.string().min(1, { message: 'Address is required' }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  postalCode: z.string().min(1, { message: 'Postal code is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  logo: z
    .string()
    .url({ message: 'Invalid URL' })
    .or(z.literal(''))
    .optional(),
  bannerImage: z
    .string()
    .url({ message: 'Invalid URL' })
    .or(z.literal(''))
    .optional(),
  foundedDate: z.string().optional(),
  numberOfEmployees: z
    .number()
    .int()
    .positive()
    .or(z.undefined())
    .optional(),
  industry: z.enum(industryOptions, {
    errorMap: () => ({ message: 'Please select an industry' }),
  }),
});

type CompanyFormData = z.infer<typeof companySchema>;

const steps = [
  { title: 'Basic Info', fields: ['name', 'description', 'website', 'industry'] },
  {
    title: 'Address',
    fields: [
      'addressLine1',
      'addressLine2',
      'city',
      'state',
      'postalCode',
      'country',
    ],
  },
  { title: 'Contact', fields: ['phoneNumber', 'email'] },
  {
    title: 'Additional Info',
    fields: ['logo', 'bannerImage', 'foundedDate', 'numberOfEmployees'],
  },
];

export default function CreateCompanyForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    mode: 'all',
    defaultValues: {
      name: '',
      description: '',
      website: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phoneNumber: '',
      email: '',
      logo: '',
      bannerImage: '',
      foundedDate: '',
      numberOfEmployees: undefined,
      industry: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = form;

  const onSubmit = async (data: CompanyFormData) => {
    setIsLoading(true);
    console.log('Form submitted with data:', data);
    try {
      await createCompany(data as Company);
      toast({
        title: 'Company created',
        description: 'The company has been successfully created.',
      });
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create company. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    const isStepValid = await trigger(fields as any);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const currentFields = steps[currentStep].fields;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={`text-sm font-medium ${
              index === currentStep ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {step.title}
          </div>
        ))}
      </div>

      {/* Render the current step's fields */}
      {currentFields.includes('name') && (
        <div className="space-y-2">
          <Label htmlFor="name">Company Name</Label>
          <Input
            id="name"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            onBlur={() => trigger('name')}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
      )}

      {currentFields.includes('description') && (
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register('description')} />
        </div>
      )}

      {currentFields.includes('website') && (
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" {...register('website')} />
          {errors.website && (
            <p className="text-sm text-destructive">{errors.website.message}</p>
          )}
        </div>
      )}

      {currentFields.includes('industry') && (
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industryOptions.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.industry && (
            <p className="text-sm text-destructive">{errors.industry.message}</p>
          )}
        </div>
      )}

      {currentFields.includes('addressLine1') && (
        <div className="space-y-2">
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input id="addressLine1" {...register('addressLine1')} />
          {errors.addressLine1 && (
            <p className="text-sm text-destructive">
              {errors.addressLine1.message}
            </p>
          )}
        </div>
      )}

      {currentFields.includes('addressLine2') && (
        <div className="space-y-2">
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input id="addressLine2" {...register('addressLine2')} />
        </div>
      )}

      {currentFields.includes('city') && (
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" {...register('city')} />
          {errors.city && (
            <p className="text-sm text-destructive">{errors.city.message}</p>
          )}
        </div>
      )}

      {currentFields.includes('state') && (
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input id="state" {...register('state')} />
          {errors.state && (
            <p className="text-sm text-destructive">{errors.state.message}</p>
          )}
        </div>
      )}

      {currentFields.includes('postalCode') && (
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" {...register('postalCode')} />
          {errors.postalCode && (
            <p className="text-sm text-destructive">
              {errors.postalCode.message}
            </p>
          )}
        </div>
      )}

      {currentFields.includes('country') && (
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" {...register('country')} />
          {errors.country && (
            <p className="text-sm text-destructive">{errors.country.message}</p>
          )}
        </div>
      )}

      {currentFields.includes('phoneNumber') && (
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" {...register('phoneNumber')} />
          {errors.phoneNumber && (
            <p className="text-sm text-destructive">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
      )}

      {currentFields.includes('email') && (
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register('email')} />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      )}

      {currentFields.includes('logo') && (
        <div className="space-y-2">
          <Label htmlFor="logo">Logo URL</Label>
          <Input id="logo" {...register('logo')} />
          {errors.logo && (
            <p className="text-sm text-destructive">{errors.logo.message}</p>
          )}
        </div>
      )}

      {currentFields.includes('bannerImage') && (
        <div className="space-y-2">
          <Label htmlFor="bannerImage">Banner Image URL</Label>
          <Input id="bannerImage" {...register('bannerImage')} />
          {errors.bannerImage && (
            <p className="text-sm text-destructive">
              {errors.bannerImage.message}
            </p>
          )}
        </div>
      )}

      {currentFields.includes('foundedDate') && (
        <div className="space-y-2">
          <Label htmlFor="foundedDate">Founded Date</Label>
          <Input id="foundedDate" {...register('foundedDate')} />
        </div>
      )}

      {currentFields.includes('numberOfEmployees') && (
        <div className="space-y-2">
          <Label htmlFor="numberOfEmployees">Number of Employees</Label>
          <Input
            id="numberOfEmployees"
            type="number"
            {...register('numberOfEmployees', { valueAsNumber: true })}
          />
          {errors.numberOfEmployees && (
            <p className="text-sm text-destructive">
              {errors.numberOfEmployees.message}
            </p>
          )}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button type="button" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <LoadingButton type="submit" loading={isLoading}>
            Create Company
          </LoadingButton>
        )}
      </div>
    </form>
  );
}
