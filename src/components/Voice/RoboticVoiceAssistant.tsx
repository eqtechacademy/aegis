import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Send, 
  Monitor, 
  BrainCircuit, 
  Globe, 
  HelpCircle, 
  CheckCircle2, 
  Radio, 
  ExternalLink,
  Keyboard,
  Layers,
  Sparkles
} from 'lucide-react';
import { RobotMotionState } from '../../types';

export const RoboticVoiceAssistant: React.FC = () => {
  const { 
    messages, 
    sendMessage, 
    motionState, 
    setMotionState, 
    isMicLive, 
    setIsMicLive, 
    audioLevels, 
    spokenLanguage, 
    setSpokenLanguage,
    speakText,
    isSpeaking,
    triggerWakeWord,
    isWakeWordActive
  } = useApp();

  const [inputVal, setInputVal] = useState('');

  // Image source mappings from uploaded assets in public/assets/
  const robotImageMap = {
    seated: '/assets/c75b783f-6b86-49dd-8167-e5d4f7ce7818_medium.webp',
    walking: '/assets/05261b24-21c5-46e9-9350-89b1403c123b_medium.webp',
    stand: '/assets/4963b8b8-e8ba-477e-89aa-37d1c6b0d5f6_medium.webp',
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(inputVal, false);
    setInputVal('');
  };

  const handleOptionClick = (option: string) => {
    sendMessage(option, false);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[calc(100vh-4rem)]">

      {/* LEFT PANEL: 3D ANIMATED ROBOT MACHINE WITH LIVE MOTION STATES */}
      <aside className="w-full lg:w-[420px] xl:w-[460px] border-b lg:border-b-0 lg:border-r border-cyan-500/15 bg-dark-surface-container/60 p-4 sm:p-5 flex flex-col justify-between shrink-0 space-y-4">
        
        {/* Live Embodied Robot Motion Display Card */}
        <div className="rounded-xl bg-dark-surface border-2 border-cyan-glow/30 p-3 sm:p-4 shadow-[0_0_25px_rgba(0,229,255,0.08)] relative overflow-hidden flex flex-col justify-between">
          
          {/* Header Bar with Quick Motion State Buttons */}
          <div className="flex items-center justify-between border-b border-dark-outline/40 pb-2.5 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="font-headline text-[12px] sm:text-[13px] font-bold text-dark-on-surface">
                Robot Physical Motion
              </span>
            </div>
            
            {/* Quick Motion Selector Pills */}
            <div className="flex items-center gap-1 font-mono text-[10px]">
              <button 
                type="button" 
                onClick={() => setMotionState('seated')}
                className={`px-2 py-0.5 sm:py-1 rounded uppercase transition-all ${
                  motionState === 'seated'
                    ? 'bg-dark-primary text-dark-on-primary font-bold shadow-[0_0_8px_rgba(0,229,255,0.5)]'
                    : 'bg-dark-surface-container border border-dark-outline text-dark-on-surface/70 hover:text-cyan-glow'
                }`}
              >
                Seated
              </button>
              <button 
                type="button" 
                onClick={() => setMotionState('walking')}
                className={`px-2 py-0.5 sm:py-1 rounded uppercase transition-all ${
                  motionState === 'walking'
                    ? 'bg-dark-primary text-dark-on-primary font-bold shadow-[0_0_8px_rgba(0,229,255,0.5)]'
                    : 'bg-dark-surface-container border border-dark-outline text-dark-on-surface/70 hover:text-cyan-glow'
                }`}
              >
                Walk
              </button>
              <button 
                type="button" 
                onClick={() => setMotionState('stand')}
                className={`px-2 py-0.5 sm:py-1 rounded uppercase transition-all ${
                  motionState === 'stand'
                    ? 'bg-dark-primary text-dark-on-primary font-bold shadow-[0_0_8px_rgba(0,229,255,0.5)]'
                    : 'bg-dark-surface-container border border-dark-outline text-dark-on-surface/70 hover:text-cyan-glow'
                }`}
              >
                Stand
              </button>
            </div>
          </div>

          {/* Dynamic Robot Motion Visualizer: Responsive Height */}
          <div className="relative rounded-lg overflow-hidden h-64 sm:h-72 lg:h-[320px] bg-dark-surface-container flex items-center justify-center border border-cyan-glow/40 shadow-inner">
            <img 
              src={robotImageMap[motionState]} 
              alt={`AEGIS humanoid robot in ${motionState} state`} 
              className={`w-full h-full object-cover object-center ${motionState === 'seated' ? 'robot-motion-idle' : motionState === 'walking' ? 'animate-walk' : ''}`}
            />
            
            {/* Holographic Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none hud-scanline"></div>

            {/* Live HUD status tag */}
            <div className="absolute top-2.5 left-2.5 bg-dark-surface/90 backdrop-blur-md px-2.5 py-1 rounded border border-cyan-glow/40 font-mono text-[9px] sm:text-[10px] text-cyan-glow flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-active animate-ping"></span>
              <span>
                {motionState === 'seated' && 'KEYBOARD & PC HOOKED'}
                {motionState === 'walking' && 'GAIT LOCOMOTION TO DESK'}
                {motionState === 'stand' && 'QUANTUM SERVER CORE SYNC'}
              </span>
            </div>

            {/* Bottom Floating Acoustic Speech Bar */}
            <div className="absolute bottom-2.5 inset-x-2.5 bg-dark-surface/95 backdrop-blur-md p-2 rounded-lg border border-cyan-glow/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 h-4">
                  {audioLevels.map((lvl, idx) => (
                    <span 
                      key={idx}
                      className="w-1 bg-cyan-glow rounded-full transition-all duration-150"
                      style={{ height: `${Math.min(lvl, 20)}px` }}
                    />
                  ))}
                </div>
                <div>
                  <div className="font-headline text-[11px] sm:text-[12px] font-bold text-cyan-glow">
                    {isSpeaking ? 'VOICE SYNTHESIZING...' : isMicLive ? 'VOICE READY' : 'MIC PAUSED'}
                  </div>
                  <div className="font-mono text-[8px] sm:text-[9px] text-dark-on-surface/50">
                    ElevenLabs Neural · 0.12s latency
                  </div>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-emerald-active/15 text-emerald-active font-mono text-[8px] sm:text-[9px] font-bold">
                {isSpeaking ? 'SPEAKING' : 'LISTENING'}
              </span>
            </div>
          </div>

          {/* Live Hardware & Autonomous Task Gauges */}
          <div className="mt-2.5 grid grid-cols-2 gap-2 font-mono text-[10px] sm:text-[11px]">
            <div className="p-2 sm:p-2.5 rounded bg-dark-surface-container border border-dark-outline/50 space-y-0.5">
              <div className="text-[8px] sm:text-[9px] text-dark-on-surface/50 uppercase">PC Vision</div>
              <div className="text-cyan-glow font-bold flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5" />
                <span>Monitor #2 Live</span>
              </div>
            </div>
            <div className="p-2 sm:p-2.5 rounded bg-dark-surface-container border border-dark-outline/50 space-y-0.5">
              <div className="text-[8px] sm:text-[9px] text-dark-on-surface/50 uppercase">Memory Brain</div>
              <div className="text-amber-glow font-bold flex items-center gap-1">
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>4,816 Nodes</span>
              </div>
            </div>
          </div>

        </div>

        {/* Voice Capability Checklist Info */}
        <div className="p-3 rounded-lg bg-dark-surface border border-dark-outline/50 space-y-1.5 font-mono text-[10px] sm:text-[11px] text-dark-on-surface/70">
          <div className="text-cyan-glow font-bold flex items-center gap-1.5 uppercase text-[9px] sm:text-[10px]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Spoken Commands Supported:</span>
          </div>
          <div className="space-y-0.5 text-[10px] sm:text-[11px]">
            <div>• "AEGIS, sit at the computer and search..."</div>
            <div>• "Summarize this paper and save to brain"</div>
            <div>• "Type reply to team on Monitor 1"</div>
          </div>
        </div>

      </aside>

      {/* RIGHT PANEL: CONVERSATIONAL VOICE CHAT */}
      <main className="flex-1 flex flex-col justify-between bg-dark-surface p-4 sm:p-6 overflow-hidden">
        
        {/* Chat Dialogue Stream Container */}
        <div className="flex-1 overflow-y-auto space-y-4 sm:space-y-5 pr-1 sm:pr-2">
          
          <div className="flex items-center justify-center my-1 sm:my-2">
            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-dark-surface-container border border-dark-outline font-mono text-[9px] sm:text-[10px] text-dark-on-surface/50 uppercase tracking-widest text-center">
              Live Voice Session · Continuous 48kHz Stream
            </span>
          </div>

          {/* Render Messages */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 sm:gap-3.5 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 sm:w-9 h-8 sm:h-9 rounded-full flex items-center justify-center shrink-0 font-headline font-bold text-xs ${
                  isUser 
                    ? 'bg-dark-primary text-dark-on-primary shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                    : 'bg-dark-surface-container border border-cyan-glow/60 text-cyan-glow shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                }`}>
                  {isUser ? 'TK' : 'A7'}
                </div>

                {/* Bubble */}
                <div className={`elevated-chat-bubble flex-1 p-3.5 sm:p-4 rounded-2xl border space-y-2.5 ${
                  isUser 
                    ? 'bg-dark-surface-container-high/90 border-dark-outline/70 rounded-tr-sm' 
                    : 'bg-dark-surface-container border-cyan-glow/25 rounded-tl-sm shadow-md'
                }`}>
                  <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="font-headline font-bold text-cyan-glow">
                        {isUser ? 'TONY (YOU)' : 'AEGIS'}
                      </span>
                      {msg.badge && (
                        <span className="px-1.5 sm:px-2 py-0.5 rounded bg-cyan-glow/10 border border-cyan-glow/20 text-cyan-glow text-[8px] sm:text-[9px] font-bold">
                          {msg.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-dark-on-surface/40">{msg.time}</span>
                  </div>

                  <p className="font-body text-[13px] sm:text-base text-dark-on-surface leading-relaxed">
                    "{msg.text}"
                  </p>

                  {/* Browser Scraped Proof Box */}
                  {msg.browserProof && (
                    <div className="p-2.5 sm:p-3 rounded-lg bg-dark-surface border border-dark-outline/60 font-mono text-[10px] sm:text-[11px] space-y-1.5">
                      <div className="flex items-center justify-between text-amber-glow font-bold">
                        <span className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5" />
                          <span>{msg.browserProof.title}</span>
                        </span>
                        <span className="text-emerald-active">3 TABS SCRAPED</span>
                      </div>
                      <div className="space-y-0.5 text-dark-on-surface/80">
                        {msg.browserProof.tabs.map((tab, i) => (
                          <div key={i} className="flex justify-between flex-wrap gap-1">
                            <span>• {tab.url}:</span>
                            <span className="text-cyan-glow">{tab.note}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-1 border-t border-dark-outline/40 flex justify-between text-[9px] sm:text-[10px] text-dark-on-surface/50">
                        <span>SAVED TO MEMORY BRAIN:</span>
                        <span className="text-amber-glow font-semibold">{msg.browserProof.vectorNode}</span>
                      </div>
                    </div>
                  )}

                  {/* Robot Follow-Up Question */}
                  {msg.question && (
                    <div className="p-2.5 sm:p-3 rounded-lg bg-dark-surface-container-high border border-amber-glow/40 space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-glow font-headline font-semibold text-[12px] sm:text-[13px]">
                        <HelpCircle className="w-4 h-4" />
                        <span>AEGIS ASKS:</span>
                      </div>
                      <p className="font-body text-[12px] sm:text-sm text-dark-on-surface italic">
                        "{msg.question}"
                      </p>

                      {/* Verbal or Tap Choices */}
                      {msg.options && (
                        <div className="pt-1 flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-[11px]">
                          {msg.options.map((opt, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleOptionClick(opt)}
                              className="px-2.5 sm:px-3 py-1.5 rounded bg-dark-surface border border-cyan-glow/40 text-cyan-glow hover:bg-cyan-glow/10 transition-colors flex items-center gap-1.5"
                            >
                              <span>{opt}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Audio latency report */}
                  {msg.audioLatency && (
                    <div className="flex items-center gap-1.5 pt-1 font-mono text-[9px] sm:text-[10px] text-dark-on-surface/50">
                      <Volume2 className="w-3.5 h-3.5 text-emerald-active" />
                      <span>Spoken via ElevenLabs Neural Voice ({msg.audioLatency} latency)</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        </div>

        {/* BOTTOM HANDS-FREE WAKE-WORD VOICE CENTER */}
        <div className="pt-3 sm:pt-4 border-t border-cyan-500/15 space-y-2.5 sm:space-y-3">
          
          {/* Hands-Free Live Wake Word Listening Banner */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-dark-surface-container via-dark-surface-container-high to-dark-surface-container border-2 border-cyan-glow/50 shadow-[0_0_30px_rgba(0,229,255,0.18)] flex flex-col sm:flex-row items-center justify-between gap-3">
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Pulsing Holographic Ear & Mic Core */}
              <div 
                onClick={triggerWakeWord}
                className="relative w-10 h-10 rounded-full bg-cyan-glow/20 border border-cyan-glow flex items-center justify-center text-cyan-glow shrink-0 shadow-[0_0_15px_rgba(0,229,255,0.6)] cursor-pointer"
                title="Click to test wake word"
              >
                <span className="w-full h-full absolute rounded-full border border-cyan-glow animate-ping opacity-60"></span>
                <Mic className="w-5 h-5 text-cyan-glow" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-headline text-[14px] sm:text-[15px] font-bold text-dark-on-surface">
                    HANDS-FREE WAKE-WORD ACTIVE
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-active/20 border border-emerald-active/40 text-emerald-active font-mono text-[9px] sm:text-[10px] font-bold animate-pulse">
                    ALWAYS LISTENING
                  </span>
                </div>
                <p className="font-mono text-[11px] text-cyan-glow flex items-center gap-1.5 mt-0.5">
                  <span>Just say:</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-glow/15 border border-cyan-glow/40 text-cyan-glow font-bold tracking-wider uppercase text-[11px]">
                    "AEGIS, [your question]"
                  </span>
                  <span className="text-dark-on-surface/50 hidden md:inline">— no clicking or holding needed</span>
                </p>
              </div>
            </div>

            {/* Equalizer & Audio State Pill */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1 h-5 px-2.5 py-1 rounded bg-dark-surface border border-cyan-glow/30">
                {audioLevels.map((lvl, i) => (
                  <span
                    key={i}
                    className="w-1 bg-cyan-glow rounded-full transition-all duration-150"
                    style={{ height: `${Math.min(lvl, 16)}px` }}
                  />
                ))}
                <span className="font-mono text-[10px] text-emerald-active font-bold ml-1.5">
                  MIC LIVE
                </span>
              </div>

              <button 
                type="button" 
                onClick={() => setIsMicLive(!isMicLive)}
                className="px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-outline hover:border-cyan-glow text-dark-on-surface/70 hover:text-cyan-glow font-mono text-[11px] flex items-center gap-1.5 transition-colors"
                title="Mute Mic Trigger"
              >
                {isMicLive ? <Mic className="w-4 h-4 text-emerald-active" /> : <MicOff className="w-4 h-4 text-rose-400" />}
                <span className="hidden sm:inline">{isMicLive ? 'Mute' : 'Unmute'}</span>
              </button>
            </div>
          </div>

          {/* Secondary Auxiliary Typed Input Bar */}
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Keyboard className="absolute left-3 text-dark-on-surface/40 w-4 h-4 top-2.5" />
              <input 
                type="text" 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Secondary fallback: Type instruction or question if unable to speak..." 
                className="w-full bg-dark-surface-container border border-dark-outline rounded-lg pl-9 sm:pl-10 pr-16 sm:pr-20 py-2 font-mono text-[11px] sm:text-[12px] text-dark-on-surface placeholder:text-dark-on-surface/30 focus:border-cyan-glow outline-none"
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1 px-3 py-1 rounded bg-dark-surface border border-dark-outline text-dark-on-surface/70 hover:text-cyan-glow font-mono text-[9px] sm:text-[10px] font-semibold uppercase"
              >
                SEND
              </button>
            </div>
            <span className="hidden md:inline font-mono text-[10px] text-dark-on-surface/40 shrink-0">
              VOICE-PRIORITY
            </span>
          </form>

        </div>

      </main>

    </div>
  );
};
