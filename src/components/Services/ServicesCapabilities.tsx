import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mic, 
  FileText, 
  BarChart3, 
  Globe, 
  Bot, 
  CreditCard, 
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const ServicesCapabilities: React.FC = () => {
  const { setView, triggerWakeWord, isSpeaking, speakText } = useApp();

  const handleStartTrial = () => {
    speakText("Welcome to AGIES. Your 14-day free trial is activated with zero upfront card requirement.");
    setView('dashboard');
  };

  return (
    <div className="max-w-7xl mx-auto w-full space-y-12 pb-12 animate-fade-in">
      
      {/* HERO SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          VOICE-FIRST SERVICE INTELLIGENCE
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
          Work Hands-Free with <span className="brand-gradient-text">AGIES</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Speak naturally to assign tasks, check project sprint milestones, draft client updates, or execute complex workflows with continuous real-time transcription.
        </p>

        {/* LIVE REAL-TIME TRANSCRIPT OVERLAY BOX */}
        <div className="glass-panel rounded-2xl p-4 sm:p-5 text-left font-mono text-xs max-w-2xl mx-auto mt-6">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
            <span className="text-cyan-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              LIVE VOICE AGENT TRANSCRIPT HUD
            </span>
            <span className="text-purple-300 text-[10px]">Instant Voice Command Execution</span>
          </div>
          <div className="space-y-2">
            <div className="text-slate-300">
              <span className="text-purple-400 font-bold">Unnikrishnan (Voice):</span> "Hey AGIES, start my 14-day trial without asking for credit card and show Kerala Bank status."
            </div>
            <div className="text-cyan-200">
              <span className="text-cyan-400 font-bold">AGIES (Synthetic Agent):</span> "Trial activated instantly with zero upfront card details. Kerala Bank eKYC integration is currently at 75% sprint completion."
            </div>
          </div>
        </div>
      </div>

      {/* 6 CORE SERVICE CAPABILITIES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1. Voice-Driven Task Management */}
        <div 
          onClick={() => setView('voice')}
          className="glass-panel rounded-2xl p-6 hover:border-cyan-400/50 transition-all space-y-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <Mic className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
            Voice-First Orchestration
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Full application control via speech. Just call "Hey AGIES" to navigate pages, create subtasks, and trigger neural actions hands-free.
          </p>
          <div className="text-[11px] font-mono text-cyan-400 pt-2 flex items-center justify-between">
            <span>Zero tactile friction • High accuracy</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 2. Continuous Voice Transcripts */}
        <div 
          onClick={() => setView('tenant')}
          className="glass-panel rounded-2xl p-6 hover:border-purple-400/50 transition-all space-y-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-white group-hover:text-purple-300 transition-colors">
            Automated Meeting & Chat Transcripts
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every conversation, instruction, and review call is streamed into high-precision, searchable transcripts with actionable bullet items.
          </p>
          <div className="text-[11px] font-mono text-purple-300 pt-2 flex items-center justify-between">
            <span>Multi-lingual • 99.4% intent match</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 3. Project Velocity Tracking */}
        <div 
          onClick={() => setView('dashboard')}
          className="glass-panel rounded-2xl p-6 hover:border-cyan-400/50 transition-all space-y-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
            Enterprise Sprint Dashboards
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Real-time metrics, burndown status, and visual timeline monitoring for ongoing initiatives like Kerala Bank eKYC and EQTech Academy.
          </p>
          <div className="text-[11px] font-mono text-cyan-400 pt-2 flex items-center justify-between">
            <span>Automated burndown calculation</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 4. Autonomous Web Intelligence */}
        <div 
          onClick={() => setView('automations')}
          className="glass-panel rounded-2xl p-6 hover:border-purple-400/50 transition-all space-y-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-white group-hover:text-purple-300 transition-colors">
            Autonomous Web Agent
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Executes browser tasks, compiles research dossiers, and checks client portals autonomously with isolated sandbox safety.
          </p>
          <div className="text-[11px] font-mono text-purple-300 pt-2 flex items-center justify-between">
            <span>CDP-based sandbox execution</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 5. 3D Robotic Interactive Presence */}
        <div 
          onClick={() => setView('robot3d')}
          className="glass-panel rounded-2xl p-6 hover:border-cyan-400/50 transition-all space-y-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
            Robotic Motion & Avatars
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Interactive walking robot animations, workstation idle stances, and audio reactive facial wavebars bringing your AI partner to life.
          </p>
          <div className="text-[11px] font-mono text-cyan-400 pt-2 flex items-center justify-between">
            <span>Kinetic 3D motion states</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 6. Transparent Subscription Tier */}
        <div 
          onClick={() => setView('pricing')}
          className="glass-panel rounded-2xl p-6 hover:border-purple-400/50 transition-all space-y-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <CreditCard className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-white group-hover:text-purple-300 transition-colors">
            14-Day Free Trial (₹699+GST)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Experience full features without adding payment cards. Only after 14 days do you renew at the minimum price of ₹699 + 18% GST (₹824.82 total).
          </p>
          <div className="text-[11px] font-mono text-emerald-400 pt-2 flex items-center justify-between">
            <span>No hidden fees • Instant cancel</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* DIRECT 14-DAY TRIAL REDIRECT CALL TO ACTION */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-slate-900/60 border border-cyan-400/30">
        <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
          Ready to experience AGIES?
        </h3>
        <p className="text-sm text-slate-300 mt-2 max-w-xl mx-auto">
          Activate your 14-day full platform access immediately with zero payment card requirement.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleStartTrial}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-bold text-sm shadow-glow-pill hover:scale-105 transition-transform"
          >
            Launch Dashboard Now (Trial Mode)
          </button>
          <button 
            onClick={() => setView('pricing')}
            className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-sm transition-colors"
          >
            View Pricing (₹699+GST)
          </button>
        </div>
      </div>

    </div>
  );
};

