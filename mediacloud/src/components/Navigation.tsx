/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, Upload, Music, Video, Image, User, Settings, Search, Bell, Cloud, SlidersHorizontal } from 'lucide-react';
import { User as UserType } from '../types';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/upload', label: 'Upload', icon: Upload },
    { path: '/music', label: 'Music', icon: Music },
    { path: '/videos', label: 'Videos', icon: Video },
    { path: '/images', label: 'Images', icon: Image },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-white/10 flex flex-col py-6 px-4 z-50">
      <div className="mb-10 px-2">
        <h1 className="font-sans text-xl font-bold text-primary">MediaCloud</h1>
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-mono mt-1 opacity-70">
          Private Workspace
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group active:scale-95 ${
                isActive 
                  ? 'bg-surface-container-high text-primary border-l-4 border-primary' 
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <Icon size={20} />
              <span className="font-sans text-sm font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/10 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 active:scale-95">
          <User size={20} />
          <span className="font-sans text-sm">Profile</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 active:scale-95">
          <Settings size={20} />
          <span className="font-sans text-sm">Settings</span>
        </button>
      </div>
    </aside>
  );
}

interface TopBarProps {
  user: UserType;
}

export function TopBar({ user }: TopBarProps) {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 z-40 bg-surface/70 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8">
      <div className="flex items-center flex-1 max-w-2xl group">
        <div className="relative w-full focus-within:ring-1 focus-within:ring-primary rounded-lg transition-all">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search your library..." 
            className="w-full bg-surface-container-lowest border-none rounded-lg py-2 pl-10 pr-4 text-sm text-on-surface placeholder:text-outline focus:ring-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-8">
        <div className="flex items-center gap-2">
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <Cloud size={20} />
          </button>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <SlidersHorizontal size={20} />
          </button>
        </div>
        
        <div className="h-8 w-8 rounded-full overflow-hidden border border-white/10 ring-2 ring-primary/20">
          <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
        </div>
      </div>
    </header>
  );
}
