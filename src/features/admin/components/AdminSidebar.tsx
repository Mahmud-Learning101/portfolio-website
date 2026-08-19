'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  GraduationCap, 
  FolderKanban, 
  MessageSquare, 
  LogOut,
  ExternalLink,
  ShieldCheck,
  Quote
} from 'lucide-react';

const MENU_ITEMS = [
  { label: 'Dashboard Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Profile & Settings', href: '/admin/profile', icon: User },
  { label: 'Work Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Education & Honors', href: '/admin/education', icon: GraduationCap },
  { label: 'Projects & Case Studies', href: '/admin/projects', icon: FolderKanban },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Quote },
  { label: 'Contact Messages', href: '/admin/messages', icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-64 bg-[#050814] border-r border-white/10 flex flex-col justify-between p-4 min-h-screen">
      
      <div className="space-y-6">
        {/* Branding Header */}
        <div className="flex items-center gap-3 px-2 py-3 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] text-white flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(0,102,255,0.4)]">
            CMS
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-tight">Admin Portal</div>
            <div className="text-[10px] font-mono text-[#00F0FF]">Mahmud Murad CMS</div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#0066FF] text-white shadow-[0_0_20px_rgba(0,102,255,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-[#00F0FF] hover:bg-white/5 transition-colors"
        >
          <span>View Public Site ↗</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
}
