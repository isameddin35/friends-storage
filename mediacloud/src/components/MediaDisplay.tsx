/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Play, Eye, Download, Music, Video, Image as ImageIcon, MoreHorizontal } from 'lucide-react';
import { MediaItem } from '../types';
import { motion } from 'motion/react';

interface MediaCardProps {
  item: MediaItem;
  onClick: (item: MediaItem) => void;
  key?: string;
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const formatSize = (s: number) =>
  s >= 1073741824
    ? (s / 1073741824).toFixed(1) + ' GB'
    : s >= 1048576
      ? (s / 1048576).toFixed(1) + ' MB'
      : (s / 1024).toFixed(1) + ' KB';

const token = localStorage.getItem('token') || '';

export function MediaCard({ item, onClick }: MediaCardProps) {
  const isVideo = item.type === "VIDEO";
  const isAudio = item.type === "AUDIO";
  const isImage = item.type === "IMAGE";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-xl overflow-hidden group cursor-pointer"
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-video bg-surface-container-highest">
        {isVideo ? (
          <video
            src={`${item.thumbnailUrl || item.url}?token=${token}`}
            muted
            preload="metadata"
            playsinline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : isImage ? (
          <img
            src={`${item.thumbnailUrl || item.url}?token=${token}`}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant/30">
            {isAudio ? <Music size={48} /> : <Video size={48} />}
          </div>
        )}

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-primary-container text-white p-4 rounded-full shadow-xl hover:scale-110 active:scale-90 transition-all">
            {isVideo ? <Play fill="currentColor" size={24} /> : <Eye size={24} />}
          </button>
        </div>

        {item.duration && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold tracking-wider text-white">
            {item.duration}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-on-surface truncate pr-4">{item.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-on-surface-variant">by {item.author.username}</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="text-xs text-on-surface-variant font-mono">{formatDate(item.createdAt)}</span>
            </div>
          </div>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <Download size={18} />
          </button>
        </div>

        <div className="flex gap-2">
          {item.tags.map(tag => (
            <span key={tag} className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              {tag}
            </span>
          ))}
          <span className="bg-surface-container-high text-on-surface-variant text-[10px] font-bold px-2 py-1 rounded uppercase">
            {formatSize(item.size)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface MediaGridProps {
  items: MediaItem[];
  onItemClick: (item: MediaItem) => void;
}

export function MediaGrid({ items, onItemClick }: MediaGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => (
        <MediaCard key={item.id} item={item} onClick={onItemClick} />
      ))}
    </div>
  );
}
