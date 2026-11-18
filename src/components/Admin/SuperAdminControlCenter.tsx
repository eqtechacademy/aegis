import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Building2, 
  CreditCard, 
  Mic, 
  Plus, 
  Search, 
  ExternalLink,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export const SuperAdminControlCenter: React.FC = () => {
  const { 
    messages, 
    sendMessage, 
    audioLevels, 
    speakText, 
    isSpeaking,
    triggerWakeWord,
    isWakeWordActive,
    setView
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [showProvisionModal, setShowProvisionModal] = useState(false);
  const [newTenantName, setNewTenantName] = useState('');
  const [newTenantDomain, setNewTenantDomain] = useState('');

  const [tenants, setTenants] = useState([
    {
      id: 'kerala-bank',
      name: 'Kerala Bank HQ',
      seats: '18 Team Seats',
      domain: 'keralabank.eqmaxtech.com',
      status: 'PAID ACTIVE',
      trialStatus: 'Converted (₹699+GST)',
      voiceAgent: 'Continuous Speech ON',
      statusCol: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 'eqtech',
      name: 'EQTech Academy',
      seats: '24 Team Seats',
      domain: 'eqtechacademy.eqmaxtech.com',
      status: 'PAID ACTIVE',
      trialStatus: 'Converted (₹699+GST)',
      voiceAgent: 'Transcripts ON',
      statusCol: 'bg-purple-950/60 text-purple-300 border-purple-500/30'
    },
    {
      id: 'hospital-pro',
      name: 'Hospital Management Pro',
      seats: '8 Team Seats',
      domain: 'hospitalpro.eqmaxtech.com',
      status: '14-DAY TRIAL',
      trialStatus: '2 Days Remaining',
      voiceAgent: 'Trial Active',
      statusCol: 'bg-amber-950/60 text-amber-300 border-amber-500/30'
    },
    {
      id: 'apex-logistics',
      name: 'Apex Logistics Kochi',
      seats: '14 Team Seats',
      domain: 'apexlogistics.eqmaxtech.com',
      status: 'PAID ACTIVE',
      trialStatus: 'Converted (₹699+GST)',
      voiceAgent: 'Continuous Speech ON',
      statusCol: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
    }
  ]);

  const handleProvisionTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenantName.trim()) return;
    const slug = newTenantDomain || `${newTenantName.toLowerCase().replace(/\s+/g, '')}.eqmaxtech.com`;
    const newT = {
      id: `tenant-${Date.now()}`,
      name: newTenantName,
      seats: '10 Team Seats',
      domain: slug,
      status: '14-DAY TRIAL',
      trialStatus: '14 Days Remaining',
      voiceAgent: 'Trial Active',
      statusCol: 'bg-amber-950/60 text-amber-300 border-amber-500/30'
    };
    setTenants([newT, ...tenants]);
    speakText(`Corporate tenant ${newTenantName} provisioned with 14-day free trial on domain ${slug}.`);
    sendMessage(`Provisioned new tenant: ${newTenantName} (${slug})`, false);
    setNewTenantName('');
    setNewTenantDomain('');
    setShowProvisionModal(false);
  };

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.domain.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 relative z-10 flex-1 w-full">
      
      {/* HEADER SECTION (Stitch Exact) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              SUPER ADMIN CLUSTER · {tenants.length} CORPORATE TENANTS
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold font-display text-white">
            Super Admin Command Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Cross-tenant infrastructure orchestration, automated billing, and live voice command oversight.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold hidden sm:block">
            ₹699+GST / mo (Razorpay Autopay)
          </div>
          <button 
            onClick={() => setShowProvisionModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-medium text-xs shadow-glow-pill hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Provision Tenant</span>
          </button>
        </div>
      </div>

      {/* SUPER ADMIN SPEECH COMMAND HUD (Stitch Exact) */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              SUPER ADMIN SPEECH COMMAND HUD
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400">Trigger: "Hey AGIES, Admin Status"</span>
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
              <span className="text-purple-400 font-bold">Master Admin (Voice):</span> "Hey AGIES, list all companies converted from 14-day trial to paid plan this week."
            </div>
            <div className="text-cyan-300 mt-1">
              <span className="text-cyan-400 font-bold">AGIES (Super Agent):</span> "4 corporate tenants converted: Kerala Bank HQ, EQTech Academy, Apex Logistics, and Orion FinTech. Total MRR impact: +₹3,299.28 incl. GST."
            </div>
          </div>
        </div>
      </div>

      {/* METRICS 4-COL ROW (Stitch Exact) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="glass-panel rounded-2xl p-4">
          <div className="text-slate-400 text-xs">Total Tenants</div>
          <div className="text-3xl font-extrabold font-display text-white mt-1">48</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-semibold">↑ 6 joined this week</div>
        </div>

        <div className="glass-panel rounded-2xl p-4">
          <div className="text-slate-400 text-xs">14-Day Free Trials</div>
          <div className="text-3xl font-extrabold font-display text-cyan-400 mt-1">19</div>
          <div className="text-[11px] text-slate-400 mt-1">No card required</div>
        </div>

        <div className="glass-panel rounded-2xl p-4">
          <div className="text-slate-400 text-xs">Paid Active (₹699+GST)</div>
          <div className="text-3xl font-extrabold font-display text-purple-400 mt-1">29</div>
          <div className="text-[11px] text-purple-300 mt-1 font-semibold">₹23,919.78 MRR</div>
        </div>

        <div className="glass-panel rounded-2xl p-4">
          <div className="text-slate-400 text-xs">Voice Transcripts Streamed</div>
          <div className="text-3xl font-extrabold font-display text-white mt-1">124.8k</div>
          <div className="text-[11px] text-cyan-300 mt-1 font-semibold">99.4% intent match</div>
        </div>
      </div>

      {/* MASTER TENANTS DIRECTORY TABLE (Stitch Exact) */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyan-500/20">
          <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
            <span>Corporate Tenants Directory</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
              Live Sync
            </span>
          </h3>
          <div className="relative">
            <input 
              type="text" 
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter company name or CNAME domain..." 
              className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg pl-8 pr-3 py-1.5 font-sans focus:outline-none focus:border-cyan-400 w-64"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="py-3 px-3">COMPANY NAME</th>
                <th className="py-3 px-3">SUBDOMAIN / CNAME</th>
                <th className="py-3 px-3">SUBSCRIPTION TIER</th>
                <th className="py-3 px-3">TRIAL STATUS</th>
                <th className="py-3 px-3">VOICE AGENT</th>
                <th className="py-3 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200 font-mono text-xs">
              {filteredTenants.map(t => (
                <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-white font-sans">{t.name}</div>
                    <div className="text-[10px] text-slate-400">{t.seats}</div>
                  </td>
                  <td className="py-3.5 px-3 text-cyan-400">
                    {t.domain}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] border font-bold ${t.statusCol}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-300 font-semibold">
                    {t.trialStatus}
                  </td>
                  <td className="py-3.5 px-3 text-cyan-300">
                    {t.voiceAgent}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button 
                      onClick={() => setView('projects')}
                      className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition"
                    >
                      Open Portal →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROVISION TENANT MODAL */}
      {showProvisionModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl p-6 max-w-md w-full border border-cyan-500/30 space-y-4">
            <h3 className="text-lg font-bold font-display text-white">Provision New Corporate Tenant</h3>
            <form onSubmit={handleProvisionTenant} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-mono">Company Legal Name</label>
                <input
                  type="text"
                  value={newTenantName}
                  onChange={(e) => setNewTenantName(e.target.value)}
                  placeholder="e.g. Malabar Gold & Diamonds"
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-mono">Custom Subdomain / CNAME</label>
                <input
                  type="text"
                  value={newTenantDomain}
                  onChange={(e) => setNewTenantDomain(e.target.value)}
                  placeholder="e.g. malabar.eqmaxtech.com"
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProvisionModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold shadow-glow-pill"
                >
                  Provision with 14d Trial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

