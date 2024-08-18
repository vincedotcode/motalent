"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CountWidget from "@/components/admin-panel/dashboard/count-widget";
import { getAllUsers } from "@/services/user";
import { getAllCompanies } from "@/services/company";
import { UserPlus, BriefcaseBusiness } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/loader";

export default function DashboardPage() {
  const [userCount, setUserCount] = useState<number>(0);
  const [companyCount, setCompanyCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllUsers();
        const companies = await getAllCompanies();

        setUserCount(users.length);
        setCompanyCount(companies.length);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <> <Loader/> </>;
  if (error) return <p>Error tet: {error}</p>;

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>


      <CardContent className="p-3">
        <CardHeader>
          <CardTitle>Widgets</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CountWidget
            amount={userCount}
            percentage="Users"
            icon={<UserPlus className="h-6 w-6 text-primary-foreground" />}
          />
          <CountWidget
            amount={companyCount}
            percentage="Companies"
            icon={<BriefcaseBusiness className="h-6 w-6 text-primary-foreground" />}
          />
        </div>
      </CardContent>


    </ContentLayout>
  );
}

