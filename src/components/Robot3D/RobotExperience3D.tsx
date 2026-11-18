import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Boxes, 
  Mic, 
  Monitor, 
  BrainCircuit, 
  MessageSquare, 
  Sparkles, 
  Footprints, 
  ArrowRight, 
  ExternalLink,
  Bot
} from 'lucide-react';

export const RobotExperience3D: React.FC = () => {
  const { 
    motionState, 
    setMotionState, 
    audioLevels, 
    speakText, 
    isSpeaking, 
    sendMessage 
  } = useApp();

  const [activeStep, setActiveStep] = useState<'walking' | 'seated' | 'talking'>('walking');
  const [userSpeechQuery, setUserSpeechQuery] = useState('');

  const handleStateClick = (step: 'walking' | 'seated' | 'talking') => {
    setActiveStep(step);
    if (step === 'walking') {
      setMotionState('walking');
      speakText("Initiating bipedal gait locomotion. Approaching computer desk.");
    } else if (step === 'seated') {
      setMotionState('seated');
      speakText("Seated in front of computer console. Monitor #2 and keyboard engaged.");
    } else {
      setMotionState('seated');
      speakText("I am searching IEEE and ArXiv preprints right now and reporting findings.");
    }
  };

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSpeechQuery.trim()) return;
    sendMessage(userSpeechQuery, false);
    setUserSpeechQuery('');
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 relative z-10 flex-1 max-w-7xl mx-auto w-full">

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              PHYSICAL EMBODIMENT · ROBOT MOTIONS & SENSORS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            AEGIS 3D Animated Robot Experience
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            When you ask to search or solve a task, AEGIS walks over, sits down in front of the workstation computer, opens the browser, and speaks naturally like a human.
          </p>
        </div>

        {/* Live Interactive State Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-700/80 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => handleStateClick('walking')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeStep === 'walking'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold shadow-glow-cyan'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            <span>🚶 1. Walking In</span>
          </button>
          <button
            type="button"
            onClick={() => handleStateClick('seated')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeStep === 'seated'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-[0_0_15px_rgba(57,217,122,0.4)]'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            <span>🪑 2. Seated at PC</span>
          </button>
          <button
            type="button"
            onClick={() => handleStateClick('talking')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeStep === 'talking'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold shadow-[0_0_15px_rgba(255,176,0,0.4)]'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            <span>🗣️ 3. Human Voice Search</span>
          </button>
        </div>
      </div>

      {/* HERO VISUALIZER SECTION (Exact Stitch Depth & Floor Grid) */}
      <section className="relative rounded-2xl bg-gradient-to-b from-dark-surface-container via-dark-surface to-dark-surface border border-cyan-glow/30 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,229,255,0.08)] overflow-hidden">
        
        {/* Background 3D Holographic Perspective Floor */}
        <div className="absolute inset-x-0 bottom-0 h-48 floor-grid pointer-events-none opacity-40"></div>

        {/* State Telemetry Banner */}
        <div className="relative z-10 flex items-center justify-between border-b border-dark-outline/40 pb-4 mb-6">
          <div className="space-y-1">
            <h3 className="font-headline text-lg sm:text-xl font-bold text-dark-on-surface tracking-wide flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-glow" />
              <span>Embodied Humanoid Assistant Node — AEGIS-7</span>
            </h3>
            <p className="font-mono text-xs text-dark-on-surface/60">
              GAIT ENGINE: READY • KEYBOARD CONTROLLER: HOOKED • MULTI-MONITOR CDP BROWSER: ONLINE
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] bg-dark-surface px-3 py-2 rounded-lg border border-dark-outline/60">
            <span className="text-cyan-glow font-bold">STATE TELEMETRY:</span>
            <span className="text-emerald-active font-semibold">
              {activeStep === 'walking' && 'GAIT NAVIGATION ACTIVE — WALKING TO DESK'}
              {activeStep === 'seated' && 'SEATED IN FRONT OF PC — KEYBOARD HOOKED'}
              {activeStep === 'talking' && 'CONVERSATIONAL SYNTHESIS — ASKING NEXT QUESTION'}
            </span>
          </div>
        </div>

        {/* 3D Two-State Dynamic Stage Representation */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">

          {/* Left Visual (7 Cols): Dual View Animation Container */}
          <div className="lg:col-span-7 perspective-stage">
            <div className="card-3d-elevated rounded-2xl bg-dark-surface-container-high/90 border-2 border-cyan-glow/40 p-4 shadow-[0_0_30px_rgba(0,229,255,0.15)] relative overflow-hidden group">
              
              {/* Walking View */}
              {activeStep === 'walking' && (
                <div className="relative rounded-xl overflow-hidden h-[380px] bg-dark-surface flex items-center justify-center">
                  <img
                    src="/assets/05261b24-21c5-46e9-9350-89b1403c123b_medium.webp"
                    alt="AEGIS humanoid robot walking forward into the laboratory"
                    className="w-full h-full object-cover object-top animate-walk"
                  />
                  <div className="absolute inset-0 pointer-events-none hud-scanline"></div>
                  
                  <div className="absolute top-4 left-4 bg-dark-surface/90 backdrop-blur-md px-3 py-1.5 rounded border border-cyan-glow/50 font-mono text-[11px] text-cyan-glow flex items-center gap-2">
                    <Footprints className="w-4 h-4" />
                    <span>MOTION // APPROACHING WORKSTATION</span>
                  </div>

                  <div className="absolute bottom-4 inset-x-4 bg-dark-surface/90 backdrop-blur-md p-3.5 rounded-lg border border-cyan-glow/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="font-headline text-[13px] font-bold text-dark-on-surface">
                        Approaching Terminal Console...
                        <div className="font-mono text-[11px] text-cyan-glow/70 font-normal">
                          "I hear you. Moving to seat in front of computer now."
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-cyan-glow/15 text-cyan-glow font-mono text-[10px] font-bold uppercase">
                      WALKING
                    </span>
                  </div>
                </div>
              )}

              {/* Seated View / Talking View */}
              {(activeStep === 'seated' || activeStep === 'talking') && (
                <div className="relative rounded-xl overflow-hidden h-[380px] bg-dark-surface flex items-center justify-center">
                  <img
                    src="/assets/c75b783f-6b86-49dd-8167-e5d4f7ce7818_medium.webp"
                    alt="AEGIS humanoid robot seated at computer desk"
                    className="w-full h-full object-cover object-center robot-motion-idle"
                  />
                  <div className="absolute inset-0 pointer-events-none hud-scanline"></div>

                  <div className="absolute top-4 left-4 bg-dark-surface/90 backdrop-blur-md px-3 py-1.5 rounded border border-emerald-active/50 font-mono text-[11px] text-emerald-active flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-active animate-ping"></span>
                    <span>SEATED // WORKSTATION MULTI-MONITOR ONLINE</span>
                  </div>

                  <div className="absolute bottom-4 inset-x-4 bg-dark-surface/90 backdrop-blur-md p-3.5 rounded-lg border border-amber-glow/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 h-5">
                        {audioLevels.map((lvl, idx) => (
                          <span
                            key={idx}
                            className="w-1 bg-amber-glow rounded-full transition-all duration-150"
                            style={{ height: `${Math.min(lvl, 20)}px` }}
                          />
                        ))}
                      </div>
                      <div>
                        <div className="font-headline text-[13px] font-bold text-amber-glow">
                          AEGIS IS SPEAKING & BROWSING
                        </div>
                        <div className="font-mono text-[11px] text-dark-on-surface/60">
                          Typing on keyboard & searching live data on Monitor #2
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-amber-glow/20 text-amber-glow font-mono text-[10px] font-bold uppercase">
                      TALKING
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Content (5 Cols): Interactive Conversation & Guided Autonomous Actions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl bg-dark-surface-container border border-cyan-glow/30 p-5 shadow-[0_0_20px_rgba(0,229,255,0.06)] space-y-3">
              <div className="flex items-center justify-between border-b border-dark-outline/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-glow" />
                  <span className="font-headline text-xs font-bold text-dark-on-surface">
                    Natural Human Dialogue
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-active">FULL DUPLEX VOX</span>
              </div>

              {/* Chat Transcript Demonstration */}
              <div className="space-y-3 font-body text-[13px]">
                {/* User Request */}
                <div className="p-3 rounded-lg bg-dark-surface border border-dark-outline/50 space-y-1">
                  <div className="font-mono text-[10px] text-cyan-glow flex items-center justify-between">
                    <span>YOU (SPOKEN COMMAND):</span>
                    <span>12:51 PM</span>
                  </div>
                  <p className="text-dark-on-surface font-medium text-xs">
                    "AEGIS, please sit in front of the computer and search for the latest semiconductor chip breakthrough papers, then tell me what you find."
                  </p>
                </div>

                {/* Robot Human-Like Answer */}
                <div className="p-3.5 rounded-lg bg-dark-surface-container-high border border-cyan-glow/40 shadow-[0_0_12px_rgba(0,229,255,0.08)] space-y-2">
                  <div className="font-mono text-[10px] text-amber-glow flex items-center justify-between font-bold">
                    <span>AEGIS (SPOKEN VOICE RESPONSE):</span>
                    <span className="text-emerald-active">ELEVENLABS TTS</span>
                  </div>
                  <p className="text-dark-on-surface italic leading-relaxed text-xs">
                    "I am sitting at the terminal now. I have navigated to IEEE and ArXiv on the curved display, analyzed four 2nm silicon photonics papers, and committed the summaries to our memory brain."
                  </p>
                  
                  {/* Question to user */}
                  <div className="pt-2 border-t border-dark-outline/40">
                    <p className="font-headline text-xs font-semibold text-cyan-glow">
                      "Would you like me to generate a side-by-side power efficiency comparison chart, or draft the executive summary memo first?"
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Tappable Answers */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => sendMessage("Generate a side-by-side power efficiency comparison chart", false)}
                  className="p-2.5 rounded bg-dark-surface border border-cyan-glow/40 text-cyan-glow hover:bg-cyan-glow/10 text-left transition-colors"
                >
                  Option A: Power Chart
                </button>
                <button
                  type="button"
                  onClick={() => sendMessage("Draft executive summary memo for semiconductor breakthroughs", false)}
                  className="p-2.5 rounded bg-dark-surface border border-amber-glow/40 text-amber-glow hover:bg-amber-glow/10 text-left transition-colors"
                >
                  Option B: Summary Memo
                </button>
              </div>

              {/* Live Voice Input Bar */}
              <form onSubmit={handleSendPrompt} className="relative flex items-center pt-2">
                <Mic className="absolute left-3 text-cyan-glow/70 w-4 h-4" />
                <input
                  type="text"
                  value={userSpeechQuery}
                  onChange={(e) => setUserSpeechQuery(e.target.value)}
                  placeholder="Speak naturally to AEGIS..."
                  className="w-full bg-dark-surface border border-dark-outline rounded-lg pl-9 pr-20 py-2 font-mono text-xs text-dark-on-surface placeholder:text-dark-on-surface/30 focus:border-cyan-glow outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1 px-3 py-1 rounded bg-dark-primary text-dark-on-primary font-headline text-[10px] font-bold uppercase tracking-wider hover:brightness-110"
                >
                  SEND
                </button>
              </form>
            </div>

            {/* Mini Hardware & Brain Telemetry */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-dark-surface-container border border-dark-outline/50 space-y-1">
                <div className="text-dark-on-surface/50 text-[10px]">AUTONOMOUS PC CONTROL</div>
                <div className="text-cyan-glow font-bold flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Monitors #1 & #2 Active</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-dark-surface-container border border-dark-outline/50 space-y-1">
                <div className="text-dark-on-surface/50 text-[10px]">MEMORY BRAIN VAULT</div>
                <div className="text-amber-glow font-bold flex items-center gap-1.5">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>4,816 Nodes Synced</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 3-STEP GUIDED PROCESS CARDS (Exact Stitch Match) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Step 1 */}
        <div className="card-3d-elevated p-5 rounded-2xl bg-dark-surface-container border border-cyan-glow/20 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between border-b border-dark-outline/40 pb-3">
            <span className="w-8 h-8 rounded-lg bg-dark-surface border border-cyan-glow/40 flex items-center justify-center font-mono text-cyan-glow font-bold text-xs">
              01
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow font-mono text-[10px]">
              EMBODIMENT
            </span>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-headline text-base font-semibold text-dark-on-surface">
              Walks to the Station
            </h4>
            <p className="font-body text-xs text-dark-on-surface/70 leading-relaxed">
              Upon voice trigger, AEGIS initiates its bipedal gait engine and approaches the designated computer workstation.
            </p>
          </div>
          <div className="pt-2 font-mono text-[11px] text-cyan-glow flex items-center gap-1">
            <Footprints className="w-3.5 h-3.5" />
            <span>Bipedal Navigation Active</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="card-3d-elevated p-5 rounded-2xl bg-dark-surface-container border border-amber-glow/20 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between border-b border-dark-outline/40 pb-3">
            <span className="w-8 h-8 rounded-lg bg-dark-surface border border-amber-glow/40 flex items-center justify-center font-mono text-amber-glow font-bold text-xs">
              02
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-glow/10 border border-amber-glow/30 text-amber-glow font-mono text-[10px]">
              WORKSTATION
            </span>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-headline text-base font-semibold text-dark-on-surface">
              Sits in Front of Computer
            </h4>
            <p className="font-body text-xs text-dark-on-surface/70 leading-relaxed">
              AEGIS seats itself in front of the curved monitor array, engages keyboard input, and opens isolated Chromium browser sandboxes.
            </p>
          </div>
          <div className="pt-2 font-mono text-[11px] text-amber-glow flex items-center gap-1">
            <Monitor className="w-3.5 h-3.5" />
            <span>Autonomous PC Search Online</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="card-3d-elevated p-5 rounded-2xl bg-dark-surface-container border border-emerald-active/20 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between border-b border-dark-outline/40 pb-3">
            <span className="w-8 h-8 rounded-lg bg-dark-surface border border-emerald-active/40 flex items-center justify-center font-mono text-emerald-active font-bold text-xs">
              03
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-active/10 border border-emerald-active/30 text-emerald-active font-mono text-[10px]">
              VOICE INTELLIGENCE
            </span>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-headline text-base font-semibold text-dark-on-surface">
              Conversational Voice & Answers
            </h4>
            <p className="font-body text-xs text-dark-on-surface/70 leading-relaxed">
              Speaks naturally in your chosen language, reports back findings, asks necessary follow-up questions, and persists neural memory.
            </p>
          </div>
          <div className="pt-2 font-mono text-[11px] text-emerald-active flex items-center gap-1">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Personal Assistant for Everyone</span>
          </div>
        </div>

      </section>

    </div>
  );
};
