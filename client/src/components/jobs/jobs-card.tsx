import React from 'react';
import { Card } from "@/components/ui/card";
import { BriefcaseBusiness, LocateFixed, DollarSign, Hand, Binary } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Job } from '@/helper/types';

interface JobCardProps {
  job: Job;
  onSelect: (job: Job) => void;
  isSelected: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSelect, isSelected }) => {
  const handleSelect = () => {
    onSelect(job);
  };

  return (
    <Card
      onClick={handleSelect}
      className={`w-full max-w-3xl flex flex-col gap-6 p-4 my-3 rounded-lg shadow-md cursor-pointer transition-colors ${
        isSelected ? 'border-2 border-primary dark:bg-slate-900 bg-slate-300' : ''
      } hover:bg-gray-100 dark:hover:bg-slate-800`}
    >
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <img
              src={job.company.logo}
              alt={`${job.company.name} Logo`}
              className="rounded-full"
              style={{ width: "80%", height: "80%", objectFit: "cover" }}
            />
          </div>
          <div className="md:ml-4">
            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">{job.title}</h4>
            <div className="text-lg text-gray-700 dark:text-gray-300">{job.company.name}</div>
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-2 md:mt-0">
          <LocateFixed className="w-4 h-4 inline-block mr-1" />
          {job.location}
        </div>
      </div>
      <div className="flex flex-wrap md:flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center">
          <BriefcaseBusiness className="w-4 h-4 inline-block mr-1" />
          {job.type}
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 inline-block mr-1" />
          {job.offeredSalary}
        </div>
        <div className="flex items-center">
          <Hand className="w-4 h-4 inline-block mr-1" />
          {job.experienceLevel}
        </div>
        <div className="flex items-center">
          <Binary className="w-4 h-4 inline-block mr-1" />
          {job.workArrangement}
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <Badge variant="secondary">{job.industry}</Badge>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
