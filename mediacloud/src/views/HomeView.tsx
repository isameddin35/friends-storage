/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plus } from 'lucide-react';
import { MediaGrid } from '../components/MediaDisplay';
// import { MOCK_MEDIA } from '../constants';
import { fetchMedia } from '../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MediaItem } from '../types';

export function HomeView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMedia()
      .then(setMedia)
      .catch(() => setMedia([]))
      .finally(() => setLoading(false));
  }, []);

  // Filter logic based on path
  const filteredMedia = media.filter(item => {
    if (location.pathname === '/music') return item.type === "AUDIO";
    if (location.pathname === '/videos') return item.type === "VIDEO";
    if (location.pathname === '/images') return item.type === "IMAGE";
    return true; // Show all for home "/"
  });

  const getTitle = () => {
    if (location.pathname === '/music') return 'Music Library';
    if (location.pathname === '/videos') return 'Video Archive';
    if (location.pathname === '/images') return 'Image Gallery';
    return 'Recent Uploads';
  };

  const getSubTitle = () => {
    if (location.pathname === '/') return 'Showing all file types from your workspace';
    return `Access your private ${location.pathname.replace('/', '')} collection`;
  };

  return (
    <div className="max-w-[1440px] mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-on-surface">{getTitle()}</h2>
          <p className="text-on-surface-variant mt-1">{getSubTitle()}</p>
        </div>
        <button
          onClick={() => navigate('/upload')}
          className="bg-primary-container text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20"
        >
          <Plus size={20} />
          <span>New Upload</span>
        </button>
      </div>

      {filteredMedia.length > 0 ? (
        <MediaGrid
          items={filteredMedia}
          onItemClick={(item) => navigate(`/detail/${item.id}`)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant opacity-50">
          <p className="text-lg">No items found in this category.</p>
        </div>
      )}

      {loading && (
        <div className="flex justify-center mt-12 py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-on-surface-variant font-mono text-[10px] uppercase tracking-widest">
              Loading more content
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/upload')}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary-container text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-40 group"
      >
        <Plus size={28} />
        <div className="absolute right-16 bg-surface-container-high text-on-surface px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap text-sm font-semibold border border-white/10 shadow-xl">
          Quick Upload
        </div>
      </button>
    </div>
  );
}
