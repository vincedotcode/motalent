"use client";

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, PlusIcon, XIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Define TypeScript interfaces
interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  description: string;
}

interface Education {
  id?: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string | null;
  endDate: string | null;
  grade: string;
}

interface Experience {
  id?: number;
  jobTitle: string;
  companyName: string;
  startDate: string | null;
  endDate: string | null;
  responsibilities: string;
}

interface CustomSection {
  id?: number;
  title: string;
  content: string;
}

interface Website {
  name: string;
  url: string;
}

interface ResumeData {
  template: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  languages: string[];
  hobbies: string[];
  customSections: CustomSection[];
  websites: Website[];
}

export default function ResumeBuilder() {
  const [activeStep, setActiveStep] = useState(0)
  const [resumeData, setResumeData] = useState<ResumeData>({
    template: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      email: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      country: '',
      description: '',
    },
    education: [],
    experience: [],
    skills: [],
    languages: [],
    hobbies: [],
    customSections: [],
    websites: [],
  })

  const steps = [
    { title: 'Personal Info', component: <PersonalInfoForm /> },
    { title: 'Education', component: <EducationForm /> },
    { title: 'Experience', component: <ExperienceForm /> },
    { title: 'Skills & Languages', component: <SkillsLanguagesForm /> },
    { title: 'Custom Sections', component: <CustomSectionsForm /> },
    { title: 'Websites', component: <WebsitesForm /> },
  ]

  const handleNext = () => {
    setActiveStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0))
  }

 
   function PersonalInfoForm() {
    const [resumeData, setResumeData] = useState<{ personalInfo: PersonalInfo }>({
      personalInfo: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        country: '',
        description: '',
      },
    });
  
    const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
      setResumeData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [field]: value,
        },
      }));
    };
  
    return (
      <div className="space-y-4">
        <Card className="p-2">
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={resumeData.personalInfo.firstName}
                  onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={resumeData.personalInfo.lastName}
                  onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
  
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <DatePicker
                  date={resumeData.personalInfo.dateOfBirth ? new Date(resumeData.personalInfo.dateOfBirth) : null}
                  setDate={(date) => updatePersonalInfo('dateOfBirth', date ? date.toISOString().split('T')[0] : '')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
            </div>
  
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={resumeData.personalInfo.phoneNumber}
                  onChange={(e) => updatePersonalInfo('phoneNumber', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  value={resumeData.personalInfo.addressLine1}
                  onChange={(e) => updatePersonalInfo('addressLine1', e.target.value)}
                  placeholder="Enter your address"
                />
              </div>
            </div>
  
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  value={resumeData.personalInfo.addressLine2}
                  onChange={(e) => updatePersonalInfo('addressLine2', e.target.value)}
                  placeholder="Enter additional address info"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={resumeData.personalInfo.country}
                  onChange={(e) => updatePersonalInfo('country', e.target.value)}
                  placeholder="Enter your country"
                />
              </div>
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={resumeData.personalInfo.description}
                onChange={(e) => updatePersonalInfo('description', e.target.value)}
                placeholder="Enter a brief description"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  function EducationForm() {
    const [newEducation, setNewEducation] = useState<Education>({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: null,
      endDate: null,
      grade: ''
    })

    const addEducation = () => {
      setResumeData(prev => ({
        ...prev,
        education: [...prev.education, { ...newEducation, id: Date.now() }]
      }))
      setNewEducation({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: null,
        endDate: null,
        grade: ''
      })
    }

    const removeEducation = (id: number) => {
      setResumeData(prev => ({
        ...prev,
        education: prev.education.filter(edu => edu.id !== id)
      }))
    }

    return (
      <div className="space-y-4">
        <Card className='p-2'>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                placeholder="Enter institution name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                placeholder="Enter degree"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fieldOfStudy">Field of Study</Label>
              <Input
                id="fieldOfStudy"
                value={newEducation.fieldOfStudy}
                onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
                placeholder="Enter field of study"
              />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <DatePicker
                date={newEducation.startDate ? new Date(newEducation.startDate) : null}
                setDate={(date) => setNewEducation({ ...newEducation, startDate: date ? date.toISOString().split('T')[0] : null })}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <DatePicker
                date={newEducation.endDate ? new Date(newEducation.endDate) : null}
                setDate={(date) => setNewEducation({ ...newEducation, endDate: date ? date.toISOString().split('T')[0] : null })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                value={newEducation.grade}
                onChange={(e) => setNewEducation({ ...newEducation, grade: e.target.value })}
                placeholder="Enter grade"
              />
            </div>
            <Button onClick={addEducation} className="w-full">Add Education</Button>
          </CardContent>
        </Card>
        {resumeData.education.map((edu) => (
          <Card key={edu.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {edu.institution}
                <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id!)}>
                  <XIcon className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Degree:</strong> {edu.degree}</p>
              <p><strong>Field of Study:</strong> {edu.fieldOfStudy}</p>
              <p><strong>Start Date:</strong> {edu.startDate || 'Not specified'}</p>
              <p><strong>End Date:</strong> {edu.endDate || 'Not specified'}</p>
              <p><strong>Grade:</strong> {edu.grade}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  function ExperienceForm() {
    const [newExperience, setNewExperience] = useState<Experience>({
      jobTitle: '',
      companyName: '',
      startDate: null,
      endDate: null,
      responsibilities: ''
    })

    const addExperience = () => {
      setResumeData(prev => ({
        ...prev,
        experience: [...prev.experience, { ...newExperience, id: Date.now() }]
      }))
      setNewExperience({
        jobTitle: '',
        companyName: '',
        startDate: null,
        endDate: null,
        responsibilities: ''
      })
    }

    const removeExperience = (id: number) => {
      setResumeData(prev => ({
        ...prev,
        experience: prev.experience.filter(exp => exp.id !== id)
      }))
    }

    return (
      <div className="space-y-4">
        <Card className='p-2'>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={newExperience.jobTitle}
                onChange={(e) => setNewExperience({ ...newExperience, jobTitle: e.target.value })}
                placeholder="Enter job title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={newExperience.companyName}
                onChange={(e) => setNewExperience({ ...newExperience, companyName: e.target.value })}
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <DatePicker
                date={newExperience.startDate ? new Date(newExperience.startDate) : null}
                setDate={(date) => setNewExperience({ ...newExperience, startDate: date ? date.toISOString().split('T')[0] : null })}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <DatePicker
                date={newExperience.endDate ? new Date(newExperience.endDate) : null}
                setDate={(date) => setNewExperience({ ...newExperience, endDate: date ? date.toISOString().split('T')[0] : null })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsibilities">Responsibilities</Label>
              <Textarea
                id="responsibilities"
                value={newExperience.responsibilities}
                onChange={(e) => setNewExperience({ ...newExperience, responsibilities: e.target.value })}
                placeholder="Enter job responsibilities"
              />
            </div>
            <Button onClick={addExperience} className="w-full">Add Experience</Button>
          </CardContent>
        </Card>
        {resumeData.experience.map((exp) => (
          <Card key={exp.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {exp.jobTitle} at {exp.companyName}
                <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id!)}>
                  <XIcon className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Start Date:</strong> {exp.startDate || 'Not specified'}</p>
              <p><strong>End Date:</strong> {exp.endDate || 'Not specified'}</p>
              <p><strong>Responsibilities:</strong> {exp.responsibilities}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  function SkillsLanguagesForm() {
    const [newSkill, setNewSkill] = useState('')
    const [newLanguage, setNewLanguage] = useState('')
    const [newHobby, setNewHobby] = useState('')

    const addSkill = () => {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }))
      setNewSkill('')
    }

    const removeSkill = (skill: string) => {
      setResumeData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s !== skill)
      }))
    }

    const addLanguage = () => {
      setResumeData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage]
      }))
      setNewLanguage('')
    }

    const removeLanguage = (language: string) => {
      setResumeData(prev => ({
        ...prev,
        languages: prev.languages.filter(l => l !== language)
      }))
    }

    const addHobby = () => {
      setResumeData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, newHobby]
      }))
      setNewHobby('')
    }

    const removeHobby = (hobby: string) => {
      setResumeData(prev => ({
        ...prev,
        hobbies: prev.hobbies.filter(h => h !== hobby)
      }))
    }

    return (
      <div className="space-y-4">
        <Card className='p-2'>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <div className="flex space-x-2">
                <Input
                  id="skills"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter a skill"
                />
                <Button onClick={addSkill} size="icon">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-2"
                      onClick={() => removeSkill(skill)}
                    >
                      <XIcon className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="languages">Languages</Label>
              <div className="flex space-x-2">
                <Input
                  id="languages"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Enter a language"
                />
                <Button onClick={addLanguage} size="icon">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {resumeData.languages.map((language, index) => (
                  <Badge key={index} variant="secondary">
                    {language}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-2"
                      onClick={() => removeLanguage(language)}
                    >
                      <XIcon className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hobbies">Hobbies</Label>
              <div className="flex space-x-2">
                <Input
                  id="hobbies"
                  value={newHobby}
                  onChange={(e) => setNewHobby(e.target.value)}
                  placeholder="Enter a hobby"
                />
                <Button onClick={addHobby} size="icon">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {resumeData.hobbies.map((hobby, index) => (
                  <Badge key={index} variant="secondary">
                    {hobby}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-2"
                      onClick={() => removeHobby(hobby)}
                    >
                      <XIcon className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function CustomSectionsForm() {
    const [newSection, setNewSection] = useState<CustomSection>({
      title: '',
      content: ''
    })

    const addSection = () => {
      setResumeData(prev => ({
        ...prev,
        customSections: [...prev.customSections, { ...newSection, id: Date.now() }]
      }))
      setNewSection({ title: '', content: '' })
    }

    const removeSection = (id: number) => {
      setResumeData(prev => ({
        ...prev,
        customSections: prev.customSections.filter(section => section.id !== id)
      }))
    }

    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sectionTitle">Section Title</Label>
              <Input
                id="sectionTitle"
                value={newSection.title}
                onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                placeholder="Enter section title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sectionContent">Section Content</Label>
              <Textarea
                id="sectionContent"
                value={newSection.content}
                onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
                placeholder="Enter section content"
              />
            </div>
            <Button onClick={addSection} className="w-full">Add Section</Button>
          </CardContent>
        </Card>
        {resumeData.customSections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {section.title}
                <Button variant="ghost" size="icon" onClick={() => removeSection(section.id!)}>
                  <XIcon className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  function WebsitesForm() {
    const [newWebsite, setNewWebsite] = useState<Website>({
      name: '',
      url: ''
    })

    const addWebsite = () => {
      setResumeData(prev => ({
        ...prev,
        websites: [...prev.websites, newWebsite]
      }))
      setNewWebsite({ name: '', url: '' })
    }

    const removeWebsite = (url: string) => {
      setResumeData(prev => ({
        ...prev,
        websites: prev.websites.filter(website => website.url !== url)
      }))
    }

    return (
      <div className="space-y-4">
        <Card className='p-2'>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="websiteName">Website Name</Label>
              <Input
                id="websiteName"
                value={newWebsite.name}
                onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
                placeholder="Enter website name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input
                id="websiteUrl"
                value={newWebsite.url}
                onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                placeholder="Enter website URL"
                type="url"
              />
            </div>
            <Button onClick={addWebsite} className="w-full">Add Website</Button>
          </CardContent>
        </Card>
        {resumeData.websites.map((website, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {website.name}
                <Button variant="ghost" size="icon" onClick={() => removeWebsite(website.url)}>
                  <XIcon className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><a href={website.url} target="_blank" rel="noopener noreferrer">{website.url}</a></p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  function DatePicker({ date, setDate }: { date: Date | null, setDate: (date: Date | null) => void }) {
    const handleDateSelect = (selectedDate: Date | undefined) => {
      // Convert undefined to null to match your `setDate` function's expected type
      setDate(selectedDate || null);
    };
  
    ///test
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date || undefined}  
            onSelect={handleDateSelect} 
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
  

  function Badge({ children, variant, className, ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: string }) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          variant === "secondary" &&
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''
                }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= activeStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 ${index < activeStep ? 'bg-primary' : 'bg-muted'
                    }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 text-center font-medium">
          {steps[activeStep].title}
        </div>
      </div>
      {steps[activeStep].component}

      <CardFooter className="flex justify-between my-3">
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </CardFooter>
    </div>
  )
}
