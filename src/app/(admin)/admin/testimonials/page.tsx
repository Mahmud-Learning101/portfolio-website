'use client';

import React, { useEffect, useState } from 'react';
import GlassCard from '@/shared/components/GlassCard';
import { ITestimonial } from '@/features/testimonials/domain/testimonial.schema';
import TestimonialFormModal from '@/features/testimonials/components/TestimonialFormModal';
import { Plus, Trash2, Edit3, Loader2, CheckCircle2, AlertCircle, Star } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ITestimonial | null>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const json = await res.json();
      if (json.success) setTestimonials(json.data);
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to fetch testimonials' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: ITestimonial) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setMsg({ type: 'success', text: 'Testimonial deleted' });
        fetchItems();
      } else {
        setMsg({ type: 'error', text: json.error || 'Delete failed' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Network error' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#00F0FF] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Testimonials & Recommendations</h1>
          <p className="text-xs text-slate-400 mt-1">Manage executive endorsements and client reviews.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white font-bold text-xs shadow-md hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
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

      <div className="space-y-4">
        {testimonials.map((item) => (
          <GlassCard key={item._id} className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{item.clientName}</span>
                <span className="text-xs text-[#00F0FF]">{item.clientRole} @ {item.company}</span>
              </div>
              <div className="text-xs text-slate-300 italic">"{item.quote}"</div>
              <div className="flex items-center gap-1 pt-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(item)}
                title="Edit Testimonial"
                className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => item._id && handleDelete(item._id)}
                title="Delete Testimonial"
                className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <TestimonialFormModal
        isOpen={modalOpen}
        initialData={selectedItem}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setMsg({ type: 'success', text: 'Testimonial saved successfully!' });
          fetchItems();
        }}
      />
    </div>
  );
}
