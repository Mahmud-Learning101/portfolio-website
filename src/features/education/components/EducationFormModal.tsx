'use client';

import React, { useState } from 'react';
import { IEducation } from '../domain/education.schema';
import GlassCard from '@/shared/components/GlassCard';
import { X, Save, Loader2 } from 'lucide-react';

interface EducationFormModalProps {
  initialData?: IEducation | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EducationFormModal({ initialData, isOpen, onClose, onSuccess }: EducationFormModalProps) {
  const [formData, setFormData] = useState<Partial<IEducation>>(
    initialData || {
      degree: '',
      institution: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gradeOrGpa: '',
      achievements: [''],
      orderIndex: 0,
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const isEdit = Boolean(initialData?._id);
      const url = isEdit ? `/api/education/${initialData!._id}` : '/api/education';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        onSuccess();
        onClose();
      } else {
        setError(json.error || 'Failed to save education record');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <GlassCard className="w-full max-w-xl p-6 space-y-6 relative my-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-lg font-bold text-white">
            {initialData?._id ? 'Edit Education Entry' : 'Add Education Entry'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Degree / Qualification *</label>
            <input
              type="text"
              required
              value={formData.degree || ''}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Institution Name *</label>
            <input
              type="text"
              required
              value={formData.institution || ''}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Start Date *</label>
              <input
                type="text"
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
                value={formData.endDate || ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Grade / GPA</label>
              <input
                type="text"
                placeholder="e.g. GPA 5.00"
                value={formData.gradeOrGpa || ''}
                onChange={(e) => setFormData({ ...formData, gradeOrGpa: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-bold shadow-md hover:bg-[#0052CC] transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Entry</span>
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
