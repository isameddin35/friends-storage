/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Cloud, Mail, Lock, ArrowRight, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginViewProps {
  onLogin: () => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    setSuccessMessage(null);

    const payload = isRegister
      ? { username: username || email.split('@')[0], email, password }
      : { email, password };

    try {
      if (isRegister) {
        // Register Call
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errMsg = await res.text().catch(() => 'Registration failed');
          throw new Error(errMsg || 'Registration failed');
        }

        setSuccessMessage('User created in the Vault. Logging in...');

        // Auto Login after registration
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        if (loginRes.ok) {
          const data = await loginRes.json();
          const token = data.token || data.accessToken || data.jwt;
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', data.username);
          }
          setStatus('success');
          setTimeout(() => onLogin(), 800);
        } else {
          setIsRegister(false);
          setStatus('idle');
        }
      } else {
        // Login Call
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          let errMsg = 'Invalid credentials';
          try {
            const errData = await res.json();
            errMsg = errData.message || errData.error || errMsg;
          } catch {
            const rawText = await res.text();
            if (rawText) errMsg = rawText;
          }
          throw new Error(errMsg);
        }

        const data = await res.json();
        const token = data.token || data.accessToken || data.jwt;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', data.username);
        }
        setStatus('success');
        setTimeout(() => onLogin(), 800);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Authentication failed. Please verify connection.');
      setStatus('idle');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0B0B0B] flex items-center justify-center p-6 overflow-hidden">
      {/* Background Particles Simulation */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5
            }}
            animate={{
              x: [null, Math.random() * 100 + '%'],
              y: [null, Math.random() * 100 + '%']
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-primary rounded-full"
          />
        ))}
      </div>

      <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[400px]"
      >
        <div className="glass-card rounded-2xl p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary-container/20">
              <Cloud className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white font-sans">MediaCloud</h1>
            <p className="text-sm text-on-surface-variant mt-1">
              {isRegister ? 'Create Your Vault Account' : 'Private Workspace Access'}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg text-center font-medium">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-lg text-center font-medium">
                {successMessage}
              </div>
            )}

            {isRegister && (
              <div className="space-y-1.5 animate-fadeIn">
                <label className="text-[10px] font-bold tracking-widest text-on-surface-variant ml-1 uppercase font-mono">
                  Username
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                    👤
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="yourusername"
                    className="w-full h-12 bg-[#050505] border-transparent focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 rounded-lg pl-12 pr-4 text-sm transition-all text-on-surface placeholder-outline/50"
                    disabled={status !== 'idle'}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold tracking-widest text-on-surface-variant ml-1 uppercase font-mono">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full h-12 bg-[#050505] border-transparent focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 rounded-lg pl-12 pr-4 text-sm transition-all text-on-surface placeholder-outline/50"
                  disabled={status !== 'idle'}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold tracking-widest text-on-surface-variant ml-1 uppercase font-mono">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 bg-[#050505] border-transparent focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 rounded-lg pl-12 pr-12 text-sm transition-all text-on-surface placeholder-outline/50"
                  disabled={status !== 'idle'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={status !== 'idle'}
              className={`w-full h-12 rounded-lg font-bold text-xs tracking-widest transition-all duration-200 flex items-center justify-center gap-2 uppercase shadow-xl shadow-primary-container/10 active:scale-[0.98] mt-6
                ${status === 'success' ? 'bg-secondary text-on-secondary shadow-secondary/20' : 'bg-primary-container text-white hover:brightness-110'}
              `}
            >
              {status === 'idle' && (
                <>
                  <span>{isRegister ? 'Sign Up' : 'Sign In'}</span>
                  <ArrowRight size={18} />
                </>
              )}
              {status === 'loading' && (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>{isRegister ? 'Creating Vault...' : 'Authenticating...'}</span>
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle2 size={20} />
                  <span>Access Granted</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError(null);
                setSuccessMessage(null);
              }}
              className="text-xs text-primary hover:underline transition-all font-semibold"
              disabled={status !== 'idle'}
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-xs text-on-surface-variant/60 text-center leading-relaxed">
              This is a restricted environment.<br />
              <span className="text-on-surface-variant font-medium">Protected by Springfield Auth Vault.</span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center gap-6 opacity-40">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(61,233,111,0.6)]"></div>
            <span className="font-mono text-[10px] uppercase tracking-widest">Vault Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(61,233,111,0.6)]"></div>
            <span className="font-mono text-[10px] uppercase tracking-widest">Encrypted</span>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
