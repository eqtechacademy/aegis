import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  Mic, 
  Brain, 
  Globe, 
  CheckCheck, 
  Sliders, 
  Radio, 
  Sparkles,
  ArrowRight,
  Send
} from 'lucide-react';

export const MobileCompanion: React.FC = () => {
  const { 
    isMicLive, 
    toggleMic, 
    audioLevels, 
    speakText, 
    isSpeaking, 
    sendMessage, 
    setView 
  } = useApp();

  const [inputVal, setInputVal] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(inputVal, false);
    setInputVal('');
  };

  return (
    <div className="max-w-md mx-auto w-full space-y-5 pb-12 animate-fade-in font-sans">
      
      {/* MOBILE SHELL CONTAINER */}
      <div className="glass-panel rounded-3xl border-2 border-cyan-500/30 overflow-hidden shadow-2xl bg-[#060D14]/95">
        
        {/* MOBILE TOP APP BAR & DEVICE SYNC STATUS */}
        <header className="p-4 border-b border-cyan-500/20 bg-[#070D1F]/90 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-sm font-bold tracking-wider text-white">AEGIS</span>
                <span className="px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-500/40 font-mono text-[9px] text-cyan-300">
                  IOS/APK
                </span>
              </div>
              <p className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>SYNCED TO DESKTOP .EXE</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setView('memory')}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-cyan-300 hover:border-cyan-400"
            >
              <Brain className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('tenant')}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:border-cyan-400"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* MAIN MOBILE BODY */}
        <main className="p-5 space-y-6">

          {/* Central Holographic Voice Sphere Hero */}
          <section className="flex flex-col items-center justify-center py-4 text-center">
            
            {/* Voice Orb Visualizer */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-4">
              <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping opacity-40"></div>
              <div className="absolute inset-2 rounded-full border border-dashed border-amber-400/40 animate-spin" style={{ animationDuration: '20s' }}></div>
              
              <div 
                onClick={toggleMic}
                className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-500/30 via-[#0a142e] to-purple-600/30 border-2 border-cyan-400 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(0,240,255,0.5)] cursor-pointer hover:scale-105 transition-transform"
              >
                <Radio className={`w-8 h-8 ${isMicLive ? 'text-emerald-400 animate-pulse' : 'text-cyan-300'}`} />
              </div>
            </div>

            <h2 className="font-display text-base font-bold text-white tracking-wider">
              {isMicLive ? 'AEGIS IS LISTENING' : 'TAP ORB TO SPEAK'}
            </h2>
            <p className="font-mono text-[11px] text-cyan-300/80 mt-1">
              "HEY AGIES" · MULTI-DEVICE PERSONAL ASSISTANT
            </p>

            {/* Dynamic Real-time Audio Frequency Equalizer */}
            <div className="flex items-center justify-center gap-1.5 h-8 mt-3">
              {audioLevels.slice(0, 7).map((lvl, idx) => (
                <span 
                  key={idx}
                  className="w-1 bg-cyan-400 rounded-full transition-all duration-150"
                  style={{ height: `${Math.max(lvl, 6)}px` }}
                />
              ))}
            </div>
          </section>

          {/* Active Dialogue & Live Execution Card */}
          <section className="rounded-2xl bg-slate-900/90 border border-cyan-500/25 p-4 shadow-lg space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">
                LATEST VOICE TASK
              </span>
              <span className="text-[10px] text-slate-500">12:31 PM</span>
            </div>

            <div className="space-y-2">
              <div className="text-slate-300 text-[12px]">
                <span className="text-cyan-400 font-bold">YOU:</span> "Search recent patents and update memory."
              </div>
              <div className="text-[12px] text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-semibold">
                  <Bot className="w-3.5 h-3.5" />
                  <span>AEGIS EXECUTING VIA DESKTOP BROWSER:</span>
                </div>
                <p className="italic text-slate-300 text-[11px]">
                  "Dispatched autonomous browser sandbox on your PC. 4 nodes saved into your Brain."
                </p>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>PC SYNC: REALTIME</span>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCheck className="w-3.5 h-3.5" />
                <span>MEMORY UPDATED</span>
              </span>
            </div>
          </section>

          {/* Quick Action Grid */}
          <section className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => setView('automations')}
              className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-colors flex flex-col justify-between space-y-2 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <Globe className="w-5 h-5 text-amber-400" />
                <span className="px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 font-mono text-[9px]">IDLE</span>
              </div>
              <div>
                <div className="font-display text-xs font-semibold text-white">PC Browser</div>
                <div className="font-mono text-[10px] text-slate-400">Run web research</div>
              </div>
            </div>

            <div 
              onClick={() => setView('memory')}
              className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/40 transition-colors flex flex-col justify-between space-y-2 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <Brain className="w-5 h-5 text-cyan-400" />
                <span className="font-mono text-cyan-300 text-[10px] font-bold">4.8K</span>
              </div>
              <div>
                <div className="font-display text-xs font-semibold text-white">Memory Brain</div>
                <div className="font-mono text-[10px] text-slate-400">Recall stored facts</div>
              </div>
            </div>
          </section>

          {/* Text input alternative */}
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input 
              type="text" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask AGIES anything..." 
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
            />
            <button 
              type="submit"
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-white shadow-glow-pill hover:opacity-95"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </main>

        {/* BOTTOM MOBILE VOICE ACTION BAR */}
        <footer className="p-4 border-t border-cyan-500/20 bg-[#070D1F]/95 space-y-3">
          <button 
            type="button" 
            onClick={toggleMic}
            className={`w-full py-3 rounded-xl font-display text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
              isMicLive
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                : 'bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white shadow-glow-pill hover:opacity-95'
            }`}
          >
            <Mic className={`w-4 h-4 ${isMicLive ? 'animate-bounce' : ''}`} />
            <span>{isMicLive ? 'Tap to Mute Mic' : 'Hold to Speak to AGIES'}</span>
          </button>

          <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
            <span>Powered and Developed by <strong className="text-cyan-400">EQMax Tech Solutions.</strong></span>
            <span className="text-cyan-300">v0.64.0</span>
          </div>
        </footer>

      </div>

    </div>
  );
};

