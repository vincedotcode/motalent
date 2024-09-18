'use client';

import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { toast } from '@/components/ui/use-toast';
import { LoadingButton } from '@/components/ui/loading-button';

import { createJob } from '@/services/job';
import {CreateJobData} from '@/helper/types';
// Define types for enumerations
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


// Update the Zod schema to match CreateJobData
const jobSchema = z.object({
  title: z.string().min(1, { message: 'Job title is required' }),
  company: z.string().min(1, { message: 'Company is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  type: z.enum(typeOptions, { errorMap: () => ({ message: 'Please select a job type' }) }),
  closingDate: z.string().min(1, { message: 'Closing date is required' }),
  offeredSalary: z.string().min(1, { message: 'Offered salary is required' }),
  experienceLevel: z.enum(experienceLevelOptions, { errorMap: () => ({ message: 'Please select an experience level' }) }),
  experience: z.string().min(1, { message: 'Experience is required' }),
  remoteWorkOption: z.boolean(),
  expatriateEligibility: z.boolean(),
  keyResponsibilities: z.string().min(1, { message: 'Key responsibilities are required' }),
  hardSkills: z.array(z.string().min(1, { message: 'Hard skill cannot be empty' })).min(1, { message: 'At least one hard skill is required' }),
  softSkills: z.array(z.string().min(1, { message: 'Soft skill cannot be empty' })).min(1, { message: 'At least one soft skill is required' }),
  goalsAndPerformanceMetrics: z.string().optional(),
  managementStyle: z.string().optional(),
  careerProgression: z.string().optional(),
  benefitsAndCulture: z.string().optional(),
  candidateSelectionCriteria: z.string().optional(),
  qualifications: z.array(z.string().min(1, { message: 'Qualification cannot be empty' })).min(1, { message: 'At least one qualification is required' }),
  workCondition: z.string().optional(),
  workArrangement: z.enum(workArrangementOptions, { errorMap: () => ({ message: 'Please select a work arrangement' }) }),
  industry: z.enum(industryOptions, { errorMap: () => ({ message: 'Please select an industry' }) }),
});

type JobFormData = z.infer<typeof jobSchema>;

const steps = [
  {
    title: 'Basic Info',
    fields: ['title', 'company', 'category', 'industry', 'location', 'type', 'workArrangement'],
  },
  {
    title: 'Details',
    fields: ['closingDate', 'offeredSalary', 'experienceLevel', 'experience', 'remoteWorkOption', 'expatriateEligibility'],
  },
  {
    title: 'Responsibilities & Skills',
    fields: ['keyResponsibilities', 'hardSkills', 'softSkills', 'qualifications'],
  },
  {
    title: 'Additional Info',
    fields: ['goalsAndPerformanceMetrics', 'managementStyle', 'careerProgression', 'benefitsAndCulture', 'candidateSelectionCriteria', 'workCondition'],
  },
];

export default function AddVacancyForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    mode: 'all',
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
      hardSkills: [''],
      softSkills: [''],
      qualifications: [''],
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
  } = form;

  // Field arrays for skills and qualifications
  const { fields: hardSkillFields, append: appendHardSkill, remove: removeHardSkill } = useFieldArray({
    control,
    name: 'hardSkills',
  });

  const { fields: softSkillFields, append: appendSoftSkill, remove: removeSoftSkill } = useFieldArray({
    control,
    name: 'softSkills',
  });

  const { fields: qualificationFields, append: appendQualification, remove: removeQualification } = useFieldArray({
    control,
    name: 'qualifications',
  });

  const onSubmit = async (data: JobFormData) => {
    setIsLoading(true);
    console.log('Form submitted with data:', data);
    try {
      // Use the CreateJobData type here
      const jobData: CreateJobData = {
        title: data.title,
        company: data.company,
        category: data.category,
        location: data.location,
        type: data.type,
        closingDate: data.closingDate,
        offeredSalary: data.offeredSalary,
        experienceLevel: data.experienceLevel,
        experience: data.experience,
        remoteWorkOption: data.remoteWorkOption,
        expatriateEligibility: data.expatriateEligibility,
        keyResponsibilities: data.keyResponsibilities,
        hardSkills: data.hardSkills,
        softSkills: data.softSkills,
        goalsAndPerformanceMetrics: data.goalsAndPerformanceMetrics || '',
        managementStyle: data.managementStyle || '',
        careerProgression: data.careerProgression || '',
        benefitsAndCulture: data.benefitsAndCulture || '',
        candidateSelectionCriteria: data.candidateSelectionCriteria || '',
        qualifications: data.qualifications,
        workCondition: data.workCondition || '',
        workArrangement: data.workArrangement,
        industry: data.industry,
      };
      await createJob(jobData);
      toast({
        title: 'Job created',
        description: 'The job has been successfully created.',
      });
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create job. Please try again.',
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
      {/* Step Indicators */}
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

      {/* Basic Info Step */}
      {currentFields.includes('title') && (
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" {...register('title')} />
          {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
        </div>
      )}

      {currentFields.includes('company') && (
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" {...register('company')} />
          {errors.company && <p className="text-sm text-destructive">{errors.company.message}</p>}
        </div>
      )}

      {currentFields.includes('category') && (
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" {...register('category')} />
          {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
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
          {errors.industry && <p className="text-sm text-destructive">{errors.industry.message}</p>}
        </div>
      )}

      {currentFields.includes('location') && (
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register('location')} />
          {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
        </div>
      )}

      {currentFields.includes('type') && (
        <div className="space-y-2">
          <Label>Job Type</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value || ''}
                className="flex flex-col space-y-2"
              >
                {typeOptions.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type}>{type}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
        </div>
      )}

      {currentFields.includes('workArrangement') && (
        <div className="space-y-2">
          <Label>Work Arrangement</Label>
          <Controller
            name="workArrangement"
            control={control}
            render={({ field }) => (
              <ToggleGroup
                type="single"
                value={field.value || ''}
                onValueChange={field.onChange}
                className="flex space-x-2"
              >
                {workArrangementOptions.map((arrangement) => (
                  <ToggleGroupItem key={arrangement} value={arrangement} className="px-4 py-2">
                    {arrangement}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
          />
          {errors.workArrangement && (
            <p className="text-sm text-destructive">{errors.workArrangement.message}</p>
          )}
        </div>
      )}

      {/* Details Step */}
      {currentFields.includes('closingDate') && (
        <div className="space-y-2">
          <Label htmlFor="closingDate">Closing Date</Label>
          <Input id="closingDate" type="date" {...register('closingDate')} />
          {errors.closingDate && (
            <p className="text-sm text-destructive">{errors.closingDate.message}</p>
          )}
        </div>
      )}

      {currentFields.includes('offeredSalary') && (
        <div className="space-y-2">
          <Label htmlFor="offeredSalary">Offered Salary</Label>
          <Input id="offeredSalary" {...register('offeredSalary')} />
          {errors.offeredSalary && (
            <p className="text-sm text-destructive">{errors.offeredSalary.message}</p>
          )}
        </div>
      )}

      {currentFields.includes('experienceLevel') && (
        <div className="space-y-2">
          <Label>Experience Level</Label>
          <Controller
            name="experienceLevel"
            control={control}
            render={({ field }) => (
              <ToggleGroup
                type="single"
                value={field.value || ''}
                onValueChange={field.onChange}
                className="flex space-x-2"
              >
                {experienceLevelOptions.map((level) => (
                  <ToggleGroupItem key={level} value={level} className="px-4 py-2">
                    {level}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
          />
          {errors.experienceLevel && (
            <p className="text-sm text-destructive">{errors.experienceLevel.message}</p>
          )}
        </div>
      )}

      {currentFields.includes('experience') && (
        <div className="space-y-2">
          <Label htmlFor="experience">Experience Details</Label>
          <Textarea id="experience" {...register('experience')} />
          {errors.experience && (
            <p className="text-sm text-destructive">{errors.experience.message}</p>
          )}
        </div>
      )}

      {currentFields.includes('remoteWorkOption') && (
        <div className="flex items-center space-x-2">
          <Label htmlFor="remoteWorkOption">Remote Work Option</Label>
          <Controller
            name="remoteWorkOption"
            control={control}
            render={({ field }) => (
              <Switch id="remoteWorkOption" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
      )}

      {currentFields.includes('expatriateEligibility') && (
        <div className="flex items-center space-x-2">
          <Label htmlFor="expatriateEligibility">Expatriate Eligibility</Label>
          <Controller
            name="expatriateEligibility"
            control={control}
            render={({ field }) => (
              <Switch
                id="expatriateEligibility"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      )}

      {/* Responsibilities & Skills Step */}
      {currentFields.includes('keyResponsibilities') && (
        <div className="space-y-2">
          <Label htmlFor="keyResponsibilities">Key Responsibilities</Label>
          <Textarea id="keyResponsibilities" {...register('keyResponsibilities')} />
          {errors.keyResponsibilities && (
            <p className="text-sm text-destructive">{errors.keyResponsibilities.message}</p>
          )}
        </div>
      )}

      {currentFields.includes('hardSkills') && (
        <div className="space-y-2">
          <Label>Hard Skills</Label>
          {hardSkillFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <Input
                {...register(`hardSkills.${index}`)}
                defaultValue={field.value}
                className="flex-1"
              />
              <Button type="button" variant="destructive" onClick={() => removeHardSkill(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => appendHardSkill('')}>
            Add Hard Skill
          </Button>
          {errors.hardSkills && (
            <p className="text-sm text-destructive">
              {errors.hardSkills.message as string}
            </p>
          )}
        </div>
      )}

      {currentFields.includes('softSkills') && (
        <div className="space-y-2">
          <Label>Soft Skills</Label>
          {softSkillFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <Input
                {...register(`softSkills.${index}`)}
                defaultValue={field.value}
                className="flex-1"
              />
              <Button type="button" variant="destructive" onClick={() => removeSoftSkill(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => appendSoftSkill('')}>
            Add Soft Skill
          </Button>
          {errors.softSkills && (
            <p className="text-sm text-destructive">
              {errors.softSkills.message as string}
            </p>
          )}
        </div>
      )}

      {currentFields.includes('qualifications') && (
        <div className="space-y-2">
          <Label>Qualifications</Label>
          {qualificationFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <Input
                {...register(`qualifications.${index}`)}
                defaultValue={field.value}
                className="flex-1"
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeQualification(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => appendQualification('')}>
            Add Qualification
          </Button>
          {errors.qualifications && (
            <p className="text-sm text-destructive">
              {errors.qualifications.message as string}
            </p>
          )}
        </div>
      )}

      {/* Additional Info Step */}
      {currentFields.includes('goalsAndPerformanceMetrics') && (
        <div className="space-y-2">
          <Label htmlFor="goalsAndPerformanceMetrics">Goals and Performance Metrics</Label>
          <Textarea id="goalsAndPerformanceMetrics" {...register('goalsAndPerformanceMetrics')} />
        </div>
      )}

      {currentFields.includes('managementStyle') && (
        <div className="space-y-2">
          <Label htmlFor="managementStyle">Management Style</Label>
          <Textarea id="managementStyle" {...register('managementStyle')} />
        </div>
      )}

      {currentFields.includes('careerProgression') && (
        <div className="space-y-2">
          <Label htmlFor="careerProgression">Career Progression</Label>
          <Textarea id="careerProgression" {...register('careerProgression')} />
        </div>
      )}

      {currentFields.includes('benefitsAndCulture') && (
        <div className="space-y-2">
          <Label htmlFor="benefitsAndCulture">Benefits and Culture</Label>
          <Textarea id="benefitsAndCulture" {...register('benefitsAndCulture')} />
        </div>
      )}

      {currentFields.includes('candidateSelectionCriteria') && (
        <div className="space-y-2">
          <Label htmlFor="candidateSelectionCriteria">Candidate Selection Criteria</Label>
          <Textarea
            id="candidateSelectionCriteria"
            {...register('candidateSelectionCriteria')}
          />
        </div>
      )}

      {currentFields.includes('workCondition') && (
        <div className="space-y-2">
          <Label htmlFor="workCondition">Work Condition</Label>
          <Textarea id="workCondition" {...register('workCondition')} />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button type="button" onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </Button>
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
