import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FolderKanban, 
  Plus, 
  Mic, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Users
} from 'lucide-react';

export const ProjectsHub: React.FC = () => {
  const { 
    messages, 
    sendMessage, 
    audioLevels, 
    speakText, 
    isSpeaking,
    triggerWakeWord,
    isWakeWordActive
  } = useApp();

  const [newProjectName, setNewProjectName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleVoiceCommand = (cmd: string) => {
    sendMessage(cmd, false);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    sendMessage(`Create new project: ${newProjectName}`, false);
    speakText(`Project ${newProjectName} created and initialized in sprint pipeline.`);
    setNewProjectName('');
    setShowAddModal(false);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 relative z-10 flex-1 w-full">
      
      {/* HEADER SECTION (Stitch Exact) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              PROJECTS HUB · 3 ONGOING SPRINTS
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold font-display text-white">
            Active Projects & Sprints
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Manage deliverables, sprint velocities, and real-time client milestones with hands-free voice commands.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-cyan-300 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 hidden sm:block">
            Voice Call: <strong className="text-white">"Hey AGIES, show project velocity"</strong>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-medium text-xs shadow-glow-pill hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Project via Voice</span>
          </button>
        </div>
      </div>

      {/* VOICE TRANSCRIPT HUD BAR (Stitch Exact) */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              PROJECT VOICE ASSISTANT STREAM
            </span>
          </div>
          <span className="text-xs font-mono text-purple-300">Continuous Wake Mode</span>
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
          <div className="flex-1 text-xs font-mono bg-[#080E24] p-3 rounded-xl border border-cyan-500/25 w-full">
            <div className="text-slate-300">
              <span className="text-purple-400 font-bold">Unnikrishnan (Voice):</span> "Hey AGIES, move biometric testing task to QA Review in Kerala Bank sprint."
            </div>
            <div className="text-cyan-300 mt-1">
              <span className="text-cyan-400 font-bold">AGIES (Synthetic Agent):</span> "Task updated. Kerala Bank sprint moved to 75% progress. Team standup notification sent."
            </div>
          </div>
        </div>
      </div>

      {/* KANBAN SPRINTS GRID (Stitch Exact 3-Column Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* COLUMN 1: IN PROGRESS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 font-mono text-xs text-cyan-300">
            <span className="font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              IN PROGRESS (3)
            </span>
            <span className="text-slate-500">Active</span>
          </div>

          {/* Card 1: Kerala Bank */}
          <div className="glass-panel rounded-2xl p-5 space-y-3 border-l-4 border-cyan-400 hover:border-cyan-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                Kerala Bank
              </span>
              <span className="text-xs font-bold text-cyan-400 font-mono">75%</span>
            </div>
            <h4 className="font-bold text-sm text-white">eKYC Integration & Facial Auth</h4>
            <p className="text-xs text-slate-300">
              Completing biometric edge SDK testing across banking node cluster.
            </p>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full w-3/4 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1">
              <span>Target: Nov 24</span>
              <span>Devika + Anand</span>
            </div>
          </div>

          {/* Card 2: EQTech Academy */}
          <div className="glass-panel rounded-2xl p-5 space-y-3 border-l-4 border-purple-500 hover:border-purple-400 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
                EQTech Academy
              </span>
              <span className="text-xs font-bold text-purple-400 font-mono">60%</span>
            </div>
            <h4 className="font-bold text-sm text-white">Website v2 Student Portal</h4>
            <p className="text-xs text-slate-300">
              Client review demo scheduled for 2:00 PM today with executive board.
            </p>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-full w-3/5 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1">
              <span>Target: Dec 05</span>
              <span>Unnikrishnan</span>
            </div>
          </div>
        </div>

        {/* COLUMN 2: QA & CLIENT REVIEW */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 font-mono text-xs text-purple-300">
            <span className="font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              QA & CLIENT REVIEW (2)
            </span>
            <span className="text-slate-500">Verification</span>
          </div>

          {/* Card 3: Hospital Pro */}
          <div className="glass-panel rounded-2xl p-5 space-y-3 border-l-4 border-amber-400 hover:border-amber-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
                Hospital Pro
              </span>
              <span className="text-xs font-bold text-amber-400 font-mono">40%</span>
            </div>
            <h4 className="font-bold text-sm text-white">Cloud EHR Database Migration</h4>
            <p className="text-xs text-slate-300">
              Verifying HIPAA/DISHA encryption protocols in AWS Mumbai container.
            </p>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full w-2/5 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1">
              <span>Target: Dec 20</span>
              <span>Anand V.</span>
            </div>
          </div>
        </div>

        {/* COLUMN 3: DEPLOYED SPRINT */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 font-mono text-xs text-emerald-400">
            <span className="font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              DEPLOYED SPRINT (1)
            </span>
            <span className="text-slate-500">Done</span>
          </div>

          {/* Card 4: AGIES Engine */}
          <div className="glass-panel rounded-2xl p-5 space-y-3 border-l-4 border-emerald-400 hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                AGIES Engine
              </span>
              <span className="text-xs font-bold text-emerald-400 font-mono">100%</span>
            </div>
            <h4 className="font-bold text-sm text-white">Voice Core v4.8 Rollout</h4>
            <p className="text-xs text-slate-300">
              Continuous voice capture, zero-touch call triggers, and Indian payment gateways.
            </p>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full w-full rounded-full"></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1">
              <span>Shipped</span>
              <span>EQMax Team</span>
            </div>
          </div>
        </div>

      </div>

      {/* MODAL FOR NEW PROJECT */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl p-6 max-w-md w-full border border-cyan-500/30 space-y-4">
            <h3 className="text-lg font-bold font-display text-white">Create New Sprint Project</h3>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-mono">Project Name</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Cochin Port Logistics Platform"
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold shadow-glow-pill"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
