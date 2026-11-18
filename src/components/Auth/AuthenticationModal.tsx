import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Mic, CheckCircle2, Shield, Sparkles, Building2, User, KeyRound, ArrowRight, Volume2 } from 'lucide-react';

export const AuthenticationModal: React.FC = () => {
  const { 
    showAuthModal, 
    setShowAuthModal, 
    setRole, 
    setView, 
    speakText, 
    isMicLive, 
    setIsMicLive,
    audioLevels 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'signin' | 'trial'>('signin');
  const [email, setEmail] = useState('unnikrishnan@eqmaxtech.com');
  const [password, setPassword] = useState('••••••••••••');
  const [tenantName, setTenantName] = useState('Kerala Bank Tech Wing');
  const [isVerifying, setIsVerifying] = useState(false);
  const [wakeWordEnabled, setWakeWordEnabled] = useState(true);

  if (!showAuthModal) return null;

  const handleQuickLogin = (role: 'super_admin' | 'tenant_admin' | 'user') => {
    setIsVerifying(true);
    const greeting = role === 'super_admin' 
      ? 'Voiceprint verified. Welcome Super Administrator. Opening multi-tenant control center.'
      : role === 'tenant_admin'
      ? 'Voiceprint matched 99.8%. Welcome Kerala Bank CIO. Loading tenant workspace.'
      : 'Voiceprint authenticated. Welcome Unnikrishnan. Synchronizing AI work dashboard.';

    speakText(greeting);

    setTimeout(() => {
      setRole(role);
      if (role === 'super_admin') {
        setView('admin');
      } else if (role === 'tenant_admin') {
        setView('tenant');
      } else {
        setView('dashboard');
      }
      setIsVerifying(false);
      setShowAuthModal(false);
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleQuickLogin('user');
  };

  const handleVoiceAuth = () => {
    setIsMicLive(true);
    speakText("Listening to voiceprint passkey. State your name and authorization code.");
    setTimeout(() => {
      handleQuickLogin('user');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-midnight/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl rounded-2xl border border-cyan-500/30 bg-[#070E24]/95 shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="h-14 px-6 flex items-center justify-between border-b border-cyan-500/20 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none">
                <defs>
                  <linearGradient id="modalLogoGrad1" x1="4" y1="40" x2="38" y2="8" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00F0FF" />
                    <stop offset="40%" stopColor="#2563EB" />
                    <stop offset="80%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <path d="M12 40L24 8L36 40" stroke="url(#modalLogoGrad1)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 28C22 24 32 23 38 27C42 30 39 37 32 37H16" stroke="#00F0FF" strokeWidth="4.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                AGIES IDENTITY & AUTHENTICATION
              </span>
              <p className="text-[10px] text-cyan-300/70 font-mono">Biometric Voiceprint & Multi-Tenant Access</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[11px] font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Voice Gateway Ready
            </span>
            <button
              onClick={() => setShowAuthModal(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
            <div className="relative inline-block mx-auto lg:mx-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(0,240,255,0.3)] bg-slate-900/80 mx-auto">
                <img 
                  src="/assets/c75b783f-6b86-49dd-8167-e5d4f7ce7818_medium.webp" 
                  alt="AGIES Assistant" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-mono text-[9px] font-bold shadow-md">
                VOICE AGENT 2.4
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold font-display text-white">
                "State your name or say 'Log In'"
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero friction speech recognition or biometric verification for enterprise SaaS workspaces.
              </p>
            </div>

            {/* Live Voice HUD */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/25 text-left font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[10px] text-cyan-400 pb-1.5 border-b border-cyan-500/20">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Voice Transcript HUD
                </span>
                <span className="text-purple-300">Continuous Stream</span>
              </div>
              <div className="text-slate-300 text-[11px]">
                <strong className="text-purple-400">User:</strong> "Hey AGIES, sign me into Unnikrishnan workspace."
              </div>
              <div className="text-cyan-300 text-[11px]">
                <strong className="text-cyan-400">AGIES:</strong> "Voiceprint matched with 99.8% biometric confidence."
              </div>
              
              {/* Audio waveform simulator */}
              <div className="flex items-center gap-1 pt-1 justify-center">
                {audioLevels.map((lvl, i) => (
                  <span 
                    key={i} 
                    className="w-1 bg-cyan-400 rounded-full transition-all duration-150"
                    style={{ height: `${Math.max(4, lvl * 0.7)}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Quick Demo Role Jumpers */}
            <div className="pt-2 border-t border-slate-800">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2">
                Fast Demo Login (1-Click SaaS Simulation):
              </span>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('super_admin')}
                  className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-500/40 text-red-300 font-mono transition-colors flex flex-col items-center text-center"
                >
                  <Shield className="w-3.5 h-3.5 mb-1 text-red-400" />
                  <span>Super Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('tenant_admin')}
                  className="p-2 rounded-lg bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/40 text-purple-300 font-mono transition-colors flex flex-col items-center text-center"
                >
                  <Building2 className="w-3.5 h-3.5 mb-1 text-purple-400" />
                  <span>Tenant CIO</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('user')}
                  className="p-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 text-cyan-300 font-mono transition-colors flex flex-col items-center text-center"
                >
                  <User className="w-3.5 h-3.5 mb-1 text-cyan-400" />
                  <span>End User</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-slate-900/70 border border-cyan-500/20 rounded-xl p-5 sm:p-6 space-y-4">
            {/* Tab switch */}
            <div className="flex items-center p-1 rounded-xl bg-slate-950/80 border border-slate-700/60">
              <button
                type="button"
                onClick={() => setActiveTab('signin')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'signin'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In with Voice / Email
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('trial')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'trial'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Start 14-Day Free Trial
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {activeTab === 'trial' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Organization / Workspace Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={tenantName}
                      onChange={(e) => setTenantName(e.target.value)}
                      placeholder="e.g. Kerala Bank Innovation Lab"
                      className="w-full bg-slate-950/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                    />
                    <Building2 className="w-3.5 h-3.5 absolute right-3 top-2.5 text-cyan-400" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email or Voiceprint ID
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <span className="absolute right-3 top-2 text-cyan-400 text-xs font-mono">
                    🎙️ Voice Synced
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Password / Voice Keyphrase
                  </label>
                  <span className="text-[10px] text-cyan-400 hover:underline cursor-pointer">
                    Forgot Voice Key?
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <KeyRound className="w-3.5 h-3.5 absolute right-3 top-2.5 text-slate-500" />
                </div>
              </div>

              {/* Wake Word Toggle */}
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-slate-300">
                    Always wake on keyword <strong className="text-cyan-300 font-mono">"Hey AGIES"</strong>
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={wakeWordEnabled}
                  onChange={(e) => setWakeWordEnabled(e.target.checked)}
                  className="accent-cyan-400 w-4 h-4 rounded cursor-pointer"
                />
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:opacity-95 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{activeTab === 'trial' ? 'Start Free 14-Day Trial' : 'Enter Workspace'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleVoiceAuth}
                  className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Mic className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>Speak to Authenticate (Hands-Free)</span>
                </button>
              </div>
            </form>

            <div className="pt-3 border-t border-slate-800 text-center text-[11px] text-slate-400">
              <span className="text-emerald-400 font-medium">✓ No credit card required</span> for 14-day trial • ₹699 + 18% GST / month afterwards
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="h-10 px-6 border-t border-cyan-500/15 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>AGIES Autonomous Enterprise Assistant</span>
          </div>
          <div>
            Powered and Developed by <strong className="text-cyan-300">EQMax Tech Solutions.</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
