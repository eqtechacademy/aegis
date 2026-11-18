import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  Cpu, 
  Radio, 
  Terminal, 
  Search, 
  Database, 
  CheckCircle2, 
  ExternalLink, 
  Minus, 
  Square, 
  X, 
  Mic, 
  Send,
  Sparkles,
  Command,
  Smartphone,
  Globe,
  HardDrive
} from 'lucide-react';

export const DesktopAppNative: React.FC = () => {
  const { 
    messages, 
    sendMessage, 
    isMicLive, 
    toggleMic, 
    audioLevels, 
    speakText, 
    isSpeaking, 
    setView 
  } = useApp();

  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(inputVal, false);
    setInputVal('');
  };

  return (
    <div className="max-w-7xl mx-auto w-full space-y-4 pb-12 animate-fade-in font-sans">
      
      {/* WINDOW TITLE BAR (Windows 11 / Native EXE Style) */}
      <div className="h-10 bg-[#03060A] border border-cyan-500/30 rounded-t-xl px-4 flex items-center justify-between select-none shadow-md">
        {/* Left: App Icon & Title Bar Details */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-slate-900 border border-cyan-400/60 flex items-center justify-center text-cyan-400">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[12px]">
            <span className="font-bold text-slate-100">AEGIS.EXE</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-semibold">NATIVE WORKSPACE v0.64.0-STABLE</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] hidden sm:inline">
              PROCESS #10424 · RUNNING
            </span>
          </div>
        </div>

        {/* Center: Quick HUD Status */}
        <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span>VOICE CORE: ARMED (0.012s LATENCY)</span>
          </span>
          <span>·</span>
          <span>GLOBAL HOTKEY: [Ctrl + Space]</span>
        </div>

        {/* Right: Window Controls */}
        <div className="flex items-center gap-1">
          <button className="w-7 h-6 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white rounded transition-colors">
            <Minus className="w-3 h-3" />
          </button>
          <button className="w-7 h-6 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white rounded transition-colors">
            <Square className="w-3 h-3" />
          </button>
          <button 
            onClick={() => setView('dashboard')}
            className="w-7 h-6 flex items-center justify-center text-slate-400 hover:bg-rose-600 hover:text-white rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* MAIN DESKTOP SHELL CONTAINER */}
      <div className="border-x border-b border-cyan-500/20 bg-[#060D14]/90 rounded-b-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
        
        {/* LEFT RAIL: LOCAL HARDWARE & PROCESS MONITOR (3 Cols) */}
        <aside className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-cyan-500/20 p-4 space-y-5 bg-[#03060A]/80">
          {/* Machine Hardware Telemetry */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-mono text-[11px] text-cyan-300 uppercase tracking-wider font-semibold">
                Local PC Hardware
              </span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            
            {/* CPU Load */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px] text-slate-300">
                <span>CPU (16 CORES):</span>
                <span className="text-cyan-400 font-bold">14.2%</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full w-[14%]"></div>
              </div>
            </div>

            {/* GPU Acceleration */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px] text-slate-300">
                <span>RTX 4090 TENSOR:</span>
                <span className="text-emerald-400 font-bold">22.8%</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[23%]"></div>
              </div>
            </div>

            {/* Audio Engine */}
            <div className="flex justify-between font-mono text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              <span>MIC DRIVER:</span>
              <span className="text-slate-200">WASAPI Exclusive</span>
            </div>
          </div>

          {/* Executable Modules Navigation */}
          <nav className="space-y-1 font-mono text-xs">
            <button 
              onClick={() => setView('voice')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 font-semibold"
            >
              <span>Voice Cockpit & HUD</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </button>
            <button 
              onClick={() => setView('automations')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-900 transition-colors"
            >
              <span>PC Browser Sandbox</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px]">ACTIVE</span>
            </button>
            <button 
              onClick={() => setView('memory')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-900 transition-colors"
            >
              <span>Neural Memory Vault</span>
              <span className="text-[10px] text-slate-500">4,813</span>
            </button>
            <button 
              onClick={() => setView('integrations')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-900 transition-colors"
            >
              <span>Neural APIs & Vault</span>
              <span className="text-[10px] text-slate-500">4 LLMs</span>
            </button>
          </nav>

          {/* Fleet Pairing Quick Status */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block">
              Cross-Device Pairing:
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center justify-between text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3 h-3" /> iPhone 15 Pro (iOS)
                </span>
                <span>SYNCED</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3 h-3" /> Pixel 9 Pro (APK)
                </span>
                <span>SYNCED</span>
              </div>
              <div className="flex items-center justify-between text-cyan-300">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3" /> Web Cloud SaaS
                </span>
                <span>ONLINE</span>
              </div>
            </div>
          </div>

          {/* System Tray Status */}
          <div className="border-t border-slate-800 pt-3 flex items-center justify-between font-mono text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>SYSTEM TRAY DAEMON</span>
            </span>
            <span className="text-cyan-400">PORT 8089</span>
          </div>
        </aside>

        {/* CENTER & RIGHT DESKTOP CONTENT (9 Cols) */}
        <main className="lg:col-span-9 p-6 space-y-6">
          
          {/* Top Hotkey Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/80 border border-cyan-500/30 p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                <Command className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-semibold text-sm text-white">
                  AEGIS Background Listener Active
                </div>
                <p className="font-mono text-xs text-slate-400">
                  Press <span className="text-cyan-300 font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">Ctrl + Space</span> anywhere in Windows to trigger voice capture
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMic}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase transition-all ${
                  isMicLive
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                    : 'bg-cyan-500 text-slate-950 shadow-glow-cyan hover:brightness-110'
                }`}
              >
                {isMicLive ? 'MIC ACTIVE' : 'START VOICE SESSION'}
              </button>
            </div>
          </div>

          {/* Center Stage: Radar & Live Dialogue Split */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* Left Radar HUD (7 cols) */}
            <div className="xl:col-span-7 space-y-5">
              <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <h2 className="font-display text-sm font-semibold text-white tracking-wide">
                      Acoustic HUD Neural Core
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-400 bg-slate-900 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    REAL-TIME VOICE VAD ONLINE
                  </span>
                </div>

                {/* Radar Graphic Visualizer */}
                <div className="h-60 rounded-xl bg-slate-950 border border-slate-800 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute w-52 h-52 rounded-full border border-cyan-500/20 animate-ping opacity-40"></div>
                  <div className="absolute w-40 h-40 rounded-full border border-cyan-400/30"></div>
                  <div className="absolute w-28 h-28 rounded-full border border-dashed border-amber-400/30 animate-spin" style={{ animationDuration: '30s' }}></div>

                  {/* Core Orb */}
                  <div 
                    onClick={toggleMic}
                    className="relative z-10 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-transform"
                  >
                    <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-cyan-500/30 via-slate-900 to-amber-500/30 border-2 border-cyan-400 p-4 shadow-[0_0_25px_rgba(0,240,255,0.6)] flex items-center justify-center">
                      <Mic className={`w-8 h-8 ${isMicLive ? 'text-emerald-400 animate-bounce' : 'text-cyan-300'}`} />
                    </div>
                    <div className="font-mono text-xs text-cyan-300 mt-2 font-bold tracking-wider">
                      {isMicLive ? 'AEGIS LISTENING' : 'VOICE STANDBY'}
                    </div>
                    <div className="font-mono text-[10px] text-slate-500">
                      "Hey AGIES" or click orb
                    </div>
                  </div>

                  {/* Overlays */}
                  <div className="absolute top-3 left-3 font-mono text-[10px] text-cyan-400/70">
                    SEC://ACOUSTIC_IN_01<br />
                    SAMPLE_RATE: 48000 HZ
                  </div>
                  <div className="absolute bottom-3 right-3 font-mono text-[10px] text-amber-400/70 text-right">
                    NOISE_FLOOR: -64 dB<br />
                    VAD_CONFIDENCE: 99.4%
                  </div>
                </div>

                {/* Live Dialogue Rows */}
                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
                    <span className="text-cyan-400 font-bold block mb-1">USER VOICE COMMAND (12:34:02 PM):</span>
                    "AEGIS, browse to the latest tech specs for local LLM inference on Windows, extract token performance benchmarks, and store them in memory brain."
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-amber-400 font-bold">AEGIS SYNTHESIS & EXECUTION:</span>
                      <span className="text-emerald-400 text-[10px]">ELEVENLABS TTS 0.18s</span>
                    </div>
                    <p className="italic text-slate-200">
                      "Executing locally on your PC. I have launched an isolated Chromium sandbox, scraped hardware benchmark matrices, and committed the performance figures to your memory brain."
                    </p>
                  </div>
                </div>

                {/* Quick Input Bar */}
                <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
                  <input 
                    type="text" 
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type an instruction or speak directly..." 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 font-mono text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-mono text-xs font-bold uppercase shadow-glow-pill hover:opacity-95"
                  >
                    RUN
                  </button>
                </form>

              </div>
            </div>

            {/* Right PC Browser Sandbox & Local Brain (5 cols) */}
            <div className="xl:col-span-5 space-y-5">
              
              {/* PC Browser Sandbox Box */}
              <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <h3 className="font-display text-sm font-semibold text-white">
                      Local PC Browser Sandbox
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300 font-mono text-[10px]">
                    CHROMIUM HEADLESS
                  </span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-cyan-300 bg-slate-900 p-2 rounded text-[11px]">
                    <span className="truncate">https://github.com/ggerganov/llama.cpp/benchmarks</span>
                    <span className="text-emerald-400 shrink-0 ml-2">200 OK</span>
                  </div>
                  <div className="space-y-1 text-slate-300 text-[11px] pt-1">
                    <div className="flex justify-between">
                      <span>EXTRACTED MODEL:</span>
                      <span className="text-white font-bold">Llama-3.3-70B Q4_K_M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TOKENS/SEC:</span>
                      <span className="text-emerald-400 font-bold">42.8 t/s (TensorRT)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VRAM FOOTPRINT:</span>
                      <span className="text-cyan-300 font-bold">39.2 GB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Local Brain Vector Store */}
              <div 
                onClick={() => setView('memory')}
                className="glass-panel rounded-2xl p-5 border border-cyan-500/30 space-y-3 cursor-pointer hover:border-cyan-400 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-display text-sm font-semibold text-white">
                      Local Brain Vector Store
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-cyan-300 font-bold">4,813 NODES</span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-cyan-400 mb-1 text-[10px]">
                      <span>MEMORY #8413 · BENCHMARKS</span>
                      <span className="text-slate-500">JUST NOW</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Llama-3.3-70B inference metrics parsed from local PC browser. 42.8 tokens/sec on RTX 4090.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-cyan-400 mb-1 text-[10px]">
                      <span>MEMORY #8412 · LEGAL/AI</span>
                      <span className="text-slate-500">35M AGO</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      EU AI Act enforcement timeline and governance requirements parsed from autonomous browser.
                    </p>
                  </div>
                </div>

                <button className="w-full py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase hover:bg-cyan-950/60 transition-colors">
                  Open Brain Graph Viewer →
                </button>
              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};
