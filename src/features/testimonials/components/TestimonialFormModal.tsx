'use client';

import React, { useEffect, useState } from 'react';
import GlassCard from '@/shared/components/GlassCard';
import FileUploadInput from '@/shared/components/FileUploadInput';
import { ITestimonial } from '../domain/testimonial.schema';
import { X, Save, Loader2, Star } from 'lucide-react';

interface TestimonialFormModalProps {
  isOpen: boolean;
  initialData: ITestimonial | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TestimonialFormModal({
  isOpen,
  initialData,
  onClose,
  onSuccess,
}: TestimonialFormModalProps) {
  const [formData, setFormData] = useState<Partial<ITestimonial>>({
    clientName: '',
    clientRole: '',
    company: '',
    avatarUrl: '',
    quote: '',
    rating: 5,
    isPublished: true,
    orderIndex: 0,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        clientName: '',
        clientRole: '',
        company: '',
        avatarUrl: '',
        quote: '',
        rating: 5,
        isPublished: true,
        orderIndex: 0,
      });
    }
    setError(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const isEdit = Boolean(formData._id);
      const url = isEdit ? `/api/testimonials/${formData._id}` : '/api/testimonials';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseText = await res.text();
      let json: { success?: boolean; error?: string } = {};
      try {
        json = JSON.parse(responseText);
      } catch {
        throw new Error(res.status === 413 ? 'Payload size too large' : `Server error code ${res.status}`);
      }

      if (res.ok && json.success) {
        onSuccess();
        onClose();
      } else {
        setError(json.error || 'Failed to save testimonial');
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Save failed due to network error';
      setError(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl my-8">
        <GlassCard className="p-6 sm:p-8 space-y-6 relative border border-white/20">
          
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white">
              {formData._id ? 'Edit Executive Endorsement' : 'Add Executive Endorsement'}
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
                <label className="text-xs font-mono text-slate-300">Client / Executive Name</label>
                <input
                  type="text"
                  required
                  value={formData.clientName || ''}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Dr. Sarah Jenkins"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Executive Title / Role</label>
                <input
                  type="text"
                  required
                  value={formData.clientRole || ''}
                  onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                  placeholder="Chief Strategy Officer"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Company / Organization</label>
                <input
                  type="text"
                  required
                  value={formData.company || ''}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Global AI Solutions Corp"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Rating (1 to 5 Stars)</label>
                <div className="flex items-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= (formData.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Avatar Upload */}
            <FileUploadInput
              label="Client Avatar Photo Upload"
              value={formData.avatarUrl || ''}
              onChange={(url) => setFormData({ ...formData, avatarUrl: url })}
              accept="image/*"
              placeholder="/assets/testimonials/client-headshot.jpg"
              helperText="Upload client headshot or avatar."
            />

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Testimonial Quote</label>
              <textarea
                rows={4}
                required
                value={formData.quote || ''}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="Mahmud's leadership transformed our cross-functional team productivity..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
              />
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
                <span>{formData._id ? 'Update Testimonial' : 'Create Testimonial'}</span>
              </button>
            </div>

          </form>

        </GlassCard>
      </div>
    </div>
  );
}
