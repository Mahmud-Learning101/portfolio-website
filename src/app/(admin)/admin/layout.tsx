'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/features/admin/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#070B19] text-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#070B19] flex text-slate-100">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
