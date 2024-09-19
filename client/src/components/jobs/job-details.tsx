/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from '@/helper/types';
import { BriefcaseBusiness } from "lucide-react";
import JobApplication from '@/components/jobs/job-application';
import { getUserData } from '@/hooks/useAuth';
import AlertModal from '@/components/shared/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import { getResumesByUserId, Resume } from '@/services/resume';

interface JobDetailsProps {
  job: Job | null;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = getUserData();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);

  const [resumeAlertOpen, setResumeAlertOpen] = useState(false); // Resume alert state
  const [alertProps, setAlertProps] = useState<{
    title: string;
    message: string;
    type: 'success' | 'error';
  }>({
    title: '',
    message: '',
    type: 'success',
  });


  const fetchResumes = async () => {
    if (user) {
      try {
        const fetchedResumes = await getResumesByUserId(user._id);
        setResumes(fetchedResumes);
      
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  useEffect(() => {
    if (user && job) {
      const userHasApplied = job.applicants.some(applicant => applicant._id === user._id);
      setHasApplied(userHasApplied);
    }
  }, [user, job]);
  const handleApplyClick = () => {
    if (!user) {
      setAlertProps({
        title: 'Not Logged In',
        message: 'You must be logged in to perform this action.',
        type: 'error',
      });
      setIsAlertOpen(true);
    } else if (resumes.length === 0) {
      setResumeAlertOpen(true);
    }
    else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleResumeAlertClose = () => {
    setResumeAlertOpen(false);
  };

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
            <Button
              className={`${
                hasApplied
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary"
              } me-5`}
              onClick={handleApplyClick}
              disabled={hasApplied}
            >
              {hasApplied ? "Application Submitted" : "Apply Now"}
            </Button>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary">
              Save
            </Button>
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
      <JobApplication isOpen={isModalOpen} onClose={handleCloseModal} jobId={job._id} jobName={job.title} />
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title={alertProps.title}
        message={alertProps.message}
        type={alertProps.type}
      />

       {/* Dialog for no resume */}
       <Dialog open={resumeAlertOpen} onOpenChange={handleResumeAlertClose}>
          <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">No Resume Found</DialogTitle>
            </DialogHeader>
            <div className="py-4">
            <p>You need to have a resume in order to apply for this job. A resume helps us understand your skills and experience to match you with job opportunities.</p>
              <Button onClick={() => router.push('/profile/resume')} className="mt-4 bg-primary text-primary-foreground">
                Create Resume
              </Button>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  );
};

export default JobDetails;
