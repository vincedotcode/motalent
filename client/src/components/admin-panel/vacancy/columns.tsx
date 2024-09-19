'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Job } from '@/helper/types';
import { JobActionsDropdown } from '@/components/admin-panel/vacancy/vacancy-actions'; // Import the JobActionsDropdown component

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Active':
      return 'default'; // Primary color
    case 'Ending Soon':
      return 'destructive'; // Red color
    case 'Closed':
      return 'outline'; // Gray color
    case 'Inactive':
      return 'secondary'; // Secondary color
    default:
      return 'outline'; // Fallback color
  }
};

// Modify jobColumns to accept refreshVacancies function as argument
export const jobColumns = (refreshVacancies: () => void): ColumnDef<Job>[] => [
  {
    accessorKey: 'title',
    header: 'Job Title',
    cell: ({ row }) => row.original.title,
  },
  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => (
      <div className="flex items-center">
        <Avatar>
          <AvatarImage
            src={row.original.company.logo}
            alt={row.original.company.name}
          />
          <AvatarFallback>
            {row.original.company.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="ml-2">{row.original.company.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'type',
    header: 'Job Type',
  },
  {
    accessorKey: 'experienceLevel',
    header: 'Experience Level',
  },
  {
    accessorKey: 'workArrangement',
    header: 'Work Arrangement',
  },
  {
    accessorKey: 'closingDate',
    header: 'Closing Date',
    cell: ({ row }) =>
      new Date(row.original.closingDate).toLocaleDateString(),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={getStatusVariant(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Posted On',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <JobActionsDropdown
        jobId={row.original._id}
        currentStatus={row.original.status}
        refreshJobs={refreshVacancies} 
      />
    ),
  },
];