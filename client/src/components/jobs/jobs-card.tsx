import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, LocateFixed, DollarSign, Hand, Binary } from "lucide-react";

interface Company {
  _id: string;
  name: string;
  logo: string;
}

interface Job {
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
  goalsAndPerformanceMetrics: string;
  managementStyle: string;
  careerProgression: string;
  benefitsAndCulture: string;
  candidateSelectionCriteria: string;
  workCondition: string;
  workArrangement: 'On-site' | 'Remote' | 'Hybrid';
  industry: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card className="w-full max-w-3xl flex flex-col md:flex-row gap-6 p-6 my-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex-shrink-0 w-full md:w-24 h-24 bg-primary rounded-full flex items-center justify-center">
        <img
          src={job.company.logo}
          alt={`${job.company.name} Logo`}
          width={40}
          height={40}
          className="text-primary-foreground"
          style={{ aspectRatio: "40/40", objectFit: "cover" }}
        />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{job.title}</h3>
          <div className="text-sm text-muted-foreground">
            <LocateFixed className="w-4 h-4 inline-block mr-1" />
            {job.location}
          </div>
        </div>
        <div className="text-lg text-gray-700 dark:text-gray-300">{job.company.name}</div>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-muted-foreground">
          <div>
            <BriefcaseBusiness className="w-4 h-4 inline-block mr-1" />
            {job.type}
          </div>
          <div>
            <DollarSign className="w-4 h-4 inline-block mr-1" />
            {job.offeredSalary}
          </div>
          <div>
            <Hand className="w-4 h-4 inline-block mr-1" />
            {job.experienceLevel}
          </div>
          <div>
            <Binary className="w-4 h-4 inline-block mr-1" />
            {job.workArrangement}
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">Key Responsibilities:</h4>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            {job.keyResponsibilities.split('. ').map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <Button className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary">
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
