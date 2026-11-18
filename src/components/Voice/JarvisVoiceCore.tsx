import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mic, 
  MicOff, 
  Radio, 
  Sparkles, 
  Volume2, 
  Send,
  Zap,
  Globe
} from 'lucide-react';

export const JarvisVoiceCore: React.FC = () => {
  const { 
    messages, 
    sendMessage, 
    isMicLive, 
    toggleMic, 
    isSpeaking, 
    spokenLanguage, 
    setSpokenLanguage,
    triggerWakeWord,
    isWakeWordActive,
    activeBrainId,
    setActiveBrainId,
    audioLevels
  } = useApp();

  const [typedInput, setTypedInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim()) return;
    sendMessage(typedInput, false);
    setTypedInput('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 relative z-10 flex flex-col items-center">
      
      {/* HUD GRID & AMBIENT SCI-FI SCANLINES */}
      <div className="fixed inset-0 pointer-events-none hud-grid opacity-70 z-0"></div>
      <div className="fixed inset-0 pointer-events-none hud-scanline opacity-50 z-0"></div>
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/15 to-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* TOP CONTEXT WIDGETS (Stitch Exact) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        
        {/* Widget 1: Active Neural Brain */}
        <div className="glass-panel rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Active Brain Core</span>
            <div className="text-sm font-bold text-white font-display flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <span className="capitalize">{activeBrainId === 'claude' ? 'Claude 3.5 Sonnet' : activeBrainId === 'gemini' ? 'Google Gemini 1.5 Pro' : activeBrainId === 'chatgpt' ? 'OpenAI GPT-4o' : activeBrainId}</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-[10px]">
            Neural Matrix
          </span>
        </div>

        {/* Widget 2: Continuous Voice State */}
        <div className="glass-panel rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Listening Mode</span>
            <div className="text-sm font-bold text-cyan-300 font-display flex items-center gap-1.5 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${isMicLive || isSpeaking ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'}`}></span>
              <span>{isSpeaking ? 'Vocal Synthesis Active' : isMicLive ? 'Zero-Touch Wake Active' : 'Push-to-Talk Mode'}</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[10px]">
            {spokenLanguage === 'ml' ? 'Malayalam (മലയാളം)' : 'English (Voice)'}
          </span>
        </div>

        {/* Widget 3: Organization & Trial */}
        <div className="glass-panel rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Tenant Profile</span>
            <div className="text-sm font-bold text-white font-display mt-0.5">Kerala Bank HQ</div>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
            14d Free (₹699+GST)
          </span>
        </div>

      </div>

      {/* CENTER PIECE: ROTATING HOLOGRAPHIC JARVIS ORB & ACOUSTIC RINGS (Stitch Exact) */}
      <div className="relative w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] flex items-center justify-center my-4 relative z-10">
        
        {/* Outermost Arc Ring 1 (Dashed Cyan) */}
        <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 orbit-ring"></div>
        
        {/* Arc Ring 2 (Purple Dual Notches) */}
        <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-purple-500/60 border-b-purple-500/60 orbit-ring-inner"></div>
        
        {/* Arc Ring 3 (Segmented Magenta / Cobalt Blue) */}
        <div className="absolute inset-10 rounded-full border border-transparent border-r-fuchsia-400/70 border-l-cyan-300/70 orbit-ring"></div>

        {/* Circular Radar Degree Compass Ticks */}
        <div className="absolute inset-16 rounded-full border border-cyan-500/20 flex items-center justify-center pointer-events-none">
          <span className="absolute top-1 text-[9px] font-mono text-cyan-400/60">000°</span>
          <span className="absolute bottom-1 text-[9px] font-mono text-cyan-400/60">180°</span>
          <span className="absolute left-1 text-[9px] font-mono text-cyan-400/60">270°</span>
          <span className="absolute right-1 text-[9px] font-mono text-cyan-400/60">090°</span>
        </div>

        {/* Holographic Orbital Satellites */}
        <div className="absolute top-6 left-12 w-3 h-3 rounded-full bg-cyan-300 shadow-glow-cyan"></div>
        <div className="absolute bottom-8 right-14 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-glow-purple"></div>
        <div className="absolute top-1/2 -left-2 w-2 h-2 rounded-full bg-fuchsia-400"></div>

        {/* INNER GLOWING VOICE CORE SPHERE */}
        <div 
          onClick={triggerWakeWord}
          className="relative w-40 sm:w-52 h-40 sm:h-52 rounded-full bg-gradient-to-b from-[#0b1636] to-[#040816] border-2 border-cyan-400/80 shadow-[0_0_80px_rgba(0,240,255,0.5),inset_0_0_50px_rgba(168,85,247,0.4)] flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:scale-105 transition-transform"
          title="Click to trigger voice wake detection"
        >
          {/* Ribbon Logo In Sphere */}
          <svg className="w-10 sm:w-12 h-10 sm:h-12 drop-shadow-lg" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="jarvisCoreGrad1" x1="4" y1="40" x2="38" y2="8" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="40%" stopColor="#2563EB" />
                <stop offset="80%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              <linearGradient id="jarvisCoreGrad2" x1="16" y1="28" x2="44" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="60%" stopColor="#9333EA" />
                <stop offset="100%" stopColor="#F43F5E" />
              </linearGradient>
            </defs>
            <path d="M12 40L24 8L36 40" stroke="url(#jarvisCoreGrad1)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 28C22 24 32 23 38 27C42 30 39 37 32 37H16" stroke="url(#jarvisCoreGrad2)" strokeWidth="4.5" strokeLinecap="round" />
          </svg>

          <span className="text-xs sm:text-sm font-bold font-display tracking-widest text-cyan-300 uppercase mt-1">
            AGIES CORE
          </span>
          <span className="text-[10px] text-purple-300 font-mono">
            {isSpeaking ? 'SPEAKING' : 'LISTENING TO VOICE'}
          </span>

          {/* Audio Reactive Wave Spectrum Inside Sphere */}
          <div className="flex items-center gap-1 mt-2">
            {audioLevels.map((lvl, idx) => (
              <span 
                key={idx}
                className="w-1 bg-cyan-400 rounded-full transition-all duration-150"
                style={{ height: `${Math.min(lvl * 1.5, 28)}px` }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* SPOKEN WAKE CALL HELPER PILL */}
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900/90 to-purple-950/70 border border-cyan-400/30 text-xs font-mono shadow-lg relative z-10 text-center">
        <span className="text-cyan-400 text-sm">🎙️</span>
        <span className="text-slate-300">
          Just say: <strong className="text-cyan-300">"Hey AGIES"</strong> then speak your command naturally (Zero button press needed)
        </span>
      </div>

      {/* LIVE ROLLING TRANSCRIPT HUD (CHAT / STREAM VIEW) */}
      <div className="w-full glass-panel rounded-2xl p-5 space-y-4 relative z-10">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs sm:text-sm font-bold font-display tracking-wider text-cyan-300 uppercase">
              LIVE ROLLING TRANSCRIPT STREAM
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 hidden sm:inline">
              Real-Time Speech-to-Text
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-purple-300">
            <span>Continuous Capture: 48kHz</span>
          </div>
        </div>

        {/* STREAMED DIALOGUE BUBBLES */}
        <div className="space-y-3 font-mono text-xs max-h-56 overflow-y-auto pr-2">
          {messages.slice(-4).map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id}
                className={`flex items-start gap-3 p-3 rounded-xl ${
                  isUser 
                    ? 'bg-slate-900/70 border border-slate-800' 
                    : 'bg-cyan-950/30 border border-cyan-500/30'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                  isUser ? 'bg-purple-500/30 text-purple-300' : 'bg-cyan-500/30 text-cyan-300'
                }`}>
                  {isUser ? 'U' : 'A'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                    <span className={isUser ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold'}>
                      {isUser ? 'Unnikrishnan (Voice Input)' : 'AGIES (Synthetic Vocal Agent)'}
                    </span>
                    <span>{msg.time}</span>
                  </div>
                  <p className={isUser ? 'text-slate-100' : 'text-cyan-100'}>{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* SECONDARY MANUAL TYPE INPUT FALLBACK */}
        <form onSubmit={handleSubmit} className="pt-2 flex items-center gap-3">
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              placeholder="Secondary fallback: Type command if in noisy environment..." 
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
            />
            <button 
              type="submit"
              className="absolute right-2.5 top-2 p-1 text-slate-400 hover:text-cyan-300"
              title="Submit command"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

