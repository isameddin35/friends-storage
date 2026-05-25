/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, Download, Share2, MoreHorizontal, User } from 'lucide-react';
import { MediaItem } from '../types';
import { motion } from 'motion/react';
import { Music } from "lucide-react";


interface DetailViewProps {
  item: MediaItem;
  onBack: () => void;
  onItemSelect: (item: MediaItem) => void;
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const formatSize = (s: number) =>
  s >= 1073741824
    ? (s / 1073741824).toFixed(1) + ' GB'
    : s >= 1048576
      ? (s / 1048576).toFixed(1) + ' MB'
      : (s / 1024).toFixed(1) + ' KB';

export function DetailView({ item, onBack, onItemSelect }: DetailViewProps) {
  const isVideo = item.type === "VIDEO";
  const isAudio = item.type === "AUDIO";
  const isImage = item.type === "IMAGE";
  const relatedItems: MediaItem[] = [];
  const token = localStorage.getItem('token');
  const streamUrl = `/api/media/stream/${item.id}?token=${token}`;

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-on-surface-variant hover:text-primary transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Gallery</span>
        </button>

        {/* Dynamic Media Player/Viewer */}
        <div className="relative w-full aspect-video rounded-xl bg-black overflow-hidden shadow-2xl border border-white/5 group flex items-center justify-center">
          {isVideo && (
            <video
              src={streamUrl}
              controls
              className="w-full h-full object-contain"
              style={{ maxHeight: '70vh' }}
            />
          )}

          {isImage && (
            <img
              src={streamUrl}
              alt={item.title}
              className="max-w-full max-h-full object-contain"
            />
          )}

          {isAudio && (
            <div className="flex flex-col items-center gap-6 p-12 w-full max-w-md">
              <div className="w-48 h-48 rounded-2xl bg-surface-container-high flex items-center justify-center overflow-hidden shadow-2xl ring-1 ring-white/10 relative">
                {item.thumbnailUrl ? (
                  <img src={`${item.thumbnailUrl}?token=${token}`} alt="Album Art" className="w-full h-full object-cover" />
                ) : (
                  <Music size={64} className="text-primary" />
                )}
              </div>
              <audio src={streamUrl} controls className="w-full" />
            </div>
          )}
        </div>

        {/* Media Info */}
        <div className="mt-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-on-surface">{item.title}</h2>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border border-white/5 flex items-center justify-center">
                  <User size={18} className="text-on-surface-variant" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.author.username}</p>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase font-mono uppercase opacity-70">
                    Uploaded {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10 hidden md:block"></div>
              <div className="flex gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold tracking-wider uppercase border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-container text-white rounded-lg font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20">
              <Download size={18} />
              <span>Download</span>
            </button>
            <button className="p-2.5 rounded-lg border border-white/10 hover:bg-surface-container-high transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2.5 rounded-lg border border-white/10 hover:bg-surface-container-high transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-12 p-8 rounded-xl bg-surface-container-low border border-white/5">
          <h3 className="text-lg font-bold mb-4 font-sans">Description</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed max-w-3xl">
            {item.description || "No description provided for this media item. Metadata and file details are preserved in the workspace archives."}
          </p>
        </div>
      </div>

    
    </div>
  );
}
