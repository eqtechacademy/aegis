import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart2, 
  FileText, 
  TrendingUp, 
  Download, 
  Sparkles, 
  Mic, 
  CheckCircle2, 
  Clock, 
  Cpu 
} from 'lucide-react';

export const ReportsAnalyticsHub: React.FC = () => {
  const { 
    messages, 
    sendMessage, 
    audioLevels, 
    speakText, 
    isSpeaking,
    triggerWakeWord,
    isWakeWordActive
  } = useApp();

  const [generatingDossier, setGeneratingDossier] = useState(false);
  const [dossierDone, setDossierDone] = useState(false);

  const handleGenerateDossier = () => {
    setGeneratingDossier(true);
    speakText("Compiling weekly executive PDF dossier with sprint burn rate and neural intent metrics. Uploading to Google Drive.");
    sendMessage("Generate weekly sprint velocity & intelligence PDF dossier", false);
    
    setTimeout(() => {
      setGeneratingDossier(false);
      setDossierDone(true);
      setTimeout(() => setDossierDone(false), 4000);
    }, 2000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 relative z-10 flex-1 w-full">
      
      {/* HEADER SECTION (Stitch Exact) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              REPORTS & INTELLIGENCE AUDIT · CYCLE #4
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold font-display text-white">
            Sprint Velocity & Intelligence Reports
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Export executive PDF summaries, review intent match rates, and download audit logs with voice commands.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-cyan-300 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 hidden sm:block">
            Voice Call: <strong className="text-white">"Hey AGIES, email sprint report"</strong>
          </div>
          <button 
            onClick={handleGenerateDossier}
            disabled={generatingDossier}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-medium text-xs shadow-glow-pill hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            {generatingDossier ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <FileText className="w-4 h-4" />
            )}
            <span>{generatingDossier ? 'Compiling Dossier...' : 'Generate Voice PDF Dossier'}</span>
          </button>
        </div>
      </div>

      {/* AUTOMATED DOSSIER GENERATION STREAM (Stitch Exact) */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              AUTOMATED DOSSIER GENERATION STREAM
            </span>
          </div>
          <span className="text-xs font-mono text-purple-300">Continuous Wake Sync</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-1">
            {audioLevels.slice(0, 5).map((lvl, idx) => (
              <span 
                key={idx}
                className="w-1 bg-cyan-400 wave-bar rounded-full" 
                style={{ height: `${Math.max(8, Math.min(lvl, 24))}px`, animationDelay: `${idx * 0.1}s` }}
              />
            ))}
          </div>
          <div className="flex-1 text-xs font-mono bg-[#050916] p-3 rounded-xl border border-cyan-500/25 w-full">
            <div className="text-slate-300">
              <span className="text-purple-400 font-bold">Unnikrishnan (Voice):</span> "Hey AGIES, compile our sprint burn rate and upload PDF dossier to Google Drive."
            </div>
            <div className="text-cyan-300 mt-1">
              <span className="text-cyan-400 font-bold">AGIES (Synthetic Agent):</span> "Dossier compiled. Sprint velocity increased by 12% with 85% milestone completion. Saved to Google Drive folder 'AGIES_Transcripts_2026'."
            </div>
          </div>
        </div>
      </div>

      {/* METRIC CHARTS 3-COL ROW (Stitch Exact) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 1: Sprint Throughput */}
        <div className="glass-panel rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Sprint Throughput</span>
            <span className="text-emerald-400 font-bold">↑ 12%</span>
          </div>
          <div className="text-3xl font-extrabold font-display text-white">85%</div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-2">
            <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full w-[85%] rounded-full"></div>
          </div>
          <p className="text-[11px] text-slate-400 font-mono mt-1">
            48 of 56 sprint stories delivered
          </p>
        </div>

        {/* 2: Speech-to-Intent Match */}
        <div className="glass-panel rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Speech-to-Intent Match</span>
            <span className="text-cyan-400 font-bold">99.4%</span>
          </div>
          <div className="text-3xl font-extrabold font-display text-white">124.8k</div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-2">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full w-[99.4%] rounded-full"></div>
          </div>
          <p className="text-[11px] text-slate-400 font-mono mt-1">
            Audio words transcribed this month
          </p>
        </div>

        {/* 3: Neural Tokens Consumed */}
        <div className="glass-panel rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Neural Tokens Consumed</span>
            <span className="text-purple-300 font-bold">Optimized</span>
          </div>
          <div className="text-3xl font-extrabold font-display text-white">1.8M</div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-2">
            <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-full w-[65%] rounded-full"></div>
          </div>
          <p className="text-[11px] text-slate-400 font-mono mt-1">
            Claude 3.5 Sonnet + Gemini routing
          </p>
        </div>

      </div>

      {/* CONFIRMATION NOTIFICATION */}
      {dossierDone && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center justify-between shadow-glow-pill animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>PDF Dossier compiled successfully and synchronized with Google Drive & AWS S3 Mumbai.</span>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-200">
            Saved
          </span>
        </div>
      )}

    </div>
  );
};

