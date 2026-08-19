'use client';

import React, { useState } from 'react';
import { IExperience } from '../domain/experience.schema';
import GlassCard from '@/shared/components/GlassCard';
import { X, Save, Loader2 } from 'lucide-react';

interface ExperienceFormModalProps {
  initialData?: IExperience | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ExperienceFormModal({ initialData, isOpen, onClose, onSuccess }: ExperienceFormModalProps) {
  const [formData, setFormData] = useState<Partial<IExperience>>(
    initialData || {
      role: '',
      company: '',
      location: '',
      employmentType: 'Full-Time',
      startDate: '',
      endDate: '',
      isCurrent: false,
      summaryPoints: [''],
      techStack: [],
      featured: false,
      orderIndex: 0,
    }
  );
  const [techInput, setTechInput] = useState(initialData?.techStack?.join(', ') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handlePointChange = (idx: number, val: string) => {
    const points = [...(formData.summaryPoints || [])];
    points[idx] = val;
    setFormData({ ...formData, summaryPoints: points });
  };

  const addPoint = () => {
    setFormData({ ...formData, summaryPoints: [...(formData.summaryPoints || []), ''] });
  };

  const removePoint = (idx: number) => {
    const points = (formData.summaryPoints || []).filter((_, i) => i !== idx);
    setFormData({ ...formData, summaryPoints: points });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      ...formData,
      techStack: techInput.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      const isEdit = Boolean(initialData?._id);
      const url = isEdit ? `/api/experience/${initialData!._id}` : '/api/experience';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        onSuccess();
        onClose();
      } else {
        setError(json.error || 'Failed to save experience');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <GlassCard className="w-full max-w-2xl p-6 space-y-6 relative my-8">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-lg font-bold text-white">
            {initialData?._id ? 'Edit Work Experience' : 'Add Work Experience'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Job Role *</label>
              <input
                type="text"
                required
                value={formData.role || ''}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Company Name *</label>
              <input
                type="text"
                required
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Employment Type</label>
              <select
                value={formData.employmentType || 'Full-Time'}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as any })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#070B19] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Start Date *</label>
              <input
                type="text"
                placeholder="e.g. Oct 2025"
                required
                value={formData.startDate || ''}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">End Date</label>
              <input
                type="text"
                placeholder="e.g. June 2026 or Present"
                value={formData.endDate || ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Tech Stack Tags (Comma separated)</label>
            <input
              type="text"
              placeholder="e.g. AI Workflows, KPI Dashboards, Leadership"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          {/* Bullet Points */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-slate-300">Key Achievements & Bullet Points</label>
              <button type="button" onClick={addPoint} className="text-xs text-[#00F0FF] hover:underline">+ Add Bullet Point</button>
            </div>

            {(formData.summaryPoints || []).map((pt, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={pt}
                  onChange={(e) => handlePointChange(i, e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs"
                />
                <button type="button" onClick={() => removePoint(i)} className="text-rose-400 text-xs hover:underline">Remove</button>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-bold shadow-md hover:bg-[#0052CC] transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Record</span>
            </button>
          </div>
        </form>

      </GlassCard>
    </div>
  );
}
