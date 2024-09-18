// AddVacancyForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { LoadingButton } from '@/components/ui/loading-button';
import { createJob } from '@/services/job';
import { CreateJobData } from '@/helper/types';
import { getAllCompanies } from '@/services/company';
import { X } from 'lucide-react';

// Enumerations
const typeOptions = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'] as const;
type JobType = (typeof typeOptions)[number];

const experienceLevelOptions = ['Junior', 'Middle', 'Senior'] as const;
type ExperienceLevel = (typeof experienceLevelOptions)[number];

const workArrangementOptions = ['On-site', 'Remote', 'Hybrid'] as const;
type WorkArrangement = (typeof workArrangementOptions)[number];

const industryOptions = [
  'Accountancy, banking and finance',
  'Business, consulting and management',
  'Charity and voluntary work',
  'Creative arts and design',
  'Energy and utilities',
  'Engineering and manufacturing',
  'Environment and agriculture',
  'Healthcare',
  'Hospitality and events management',
  'Information technology',
  'Law',
  'Law enforcement and security',
  'Leisure, sport and tourism',
  'Marketing, advertising and PR',
  'Media and internet',
  'Property and construction',
  'Public services and administration',
  'Recruitment and HR',
  'Retail',
  'Sales',
  'Science and pharmaceuticals',
  'Social care',
  'Teacher training and education',
  'Transport and logistics',
  'Other',
] as const;
type Industry = (typeof industryOptions)[number];

// Zod Schema
const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Please select a company'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  type: z.enum([...typeOptions], { errorMap: () => ({ message: 'Please select a job type' }) }),
  closingDate: z.string().min(1, 'Closing date is required'),
  offeredSalary: z.string().min(1, 'Offered salary is required'),
  experienceLevel: z.enum([...experienceLevelOptions], {
    errorMap: () => ({ message: 'Please select an experience level' }),
  }),
  experience: z.string().min(1, 'Experience is required'),
  remoteWorkOption: z.boolean(),
  expatriateEligibility: z.boolean(),
  keyResponsibilities: z.string().min(1, 'Key responsibilities are required'),
  hardSkills: z
    .array(
      z.object({
        value: z.string().min(1, 'Hard skill cannot be empty'),
      })
    )
    .min(1, 'At least one hard skill is required'),
  softSkills: z
    .array(
      z.object({
        value: z.string().min(1, 'Soft skill cannot be empty'),
      })
    )
    .min(1, 'At least one soft skill is required'),
  qualifications: z
    .array(
      z.object({
        value: z.string().min(1, 'Qualification cannot be empty'),
      })
    )
    .min(1, 'At least one qualification is required'),
  goalsAndPerformanceMetrics: z.string().optional(),
  managementStyle: z.string().optional(),
  careerProgression: z.string().optional(),
  benefitsAndCulture: z.string().optional(),
  candidateSelectionCriteria: z.string().optional(),
  workCondition: z.string().optional(),
  workArrangement: z.enum([...workArrangementOptions], {
    errorMap: () => ({ message: 'Please select a work arrangement' }),
  }),
  industry: z.enum([...industryOptions], {
    errorMap: () => ({ message: 'Please select an industry' }),
  }),
});

type JobFormData = z.infer<typeof jobSchema>;

// Define the type for steps
type Step = {
  title: string;
  fields: Array<keyof JobFormData>;
};

// Steps Configuration
const steps: Step[] = [
  { title: 'Basic Info', fields: ['title', 'company', 'category', 'industry', 'location'] },
  { title: 'Job Details', fields: ['type', 'workArrangement', 'closingDate', 'offeredSalary'] },
  {
    title: 'Experience',
    fields: ['experienceLevel', 'experience', 'remoteWorkOption', 'expatriateEligibility'],
  },
  {
    title: 'Responsibilities',
    fields: ['keyResponsibilities', 'hardSkills', 'softSkills', 'qualifications'],
  },
  {
    title: 'Performance & Management',
    fields: ['goalsAndPerformanceMetrics', 'managementStyle', 'careerProgression'],
  },
  {
    title: 'Benefits & Selection',
    fields: ['benefitsAndCulture', 'candidateSelectionCriteria', 'workCondition'],
  },
];

export type Company = {
  _id: string;
  name: string;
  description: string;
  website: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  email: string;
  logo: string;
  bannerImage: string;
  foundedDate: string;
  numberOfEmployees: number;
  industry: string;
  createdAt: string;
  affiliatedRecruiters: string[]; // Array of recruiter IDs
};


