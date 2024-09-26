
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
  applicants: Applicant[];  // Update to use a new interface for applicants
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Applicant {
  applicant: User;          // Reference to the user who applied
  applicationId: string;    // ID of the application
  appliedAt: string;        // Date the user applied
  applicantName: string;    // Name of the applicant
  _id: string;              // ID of the applicantß
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



// types.ts

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
  qualifications: string[];
  goalsAndPerformanceMetrics?: string;
  managementStyle?: string;
  careerProgression?: string;
  benefitsAndCulture?: string;
  candidateSelectionCriteria?: string;
  workCondition?: string;
  workArrangement: WorkArrangement;
  industry: Industry;
};

export interface Interview {
  _id: string;                  // MongoDB document ID
  applicantId: string;          // ID of the applicant
  applicationName: string;      // Name of the job/application
  interviewDate: string;        // Date of the interview (in string format, can be a date if needed)
  interviewTime: string;        // Time of the interview
  interviewLocation: string;    // Location of the interview (could be a URL or a physical address)
  isInterviewOnline: boolean;   // Whether the interview is online or not
  status: 'Scheduled' | 'Completed' | 'Cancelled';  // Status of the interview
  interviewId: string;          // Unique Interview ID
  createdAt: string;            // Timestamp when the interview was created
  updatedAt: string;            // Timestamp when the interview was last updated
  __v?: number;                 // Mongoose version key, optional
}
export interface InterviewEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  applicantId:  User; // User is your user interface
  applicationName: string;
  interviewLocation: string;
  isInterviewOnline: boolean;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
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
  
 // Assessment type
export interface Assessment {
  testName: string;
  score: number;
  takenAt: string;
  comments?: string;
}

// Status history with embedded assessment
export interface StatusHistory {
  status: string;
  changedAt: string;
  comments?: string;
  changedBy: string;
  assessment?: Assessment; // Assessment is embedded in the status history
}



// Notification type
export interface Notification {
  message: string;
  sentAt: string;
  method: 'Email' | 'In-App';
  recipient: string;
  read: boolean;
}

// Document type
export interface Document {
  name: string;
  url: string;
  uploadedAt: string;
}

// Job application type
export interface JobApplication {
  _id: string;
  job: Job;
  applicant: User[];
  resume: Resume;
  coverLetter: string;
  currentStatus: string;
  scoring: number;
  additionalDocuments: Document[];
  statusHistory: StatusHistory[]; // Status history with embedded assessments
  interviews: Interview[];
  notifications: Notification[];
  submittedAt: string;
  updatedAt: string;
  createdAt: string;
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
  
// CreateMatchData: used to send data to create a match
export interface CreateMatchData {
  userId: string;
  resumeId: string;
}

// Match type: represents the result of a single match
export interface Match {
  _id: string;
  userId: string;
  resumeId: Resume;
  jobId: Job;
  matchScore: number;
  explanation: string;
  createdAt: string;
  __v: number;
}


// MatchDetail type: detailed information about the match
export interface MatchDetail {
  userId: string;
  resumeId: string;
  jobId: Job;
  matchScore: number;
  explanation: string;
  _id: string;
  createdAt: string;
}

// MatchedJob: structure for job match details
export interface MatchedJob {
  match: MatchDetail;
  explanation: string;
  job: Job;
}

// MatchResponse: represents the response for a createMatch request
export interface MatchResponse {
  message: string;
  matchedJobs: MatchedJob[]; // List of matched jobs (can be empty if no matches)
  explanation: string; // Explanation for no matches
}