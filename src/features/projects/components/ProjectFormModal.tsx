'use client';

import React, { useEffect, useState } from 'react';
import GlassCard from '@/shared/components/GlassCard';
import FileUploadInput from '@/shared/components/FileUploadInput';
import { IProject } from '../domain/project.schema';
import { X, Save, Loader2, Plus, Trash2 } from 'lucide-react';

interface ProjectFormModalProps {
  isOpen: boolean;
  initialData: IProject | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProjectFormModal({
  isOpen,
  initialData,
  onClose,
  onSuccess,
}: ProjectFormModalProps) {
  const [formData, setFormData] = useState<Partial<IProject>>({
    title: '',
    slug: '',
    category: 'Strategy & Operations',
    tagline: '',
    summary: '',
    challenge: '',
    solution: '',
    outcome: '',
    coverImage: '',
    tags: [],
    metrics: [{ label: 'Metric', value: '100%' }],
    isFeatured: true,
    orderIndex: 0,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        slug: '',
        category: 'Strategy & Operations',
        tagline: '',
        summary: '',
        challenge: '',
        solution: '',
        outcome: '',
        coverImage: '',
        tags: ['Strategy', 'AI Ops', 'Marketing'],
        metrics: [{ label: 'Performance', value: '+40%' }],
        isFeatured: true,
        orderIndex: 0,
      });
    }
    setError(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev._id ? prev.slug : autoSlug,
    }));
  };

  const handleMetricChange = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...(formData.metrics || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, metrics: updated });
  };

  const handleAddMetric = () => {
    setFormData({
      ...formData,
      metrics: [...(formData.metrics || []), { label: 'Metric Label', value: 'Value' }],
    });
  };

  const handleRemoveMetric = (index: number) => {
    setFormData({
      ...formData,
      metrics: (formData.metrics || []).filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const isEdit = Boolean(formData._id);
      const url = isEdit ? `/api/projects/${formData._id}` : '/api/projects';
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
        setError(json.error || 'Failed to save project');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8">
        <GlassCard className="p-6 sm:p-8 space-y-6 relative border border-white/20">
          
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white">
              {formData._id ? 'Edit Case Study Project' : 'Add New Case Study Project'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
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
                <label className="text-xs font-mono text-slate-300">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="AI Workforce & BPO Optimization"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">URL Slug</label>
                <input
                  type="text"
                  required
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="ai-workforce-optimization"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Category</label>
                <input
                  type="text"
                  required
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="AI Strategy & Operations"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Tagline / Subtitle</label>
                <input
                  type="text"
                  required
                  value={formData.tagline || ''}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Scaling throughput by 40% with custom workflow protocols"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                />
              </div>
            </div>

            {/* Cover Image Upload */}
            <FileUploadInput
              label="Cover Image Upload"
              value={formData.coverImage || ''}
              onChange={(url) => setFormData({ ...formData, coverImage: url })}
              accept="image/*"
              placeholder="/assets/projects/project-cover.jpg"
              helperText="Upload project banner/cover image."
            />

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Project Summary</label>
              <textarea
                rows={3}
                required
                value={formData.summary || ''}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Detailed summary of the initiative, goals, and business context..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">The Challenge</label>
                <textarea
                  rows={3}
                  value={formData.challenge || ''}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="Operational bottlenecks, low conversion..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">The Solution</label>
                <textarea
                  rows={3}
                  value={formData.solution || ''}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="Automated recruitment pipelines, AI agents..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Outcome & Business Impact</label>
              <textarea
                rows={2}
                value={formData.outcome || ''}
                onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                placeholder="40% throughput increase, 50% turnaround time reduction..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            {/* Metrics */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-slate-300">Key Performance Metrics</label>
                <button
                  type="button"
                  onClick={handleAddMetric}
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#00F0FF] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Metric
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(formData.metrics || []).map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/10">
                    <input
                      type="text"
                      placeholder="Label"
                      value={m.label}
                      onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                      className="w-1/2 px-2.5 py-1.5 rounded-lg bg-white/5 text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={m.value}
                      onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                      className="w-1/2 px-2.5 py-1.5 rounded-lg bg-white/5 text-emerald-400 font-bold text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMetric(idx)}
                      className="p-1 text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Tags (Comma separated)</label>
              <input
                type="text"
                value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
                placeholder="AI, BPO, Automation, Growth"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                <input
                  type="checkbox"
                  checked={Boolean(formData.isFeatured)}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-white/20 bg-white/5 text-[#0066FF] focus:ring-0"
                />
                <span>Feature on Homepage BentoGrid</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white font-bold text-xs shadow-md hover:scale-105 transition-transform disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{formData._id ? 'Update Project' : 'Create Project'}</span>
              </button>
            </div>

          </form>

        </GlassCard>
      </div>
    </div>
  );
}
