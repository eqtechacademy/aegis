import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Users, 
  CreditCard, 
  Mic, 
  Search, 
  Download, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Radio, 
  X,
  ArrowRight
} from 'lucide-react';
import { Tenant } from '../../types';

export const SuperAdminPortal: React.FC = () => {
  const { 
    tenants, 
    addTenant, 
    audioLevels, 
    setView, 
    setActiveTenantId,
    speakText,
    isSpeaking
  } = useApp();

  const [filterText, setFilterText] = useState('');
  const [showProvisionModal, setShowProvisionModal] = useState(false);

  // New Tenant Form state
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgSlug, setNewOrgSlug] = useState('');
  const [newOrgDomain, setNewOrgDomain] = useState('');
  const [newPlan, setNewPlan] = useState('14-Day Free Trial');

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(filterText.toLowerCase()) ||
    t.domain.toLowerCase().includes(filterText.toLowerCase()) ||
    t.slug.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleProvisionTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName.trim()) return;

    const slug = newOrgSlug || newOrgName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const domain = newOrgDomain || `${slug}.eqmaxtech.com`;

    addTenant({
      name: newOrgName,
      slug,
      domain,
      status: 'trial',
      trialDaysRemaining: 14,
      voiceAgentStatus: '3D Robot + Voice ON',
      monthlyBilling: '₹0 (14-Day Trial Active)',
      plan: newPlan,
      memberCount: 1,
      wakeWord: `Hey AGIES, ${newOrgName}`,
    });

    speakText(`Tenant ${newOrgName} successfully provisioned on Asia South 1 cluster.`);
    setNewOrgName('');
    setNewOrgSlug('');
    setNewOrgDomain('');
    setShowProvisionModal(false);
  };

  const handleExportCSV = () => {
    const headers = ['Tenant Name,Slug,Domain,Status,Trial Days,Voice Status,Billing,Members\n'];
    const rows = tenants.map(t => 
      `"${t.name}","${t.slug}","${t.domain}","${t.status}",${t.trialDaysRemaining},"${t.voiceAgentStatus}","${t.monthlyBilling}",${t.memberCount}`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AEGIS-Tenants-Report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const handleManageTenant = (tenant: Tenant) => {
    setActiveTenantId(tenant.id);
    setView('tenant');
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 relative z-10 flex-1 max-w-7xl mx-auto w-full">

      {/* HEADER TITLE & STATS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              MULTI-TENANT SAAS CLOUD · CLUSTER ASIA-SOUTH-1 (MUMBAI)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            SaaS Tenant Overview & Control
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage active corporate tenants, trial expirations, automated voice agents, and subscription billing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowProvisionModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-semibold text-xs shadow-glow-pill hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Provision New Tenant</span>
          </button>
        </div>
      </div>

      {/* ADMIN VOICE AGENT HUD TRANSCRIPT BAR (Exact Stitch Match) */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              SUPER ADMIN VOICE COMMAND INTERFACE
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">• Continuous Listening</span>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            Trigger: "Hey AGIES, Admin Command"
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Waveform Equalizer */}
          <div className="flex items-center gap-1 shrink-0">
            {audioLevels.map((lvl, i) => (
              <span
                key={i}
                className="w-1 bg-cyan-400 rounded-full transition-all duration-150"
                style={{ height: `${Math.min(lvl, 26)}px` }}
              />
            ))}
          </div>

          {/* Transcript Dialog */}
          <div className="flex-1 text-xs font-mono bg-[#080E24] p-3 rounded-xl border border-cyan-500/25 w-full">
            <div className="text-slate-300">
              <span className="text-purple-400 font-bold">Admin (Voice):</span> "Hey AGIES, list all tenants nearing 14-day trial deadline."
            </div>
            <div className="text-cyan-300 mt-1">
              <span className="text-cyan-400 font-bold">AGIES (Super Agent):</span> "2 tenants have 1 day remaining: 'Hospital Management Pro' and 'Apex Logistics'. 4 tenants converted to ₹699+GST autopay."
            </div>
          </div>
        </div>
      </div>

      {/* SAAS METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4">
          <div className="text-slate-400 text-xs font-medium">Total Active Tenants</div>
          <div className="mt-2 text-3xl font-extrabold font-display text-white">48</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-mono">↑ 6 joined this week</div>
        </div>

        <div className="glass-panel rounded-2xl p-4">
          <div className="text-slate-400 text-xs font-medium">14-Day Free Trials</div>
          <div className="mt-2 text-3xl font-extrabold font-display text-cyan-400">19</div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">Zero card required</div>
        </div>

        <div className="glass-panel rounded-2xl p-4">
          <div className="text-slate-400 text-xs font-medium">Paid Conversions (₹699+GST)</div>
          <div className="mt-2 text-3xl font-extrabold font-display text-purple-400">29</div>
          <div className="text-[11px] text-purple-300 mt-1 font-mono">₹23,919.78 MRR</div>
        </div>

        <div className="glass-panel rounded-2xl p-4">
          <div className="text-slate-400 text-xs font-medium">Voice Transcripts Indexed</div>
          <div className="mt-2 text-3xl font-extrabold font-display text-white">124,800</div>
          <div className="text-[11px] text-cyan-300 mt-1 font-mono">99.4% intent accuracy</div>
        </div>
      </div>

      {/* MULTI-TENANT DIRECTORY TABLE & CONTROLS */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-cyan-500/20 gap-3">
          <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
            <span>Corporate Tenants Directory</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
              Live Sync
            </span>
          </h3>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <input 
                type="text" 
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filter tenant or domain..." 
                className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-cyan-400 font-sans"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            </div>
            <button 
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-700 font-mono flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="py-3 px-4">TENANT NAME / SLUG</th>
                <th className="py-3 px-4">PLAN STATUS</th>
                <th className="py-3 px-4">TRIAL DAYS REMAINING</th>
                <th className="py-3 px-4">VOICE AGENT STATUS</th>
                <th className="py-3 px-4">MONTHLY BILLING</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredTenants.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-[11px] font-mono text-cyan-400">{t.domain}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    {t.status === 'paid' ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                        PAID ACTIVE
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold">
                        14-DAY TRIAL
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {t.status === 'paid' ? (
                      <span className="text-slate-400">Completed (Converted)</span>
                    ) : (
                      <span className={t.trialDaysRemaining <= 2 ? 'text-amber-300 font-bold' : 'text-cyan-300 font-bold'}>
                        {t.trialDaysRemaining} Days Left {t.trialDaysRemaining <= 2 ? '(Card Pending)' : '(Free)'}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center gap-1.5 text-cyan-300 font-mono text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                      {t.voiceAgentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    {t.monthlyBilling}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => handleManageTenant(t)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-400/50 text-cyan-300 font-mono text-[11px] transition-colors"
                    >
                      Manage Tenant →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROVISION NEW TENANT MODAL */}
      {showProvisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel rounded-2xl p-6 max-w-lg w-full border border-cyan-400/40 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-bold text-lg text-white">Provision New SaaS Tenant</h3>
              </div>
              <button 
                onClick={() => setShowProvisionModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProvisionTenant} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Tenant Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme FinTech Corp"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Subdomain Slug</label>
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-3 py-2">
                  <input
                    type="text"
                    placeholder="acme"
                    value={newOrgSlug}
                    onChange={(e) => setNewOrgSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="bg-transparent text-white focus:outline-none flex-1 font-mono"
                  />
                  <span className="text-slate-500">.eqmaxtech.com</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Initial Onboarding Plan</label>
                <select
                  value={newPlan}
                  onChange={(e) => setNewPlan(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 outline-none"
                >
                  <option value="14-Day Free Trial">14-Day Free Trial (₹0 upfront · Auto-converts to ₹699+GST)</option>
                  <option value="Enterprise Pro">Enterprise Pro (Direct Activation ₹699+GST)</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-slate-300 text-[11px] space-y-1">
                <div className="text-cyan-300 font-bold">✓ Automatic Cloud Provisioning:</div>
                <div>• Dedicated 3D robot agent & continuous voice trigger initialized</div>
                <div>• Isolated vector memory partition on AWS S3 Mumbai</div>
                <div>• Subdomain SSL certificate generated via Let's Encrypt</div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProvisionModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-bold shadow-glow-pill hover:opacity-95"
                >
                  Confirm & Provision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
