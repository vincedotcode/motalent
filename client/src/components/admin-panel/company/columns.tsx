"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge"; 
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export type Company = {
  _id: string;
  name: string;
  description: string;
  website: string;
  addressLine1: string;
  addressLine2?: string;
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
  createdAt: string;
  affiliatedRecruiters: string[]; // Array of recruiter IDs
};

export const companyColumns: ColumnDef<Company>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.logo} alt={row.original.name} />
        <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => (
      <a href={row.original.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        {row.original.website}
      </a>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <a href={`mailto:${row.original.email}`} className="text-blue-500 underline">
        {row.original.email}
      </a>
    ),
  },
  {
    accessorKey: "industry",
    header: "Industry",
  },
  {
    accessorKey: "foundedDate",
    header: "Founded",
    cell: ({ row }) => new Date(row.original.foundedDate).toLocaleDateString(),
  },
  {
    accessorKey: "numberOfEmployees",
    header: "Employees",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.numberOfEmployees}
      </Badge>
    ),
  },
  {
    accessorKey: "affiliatedRecruiters",
    header: "Recruiters",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.affiliatedRecruiters.length}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];
