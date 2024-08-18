

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
    applicants: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
