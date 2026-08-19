'use client';

import React, { useEffect, useState } from 'react';
import GlassCard from '@/shared/components/GlassCard';
import { IEducation } from '@/features/education/domain/education.schema';
import EducationFormModal from '@/features/education/components/EducationFormModal';
import { Plus, Trash2, Edit3, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminEducationPage() {
  const [educations, setEducations] = useState<IEducation[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IEducation | null>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/education');
      const json = await res.json();
      if (json.success) setEducations(json.data);
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to fetch items' });
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

  const handleOpenEdit = (item: IEducation) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this education entry?')) return;
    try {
      const res = await fetch(`/api/education/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setMsg({ type: 'success', text: 'Deleted successfully' });
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
          <h1 className="text-3xl font-extrabold text-white">Education & Academic History</h1>
          <p className="text-xs text-slate-400 mt-1">Manage academic qualifications and honors.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white font-bold text-xs shadow-md hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education Record</span>
        </button>
      </div>

      {msg && (
        <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${msg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'}`}>
          {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{msg.text}</span>
        </div>
      )}

      <div className="space-y-4">
        {educations.map((item) => (
          <GlassCard key={item._id} className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white">{item.degree}</div>
              <div className="text-xs text-[#00F0FF]">{item.institution} ({item.startDate} - {item.endDate})</div>
              {item.gradeOrGpa && <div className="text-xs text-emerald-400">{item.gradeOrGpa}</div>}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => item._id && handleDelete(item._id)}
                className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <EducationFormModal
        isOpen={modalOpen}
        initialData={selectedItem}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setMsg({ type: 'success', text: 'Education saved successfully!' });
          fetchItems();
        }}
      />
    </div>
  );
}
