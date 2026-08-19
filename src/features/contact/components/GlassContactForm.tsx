'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactMessageSchema, ContactMessageInput } from '../domain/contact.schema';
import GlassCard from '@/shared/components/GlassCard';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function GlassContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ContactMessageSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      honeypot: '',
    },
  });

  const onSubmit = async (data: ContactMessageInput) => {
    setStatus('loading');
    setServerMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
        setServerMsg(json.error || 'Failed to submit contact request.');
      }
    } catch (err: unknown) {
      setStatus('error');
      setServerMsg('A network error occurred. Please try again.');
    }
  };

  return (
    <GlassCard className="p-8 sm:p-10 max-w-2xl mx-auto space-y-6">
      {status === 'success' ? (
        <div className="text-center py-10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Thank you for reaching out. Mahmud will review your message and reply via email shortly.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit((d) => onSubmit(d as ContactMessageInput))} className="space-y-5">
          {/* Honeypot field - hidden from humans */}
          <input
            type="text"
            {...register('honeypot')}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#00F0FF]">Your Full Name *</label>
              <input
                type="text"
                placeholder="John Doe"
                {...register('name')}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF] transition-colors"
              />
              {errors.name && <p className="text-xs text-rose-400">{errors.name.message as string}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#00F0FF]">Email Address *</label>
              <input
                type="email"
                placeholder="john@example.com"
                {...register('email')}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF] transition-colors"
              />
              {errors.email && <p className="text-xs text-rose-400">{errors.email.message as string}</p>}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#00F0FF]">Subject / Project Scope *</label>
            <input
              type="text"
              placeholder="e.g. AI Operations Consulting & Growth Strategy"
              {...register('subject')}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF] transition-colors"
            />
            {errors.subject && <p className="text-xs text-rose-400">{errors.subject.message as string}</p>}
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#00F0FF]">Message Details *</label>
            <textarea
              rows={5}
              placeholder="Describe your goals, team size, or operational requirements..."
              {...register('message')}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF] transition-colors"
            />
            {errors.message && <p className="text-xs text-rose-400">{errors.message.message as string}</p>}
          </div>

          {status === 'error' && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-bold text-sm shadow-[0_0_25px_rgba(0,102,255,0.4)] transition-all hover:scale-[1.01] disabled:opacity-50"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Request...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Direct Inquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </GlassCard>
  );
}
