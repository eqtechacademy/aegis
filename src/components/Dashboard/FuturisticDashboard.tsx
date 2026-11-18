import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Mic, 
  Plus, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const FuturisticDashboard: React.FC = () => {
  const { 
    messages, 
    sendMessage, 
    audioLevels, 
    setView, 
    triggerWakeWord, 
    isWakeWordActive,
    isSpeaking
  } = useApp();

  const [promptInput, setPromptInput] = useState('');

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    sendMessage(promptInput, false);
    setPromptInput('');
  };

  const handleQuickAction = (actionText: string) => {
    sendMessage(actionText, false);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 relative z-10 flex-1 w-full">
      
      {/* DIGITAL HOLOGRAPHIC GLOBE / MESH BACKGROUND (Top-Right) */}
      <div className="absolute top-0 right-0 w-[580px] h-[580px] pointer-events-none opacity-40 overflow-hidden z-0">
        <div className="absolute -top-16 -right-16 w-[540px] h-[540px] rounded-full border border-cyan-500/30 globe-grid"></div>
        <div className="absolute -top-10 -right-10 w-[480px] h-[480px] rounded-full border border-purple-500/30 rotate-12"></div>
        <div className="absolute top-12 right-12 w-[380px] h-[380px] rounded-full border border-cyan-400/20 rotate-45"></div>
        <div className="absolute top-24 right-24 w-[300px] h-[300px] rounded-full border border-dashed border-cyan-400/40 orbit-ring"></div>
        <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-cyan-400 shadow-glow-cyan animate-ping"></div>
        <div className="absolute top-1/3 right-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-glow-purple"></div>
      </div>

      {/* WELCOME HERO HEADER (Stitch Exact) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold font-display tracking-tight text-white flex items-center gap-2">
            Good Morning, Unnikrishnan <span className="animate-bounce">👋</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Here's what's happening at <span className="text-cyan-400 font-semibold">AGIES</span> today.
          </p>
        </div>

        {/* System status pills */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">
              Voice Trigger: <strong className="text-cyan-300">"Hey AGIES"</strong>
            </span>
          </div>
          <button 
            onClick={() => setView('activity')}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-xs shadow-glow-pill hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* MAIN WORKSPACE HERO: AI CORE ORB + PROMPT BAR (Exact Stitch Match) */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
          
          {/* CIRCULAR GLOWING AI CORE ORB WITH DUAL NEON RINGS */}
          <div className="relative w-44 h-44 flex-shrink-0 flex items-center justify-center">
            {/* Outermost Pulse Ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/30 orbit-ring"></div>
            {/* Inner Purple Reverse Spinning Ring */}
            <div className="absolute inset-2.5 rounded-full border border-purple-500/50 orbit-ring-inner"></div>
            {/* Glow Orb Backing */}
            <div className="absolute inset-5 rounded-full bg-gradient-to-br from-cyan-500/30 via-purple-600/30 to-blue-600/20 blur-xl"></div>
            
            {/* Core Sphere */}
            <div 
              onClick={triggerWakeWord}
              className="relative w-28 h-28 rounded-full bg-gradient-to-b from-[#0e1b3d] to-[#080d21] border-2 border-cyan-400/80 shadow-glow-cyan flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:scale-105 transition-transform"
              title="Click to activate voice assistant"
            >
              {/* Stylized Ribbon A inside Core */}
              <svg className="w-8 h-8 drop-shadow" viewBox="0 0 48 48" fill="none">
                <defs>
                  <linearGradient id="coreLogoGrad1" x1="4" y1="40" x2="38" y2="8" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00F0FF" />
                    <stop offset="40%" stopColor="#2563EB" />
                    <stop offset="80%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                  <linearGradient id="coreLogoGrad2" x1="16" y1="28" x2="44" y2="34" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="60%" stopColor="#9333EA" />
                    <stop offset="100%" stopColor="#F43F5E" />
                  </linearGradient>
                </defs>
                <path d="M12 40L24 8L36 40" stroke="url(#coreLogoGrad1)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 28C22 24 32 23 38 27C42 30 39 37 32 37H16" stroke="url(#coreLogoGrad2)" strokeWidth="4.5" strokeLinecap="round"/>
              </svg>
              <span className="text-[11px] font-bold font-display tracking-widest text-cyan-300 uppercase mt-0.5">
                AGIES
              </span>
              
              {/* Mini Audio Waveform in Core */}
              <div className="flex items-center gap-0.5 mt-1">
                <span className="w-0.5 bg-cyan-400 wave-bar" style={{ animationDelay: '0.1s', height: '10px' }}></span>
                <span className="w-0.5 bg-purple-400 wave-bar" style={{ animationDelay: '0.3s', height: '14px' }}></span>
                <span className="w-0.5 bg-cyan-300 wave-bar" style={{ animationDelay: '0.2s', height: '18px' }}></span>
                <span className="w-0.5 bg-fuchsia-400 wave-bar" style={{ animationDelay: '0.4s', height: '12px' }}></span>
                <span className="w-0.5 bg-cyan-400 wave-bar" style={{ animationDelay: '0.15s', height: '8px' }}></span>
              </div>
            </div>

            {/* Orbit Satellite Dots */}
            <div className="absolute -top-1 left-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-glow-cyan"></div>
            <div className="absolute bottom-2 right-4 w-2 h-2 rounded-full bg-purple-400 shadow-glow-purple"></div>
          </div>

          {/* RIGHT SECTION: ASK AGIES PROMPT BAR & QUICK ACCESS PILLS */}
          <div className="flex-1 w-full space-y-4">
            {/* Command Pill Bar */}
            <form onSubmit={handlePromptSubmit} className="relative w-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-sm pointer-events-none"></div>
              <div className="relative flex items-center justify-between bg-slate-900/90 border border-cyan-400/30 rounded-2xl px-5 py-3.5 shadow-lg">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-cyan-400 text-base">✨</span>
                  <input 
                    type="text" 
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="Ask AGIES... e.g., 'Show today's tasks', 'Project status', 'Generate report'" 
                    className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none font-sans"
                  />
                </div>
                <div className="flex items-center gap-2 pl-3">
                  <button 
                    type="button"
                    onClick={triggerWakeWord}
                    title="Voice Input" 
                    className={`p-2 rounded-xl transition-all ${
                      isWakeWordActive || isSpeaking 
                        ? 'bg-cyan-400 text-slate-950 font-bold scale-110 shadow-glow-cyan' 
                        : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-glow-cyan hover:scale-105'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Action Category Badges (Stitch Exact) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button 
                onClick={() => handleQuickAction("Show all my assigned tasks for this sprint")}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-cyan-950/60 border border-slate-700/80 hover:border-cyan-400/50 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5"
              >
                <span>📋</span> My Tasks
              </button>
              <button 
                onClick={() => setView('tenant')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-cyan-950/60 border border-slate-700/80 hover:border-cyan-400/50 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5"
              >
                <span>📁</span> Projects
              </button>
              <button 
                onClick={() => setView('tenant')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-cyan-950/60 border border-slate-700/80 hover:border-cyan-400/50 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5"
              >
                <span>👥</span> Team
              </button>
              <button 
                onClick={() => setView('admin')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-cyan-950/60 border border-slate-700/80 hover:border-cyan-400/50 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5"
              >
                <span>📊</span> Reports
              </button>
              <button 
                onClick={() => setView('integrations')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-cyan-950/60 border border-slate-700/80 hover:border-cyan-400/50 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5"
              >
                <span>⚡</span> AI Tools
              </button>
              <button 
                onClick={() => setView('memory')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-cyan-950/60 border border-slate-700/80 hover:border-cyan-400/50 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5"
              >
                <span>🧠</span> Knowledge
              </button>
            </div>

            {/* LIVE CONTINUOUS VOICE AGENT TRANSCRIPT HUD (Stitch Exact) */}
            <div className="mt-3 p-3.5 rounded-xl bg-[#080E24]/90 border border-cyan-500/25 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
                    Live Voice Agent Transcript
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                    Continuous Wake Detection: Active
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-purple-300">
                  <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">
                    Auto-transcribing
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="text-emerald-400">99.4% intent match</span>
                </div>
              </div>

              {/* Streamed dialog rows */}
              <div className="space-y-2 text-xs font-mono max-h-24 overflow-y-auto pr-1">
                <div className="flex items-start gap-2.5 text-slate-300">
                  <span className="text-purple-400 font-semibold shrink-0">Unnikrishnan (Voice):</span>
                  <span className="text-slate-200">
                    "{messages[messages.length - 2]?.text || "Hey AGIES, show my priority deadlines and reschedule the EQTech review to 2 PM."}"
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-cyan-300">
                  <span className="text-cyan-400 font-semibold shrink-0">AGIES (Synthetic Agent):</span>
                  <span className="text-cyan-100">
                    "{messages[messages.length - 1]?.text || "Done. EQTech Academy review shifted to 14:00. Kerala Bank eKYC testing is flagged as top priority due today."}"
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* METRIC CARDS ROW (Exact Stitch Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {/* 1: Tasks Assigned */}
        <div className="glass-panel rounded-2xl p-4 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Tasks Assigned</span>
            <span className="p-1.5 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-display text-white">12</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">↑ 20%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">vs last week</p>
        </div>

        {/* 2: In Progress */}
        <div className="glass-panel rounded-2xl p-4 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>In Progress</span>
            <span className="p-1.5 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-500/20">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-display text-white">3</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">↑ 10%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">active workflows</p>
        </div>

        {/* 3: Due Today */}
        <div className="glass-panel rounded-2xl p-4 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Due Today</span>
            <span className="p-1.5 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-display text-white">2</span>
            <span className="text-xs font-semibold text-rose-400 flex items-center">↓ 33%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">requires review</p>
        </div>

        {/* 4: Overall Progress */}
        <div className="glass-panel rounded-2xl p-4 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Overall Progress</span>
            <span className="p-1.5 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-500/20">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-display text-white">85%</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">↑ 12%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">sprint velocity</p>
        </div>
      </div>

      {/* SPLIT LOWER GRID: ONGOING PROJECTS & AI SUGGESTIONS VS CALENDAR & TODAY'S SCHEDULE (Stitch Exact) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">

        {/* LEFT & CENTER (2 Columns): PROJECTS + SUGGESTIONS */}
        <div className="lg:col-span-2 space-y-6">

          {/* ONGOING PROJECTS */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                <span>Ongoing Projects</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                  3 Active
                </span>
              </h3>
              <button 
                onClick={() => setView('tenant')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Project 1: Kerala Bank */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
                    <span className="font-semibold text-sm text-slate-100">Kerala Bank - eKYC Integration</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400">75%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full w-3/4"></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>Sprint 4 • Phase: Biometric Testing</span>
                  <span>Target: Nov 24</span>
                </div>
              </div>

              {/* Project 2: EQTech Academy - Website v2 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></div>
                    <span className="font-semibold text-sm text-slate-100">EQTech Academy - Website v2</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-400">60%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-full rounded-full w-3/5"></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>Sprint 2 • Phase: Student Portal & LMS</span>
                  <span>Target: Dec 05</span>
                </div>
              </div>

              {/* Project 3: Hospital Management Pro */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="font-semibold text-sm text-slate-100">Hospital Management Pro</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">40%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full w-2/5"></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>Sprint 1 • Phase: EHR Cloud Database</span>
                  <span>Target: Dec 20</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI SUGGESTIONS WIDGET */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2 mb-4">
              <span className="text-cyan-400">⚡</span>
              <span>AI Suggestions</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
                <div className="text-cyan-400 text-xs font-semibold mb-1">Priority Alert</div>
                <p className="text-xs text-slate-200">Complete pending client update for Kerala Bank</p>
                <button 
                  onClick={() => sendMessage("Execute pending client update for Kerala Bank", false)}
                  className="mt-2 text-[10px] text-cyan-300 font-mono flex items-center gap-1 hover:underline"
                >
                  Execute now →
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 hover:border-purple-400/40 transition-colors">
                <div className="text-purple-400 text-xs font-semibold mb-1">Upcoming Demo</div>
                <p className="text-xs text-slate-200">EQTech Academy website demo is due tomorrow</p>
                <button 
                  onClick={() => sendMessage("Prepare slides for EQTech Academy demo", false)}
                  className="mt-2 text-[10px] text-purple-300 font-mono flex items-center gap-1 hover:underline"
                >
                  Prepare slides →
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                <div className="text-slate-400 text-xs font-semibold mb-1">Monthly Routine</div>
                <p className="text-xs text-slate-200">Prepare monthly performance & team summary</p>
                <button 
                  onClick={() => sendMessage("Auto-draft monthly performance summary", false)}
                  className="mt-2 text-[10px] text-slate-400 font-mono flex items-center gap-1 hover:underline"
                >
                  Auto-draft →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (1 Column): CALENDAR + TODAY'S SCHEDULE (Stitch Exact) */}
        <div className="space-y-6">

          {/* CALENDAR WIDGET (November 2026) */}
          <div className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white font-display">November 2026</h4>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800/60">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800/60">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Calendar Days Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-slate-400 mb-2">
              <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono">
              <span className="text-slate-600 py-1">1</span>
              <span className="text-slate-400 py-1">2</span>
              <span className="text-slate-400 py-1">3</span>
              <span className="text-slate-400 py-1">4</span>
              <span className="text-slate-400 py-1">5</span>
              <span className="text-slate-400 py-1">6</span>
              <span className="text-slate-400 py-1">7</span>
              <span className="text-slate-400 py-1">8</span>
              <span className="text-slate-400 py-1">9</span>
              <span className="text-slate-400 py-1">10</span>
              <span className="text-slate-400 py-1">11</span>
              <span className="text-slate-400 py-1">12</span>
              <span className="text-slate-400 py-1">13</span>
              <span className="text-slate-400 py-1">14</span>
              <span className="text-slate-400 py-1">15</span>
              <span className="text-slate-400 py-1">16</span>
              {/* Day 17 Active Highlighted */}
              <span className="py-1 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-bold shadow-glow-pill">17</span>
              <span className="text-slate-300 py-1">18</span>
              <span className="text-slate-300 py-1">19</span>
              <span className="text-slate-300 py-1">20</span>
              <span className="text-slate-300 py-1">21</span>
              <span className="text-slate-400 py-1">22</span>
              <span className="text-slate-400 py-1">23</span>
              <span className="text-slate-400 py-1">24</span>
              <span className="text-slate-400 py-1">25</span>
              <span className="text-slate-400 py-1">26</span>
              <span className="text-slate-400 py-1">27</span>
              <span className="text-slate-400 py-1">28</span>
              <span className="text-slate-400 py-1">29</span>
              <span className="text-slate-400 py-1">30</span>
            </div>
          </div>

          {/* TODAY'S SCHEDULE (Matches Reference Events) */}
          <div className="glass-panel rounded-2xl p-5">
            <h4 className="text-sm font-bold text-white font-display flex items-center justify-between mb-4">
              <span>Today's Schedule</span>
              <span className="text-[10px] text-cyan-400 font-mono">3 Meetings</span>
            </h4>

            <div className="space-y-3">
              {/* Event 1 */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border-l-2 border-cyan-400">
                <div className="text-xs font-mono text-cyan-400 font-bold whitespace-nowrap">10:00 AM</div>
                <div>
                  <div className="text-xs font-semibold text-slate-100">Project Sync - HQ</div>
                  <div className="text-[11px] text-slate-400">Kerala Bank & AI Core architecture</div>
                </div>
              </div>

              {/* Event 2 */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border-l-2 border-purple-500">
                <div className="text-xs font-mono text-purple-400 font-bold whitespace-nowrap">02:00 PM</div>
                <div>
                  <div className="text-xs font-semibold text-slate-100">Client Review</div>
                  <div className="text-[11px] text-slate-400">EQTech Academy website progress demo</div>
                </div>
              </div>

              {/* Event 3 */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border-l-2 border-emerald-400">
                <div className="text-xs font-mono text-emerald-400 font-bold whitespace-nowrap">05:00 PM</div>
                <div>
                  <div className="text-xs font-semibold text-slate-100">Team Standup</div>
                  <div className="text-[11px] text-slate-400">Daily retrospective & blocker review</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
