/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LoginView } from './views/LoginView';
import { HomeView } from './views/HomeView';
import { UploadView } from './views/UploadView';
import { DetailView } from './views/DetailView';
import { Sidebar, TopBar } from './components/Navigation';
import { MOCK_USER } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { MediaItem } from './types';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Loader2 } from "lucide-react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const location = useLocation();
  const currentUser = {
    name: localStorage.getItem('username') || 'User',
    email: '',
    avatarUrl: 'https://ui-avatars.com/api/?name=' + localStorage.getItem('username'),
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <TopBar user={currentUser} />

        <main className="flex-1 mt-16 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="h-full"
            >
              <Routes location={location}>
                <Route path="/" element={<HomeView />} />
                <Route path="/upload" element={<UploadView />} />
                <Route path="/detail/:id" element={<MediaDetailWrapper />} />

                {/* Categories */}
                <Route path="/music" element={<HomeView />} />
                <Route path="/videos" element={<HomeView />} />
                <Route path="/images" element={<HomeView />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}



function MediaDetailWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    fetch(`/api/media/${id}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(setItem)
      .catch(() => setItem(null));
  }, [id]);

  if (!item) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

  return (
    <DetailView
      item={item}
      onBack={() => navigate(-1)}
      onItemSelect={(newItem) => navigate(`/detail/${newItem.id}`)}
    />
  );
}
