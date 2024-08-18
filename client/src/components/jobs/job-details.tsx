import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Job } from '@/helper/types';
import { BriefcaseBusiness, LocateFixed, DollarSign, Hand, Binary } from "lucide-react";

interface JobDetailsProps {
  job: Job | null;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  if (!job) {
    return <div className="text-center text-gray-500">Select a job to see the details</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div className="col-span-3 md:col-span-1 flex items-center md:justify-start md:flex-col gap-4">
          <img
            src={job.company.logo}
            alt="Company Logo"
            width={100}
            height={100}
            className="rounded-full"
            style={{ aspectRatio: "100/100", objectFit: "cover" }}
          />
          <h1 className="text-3xl font-bold text-center md:text-left">{job.title}</h1>
        </div>
        <div className="col-span-3 md:col-span-2 space-y-4">
          <div className="space-y-2">
            <p><strong>Closing Date:</strong> {new Date(job.closingDate).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <Badge>Experience Level: {job.experienceLevel}</Badge>
            <Badge>Experience Needed: {job.experience}</Badge>
            <Badge>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              Job Type: {job.type}
            </Badge>
            <Badge>Work Arrangement: {job.workArrangement}</Badge>
            <Badge>Industry: {job.industry}</Badge>
            <Badge>Location: {job.location}</Badge>
            <Badge>Remote Work Option: {job.remoteWorkOption ? "Yes" : "No"}</Badge>
            <Badge>Expatriate Eligibility: {job.expatriateEligibility ? "Yes" : "No"}</Badge>
            <Badge>Application Count: {job.applicationCount}</Badge>
            <Badge>Views: {job.views}</Badge>
            <Badge>Status: {job.status}</Badge>
          </div>
          <div className="flex mt-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary me-5">Apply Now</Button>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary">Save</Button>
          </div>
        </div>
      </div>
      <div className="space-y-2 mt-6">
        <h2 className="text-xl font-bold">Job Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-1">
          {job.keyResponsibilities.split('. ').map((resp, index) => (
            <li key={index}>{resp}</li>
          ))}
        </ul>
      </div>
      <div className="space-y-2 mt-6">
        <h2 className="text-xl font-bold">Skills</h2>
        <p><strong>Hard Skills:</strong> {job.hardSkills.join(', ')}</p>
        <p><strong>Soft Skills:</strong> {job.softSkills.join(', ')}</p>
      </div>
      <div className="space-y-2 mt-6">
        <h2 className="text-xl font-bold">Qualifications</h2>
        <ul className="list-disc pl-6 space-y-1">
          {job.qualifications.map((qualification, index) => (
            <li key={index}>{qualification}</li>
          ))}
        </ul>
      </div>
      <div className="space-y-2 mt-6">
        <h2 className="text-xl font-bold">Goals and Performance Metrics</h2>
        <p>{job.goalsAndPerformanceMetrics}</p>
      </div>
      <div className="space-y-2 mt-6">
        <h2 className="text-xl font-bold">Management Style</h2>
        <p>{job.managementStyle}</p>
      </div>
      <div className="space-y-2 mt-6">
        <h2 className="text-xl font-bold">Career Progression</h2>
        <p>{job.careerProgression}</p>
      </div>
      <div className="space-y-2 mt-6">
        <h2 className="text-xl font-bold">Benefits and Culture</h2>
        <p>{job.benefitsAndCulture}</p>
      </div>
      <div className="space-y-2 mt-6">
        <h2 className="text-xl font-bold">Candidate Selection Criteria</h2>
        <p>{job.candidateSelectionCriteria}</p>
      </div>
      <div className="space-y-2 mt-6">
        <h2 className="text-xl font-bold">Work Conditions</h2>
        <p>{job.workCondition}</p>
      </div>
      <hr className="my-6 border-gray-300" />
      <div className="space-y-2 mt-6">
        <h2 className="text-xl font-bold">Company Details</h2>
        <p className="text-muted-foreground">{job.company.description}</p>
        <p><strong>Website:</strong> <a href={job.company.website} className="text-blue-600">{job.company.website}</a></p>
        <p><strong>Address:</strong> {`${job.company.addressLine1}, ${job.company.addressLine2}, ${job.company.city}, ${job.company.state}, ${job.company.postalCode}, ${job.company.country}`}</p>
        <p><strong>Phone:</strong> {job.company.phoneNumber}</p>
        <p><strong>Email:</strong> <a href={`mailto:${job.company.email}`} className="text-blue-600">{job.company.email}</a></p>
        <p><strong>Founded:</strong> {new Date(job.company.foundedDate).toLocaleDateString()}</p>
        <p><strong>Employees:</strong> {job.company.numberOfEmployees}</p>
        <p><strong>Average Rating:</strong> {job.company.averageRating}</p>
      </div>
    </div>
  );
}

export default JobDetails;
