import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Bell, 
  Mic, 
  Globe
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    spokenLanguage, 
    setSpokenLanguage,
    triggerWakeWord,
    isSpeaking,
    isWakeWordActive,
    operationalState
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="h-16 border-b border-cyan-500/15 px-6 sm:px-8 flex items-center justify-between relative z-10 bg-[#070D1F]/50 backdrop-blur-md sticky top-0">
      {/* LEFT: NEURAL CORE ONLINE PILL & DATE */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          SYS.ONLINE: NEURAL CORE v4.8
        </span>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          {currentDate}
        </span>
      </div>

      {/* RIGHT: SEARCH, LANGUAGE, MIC, NOTIFICATIONS, PROFILE */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, tasks, prompts..."
            className="w-56 lg:w-64 bg-slate-900/80 border border-slate-700/60 text-xs text-slate-200 placeholder-slate-500 rounded-lg pl-9 pr-3 py-1.5 focus:outline-none focus:border-cyan-400/70 transition-all font-sans"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
        </div>

        {/* Spoken Language Quick Toggle */}
        <button
          onClick={() => setSpokenLanguage(spokenLanguage === 'en' ? 'ml' : 'en')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-[11px] font-mono text-cyan-300 hover:border-cyan-400/60 transition-colors"
          title="Toggle Spoken Language (EN / Malayalam)"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>{spokenLanguage === 'ml' ? 'ML (മലയാളം)' : 'EN (Voice)'}</span>
        </button>

        {/* Voice Trigger Button */}
        <button
          onClick={triggerWakeWord}
          className={`p-2 rounded-lg border transition-all ${
            isWakeWordActive || isSpeaking
              ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-glow-cyan'
              : 'bg-slate-800/60 hover:bg-slate-700/60 border-slate-700/60 text-cyan-300'
          }`}
          title="Voice Assistant Hotword ('Hey AGIES')"
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Notifications Bell */}
        <button 
          className="relative p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 text-slate-300 hover:text-white transition-colors"
          title="System Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-900"></span>
        </button>

        {/* User Profile Pill (Stitch Exact) */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-700/60">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 p-0.5">
            <img 
              className="w-full h-full rounded-full object-cover" 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
              alt="Unnikrishnan" 
            />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-semibold text-slate-200">Unnikrishnan</div>
            <div className="text-[10px] text-cyan-400 font-mono">Lead Architect</div>
          </div>
        </div>
      </div>
    </header>
  );
};
