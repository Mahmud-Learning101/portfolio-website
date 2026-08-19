import React from 'react';
import GlassContactForm from '@/features/contact/components/GlassContactForm';
import { Mail, Phone, MapPin, Linkedin, Clock } from 'lucide-react';
import GlassCard from '@/shared/components/GlassCard';

export const metadata = {
  title: 'Contact S. M. Mahmud Bin Murad | Executive Consultation',
  description: 'Get in touch with S. M. Mahmud Bin Murad for AI operations, marketing strategy, financial modeling, or BPO project management.',
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Let's Shape The <span className="text-gradient-cyan">Next Chapter</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Send a direct message or connect via official business channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Direct Contact Cards */}
        <div className="lg:col-span-4 space-y-4">
          <GlassCard className="p-6 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 text-[#00F0FF] flex items-center justify-center border border-[#0066FF]/40 mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono uppercase text-slate-400">Direct Email</div>
            <a href="mailto:smmahmudbinmurad@gmail.com" className="text-sm font-bold text-white hover:text-[#00F0FF] transition-colors block">
              smmahmudbinmurad@gmail.com
            </a>
            <a href="mailto:anim.mahmud@gmail.com" className="text-xs text-slate-300 hover:text-[#00F0FF] transition-colors block">
              anim.mahmud@gmail.com
            </a>
          </GlassCard>

          <GlassCard className="p-6 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono uppercase text-slate-400">Phone Contact</div>
            <a href="tel:+8801755087633" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors block">
              +880 1755-087633
            </a>
            <a href="tel:+8801632611855" className="text-xs text-slate-300 hover:text-emerald-400 transition-colors block">
              +880 1632-611855
            </a>
          </GlassCard>

          <GlassCard className="p-6 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40 mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono uppercase text-slate-400">Location</div>
            <div className="text-sm font-bold text-white">Uttara Model Town, Dhaka</div>
            <div className="text-xs text-slate-400">Sector 11, Dhaka - 1230, Bangladesh</div>
          </GlassCard>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-8">
          <GlassContactForm />
        </div>

      </div>
    </div>
  );
}