export default function AddVacancyForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [newHardSkill, setNewHardSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newQualification, setNewQualification] = useState('');

  // State to hold companies
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companiesLoading, setCompaniesLoading] = useState(true);

  // Fetch companies on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAllCompanies();
        setCompanies(data);
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load companies.', variant: 'destructive' });
      } finally {
        setCompaniesLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    mode: 'onTouched',
    defaultValues: {
      title: '',
      company: '',
      category: '',
      location: '',
      type: undefined,
      closingDate: '',
      offeredSalary: '',
      experienceLevel: undefined,
      experience: '',
      remoteWorkOption: false,
      expatriateEligibility: false,
      keyResponsibilities: '',
      hardSkills: [],
      softSkills: [],
      qualifications: [],
      goalsAndPerformanceMetrics: '',
      managementStyle: '',
      careerProgression: '',
      benefitsAndCulture: '',
      candidateSelectionCriteria: '',
      workCondition: '',
      workArrangement: undefined,
      industry: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = form;

  // Field arrays
  const {
    fields: hardSkillFields,
    append: appendHardSkill,
    remove: removeHardSkill,
  } = useFieldArray({
    control,
    name: 'hardSkills',
  });

  const {
    fields: softSkillFields,
    append: appendSoftSkill,
    remove: removeSoftSkill,
  } = useFieldArray({
    control,
    name: 'softSkills',
  });

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: 'qualifications',
  });

  const onSubmit: SubmitHandler<JobFormData> = async (data) => {
    setIsLoading(true);
    try {
      // Map the arrays to extract the values
      const jobData: CreateJobData = {
        ...data,
        hardSkills: data.hardSkills.map((skill) => skill.value),
        softSkills: data.softSkills.map((skill) => skill.value),
        qualifications: data.qualifications.map((qual) => qual.value),
      };
      await createJob(jobData);
      toast({ title: 'Success', description: 'Job created successfully.' });
      reset();
      setCurrentStep(0);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create job.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    const isValid = await trigger(fields);
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const currentFields = steps[currentStep].fields;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl w-full mx-auto space-y-4 px-4">
      {/* Step Indicators */}
      <div className="flex flex-wrap justify-between mb-4">
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

      {/* Render Form Fields */}
      {currentFields.map((field) => {
        const fieldName = field as keyof JobFormData;
        switch (fieldName) {
          case 'title':
          case 'category':
          case 'location':
            return (
              <div key={fieldName} className="space-y-2">
                <Label htmlFor={fieldName}>
                  {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </Label>
                <Input id={fieldName} {...register(fieldName)} className="w-full" />
                {errors[fieldName] && (
                  <p className="text-sm text-destructive">{errors[fieldName]?.message}</p>
                )}
              </div>
            );

          case 'company':
            return (
              <div key={fieldName} className="space-y-2">
                <Label htmlFor={fieldName}>Company</Label>
                <Controller
                  name="company"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                      disabled={companiesLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={companiesLoading ? 'Loading companies...' : 'Select company'}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((company) => (
                          <SelectItem key={company._id} value={company._id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.company && (
                  <p className="text-sm text-destructive">{errors.company.message}</p>
                )}
              </div>
            );

          case 'industry':
            return (
              <div key={fieldName} className="space-y-2">
                <Label htmlFor={fieldName}>Industry</Label>
                <Controller
                  name="industry"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value || ''}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industryOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
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
            );

          case 'type':
            return (
              <div key={fieldName} className="space-y-2">
                <Label>Job Type</Label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value || ''}
                      className="flex flex-wrap gap-4"
                    >
                      {typeOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2 mt-2">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
              </div>
            );

          case 'workArrangement':
            return (
              <div key={fieldName} className="space-y-2">
                <Label>Work Arrangement</Label>
                <Controller
                  name="workArrangement"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value || ''}
                      className="flex flex-wrap gap-4"
                    >
                      {workArrangementOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2 mt-2">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.workArrangement && (
                  <p className="text-sm text-destructive">{errors.workArrangement.message}</p>
                )}
              </div>
            );

          case 'closingDate':
          case 'offeredSalary':
            return (
              <div key={fieldName} className="space-y-2">
                <Label htmlFor={fieldName}>
                  {fieldName === 'closingDate' ? 'Closing Date' : 'Offered Salary'}
                </Label>
                <Input
                  id={fieldName}
                  type={fieldName === 'closingDate' ? 'date' : 'text'}
                  {...register(fieldName)}
                  className="w-full"
                />
                {errors[fieldName] && (
                  <p className="text-sm text-destructive">{errors[fieldName]?.message}</p>
                )}
              </div>
            );

          case 'experienceLevel':
            return (
              <div key={fieldName} className="space-y-2">
                <Label>Experience Level</Label>
                <Controller
                  name="experienceLevel"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value || ''}
                      className="flex flex-wrap gap-4"
                    >
                      {experienceLevelOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2 mt-2">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.experienceLevel && (
                  <p className="text-sm text-destructive">{errors.experienceLevel.message}</p>
                )}
              </div>
            );

          case 'experience':
            return (
              <div key={fieldName} className="space-y-2">
                <Label htmlFor={fieldName}>Experience Details</Label>
                <Textarea id={fieldName} {...register(fieldName)} className="w-full" />
                {errors[fieldName] && (
                  <p className="text-sm text-destructive">{errors[fieldName]?.message}</p>
                )}
              </div>
            );

          case 'remoteWorkOption':
          case 'expatriateEligibility':
            return (
              <div key={fieldName} className="flex items-center space-x-2 mt-2">
                <Controller
                  name={fieldName}
                  control={control}
                  render={({ field }) => (
                    <Switch id={field.name} checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
                <Label htmlFor={fieldName}>
                  {fieldName === 'remoteWorkOption' ? 'Remote Work Option' : 'Expatriate Eligibility'}
                </Label>
              </div>
            );

          case 'keyResponsibilities':
            return (
              <div key={fieldName} className="space-y-2">
                <Label htmlFor={fieldName}>Key Responsibilities</Label>
                <Textarea id={fieldName} {...register(fieldName)} className="w-full" />
                {errors[fieldName] && (
                  <p className="text-sm text-destructive">{errors[fieldName]?.message}</p>
                )}
              </div>
            );

          case 'hardSkills':
          case 'softSkills':
          case 'qualifications':
            const fieldArray =
              fieldName === 'hardSkills'
                ? hardSkillFields
                : fieldName === 'softSkills'
                ? softSkillFields
                : qualificationFields;
            const appendFn =
              fieldName === 'hardSkills'
                ? appendHardSkill
                : fieldName === 'softSkills'
                ? appendSoftSkill
                : appendQualification;
            const removeFn =
              fieldName === 'hardSkills'
                ? removeHardSkill
                : fieldName === 'softSkills'
                ? removeSoftSkill
                : removeQualification;
            const newValue =
              fieldName === 'hardSkills'
                ? newHardSkill
                : fieldName === 'softSkills'
                ? newSoftSkill
                : newQualification;
            const setNewValue =
              fieldName === 'hardSkills'
                ? setNewHardSkill
                : fieldName === 'softSkills'
                ? setNewSoftSkill
                : setNewQualification;

            return (
              <div key={fieldName} className="space-y-2">
                <Label>
                  {fieldName === 'hardSkills'
                    ? 'Hard Skills'
                    : fieldName === 'softSkills'
                    ? 'Soft Skills'
                    : 'Qualifications'}
                </Label>
                <div className="flex flex-wrap gap-2">
                  {fieldArray.map((item, index) => (
                    <Badge key={item.id} variant="secondary" className="flex items-center">
                      {item.value}
                      <button type="button" className="ml-1" onClick={() => removeFn(index)}>
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder={
                      fieldName === 'hardSkills'
                        ? 'Add a hard skill'
                        : fieldName === 'softSkills'
                        ? 'Add a soft skill'
                        : 'Add a qualification'
                    }
                    className="w-full"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newValue.trim() !== '') {
                        appendFn({ value: newValue.trim() });
                        setNewValue('');
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                {errors[fieldName] && (
                  <p className="text-sm text-destructive">{errors[fieldName]?.message}</p>
                )}
              </div>
            );

          default:
            return (
              <div key={fieldName} className="space-y-2">
                <Label htmlFor={fieldName}>{fieldName.replace(/([A-Z])/g, ' $1')}</Label>
                <Textarea id={fieldName} {...register(fieldName)} className="w-full" />
                {errors[fieldName] && (
                  <p className="text-sm text-destructive">{errors[fieldName]?.message}</p>
                )}
              </div>
            );
        }
      })}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <Button type="button" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button type="button" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <LoadingButton type="submit" loading={isLoading}>
            Create Job
          </LoadingButton>
        )}
      </div>
    </form>
  );
}