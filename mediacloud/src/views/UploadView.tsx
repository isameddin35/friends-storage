/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { CloudUpload, X, File as FileIcon, Trash2, CheckCircle, Loader2, Video, Music, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface QueuedFile {
  id: string;
  file: File;
  progress: number;
  status: 'waiting' | 'uploading' | 'completed' | 'error';
}

export function UploadView() {
  const navigate = useNavigate();
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = useCallback((files: FileList) => {
    const newFiles = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'waiting' as const
    }));
    setQueue(prev => [...prev, ...newFiles]);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      addFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setQueue(prev => prev.filter(f => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('video/')) return <Video className="text-primary" size={20} />;
    if (type.startsWith('audio/')) return <Music className="text-primary" size={20} />;
    if (type.startsWith('image/')) return <ImageIcon className="text-primary" size={20} />;
    return <FileIcon className="text-primary" size={20} />;
  };

  useEffect(() => {
    if (queue.length > 0 && queue.every(f => f.status === 'completed' || f.status === 'error')) {
      const timeout = setTimeout(() => navigate('/'), 500);
      return () => clearTimeout(timeout);
    }
  }, [queue, navigate]);

  const startUploads = () => {
    // Set status of all waiting files to uploading
    setQueue(prev =>
      prev.map(item =>
        item.status === 'waiting' ? { ...item, status: 'uploading', progress: 0 } : item
      )
    );

    queue.forEach(item => {
      if (item.status !== 'waiting') return;

      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', item.file);

      // Track true browser upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentage = Math.round((e.loaded / e.total) * 100);
          setQueue(prev =>
            prev.map(f => (f.id === item.id ? { ...f, progress: percentage } : f))
          );
        }
      });

      // Handle response when finished
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setQueue(prev =>
            prev.map(f => (f.id === item.id ? { ...f, status: 'completed', progress: 100 } : f))
          );
        } else {
          setQueue(prev =>
            prev.map(f => (f.id === item.id ? { ...f, status: 'error' } : f))
          );
        }
      });


      // setTimeout(() => {
      //   setQueue(prev => {
      //     if (prev.every(f => f.status === 'completed' || f.status === 'error')) {
      //       navigate('/');
      //     }
      //     return prev;
      //   });   // ← setQueue takes only 1 arg, close it here
      // }, 500); // ← 500 is the setTimeout delay

      // Handle upload failure
      xhr.addEventListener('error', () => {
        setQueue(prev =>
          prev.map(f => (f.id === item.id ? { ...f, status: 'error' } : f))
        );
      });

      xhr.open('POST', '/api/media/upload');
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
      xhr.send(formData);
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Upload Files</h2>
        <p className="text-on-surface-variant text-sm">Add high-resolution media to your private cloud storage.</p>
      </div>

      <motion.div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative group border-2 border-dashed rounded-xl p-16 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer
          ${isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-outline-variant hover:border-primary-container bg-surface-container-low/30'}
        `}
      >
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300
          ${isDragging ? 'bg-primary text-white scale-110' : 'bg-primary/10 text-primary group-hover:scale-110'}
        `}>
          <CloudUpload size={40} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Drag and drop media files</h3>
        <p className="text-on-surface-variant mb-8 text-sm">Support for 4K video, RAW images, and lossless audio.</p>

        <label className="bg-primary-container text-white px-8 py-3 rounded-lg font-semibold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20 cursor-pointer">
          Select Files
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />
        </label>
      </motion.div>

      {queue.length > 0 && (
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold">Queued Files</h4>
            <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase font-mono">
              {queue.length} Items • {(queue.reduce((acc, f) => acc + f.file.size, 0) / (1024 * 1024)).toFixed(1)} MB
            </span>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {queue.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-panel p-4 rounded-xl flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    {getFileIcon(item.file.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium truncate">{item.file.name}</span>
                      <span className={`text-[10px] font-bold ${item.status === 'uploading' ? 'text-primary' :
                        item.status === 'completed' ? 'text-green-500' :
                          item.status === 'error' ? 'text-red-500' : 'text-on-surface-variant'
                        }`}>
                        {item.status === 'uploading' ? `${item.progress}%` : item.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: item.status === 'uploading' || item.status === 'completed' ? `${item.progress}%` : 0 }}
                        className={`h-full rounded-full transition-all duration-500 ${item.status === 'completed' ? 'bg-green-500' : 'bg-primary-container'
                          }`}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => removeFile(item.id)}
                    className="p-2 hover:bg-error/10 hover:text-error rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-end gap-4 border-t border-white/5 pt-8">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 rounded-lg border border-white/10 text-on-surface-variant hover:bg-white/5 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={startUploads}
              className="px-8 py-2.5 rounded-lg bg-secondary-container text-on-secondary-container font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-secondary-container/10 text-sm"
            >
              Confirm Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
