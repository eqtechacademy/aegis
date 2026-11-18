import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sliders, 
  Mic, 
  Brain, 
  HardDrive, 
  CreditCard, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  Volume2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { availableNeuralBrains } from '../../services/brain/neuralBrainRouter';

export const SettingsPlatformHub: React.FC = () => {
  const { 
    activeBrainId, 
    setActiveBrainId, 
    spokenLanguage, 
    setSpokenLanguage, 
    speakText, 
    sendMessage,
    isMicLive,
    setIsMicLive,
    setView
  } = useApp();

  const [activeTab, setActiveTab] = useState<'voice' | 'brains' | 'storage' | 'billing'>('voice');
  const [sensitivity, setSensitivity] = useState(88);
  const [voicePersona, setVoicePersona] = useState('jarvis');
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSave = () => {
    setSavedNotification(true);
    speakText("Platform preferences and neural reasoning engines updated successfully.");
    setTimeout(() => setSavedNotification(false), 3000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 relative z-10 flex-1 max-w-7xl mx-auto w-full">
      
      {/* SECTION HEADER (Stitch Exact) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-display">
              Platform Configuration & AI Tuning
            </h1>
            <span className="text-xs px-2.5 py-1 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40 font-mono">
              v4.8 Pro Edition
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Manage hands-free voice parameters, multimodal LLM routing, cloud storage integrations, and workspace controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 font-mono bg-[#0B1430]/80 px-3 py-1.5 rounded-lg border border-[#1A2952]">
            <Mic className="w-3.5 h-3.5 text-cyan-400" />
            <span>Voice Trigger: <strong className="text-white">"Hey AGIES"</strong></span>
          </div>
          <button 
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white text-xs font-semibold shadow-glow-pill hover:opacity-95 transition flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* SETTINGS NAVIGATION TABS (Stitch Exact) */}
      <div className="flex items-center gap-2 border-b border-[#1A2952] pb-3 overflow-x-auto text-xs font-medium">
        <button 
          onClick={() => setActiveTab('voice')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition ${
            activeTab === 'voice'
              ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Mic className="w-4 h-4 text-cyan-400" />
          <span>Voice & Wake Word</span>
        </button>
        <button 
          onClick={() => setActiveTab('brains')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition ${
            activeTab === 'brains'
              ? 'bg-purple-950/60 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-500/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Brain className="w-4 h-4 text-purple-400" />
          <span>AI Model Brains</span>
        </button>
        <button 
          onClick={() => setActiveTab('storage')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition ${
            activeTab === 'storage'
              ? 'bg-blue-950/60 text-blue-300 border border-blue-500/40 shadow-sm shadow-blue-500/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <HardDrive className="w-4 h-4 text-blue-400" />
          <span>Storage & Cloud Sync</span>
        </button>
        <button 
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition ${
            activeTab === 'billing'
              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <CreditCard className="w-4 h-4 text-emerald-400" />
          <span>Billing & Indian Gateways</span>
        </button>
      </div>

      {/* SETTINGS GRID SECTIONS (Stitch Exact 2-Col + 1-Col Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT 2-COLS: MAIN CONFIG PANEL */}
        <div className="lg:col-span-2 space-y-6">

          {/* TAB 1: VOICE & WAKE WORD */}
          {activeTab === 'voice' && (
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm shadow-cyan-500/10">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white font-display">
                      Hands-Free "Hey AGIES" Wake Engine
                    </h2>
                    <p className="text-xs text-slate-400">
                      Autonomous microphone listening with zero required manual clicks
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsMicLive(!isMicLive)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${isMicLive ? 'bg-cyan-500' : 'bg-slate-800'}`}
                >
                  <span className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${isMicLive ? 'translate-x-5' : 'translate-x-0.5'}`}></span>
                </button>
              </div>

              {/* Wake Word Sensitivity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Wake Word Sensitivity Threshold</span>
                  <span className="text-cyan-400 font-bold">{sensitivity}% (High Precision)</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sensitivity}
                  onChange={(e) => setSensitivity(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Relaxed (50%)</span>
                  <span>Balanced (75%)</span>
                  <span>Strict / No False Triggers (95%)</span>
                </div>
              </div>

              {/* Persona and Language Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
                    Synthesizer Voice Persona
                  </label>
                  <select 
                    value={voicePersona}
                    onChange={(e) => setVoicePersona(e.target.value)}
                    className="w-full bg-slate-900 border border-[#1A2952] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="jarvis">AGIES Jarvis Core — Metallic / British Male</option>
                    <option value="nova">AGIES Nova Core — Calm / Neural Female</option>
                    <option value="concierge">EQMax Robotic Concierge v2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
                    Primary Spoken Language
                  </label>
                  <select 
                    value={spokenLanguage}
                    onChange={(e) => setSpokenLanguage(e.target.value as 'en' | 'ml')}
                    className="w-full bg-slate-900 border border-[#1A2952] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="en">English (US/India) — 48kHz Neural</option>
                    <option value="ml">Malayalam (മലയാളം - ml-IN) — Native Voice</option>
                  </select>
                </div>
              </div>

              {/* DeepFilterNet Noise Suppression */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-[#1A2952] flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">DeepFilterNet Noise Suppression</p>
                  <p className="text-[10px] text-slate-400">Cancels typing, cooling fans, and ambient coffee-shop chatter</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  Active
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: AI MODEL BRAINS */}
          {activeTab === 'brains' && (
            <div className="glass-panel p-6 rounded-2xl relative space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white font-display">
                      Default AI Reasoning Engines
                    </h2>
                    <p className="text-xs text-slate-400">
                      Assign model brains by execution complexity with automatic failover
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableNeuralBrains.map(brain => (
                  <div 
                    key={brain.id}
                    onClick={() => setActiveBrainId(brain.id)}
                    className={`p-4 rounded-xl border transition cursor-pointer ${
                      activeBrainId === brain.id
                        ? 'bg-purple-950/40 border-purple-500/80 shadow-glow-pill'
                        : 'bg-slate-900/80 border-[#1A2952] hover:border-purple-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-purple-400 font-semibold uppercase">
                        {brain.role}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300">
                        {brain.latency}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white mb-1">{brain.name}</p>
                    <p className="text-[11px] text-slate-400 mb-3">{brain.description}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] font-mono">
                      <span className="text-slate-500">Routing</span>
                      <span className="text-cyan-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        {activeBrainId === brain.id ? 'Active Primary' : 'Hot Standby'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STORAGE */}
          {activeTab === 'storage' && (
            <div className="glass-panel p-6 rounded-2xl relative space-y-6">
              <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-blue-400" />
                <span>Connected Cloud Storage Sync</span>
              </h2>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-[#1A2952]">
                  <div>
                    <p className="font-semibold text-white">Google Drive Workspace Integration</p>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5">Auto-saves transcripts and meeting summaries</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Connected (ap-south-1)
                  </span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-[#1A2952]">
                  <div>
                    <p className="font-semibold text-white">AWS S3 Mumbai Cold Storage Bucket</p>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5">Encrypted vector backup snapshots</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Online
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BILLING */}
          {activeTab === 'billing' && (
            <div className="glass-panel p-6 rounded-2xl relative space-y-6">
              <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <span>Billing & Indian Gateways</span>
              </h2>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-[#1A2952] font-mono text-xs space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Plan:</span>
                  <span className="text-white font-bold">14-Day Free Trial (₹0 Upfront)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Post-Trial Rate:</span>
                  <span className="text-cyan-400 font-bold">₹699.00 / month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">18% GST:</span>
                  <span className="text-slate-300">₹125.82</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 text-sm text-white font-bold">
                  <span>Total Recurring (Monthly):</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">₹824.82</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT 1-COL: BILLING STATUS & EQMAX FOOTER BADGE (Stitch Exact) */}
        <div className="space-y-6">
          
          {/* Subscription & Razorpay Status Card */}
          <div className="glass-panel p-6 rounded-2xl relative">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
              <span>Billing & Plan</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[10px]">
                Active Trial
              </span>
            </h3>

            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/70 to-slate-900/90 border border-purple-500/30 mb-4 shadow-lg shadow-cyan-500/10">
              <p className="text-xs text-slate-400 font-mono">Current Rate Card</p>
              <p className="text-2xl font-bold text-white tracking-tight mt-0.5 font-display">
                ₹699 <span className="text-xs font-normal text-slate-400 font-mono">+ 18% GST /mo</span>
              </p>
              <div className="mt-2.5 pt-2 border-t border-slate-800 flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">Next Auto-debit</span>
                <span className="text-cyan-300 font-semibold">14-Day Free Period</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between py-1.5 border-b border-[#1A2952]">
                <span className="text-slate-400">Payment Gateway</span>
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Razorpay Autopay
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#1A2952]">
                <span className="text-slate-400">GST Identification</span>
                <span className="text-slate-300 text-[11px]">36AABCE1234F1Z8</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Invoices</span>
                <button 
                  onClick={() => setView('pricing')}
                  className="text-cyan-400 hover:underline"
                >
                  Download Tax PDF
                </button>
              </div>
            </div>

            <button 
              onClick={() => setView('pricing')}
              className="mt-4 block w-full text-center py-2 rounded-lg bg-[#0B1430] hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-[#1A2952] transition font-mono"
            >
              Upgrade to Multi-Tenant Enterprise
            </button>
          </div>

          {/* EQMax Ecosystem Identity Card */}
          <div className="p-4 rounded-xl bg-[#0B1430]/40 border border-[#1A2952]/80 text-center space-y-1">
            <p className="text-[11px] text-slate-400">
              Engineered with precision for EQMax ecosystem tenants.
            </p>
            <p className="text-[10px] font-mono text-cyan-400">
              AGIES Framework • Build 2026.11-PRO
            </p>
          </div>

        </div>

      </div>

      {/* SAVED NOTIFICATION */}
      {savedNotification && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center justify-between shadow-glow-pill animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Platform preferences saved successfully.</span>
          </div>
        </div>
      )}

    </div>
  );
};
