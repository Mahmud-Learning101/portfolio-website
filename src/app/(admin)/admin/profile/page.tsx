'use client';

import React, { useEffect, useState } from 'react';
import GlassCard from '@/shared/components/GlassCard';
import FileUploadInput from '@/shared/components/FileUploadInput';
import { IProfileConfig, StatItemSchema } from '@/features/profile/domain/profile.schema';
import { Save, Loader2, CheckCircle2, AlertCircle, Plus, Trash2 } from 'lucide-react';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Partial<IProfileConfig>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/profile');
        const json = await res.json();
        if (json.success) {
          setProfile(json.data);
        }
      } catch (err) {
        setMsg({ type: 'error', text: 'Failed to load profile data' });
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setMsg({ type: 'success', text: 'Profile & Global Settings updated successfully!' });
      } else {
        setMsg({ type: 'error', text: json.error || 'Update failed' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Network error occurred' });
    } finally {
      setSaving(false);
    }
  };

  const handleStatChange = (index: number, field: 'label' | 'value' | 'helper', val: string) => {
    const updatedStats = [...(profile.featuredStats || [])];
    updatedStats[index] = { ...updatedStats[index], [field]: val };
    setProfile({ ...profile, featuredStats: updatedStats });
  };

  const handleAddStat = () => {
    setProfile({
      ...profile,
      featuredStats: [...(profile.featuredStats || []), { label: 'New Metric', value: '+100%', helper: 'Details' }],
    });
  };

  const handleRemoveStat = (index: number) => {
    const updatedStats = (profile.featuredStats || []).filter((_, idx) => idx !== index);
    setProfile({ ...profile, featuredStats: updatedStats });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#00F0FF] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Profile & Global Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage personal bio, client spotlight picture, stats, skills, resume PDF, and contact details across the website.
        </p>
      </div>

      {msg && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
            msg.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}
        >
          {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{msg.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* 1. GENERAL & PERSONAL IDENTITY */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase font-mono text-[#00F0FF]">1. General Info & Branding</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Full Name</label>
              <input
                type="text"
                value={profile.fullName || ''}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Professional Headline</label>
              <input
                type="text"
                value={profile.title || ''}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Short Bio (Hero Subtitle)</label>
            <textarea
              rows={2}
              value={profile.bioShort || ''}
              onChange={(e) => setProfile({ ...profile, bioShort: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Full About Narrative (/about page)</label>
            <textarea
              rows={5}
              value={profile.bioLong || ''}
              onChange={(e) => setProfile({ ...profile, bioLong: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Hero Pills & Badges (One per line)</label>
            <textarea
              rows={3}
              value={Array.isArray(profile.heroBadges) ? profile.heroBadges.join('\n') : ''}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  heroBadges: e.target.value.split('\n').filter((l) => l.trim() !== ''),
                })
              }
              placeholder="AI Strategy & Operations&#10;BPO & Project Leadership&#10;Growth Marketing & SEO"
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div className="pt-2">
            <FileUploadInput
              label="Resume PDF Upload"
              value={profile.resumePdfUrl || ''}
              onChange={(url) => setProfile({ ...profile, resumePdfUrl: url })}
              accept=".pdf"
              placeholder="/assets/SM_Mahmud_Bin_Murad_Resume.pdf"
              helperText="Upload your latest resume PDF for the homepage and navbar download buttons."
            />
          </div>
        </GlassCard>

        {/* 2. HOMEPAGE CLIENT SPOTLIGHT SECTION */}
        <GlassCard className="p-6 space-y-4 border border-[#0066FF]/30 bg-[#0066FF]/[0.02]">
          <h3 className="text-sm font-bold text-white uppercase font-mono text-[#00F0FF]">
            2. Homepage Client Spotlight Section
          </h3>

          {/* Client Picture Upload */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <FileUploadInput
              label="Client Picture Upload (Right Half of Homepage)"
              value={profile.avatarUrl || ''}
              onChange={(url) => setProfile({ ...profile, avatarUrl: url })}
              accept="image/*"
              placeholder="/assets/client-portrait.jpg"
              helperText="Upload a professional photo of yourself. Will render on the right half of the homepage spotlight section."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Spotlight Eyebrow / Subtitle</label>
              <input
                type="text"
                value={profile.spotlightSubtitle || ''}
                onChange={(e) => setProfile({ ...profile, spotlightSubtitle: e.target.value })}
                placeholder="Executive Spotlight & Strategic Vision"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Spotlight Title</label>
              <input
                type="text"
                value={profile.spotlightTitle || ''}
                onChange={(e) => setProfile({ ...profile, spotlightTitle: e.target.value })}
                placeholder="Driving Growth, AI Workflows & Operational Excellence"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Spotlight Bio Narrative (Left Half Text)</label>
            <textarea
              rows={4}
              value={profile.spotlightBio || ''}
              onChange={(e) => setProfile({ ...profile, spotlightBio: e.target.value })}
              placeholder="A few lines describing background, vision, and operational methodology..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Spotlight Highlights (One per line)</label>
            <textarea
              rows={4}
              value={Array.isArray(profile.spotlightHighlights) ? profile.spotlightHighlights.join('\n') : ''}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  spotlightHighlights: e.target.value.split('\n').filter((l) => l.trim() !== ''),
                })
              }
              placeholder="10+ Years Strategic & Operational Leadership&#10;AI & Automation Workflow Integration&#10;Data-Driven Marketing Strategy"
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
            />
          </div>
        </GlassCard>

        {/* 3. FEATURED STATS METRICS */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase font-mono text-[#00F0FF]">3. Homepage Hero Metric Cards</h3>
            <button
              type="button"
              onClick={handleAddStat}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0066FF]/20 text-[#00F0FF] text-xs font-semibold hover:bg-[#0066FF]/30 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Metric</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(profile.featuredStats || []).map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 relative group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Stat Card #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStat(idx)}
                    className="p-1 text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                    placeholder="+40%"
                    className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs font-bold"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                    placeholder="Candidate Throughput"
                    className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs"
                  />
                </div>
                <input
                  type="text"
                  value={stat.helper || ''}
                  onChange={(e) => handleStatChange(idx, 'helper', e.target.value)}
                  placeholder="Global recruitment operations at Iozera AI"
                  className="w-full px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 text-xs"
                />
              </div>
            ))}
          </div>
        </GlassCard>

        {/* 4. SKILLS & COMPETENCIES MATRIX */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase font-mono text-[#00F0FF]">4. Skills & Competencies Matrix</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Strategic & Soft Skills (One per line)</label>
              <textarea
                rows={6}
                value={Array.isArray(profile.softSkills) ? profile.softSkills.join('\n') : ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    softSkills: e.target.value.split('\n').filter((l) => l.trim() !== ''),
                  })
                }
                placeholder="Strategic Marketing & Campaign Management&#10;Brand Messaging & Storytelling"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Technical & Tool Skills (One per line)</label>
              <textarea
                rows={6}
                value={Array.isArray(profile.techSkills) ? profile.techSkills.join('\n') : ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    techSkills: e.target.value.split('\n').filter((l) => l.trim() !== ''),
                  })
                }
                placeholder="Digital Analytics & Consumer Tools&#10;SEO Optimization & Keyword Targeting"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Certifications & Honors (One per line)</label>
            <textarea
              rows={4}
              value={Array.isArray(profile.certificationsAndAwards) ? profile.certificationsAndAwards.join('\n') : ''}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  certificationsAndAwards: e.target.value.split('\n').filter((l) => l.trim() !== ''),
                })
              }
              placeholder="Certified Digital Marketer – Google, HubSpot&#10;Prompt Engineering for AI Strategy"
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
            />
          </div>
        </GlassCard>

        {/* 5. CONTACT DETAILS & SOCIAL CHANNELS */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase font-mono text-[#00F0FF]">5. Contact & Social Channels</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Location</label>
              <input
                type="text"
                value={profile.location || ''}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Primary Email</label>
              <input
                type="text"
                value={profile.emails?.[0] || ''}
                onChange={(e) => setProfile({ ...profile, emails: [e.target.value, ...(profile.emails?.slice(1) || [])] })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">LinkedIn URL</label>
              <input
                type="text"
                value={profile.linkedin || ''}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">GitHub URL</label>
              <input
                type="text"
                value={profile.github || ''}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Twitter/X URL</label>
              <input
                type="text"
                value={profile.twitter || ''}
                onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>
        </GlassCard>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white font-bold text-sm shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:scale-105 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            <span>Save All Profile & Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
