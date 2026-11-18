import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Radio, 
  Send, 
  CheckCircle2, 
  Layers, 
  Monitor, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  TrendingUp,
  Volume2
} from 'lucide-react';

export const TacticalCommandCenter: React.FC = () => {
  const { 
    messages, 
    sendMessage, 
    motionState, 
    setMotionState, 
    audioLevels, 
    isSpeaking,
    triggerWakeWord
  } = useApp();

  const [commandInput, setCommandInput] = useState('');

  const robotImageMap = {
    seated: '/assets/c75b783f-6b86-49dd-8167-e5d4f7ce7818_medium.webp',
    walking: '/assets/05261b24-21c5-46e9-9350-89b1403c123b_medium.webp',
    stand: '/assets/4963b8b8-e8ba-477e-89aa-37d1c6b0d5f6_medium.webp',
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    sendMessage(commandInput, false);
    setCommandInput('');
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-6 space-y-6 relative z-10">
      
      {/* TACTICAL CYBERNETIC BACKGROUND GRID & AMBIENT SCAN (Stitch Exact) */}
      <div className="fixed inset-0 pointer-events-none hud-grid opacity-70 z-0"></div>
      <div className="fixed inset-0 pointer-events-none hud-scanline opacity-50 z-0"></div>

      {/* TOP COMMAND SUB-HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-display tracking-wider text-white uppercase">
                Robotic Command Center
              </h2>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[9px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                CYBERNETIC TACTICAL
              </span>
            </div>
            <p className="text-xs text-cyan-300 font-mono">
              Autonomous Humanoid Node #01 · Stance: {motionState.toUpperCase()} · Workstation Hooked
            </p>
          </div>
        </div>

        {/* Telemetry quick stats */}
        <div className="flex items-center gap-4 font-mono text-xs">
          <span className="text-cyan-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            ACTUATOR: 100% NOMINAL
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-purple-300">THERMAL: 34.2°C</span>
          <span className="text-slate-500">|</span>
          <button 
            onClick={triggerWakeWord}
            className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 text-[10px] font-bold hover:scale-105 transition-transform"
          >
            "Hey AGIES"
          </button>
        </div>
      </div>

      {/* MAIN COMMAND CENTER VIEWPORT (3-COLUMN TACTICAL LAYOUT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">

        {/* LEFT COLUMN (3 COLS): ROBOT PHYSICAL MOTION & SENSORS */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* ROBOT VISUAL FEED (Physical Humanoid Avatar) */}
          <div className="glass-panel p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                OPTICAL ROBOT SENSOR
              </span>
              <span className="text-emerald-400">60 FPS 1080P</span>
            </div>

            {/* Robot Stance Image */}
            <div className="relative w-full h-56 rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-950">
              <img 
                src={robotImageMap[motionState]} 
                alt="AGIES Humanoid Robot" 
                className="w-full h-full object-cover" 
              />
              {/* Crosshair HUD overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-12 h-12 border border-dashed border-cyan-400/50 rounded-full"></div>
                <div className="absolute w-full h-px bg-cyan-400/20"></div>
                <div className="absolute h-full w-px bg-cyan-400/20"></div>
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[9px] text-cyan-300">
                POSE: {motionState.toUpperCase()} ACTIVE
              </div>
            </div>

            {/* Motion State Selector */}
            <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
              <button 
                onClick={() => setMotionState('seated')}
                className={`py-1.5 rounded uppercase font-bold transition-all ${
                  motionState === 'seated'
                    ? 'bg-cyan-950/80 border border-cyan-400/80 text-cyan-300'
                    : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                Workstation
              </button>
              <button 
                onClick={() => setMotionState('walking')}
                className={`py-1.5 rounded uppercase font-bold transition-all ${
                  motionState === 'walking'
                    ? 'bg-cyan-950/80 border border-cyan-400/80 text-cyan-300'
                    : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                Walking
              </button>
              <button 
                onClick={() => setMotionState('stand')}
                className={`py-1.5 rounded uppercase font-bold transition-all ${
                  motionState === 'stand'
                    ? 'bg-cyan-950/80 border border-cyan-400/80 text-cyan-300'
                    : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                Standing
              </button>
            </div>
          </div>

          {/* ROBOT TELEMETRY METRICS */}
          <div className="glass-panel p-4 rounded-2xl space-y-3 font-mono text-xs">
            <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px] pb-1 border-b border-cyan-500/20">
              Actuator Subsystems
            </div>
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Cervical Head Gimbal</span>
                  <span className="text-cyan-300">Pitch 0° / Yaw +14°</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-1 overflow-hidden">
                  <div className="bg-cyan-400 h-full w-4/5 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Bipedal Torso Balance</span>
                  <span className="text-emerald-400">99.8% Centered</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-1 overflow-hidden">
                  <div className="bg-emerald-400 h-full w-full rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Dual Robotic Hands</span>
                  <span className="text-purple-300">Tactile Ready</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-1 overflow-hidden">
                  <div className="bg-purple-500 h-full w-3/4 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* CENTER COLUMN (6 COLS): VOICE ACOUSTIC SPECTRUM & LIVE COMMAND TRANSCRIPTS */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* MAIN TACTICAL VOICE RADAR & AUDIO WAVE SPECTRUM */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="text-xs sm:text-sm font-bold font-display tracking-wider text-cyan-300 uppercase">
                  VOICE ACOUSTIC RADAR SPECTRUM
                </span>
              </div>
              <span className="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">
                WAKE: "Hey AGIES"
              </span>
            </div>

            {/* High-Density Tactical Equalizer Spectrum */}
            <div className="h-28 bg-[#040816]/90 rounded-xl p-3 flex items-end justify-between gap-1 border border-cyan-500/20 overflow-hidden relative">
              {/* Frequency scale background lines */}
              <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none opacity-20">
                <div className="border-b border-cyan-400"></div>
                <div className="border-b border-cyan-400"></div>
                <div className="border-b border-cyan-400"></div>
              </div>

              {/* Dynamic Equalizer Bars */}
              {Array.from({ length: 24 }).map((_, i) => {
                const heightVal = Math.max(12, ((audioLevels[i % audioLevels.length] || 10) * (1 + (i % 3) * 0.4)));
                const colorClass = i < 8 ? 'bg-cyan-400' : i < 16 ? 'bg-purple-400' : 'bg-fuchsia-400';
                return (
                  <span 
                    key={i} 
                    className={`w-2 ${colorClass} rounded-t transition-all duration-150`}
                    style={{ height: `${Math.min(heightVal, 88)}px` }}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>20 Hz (Sub-Bass)</span>
              <span>1 kHz (Human Speech Band)</span>
              <span>20 kHz (Ultra Highs)</span>
            </div>
          </div>

          {/* TACTICAL CHAT & LIVE VOICE TRANSCRIPTS (Hands-Free Log) */}
          <div className="glass-panel p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <span>TERMINAL TRANSCRIPT LOG</span>
                <span className="text-[10px] text-emerald-400">Live Stream</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Continuous Wake Active</span>
            </div>

            {/* Scrollable Conversation Feed */}
            <div className="space-y-3 font-mono text-xs max-h-56 overflow-y-auto pr-1">
              {messages.slice(-4).map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div 
                    key={msg.id}
                    className={`p-3 rounded-lg border-l-2 space-y-1 ${
                      isUser 
                        ? 'bg-slate-950/80 border-purple-500' 
                        : 'bg-cyan-950/30 border-cyan-400'
                    }`}
                  >
                    <div className="flex justify-between text-[10px]">
                      <span className={isUser ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold'}>
                        {isUser ? 'Unnikrishnan (Voice Input)' : 'AGIES Tactical Core (Vocal Synthesis)'}
                      </span>
                      <span className="text-slate-400">{msg.time}</span>
                    </div>
                    <p className={isUser ? 'text-slate-200' : 'text-cyan-100'}>{msg.text}</p>
                  </div>
                );
              })}
            </div>

            {/* Secondary Typing Fallback Bar */}
            <form onSubmit={handleCommandSubmit} className="pt-2 flex items-center gap-2">
              <input 
                type="text" 
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="Type command fallback: e.g. 'Deploy staging build'..." 
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 font-sans focus:outline-none focus:border-cyan-400"
              />
              <button 
                type="submit"
                className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold"
              >
                Send
              </button>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN (3 COLS): SPRINT VELOCITY & AUTONOMOUS AGENT NODES */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* CURRENT ENTERPRISE PROJECTS SPRINT */}
          <div className="glass-panel p-4 rounded-2xl space-y-3 font-mono text-xs">
            <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px] pb-1 border-b border-cyan-500/20 flex items-center justify-between">
              <span>Active Mission Sprints</span>
              <span className="text-[10px] text-purple-300">3 Online</span>
            </div>

            <div className="space-y-3">
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex justify-between text-white font-semibold">
                  <span>Kerala Bank eKYC</span>
                  <span className="text-cyan-400 font-bold">75%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-cyan-400 h-full w-3/4 rounded-full"></div>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Biometric SDK integration</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex justify-between text-white font-semibold">
                  <span>EQTech Academy v2</span>
                  <span className="text-purple-400 font-bold">60%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-purple-500 h-full w-3/5 rounded-full"></div>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Client demo today 2:00 PM</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex justify-between text-white font-semibold">
                  <span>Hospital Pro Database</span>
                  <span className="text-emerald-400 font-bold">40%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full w-2/5 rounded-full"></div>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Cloud EHR migration</div>
              </div>
            </div>
          </div>

          {/* SAAS BILLING & EQMAX IDENTITY BADGE */}
          <div className="glass-panel p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold">AGIES Workspace</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">14d Trial</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              ₹699+GST / mo after day 14
            </p>
            <div className="pt-2 text-center border-t border-slate-800">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                Powered and Developed by
              </div>
              <div className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-300 font-display">
                EQMax Tech Solutions.
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
