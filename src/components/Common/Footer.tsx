import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Cpu, Zap, Globe, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setView, role, activeTenant } = useApp();

  return (
    <footer className="border-t border-cyan-500/15 bg-[#060A18]/90 backdrop-blur-md px-4 sm:px-8 py-4 text-xs text-slate-400 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Branding & Status */}
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-cyan-300">Neural Engine v2.4 Online</span>
          </div>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <div className="flex items-center gap-1.5 font-mono text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>48kHz WebRTC</span>
          </div>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <div className="flex items-center gap-1.5 font-mono text-slate-400">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Edge Latency: 38ms</span>
          </div>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <div className="flex items-center gap-1.5 font-mono text-purple-300">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Tenant: {activeTenant.name}</span>
          </div>
        </div>

        {/* Center: Core Mandate Branding */}
        <div className="text-center font-medium text-slate-300 text-xs sm:text-sm">
          <span>Powered and Developed by </span>
          <strong className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 font-bold">
            EQMax Tech Solutions.
          </strong>
        </div>

        {/* Right: Quick Links & Plan Info */}
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <button 
            onClick={() => setView('pricing')}
            className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
          >
            14-Day Trial (₹0)
          </button>
          <span className="text-slate-600">•</span>
          <button 
            onClick={() => setView('integrations')}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            API Vault
          </button>
          <span className="text-slate-600">•</span>
          <button 
            onClick={() => setView('automations')}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            Recipes
          </button>
          <span className="text-slate-600">•</span>
          <span className="text-slate-500">
            Vercel Edge Optimized
          </span>
        </div>

      </div>
    </footer>
  );
};
