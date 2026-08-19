'use client';

import React, { useEffect, useState } from 'react';
import GlassCard from '@/shared/components/GlassCard';
import { IContactMessage } from '@/features/contact/domain/contact.schema';
import { Mail, Trash2, Loader2, CheckCircle2, AlertCircle, Clock, Send } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<IContactMessage[]>([]);
  const [selectedMsg, setSelectedMsg] = useState<IContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [msgNotice, setMsgNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      const json = await res.json();
      if (json.success) {
        setMessages(json.data);
        if (json.data.length > 0 && !selectedMsg) {
          setSelectedMsg(json.data[0]);
        }
      }
    } catch (err) {
      setMsgNotice({ type: 'error', text: 'Failed to load inbox messages' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (json.success) {
        fetchMessages();
        if (selectedMsg && selectedMsg._id === id) {
          setSelectedMsg({ ...selectedMsg, status: status as any });
        }
      }
    } catch (err) {
      setMsgNotice({ type: 'error', text: 'Failed to update message status' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message inquiry?')) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setSelectedMsg(null);
        fetchMessages();
      }
    } catch (err) {
      setMsgNotice({ type: 'error', text: 'Delete failed' });
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
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Contact Inquiries Inbox</h1>
        <p className="text-xs text-slate-400 mt-1">Read and reply to prospective client contact submissions.</p>
      </div>

      {msgNotice && (
        <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${msgNotice.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'}`}>
          {msgNotice.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{msgNotice.text}</span>
        </div>
      )}

      {messages.length === 0 ? (
        <GlassCard className="p-12 text-center text-slate-400 space-y-2">
          <Mail className="w-10 h-10 mx-auto text-slate-500" />
          <h3 className="text-lg font-bold text-white">Inbox is Clear</h3>
          <p className="text-xs">No contact submissions received yet.</p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Pane: Message List */}
          <div className="lg:col-span-5 space-y-3">
            {messages.map((item) => {
              const isSelected = selectedMsg?._id === item._id;
              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedMsg(item)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white/10 border-[#0066FF] shadow-lg'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                      item.status === 'unread' ? 'bg-[#0066FF] text-white' :
                      item.status === 'replied' ? 'bg-emerald-500/20 text-emerald-400' :
                      item.status === 'read' ? 'bg-slate-700 text-slate-300' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#00F0FF] mt-1 truncate">{item.subject}</div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">{item.message}</div>
                </div>
              );
            })}
          </div>

          {/* Right Pane: Message Detail View */}
          <div className="lg:col-span-7">
            {selectedMsg ? (
              <GlassCard className="p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedMsg.subject}</h3>
                    <div className="text-xs text-slate-400 mt-1">From: <span className="text-white font-medium">{selectedMsg.name}</span> ({selectedMsg.email})</div>
                  </div>

                  <button
                    onClick={() => selectedMsg._id && handleDelete(selectedMsg._id)}
                    className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap bg-white/[0.02] p-5 rounded-xl border border-white/10">
                  {selectedMsg.message}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => selectedMsg._id && updateStatus(selectedMsg._id, 'read')}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300"
                    >
                      Mark Read
                    </button>
                    <button
                      onClick={() => selectedMsg._id && updateStatus(selectedMsg._id, 'replied')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-xs font-medium text-emerald-400"
                    >
                      Mark Replied
                    </button>
                  </div>

                  <a
                    href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white text-xs font-bold shadow-md hover:scale-105 transition-transform"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 text-center text-slate-400">
                <span>Select a message from the left to read.</span>
              </GlassCard>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
