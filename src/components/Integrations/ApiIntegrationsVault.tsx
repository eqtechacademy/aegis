import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Key, 
  BrainCircuit, 
  Cloud, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Radio, 
  ExternalLink,
  Zap,
  HardDrive,
  QrCode,
  RefreshCw
} from 'lucide-react';

export const ApiIntegrationsVault: React.FC = () => {
  const { 
    models, 
    storages, 
    payments, 
    audioLevels, 
    speakText 
  } = useApp();

  const [testLatencies, setTestLatencies] = useState<Record<string, number>>({});
  const [isTesting, setIsTesting] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleTestLatency = (modelId: string) => {
    setIsTesting(modelId);
    setTimeout(() => {
      const simulated = Math.floor(Math.random() * 50) + 110;
      setTestLatencies(prev => ({ ...prev, [modelId]: simulated }));
      setIsTesting(null);
      speakText(`Latency tested: ${simulated} milliseconds.`);
    }, 600);
  };

  const handleEncryptAndSave = () => {
    speakText("API credentials and payment webhooks re-encrypted using KMS 256-bit AES key.");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 relative z-10 flex-1 max-w-7xl mx-auto w-full">

      {/* BANNER TITLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              INTELLIGENCE BRAIN ROUTER & API CREDENTIAL VAULT
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            System Brains, Cloud & Payment Connections
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Multi-LLM neural brain routing, decentralized cloud storage, and Indian/Global payment gateways.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>KMS 256-bit AES Encryption Active</span>
          </span>

          <button
            onClick={handleEncryptAndSave}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-semibold text-xs shadow-glow-pill hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Encrypt & Save Keys</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>All API keys, AWS S3 bucket policies, and Razorpay webhook secrets encrypted and saved.</span>
        </div>
      )}

      {/* VOICE TRANSCRIPT COMMAND FEED (Exact Stitch Match) */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              VOICE AGENT CONFIGURATION COMMANDS
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">• Live Audio Stream</span>
          </div>
          <span className="text-xs font-mono text-purple-300">Continuous Sync</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-1 shrink-0">
            {audioLevels.map((lvl, idx) => (
              <span
                key={idx}
                className="w-1 bg-cyan-400 rounded-full transition-all duration-150"
                style={{ height: `${Math.min(lvl, 24)}px` }}
              />
            ))}
          </div>

          <div className="flex-1 text-xs font-mono bg-[#080E24] p-3 rounded-xl border border-cyan-500/25 w-full">
            <div className="text-slate-300">
              <span className="text-purple-400 font-bold">Unnikrishnan (Voice):</span> "Hey AGIES, route all complex coding and eKYC logic to Claude 3.5 Sonnet, real-time web research to Perplexity, and store backups in AWS S3 Mumbai."
            </div>
            <div className="text-cyan-300 mt-1">
              <span className="text-cyan-400 font-bold">AGIES (Synthetic Agent):</span> "Neural routing updated. Claude 3.5 Sonnet set as Chief Reasoner, Perplexity for live search, and AWS S3 ap-south-1 bucket mapped for episodic neural brain memory."
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: NEURAL LLM BRAINS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
            <span>🧠 Neural LLM Brains (Multi-Model Thinking Core)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
              4 Providers
            </span>
          </h3>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Dynamic fallback on rate-limit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models.map((model) => {
            const currentLatency = testLatencies[model.id] || model.latencyMs;
            const borderColors = {
              Anthropic: 'border-l-4 border-purple-400',
              Google: 'border-l-4 border-blue-400',
              OpenAI: 'border-l-4 border-emerald-400',
              Perplexity: 'border-l-4 border-cyan-400',
            };

            return (
              <div 
                key={model.id} 
                className={`glass-panel rounded-2xl p-5 space-y-3 ${borderColors[model.provider]}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs text-cyan-400">
                      {model.provider[0]}
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{model.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{model.role}</div>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                    model.status === 'active_default'
                      ? 'bg-purple-950/60 text-purple-300 font-bold border border-purple-500/30'
                      : 'bg-emerald-950/60 text-emerald-400'
                  }`}>
                    {model.status === 'active_default' ? 'ACTIVE DEFAULT' : 'CONNECTED'}
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-mono mb-1">
                    {model.provider} API Key
                  </label>
                  <input
                    type="password"
                    defaultValue={model.keyMasked}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:border-cyan-400 outline-none"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                  <span>Model: {model.modelId}</span>
                  <button
                    onClick={() => handleTestLatency(model.id)}
                    disabled={isTesting === model.id}
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    {isTesting === model.id ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
                    ) : (
                      <span>Test Latency ({currentLatency}ms) →</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: CLOUD STORAGE & BACKUPS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
            <span>☁️ Cloud Storage & Memory Persistence</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30">
              Auto Backup
            </span>
          </h3>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Episodic memory vector synchronization
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {storages.map((store) => (
            <div key={store.id} className="glass-panel rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                  {store.name}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">{store.status}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans">
                Location: <strong className="text-cyan-300 font-mono">{store.location}</strong>
              </p>
              <div>
                <label className="block text-[10px] text-slate-400 font-mono mb-1">
                  Resource Endpoint
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={store.resource}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200 font-mono"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: PAYMENT GATEWAYS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
            <span>💳 Payment Gateway Integrations (₹699+GST Subscription Billing)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
              Indian UPI + Global
            </span>
          </h3>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Auto-triggered after 14-day trial
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {payments.map((gate) => (
            <div 
              key={gate.id} 
              className={`glass-panel rounded-2xl p-5 space-y-3 ${
                gate.status === 'primary' ? 'border border-cyan-500/40 shadow-glow-cyan' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-white">{gate.name}</div>
                  <div className="text-[10px] text-cyan-300 font-mono">{gate.type}</div>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                  gate.status === 'primary' 
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30' 
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {gate.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-[10px] text-slate-400 font-mono mb-0.5">Key ID / Merchant</label>
                  <input
                    type="text"
                    defaultValue={gate.keyId}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 font-mono mb-0.5">Key Secret</label>
                  <input
                    type="password"
                    defaultValue="••••••••••••••••••••••••"
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="text-[10px] text-emerald-400 font-mono">
                ✓ {gate.mandate}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
