import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import JobDetails from '@/components/jobs/job-details';
import { Job } from '@/helper/types';

interface JobDetailsDialogProps {
  job: Job | null;
}

const JobDetailsDialog: React.FC<JobDetailsDialogProps> = ({ job }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Job Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-full h-screen overflow-y-auto">
       
        <JobDetails job={job} />
        <DialogFooter>
          <Button variant="ghost">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
