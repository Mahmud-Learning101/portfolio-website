'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdminCredentialsSchema, AdminCredentialsInput } from '@/features/auth/domain/auth.schema';
import GlassCard from '@/shared/components/GlassCard';
import { Lock, Mail, KeyRound, Loader2, AlertCircle, Sparkles, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AdminCredentialsSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AdminCredentialsInput) => {
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setErrorMsg(json.error || 'Authentication failed. Check credentials.');
      }
    } catch (err) {
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B19] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#0066FF]/20 to-[#00F0FF]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navigation Back Button */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Website</span>
        </Link>
      </div>

      <GlassCard className="w-full max-w-md p-8 space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] text-white flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,102,255,0.5)]">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin CMS Access</h1>
          <p className="text-xs text-slate-400">Headless content portal for S. M. Mahmud Bin Murad</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit((d) => onSubmit(d as AdminCredentialsInput))} className="space-y-4">
          
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Admin Email</span>
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              {...register('email')}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF] transition-colors"
            />
            {errors.email && <p className="text-xs text-rose-400">{errors.email.message as string}</p>}
          </div>

          {/* Password with Hold-to-Reveal */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>Secret Password</span>
              </label>

              {/* Hold-to-Reveal Button */}
              <button
                type="button"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchStart={() => setShowPassword(true)}
                onTouchEnd={() => setShowPassword(false)}
                className="text-[11px] font-mono text-slate-400 hover:text-[#00F0FF] flex items-center gap-1 cursor-pointer select-none transition-colors"
                title="Hold click to reveal password"
              >
                {showPassword ? <EyeOff className="w-3 h-3 text-[#00F0FF]" /> : <Eye className="w-3 h-3" />}
                <span>{showPassword ? 'Revealed' : 'Hold to View'}</span>
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                {...register('password')}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF] transition-colors pr-10"
              />
              <button
                type="button"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchStart={() => setShowPassword(true)}
                onTouchEnd={() => setShowPassword(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00F0FF] p-1 select-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-[#00F0FF]" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-rose-400">{errors.password.message as string}</p>}
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-bold text-sm shadow-[0_0_25px_rgba(0,102,255,0.4)] transition-all hover:scale-[1.01] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Log In To CMS</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/10 text-[11px] text-slate-500">
          <span>Secured with HttpOnly JWT & bcrypt password hashing</span>
        </div>

      </GlassCard>
    </div>
  );
}
