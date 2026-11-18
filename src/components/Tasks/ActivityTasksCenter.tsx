import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ToolTaskAction, ApprovalTier } from '../../types';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldAlert, 
  RotateCcw, 
  ExternalLink, 
  Play, 
  X, 
  ListOrdered, 
  Search, 
  Terminal, 
  FileText, 
  Send, 
  CreditCard, 
  Layers,
  ArrowRight
} from 'lucide-react';

export const ActivityTasksCenter: React.FC = () => {
  const { 
    tasks, 
    approveTask, 
    rejectTask, 
    undoTask, 
    auditLogs, 
    activeApprovalModalTask, 
    setActiveApprovalModalTask, 
    activeTenant 
  } = useApp();

  const [filterTier, setFilterTier] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'queue' | 'audit'>('queue');

  const filteredTasks = tasks.filter((t) => {
    if (filterTier === 'all') return true;
    return t.tier === filterTier;
  });

  const getTierBadge = (tier: ApprovalTier) => {
    switch (tier) {
      case 'A':
        return {
          bg: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300',
          desc: 'Tier A: Low-Risk Read (Auto/Verified)',
        };
      case 'B':
        return {
          bg: 'bg-blue-950/60 border-blue-500/40 text-blue-300',
          desc: 'Tier B: Reversible Action (Has Undo)',
        };
      case 'C':
        return {
          bg: 'bg-amber-950/60 border-amber-500/40 text-amber-300',
          desc: 'Tier C: External Side Effect (Explicit Approval Req)',
        };
      case 'D':
        return {
          bg: 'bg-red-950/60 border-red-500/40 text-red-300',
          desc: 'Tier D: High Impact / Financial (Strict Confirmation)',
        };
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-2xl border border-cyan-500/25 bg-slate-900/60 backdrop-blur-md p-6 relative overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5 shadow-glow-cyan flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <ListOrdered className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-display text-white tracking-wide">
                  ACTIVITY & 4-TIER APPROVAL CENTER
                </h1>
                <p className="text-xs text-cyan-300/80 font-mono">
                  Controlled Tool Registry, Explicit Consent Tiers & Audit Ledger
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Every tool integration executed by AGIES follows strict security tiers. External side effects (Tier C) and financial/destructive actions (Tier D) require explicit manual confirmation. General requests or silence are never treated as consent.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950/80 border border-slate-700/60 font-mono text-xs">
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'queue'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Task Queue ({tasks.length})
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'audit'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Audit Trail ({auditLogs.length})
            </button>
          </div>
        </div>

        {/* 4-Tier Legend */}
        <div className="mt-5 pt-4 border-t border-cyan-500/15 grid grid-cols-2 md:grid-cols-4 gap-2.5 text-[11px] font-mono">
          <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
            <strong>Tier A:</strong> Low-risk read actions (Auto)
          </div>
          <div className="p-2 rounded-lg bg-blue-950/30 border border-blue-500/30 text-blue-300">
            <strong>Tier B:</strong> Reversible actions (Undo enabled)
          </div>
          <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300">
            <strong>Tier C:</strong> External side effects (Approval req)
          </div>
          <div className="p-2 rounded-lg bg-red-950/30 border border-red-500/30 text-red-300">
            <strong>Tier D:</strong> High-impact / financial (Strict)
          </div>
        </div>
      </div>

      {activeTab === 'queue' ? (
        <>
          {/* Tier Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {['all', 'A', 'B', 'C', 'D'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterTier(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                  filterTier === t
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t === 'all' ? 'All Tiers' : `Tier ${t}`}
              </button>
            ))}
          </div>

          {/* Task Queue Cards */}
          <div className="space-y-3.5">
            {filteredTasks.map((task) => {
              const tierInfo = getTierBadge(task.tier);
              const isPending = task.status === 'pending_approval';

              return (
                <div
                  key={task.id}
                  className={`rounded-xl border p-5 transition-all ${
                    isPending
                      ? 'bg-slate-900/90 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                      : task.status === 'completed'
                      ? 'bg-slate-900/60 border-cyan-500/20'
                      : 'bg-slate-950/60 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Info */}
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono ${tierInfo.bg}`}>
                          {task.tierLabel}
                        </span>

                        <span className="text-[11px] font-mono text-slate-400">
                          ID: <strong className="text-white">{task.id}</strong>
                        </span>

                        <span className="text-[11px] font-mono text-slate-500">•</span>

                        <span className="text-[11px] font-mono text-cyan-400">
                          Tool: {task.toolName}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white font-display">
                        {task.description}
                      </h3>

                      {/* Parameters snippet */}
                      <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 font-mono text-[11px] text-slate-300 max-w-xl">
                        <code>{JSON.stringify(task.parameters)}</code>
                      </div>

                      {task.result && (
                        <p className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 pt-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{task.result}</span>
                        </p>
                      )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {isPending ? (
                        <>
                          <button
                            onClick={() => setActiveApprovalModalTask(task)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-xs shadow-md hover:opacity-95 transition-opacity flex items-center gap-1.5"
                          >
                            <AlertTriangle className="w-4 h-4" />
                            <span>Review & Confirm</span>
                          </button>

                          <button
                            onClick={() => rejectTask(task.id)}
                            className="px-3 py-2 rounded-xl bg-red-950/50 hover:bg-red-900/60 border border-red-500/40 text-red-300 font-mono text-xs transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      ) : task.canUndo ? (
                        <button
                          onClick={() => undoTask(task.id)}
                          className="px-3.5 py-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/40 text-blue-300 font-mono text-xs transition-colors flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Undo Action</span>
                        </button>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 font-mono text-[11px]">
                          {task.status.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Audit Trail Ledger */
        <div className="rounded-xl border border-cyan-500/20 bg-slate-900/70 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-cyan-500/15 flex items-center justify-between">
            <h2 className="text-sm font-bold font-display text-white">
              Immutable Tool Execution Audit Log
            </h2>
            <span className="text-[11px] font-mono text-cyan-400">
              Verified Security Trace
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Time</th>
                  <th className="p-3">Requester</th>
                  <th className="p-3">Tool</th>
                  <th className="p-3">Tier</th>
                  <th className="p-3">Scope</th>
                  <th className="p-3">Outcome</th>
                  <th className="p-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 text-slate-400 whitespace-nowrap">{log.time}</td>
                    <td className="p-3 font-semibold text-white whitespace-nowrap">{log.requester}</td>
                    <td className="p-3 text-cyan-400 whitespace-nowrap">{log.tool}</td>
                    <td className="p-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px]">
                        Tier {log.tier}
                      </span>
                    </td>
                    <td className="p-3 max-w-xs truncate">{log.scope}</td>
                    <td className="p-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.outcome === 'Success'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                          : log.outcome === 'Denied'
                          ? 'bg-red-950 text-red-400 border border-red-500/40'
                          : 'bg-blue-950 text-blue-400 border border-blue-500/40'
                      }`}>
                        {log.outcome}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Explicit Confirmation Modal for Tier C & D Tasks */}
      {activeApprovalModalTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl border border-amber-500/50 bg-[#070E24] shadow-[0_0_50px_rgba(245,158,11,0.25)] p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/30 mb-4">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold font-display text-white">
                  Explicit Authorization Required
                </h2>
              </div>
              <button
                onClick={() => setActiveApprovalModalTask(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 leading-relaxed font-sans">
                <strong>Attention:</strong> AGIES has paused execution. In accordance with security protocol, this action produces external side effects or financial commitments and requires your explicit authorization.
              </div>

              <div>
                <span className="text-slate-400">Target Tool:</span>
                <p className="text-sm font-bold text-cyan-300 font-display mt-0.5">
                  {activeApprovalModalTask.toolName} ({activeApprovalModalTask.tierLabel})
                </p>
              </div>

              <div>
                <span className="text-slate-400">Proposed Action Scope:</span>
                <p className="text-slate-200 font-sans mt-0.5">
                  {activeApprovalModalTask.description}
                </p>
              </div>

              <div>
                <span className="text-slate-400">Parameters:</span>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 mt-1 overflow-x-auto text-cyan-300">
                  <pre>{JSON.stringify(activeApprovalModalTask.parameters, null, 2)}</pre>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => rejectTask(activeApprovalModalTask.id)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                >
                  Deny & Block Action
                </button>
                <button
                  type="button"
                  onClick={() => approveTask(activeApprovalModalTask.id)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 transition-opacity flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Grant Explicit Approval</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

