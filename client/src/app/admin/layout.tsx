"use client";

import { ReactNode } from 'react';
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { useAdminCheck } from "@/hooks/useAuth";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const user = useAdminCheck();

  if (!user || user.role !== 'admin') {
    return null; 
  }

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
