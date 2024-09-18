// jobColumns.ts
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Job } from '@/helper/types';

export const jobColumns: ColumnDef<Job>[] = [
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
    cell: ({ row }) => <Badge variant="default">{row.original.status}</Badge>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Posted On',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];
