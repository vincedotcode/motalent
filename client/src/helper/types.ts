
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  country: string;
  isVerified: boolean;
  role: 'admin' | 'recruiter' | 'tenant' | 'user';
  openForWork: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Company {
    _id: string;
    name: string;
    description: string;
    website: string;
    addressLine1: string;
    addressLine2: string;
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
    recruiter: string;
    affiliatedRecruiters: string[];
    ratings: any[];
    averageRating: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}

export interface Job {
    _id: string;
    title: string;
    company: Company;
    category: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary' | 'Internship';
    closingDate: string;
    offeredSalary: string;
    experienceLevel: 'Junior' | 'Middle' | 'Senior';
    experience: string;
    remoteWorkOption: boolean;
    expatriateEligibility: boolean;
    keyResponsibilities: string;
    hardSkills: string[];
    softSkills: string[];
    qualifications: string[];
    goalsAndPerformanceMetrics: string;
    managementStyle: string;
    careerProgression: string;
    benefitsAndCulture: string;
    candidateSelectionCriteria: string;
    workCondition: string;
    workArrangement: 'On-site' | 'Remote' | 'Hybrid';
    industry: string;
    views: number;
    applicationCount: number;
    status: 'Active' | 'Ending Soon' | 'Closed';
    applicants: User[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

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



export type CreateJobData = {
  title: string;
  company: string;
  category: string;
  location: string;
  type: JobType;
  closingDate: string;
  offeredSalary: string;
  experienceLevel: ExperienceLevel;
  experience: string;
  remoteWorkOption: boolean;
  expatriateEligibility: boolean;
  keyResponsibilities: string;
  hardSkills: string[];
  softSkills: string[];
  goalsAndPerformanceMetrics: string;
  managementStyle: string;
  careerProgression: string;
  benefitsAndCulture: string;
  candidateSelectionCriteria: string;
  qualifications: string[];
  workCondition: string;
  workArrangement: WorkArrangement;
  industry: Industry;
};

export interface JobApplication {
    _id: string;
    job: Job;
    applicant: User;
    resume: Resume;
    coverLetter: string;
    currentStatus: string;
    scoring: number;
    additionalDocuments: Document[];
    statusHistory: StatusHistory[];
    assessments: Assessment[];
    interviews: Interview[];
    notifications: Notification[];
    submittedAt: string;
    updatedAt: string;
    createdAt: string;
    __v: number;
  }
  

  export interface Resume {
    personalInfo: PersonalInfo;
    _id: string;
    userId: string;
    resumeName: string;
    template: string;
    education: Education[];
    experience: Experience[];
    skills: string[];
    languages: string[];
    hobbies: string[];
    customSections: CustomSection[];
    websites: Website[];
    completionPercentage: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface PersonalInfo {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    country: string;
  }
  
  export interface Education {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    grade: string;
    _id: string;
  }
  
  export interface Experience {
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
    _id: string;
  }
  
  export interface CustomSection {
    title: string;
    content: string;
    _id: string;
  }
  
  export interface Website {
    name: string;
    url: string;
    _id: string;
  }
  
  export interface Document {
    name: string;
    url: string;
    uploadedAt: string;
  }
  
  export interface StatusHistory {
    status: string;
    changedAt: string;
    comments?: string;
    changedBy: string;
  }
  
  export interface Assessment {
    testName: string;
    score: number;
    takenAt: string;
    comments?: string;
  }
  
  export interface Interview {
    interviewDate: string;
    interviewTime: string;
    interviewLocation?: string;
    interviewLink?: string;
    interviewers: string[];
    feedback?: string;
    interviewResult: string;
  }
  
  export interface Notification {
    message: string;
    sentAt: string;
    method: string;
    recipient: string;
    read: boolean;
  }
  

  export interface CreateCompany {
    name: string;
    description?: string;
    website?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    email: string;
    logo?: string;
    bannerImage?: string;
    foundedDate?: string;
    numberOfEmployees?: number;
    industry: string;
  }
  