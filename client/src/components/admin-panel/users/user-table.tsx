"use client";

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/admin-panel/users/data-table';
import { userColumns } from '@/components/admin-panel/users/columns';
import { getAllUsers } from '@/services/user';
import {User} from '@/services/user';
import Loader from '@/components/loader';
export function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <> <Loader/> </>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-4">
      <DataTable columns={userColumns} data={users} />
    </div>
  );
}
