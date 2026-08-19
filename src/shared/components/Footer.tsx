import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Github, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#050814] border-t border-white/10 pt-12 pb-8 text-slate-400 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-[#0066FF]/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Bio Branding */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] flex items-center justify-center text-white font-black text-sm shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                MM
              </div>
              <span className="text-lg font-bold text-white tracking-tight">S. M. Mahmud Bin Murad</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Marketing & Content Strategist, Project Manager, and Business Solutions Consultant specializing in AI operations, BPO leadership, financial market forecasting, and growth strategy.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:smmahmudbinmurad@gmail.com"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About & Skills</Link></li>
              <li><Link href="/experience" className="hover:text-white transition-colors">Work Experience</Link></li>
              <li><Link href="/education" className="hover:text-white transition-colors">Education & ECA</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Case Studies Hub</Link></li>
              <li><Link href="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Form</Link></li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">Direct Reach</h3>
            <div className="space-y-2.5 text-sm">
              <a href="mailto:smmahmudbinmurad@gmail.com" className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors">
                <Mail className="w-4 h-4 text-[#0066FF]" />
                <span>smmahmudbinmurad@gmail.com</span>
              </a>
              <a href="tel:+8801755087633" className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors">
                <Phone className="w-4 h-4 text-[#0066FF]" />
                <span>+880 1755-087633</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-[#0066FF]" />
                <span>Uttara, Dhaka - 1230, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} S. M. Mahmud Bin Murad. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="hover:text-slate-300 transition-colors inline-flex items-center gap-1">
              <span>Admin Portal</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
