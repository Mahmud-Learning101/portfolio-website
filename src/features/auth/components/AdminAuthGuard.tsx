'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsAuthorized(true);
      return;
    }

    const sessionActive = sessionStorage.getItem('admin_session_active');

    if (!sessionActive) {
      fetch('/api/auth/logout', { method: 'POST' }).finally(() => {
        setIsAuthorized(false);
        router.push('/admin/login');
        router.refresh();
      });
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (isAuthorized === null && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-[#070B19] flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-2 text-sm font-mono">
          <Loader2 className="w-5 h-5 animate-spin text-[#00F0FF]" />
          <span>Verifying admin session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthorized && pathname !== '/admin/login') {
    return null;
  }

  return <>{children}</>;
}
