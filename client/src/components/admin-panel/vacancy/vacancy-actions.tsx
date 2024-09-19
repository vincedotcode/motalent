'use client';

import { useState } from 'react';
import { MoreVertical, Eye, XCircle, CheckCircle, Hourglass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { updateJobStatus } from '@/services/job';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader';
import AlertModal from '@/components/shared/alert';

interface JobActionsDropdownProps {
  jobId: string;
  currentStatus: string;
  refreshJobs: () => void; // Accept the refresh function as a prop
}

export const JobActionsDropdown: React.FC<JobActionsDropdownProps> = ({ jobId, currentStatus, refreshJobs }) => {
  const [loading, setLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertProps, setAlertProps] = useState<{
    title: string;
    message: string;
    type: 'success' | 'error';
  }>({
    title: '',
    message: '',
    type: 'success',
  });

  const router = useRouter();

  const handleStatusChange = async (status: string) => {
    setLoading(true);
    try {
      await updateJobStatus(jobId, status);
      setAlertProps({
        title: 'Success',
        message: `Job status updated to ${status}`,
        type: 'success',
      });
      refreshJobs(); // Refresh the job list after a successful update
    } catch (error) {
      setAlertProps({
        title: 'Error',
        message: `Failed to update job status to ${status}`,
        type: 'error',
      });
      console.error('Error updating job status:', error);
    } finally {
      setLoading(false);
      setIsAlertOpen(true); // Show alert after the update
    }
  };

  const handleViewJob = async () => {
    try {
      router.push(`/jobs/${jobId}`);
    } catch (error) {
      console.error('Error viewing job:', error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem onClick={handleViewJob}>
            <Eye className="mr-2 h-4 w-4" />
            View Vacancy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange('Active')} disabled={currentStatus === 'Active'}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Set Active
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange('Inactive')} disabled={currentStatus === 'Inactive'}>
            <XCircle className="mr-2 h-4 w-4" />
            Set Inactive
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange('Ending Soon')} disabled={currentStatus === 'Ending Soon'}>
            <Hourglass className="mr-2 h-4 w-4" />
            Set Ending Soon
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange('Closed')} disabled={currentStatus === 'Closed'}>
            <XCircle className="mr-2 h-4 w-4" />
            Set Closed
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Loader */}
      {loading && <Loader />}

      {/* Alert Modal */}
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title={alertProps.title}
        message={alertProps.message}
        type={alertProps.type}
      />
    </>
  );
};