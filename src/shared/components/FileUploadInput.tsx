'use client';

import React, { useState, useRef } from 'react';
import { Upload, Loader2, Image as ImageIcon, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface FileUploadInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  placeholder?: string;
  helperText?: string;
}

export default function FileUploadInput({
  label,
  value,
  onChange,
  accept = 'image/*,.pdf',
  placeholder = '/assets/client-portrait.jpg or https://...',
  helperText,
}: FileUploadInputProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (res.ok && json.success) {
        onChange(json.url);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(json.error || 'Upload failed');
      }
    } catch (err) {
      setError('Network error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  const isImage = value && (value.match(/\.(jpeg|jpg|gif|png|webp|svg)/i) || value.startsWith('/uploads/'));
  const isPdf = value && value.endsWith('.pdf');

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono text-slate-300">{label}</label>
        {success && (
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Uploaded successfully!
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Thumbnail Preview */}
        {isImage ? (
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-900 border border-white/20 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
        ) : isPdf ? (
          <div className="w-14 h-14 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/30 flex flex-col items-center justify-center text-[#00F0FF] shrink-0">
            <FileText className="w-5 h-5" />
            <span className="text-[9px] font-mono mt-0.5">PDF</span>
          </div>
        ) : (
          <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-500 shrink-0">
            <ImageIcon className="w-5 h-5" />
          </div>
        )}

        {/* Text Input & Hidden File Input */}
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
          />

          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs transition-colors flex items-center gap-2 shrink-0 disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#00F0FF]" />
            ) : (
              <Upload className="w-4 h-4 text-[#00F0FF]" />
            )}
            <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
          </button>
        </div>
      </div>

      {helperText && <p className="text-[10px] text-slate-400 font-mono">{helperText}</p>}

      {error && (
        <div className="text-xs text-rose-400 flex items-center gap-1 pt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
