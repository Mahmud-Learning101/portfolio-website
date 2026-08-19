'use client';

import React, { useEffect, useState } from 'react';
import GlassCard from '@/shared/components/GlassCard';
import { IExperience } from '@/features/experience/domain/experience.schema';
import ExperienceFormModal from '@/features/experience/components/ExperienceFormModal';
import { Plus, Trash2, Edit3, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IExperience | null>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/experience');
      const json = await res.json();
      if (json.success) setExperiences(json.data);
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

  const handleOpenEdit = (item: IExperience) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    try {
      const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setMsg({ type: 'success', text: 'Experience deleted' });
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
          <h1 className="text-3xl font-extrabold text-white">Work Experience CRUD</h1>
          <p className="text-xs text-slate-400 mt-1">Manage career milestones displayed on the public timeline.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white font-bold text-xs shadow-md hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Experience</span>
        </button>
      </div>

      {msg && (
        <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${msg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'}`}>
          {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{msg.text}</span>
        </div>
      )}

      <div className="space-y-4">
        {experiences.map((item) => (
          <GlassCard key={item._id} className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white">{item.role}</div>
              <div className="text-xs text-[#00F0FF]">{item.company} ({item.startDate} - {item.endDate || 'Present'})</div>
              <div className="text-xs text-slate-400">{item.summaryPoints[0]}</div>
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

      <ExperienceFormModal
        isOpen={modalOpen}
        initialData={selectedItem}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setMsg({ type: 'success', text: 'Experience saved successfully!' });
          fetchItems();
        }}
      />
    </div>
  );
}
