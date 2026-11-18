import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Bell, 
  Mic, 
  Sun, 
  Moon, 
  Terminal, 
  Volume2, 
  Globe, 
  Check, 
  ChevronDown, 
  Sparkles,
  ShieldAlert,
  UserCircle,
  Radio,
  PauseCircle,
  Zap
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    theme, 
    cycleTheme, 
    role, 
    setRole, 
    spokenLanguage, 
    setSpokenLanguage,
    triggerWakeWord,
    isSpeaking,
    isWakeWordActive,
    operationalState,
    bargeIn,
    toggleMic,
    isMicLive,
    setView
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const getOperationalBadge = () => {
    switch (operationalState) {
      case 'listening':
        return (
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-500/50 flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            LISTENING (MIC ACTIVE)
          </span>
        );
      case 'speaking':
        return (
          <span 
            onClick={bargeIn}
            className="text-xs font-mono uppercase tracking-wider text-cyan-200 bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-400/60 flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer hover:bg-cyan-900/60 transition-colors"
            title="Click to interrupt AGIES (Barge-In)"
          >
            <Radio className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            SPEAKING • CLICK TO INTERRUPT
          </span>
        );
      case 'processing':
        return (
          <span className="text-xs font-mono uppercase tracking-wider text-purple-300 bg-purple-950/70 px-3 py-1 rounded-full border border-purple-500/50 flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
            REASONING & ROUTING
          </span>
        );
      case 'interrupted':
        return (
          <span className="text-xs font-mono uppercase tracking-wider text-amber-300 bg-amber-950/70 px-3 py-1 rounded-full border border-amber-500/50 flex items-center gap-2">
            <PauseCircle className="w-3 h-3 text-amber-400" />
            INTERRUPTED (BARGE-IN)
          </span>
        );
      case 'error':
        return (
          <span className="text-xs font-mono uppercase tracking-wider text-red-300 bg-red-950/70 px-3 py-1 rounded-full border border-red-500/50 flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            GATEWAY ERROR
          </span>
        );
      default:
        return (
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            SYS.ONLINE: NEURAL CORE v4.8
          </span>
        );
    }
  };

  return (
    <header className="h-16 border-b border-cyan-500/15 px-4 sm:px-8 flex items-center justify-between relative z-10 bg-[#070D1F]/70 backdrop-blur-md sticky top-0">
      {/* LEFT: NEURAL CORE / OPERATIONAL STATE */}
      <div className="flex items-center gap-3">
        {getOperationalBadge()}
        <span className="text-xs text-slate-400 font-medium hidden md:inline">
          {currentDate}
        </span>
      </div>

      {/* RIGHT CONTROLS: SEARCH, PUSH-TO-TALK, THEME, LANGUAGE, PROFILE */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Quick Search */}
        <div className="relative hidden lg:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, tasks, memory..."
            className="w-52 xl:w-64 bg-slate-900/80 border border-slate-700/60 text-xs text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-3 py-1.5 focus:outline-none focus:border-cyan-400/70 transition-all font-sans"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2" />
        </div>

        {/* Push-to-Talk Mic Toggle with Barge-in */}
        <button
          onClick={toggleMic}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs transition-all ${
            isMicLive
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] font-bold animate-pulse'
              : 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30 hover:border-cyan-400'
          }`}
          title={isMicLive ? "Microphone Active (Click to mute)" : "Push-to-Talk (Click to start speech input)"}
        >
          <Mic className={`w-3.5 h-3.5 ${isMicLive ? 'animate-bounce' : 'text-cyan-400'}`} />
          <span className="hidden sm:inline">{isMicLive ? 'MIC LIVE' : 'PUSH TO TALK'}</span>
        </button>

        {/* Hotword "Hey AGIES" button */}
        <button
          onClick={triggerWakeWord}
          className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border font-mono text-[11px] transition-all ${
            isWakeWordActive
              ? 'bg-purple-600 text-white border-purple-400 shadow-glow-purple font-bold'
              : 'bg-slate-900/80 text-purple-300 border-purple-500/30 hover:border-purple-400'
          }`}
          title="Simulate 'Hey AGIES' Hotword Activation"
        >
          <Zap className="w-3 h-3 text-purple-400" />
          <span>"Hey AGIES"</span>
        </button>

        {/* 3-Way Theme Switcher (Dark -> Light -> JARVIS) */}
        <button
          onClick={cycleTheme}
          className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 text-cyan-300 transition-colors flex items-center gap-1"
          title={`Theme: ${theme.toUpperCase()} (Click to cycle)`}
        >
          {theme === 'dark' && <Moon className="w-4 h-4 text-cyan-400" />}
          {theme === 'light' && <Sun className="w-4 h-4 text-amber-400" />}
          {theme === 'jarvis' && <Terminal className="w-4 h-4 text-cyan-300" />}
          <span className="text-[10px] font-mono uppercase hidden md:inline">{theme}</span>
        </button>

        {/* Spoken Language Dropdown with Malayalam (Master Prompt Section 1) */}
        <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-1.5 rounded-xl border border-slate-700/60 font-mono text-xs">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <select
            aria-label="Spoken Voice Language"
            value={spokenLanguage}
            onChange={(e) => setSpokenLanguage(e.target.value)}
            className="bg-transparent text-cyan-300 text-xs font-mono outline-none cursor-pointer"
          >
            <option value="en" className="bg-slate-900 text-slate-200">EN (Voice)</option>
            <option value="ml" className="bg-slate-900 text-slate-200">ML (മലയാളം)</option>
            <option value="es" className="bg-slate-900 text-slate-200">ES (Español)</option>
            <option value="de" className="bg-slate-900 text-slate-200">DE (Deutsch)</option>
            <option value="ja" className="bg-slate-900 text-slate-200">JA (日本語)</option>
            <option value="hi" className="bg-slate-900 text-slate-200">HI (हिंदी)</option>
          </select>
        </div>

        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-xs font-mono text-slate-200 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="hidden md:inline font-semibold">
              {role === 'super_admin' ? 'Master Admin' : role === 'tenant_admin' ? 'Tenant CIO' : 'End User'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-cyan-500/30 shadow-2xl p-1.5 z-50 text-xs font-mono">
              <div className="text-[10px] text-slate-400 px-2 py-1 font-semibold uppercase">Switch Role Demo</div>
              <button
                onClick={() => { setRole('super_admin'); setView('admin'); setShowRoleMenu(false); }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${role === 'super_admin' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                <span>Super Admin</span>
                {role === 'super_admin' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
              <button
                onClick={() => { setRole('tenant_admin'); setView('tenant'); setShowRoleMenu(false); }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${role === 'tenant_admin' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                <span>Tenant Admin</span>
                {role === 'tenant_admin' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
              <button
                onClick={() => { setRole('user'); setView('dashboard'); setShowRoleMenu(false); }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${role === 'user' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                <span>Front-End User</span>
                {role === 'user' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-700/60">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 p-0.5">
            <img 
              className="w-full h-full rounded-full object-cover" 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
              alt="Unnikrishnan" 
            />
          </div>
          <div className="text-left hidden xl:block">
            <div className="text-xs font-semibold text-slate-200">
              {role === 'super_admin' ? 'Unnikrishnan' : role === 'tenant_admin' ? 'Ramesh Kumar' : 'Workspace Member'}
            </div>
            <div className="text-[10px] text-cyan-400 font-mono">
              {role === 'super_admin' ? 'Lead Architect' : role === 'tenant_admin' ? 'Kerala Bank HQ' : 'AI Specialist'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
