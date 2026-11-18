import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Workflow, 
  Play, 
  Plus, 
  Trash2, 
  Mic, 
  Globe, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Radio, 
  Sparkles,
  Zap
} from 'lucide-react';
import { AutomationRecipe } from '../../types';

export const AutomationWorkflowSetup: React.FC = () => {
  const { 
    recipes, 
    runRecipe, 
    audioLevels, 
    speakText, 
    setView 
  } = useApp();

  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(recipes[0]?.id || 'rec-1');
  const [showAddStepModal, setShowAddStepModal] = useState(false);
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepCategory, setNewStepCategory] = useState('Autonomous Browser CDP');
  const [newStepDesc, setNewStepDesc] = useState('');

  const currentRecipe = recipes.find(r => r.id === selectedRecipeId) || recipes[0];

  const handleExecuteTestRun = () => {
    if (currentRecipe) {
      runRecipe(currentRecipe.id);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 relative z-10 flex-1 max-w-7xl mx-auto w-full">

      {/* HEADER TITLE & TRIGGER SPEECH PHRASE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              AUTOMATION ENGINE · WORKFLOW #{currentRecipe?.id.toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Individual Automation & Recipe Builder
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure automated multi-step actions initiated by simple voice calls like Alexa without touching hardware.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">Spoken Trigger:</span>
            <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-950/70 to-purple-950/70 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold">
              "{currentRecipe?.triggerPhrase}"
            </span>
          </div>

          <button
            onClick={handleExecuteTestRun}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-semibold text-xs shadow-glow-pill hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Execute Test Run</span>
          </button>
        </div>
      </div>

      {/* VOICE TRANSCRIPT RECIPE LOGGER (Exact Stitch Match) */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              LIVE SPEECH-TO-AUTOMATION FEEDBACK
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">• Continuous Listening</span>
          </div>
          <span className="text-xs font-mono text-emerald-400">Trigger Keyword Active</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Voice Bars */}
          <div className="flex items-center gap-1 shrink-0">
            {audioLevels.map((lvl, idx) => (
              <span
                key={idx}
                className="w-1 bg-cyan-400 rounded-full transition-all duration-150"
                style={{ height: `${Math.min(lvl, 24)}px` }}
              />
            ))}
          </div>

          {/* Dialog Transcript */}
          <div className="flex-1 text-xs font-mono bg-[#080E24] p-3 rounded-xl border border-cyan-500/25 w-full">
            <div className="text-slate-300">
              <span className="text-purple-400 font-bold">Unnikrishnan (Voice):</span> "Hey AGIES, when I say 'Prepare Client Demo', open Kerala Bank staging portal, pull yesterday's eKYC stats, and ping Devika on Slack."
            </div>
            <div className="text-cyan-300 mt-1">
              <span className="text-cyan-400 font-bold">AGIES (Synthetic Agent):</span> "Recipe compiled into 3 automated steps. Assigned trigger phrase 'Prepare Client Demo' with zero button clicks required."
            </div>
          </div>
        </div>
      </div>

      {/* RECIPES SELECTOR TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {recipes.map((rec) => (
          <button
            key={rec.id}
            onClick={() => setSelectedRecipeId(rec.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 shrink-0 ${
              selectedRecipeId === rec.id
                ? 'bg-gradient-to-r from-cyan-500/30 to-purple-600/30 border border-cyan-400/50 text-cyan-300 shadow-glow-cyan'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${selectedRecipeId === rec.id ? 'text-cyan-400' : 'text-slate-500'}`} />
            <span>{rec.name}</span>
            {rec.status === 'running' && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            )}
          </button>
        ))}
      </div>

      {/* VISUAL AUTOMATION NODE PIPELINE (Exact Stitch Match) */}
      <div className="glass-panel rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cyan-500/20 gap-2">
          <div>
            <h3 className="text-base font-bold font-display text-white">
              Visual Workflow Pipeline: "{currentRecipe?.name}"
            </h3>
            <p className="text-xs text-slate-400">
              Auto-generated from your spoken voice instructions • Last Run: {currentRecipe?.lastRun || 'Idle'}
            </p>
          </div>
          <span className={`px-2.5 py-1 rounded-full font-mono text-xs ${
            currentRecipe?.status === 'running'
              ? 'bg-amber-950/60 border border-amber-500/40 text-amber-300 animate-pulse'
              : 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-400'
          }`}>
            Status: {currentRecipe?.status === 'running' ? 'Executing Live...' : 'Ready to Trigger'}
          </span>
        </div>

        {/* Pipeline Steps with Connectors */}
        <div className="space-y-3 relative">
          {currentRecipe?.steps.map((step, idx) => {
            const stepColors = [
              'border-cyan-500/30 bg-cyan-500/20 text-cyan-300',
              'border-purple-500/30 bg-purple-500/20 text-purple-300',
              'border-fuchsia-500/30 bg-fuchsia-500/20 text-fuchsia-300',
              'border-emerald-500/30 bg-emerald-500/20 text-emerald-300',
            ];
            const colorClass = stepColors[idx % stepColors.length];

            return (
              <React.Fragment key={step.stepNumber}>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors relative">
                  <div className={`w-8 h-8 rounded-lg border font-mono font-bold text-xs flex items-center justify-center shrink-0 ${colorClass}`}>
                    0{step.stepNumber}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{step.title}</span>
                      <span className="text-[11px] font-mono text-cyan-400">{step.category}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans">{step.description}</p>
                    <div className="text-[10px] font-mono text-slate-400">{step.detail}</div>
                  </div>
                </div>

                {/* Connector Gradient Bar */}
                {idx < currentRecipe.steps.length - 1 && (
                  <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 via-purple-500 to-fuchsia-500 ml-8 my-1"></div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Action Controls Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between border-t border-slate-800 gap-3">
          <button 
            onClick={() => setShowAddStepModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs border border-cyan-500/30 flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Next Step Node</span>
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => speakText("Recipe parameters reset.")}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 font-mono text-xs hover:text-white"
            >
              Reset Recipe
            </button>
            <button 
              onClick={() => {
                speakText("Voice automation recipe saved and deployed to neural core.");
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-mono text-xs font-bold shadow-glow-pill hover:opacity-95"
            >
              Save & Deploy Recipe
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
