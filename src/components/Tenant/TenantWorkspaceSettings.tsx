import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Globe, 
  Mic, 
  ShieldCheck, 
  Check, 
  Copy, 
  Users, 
  Send, 
  CheckCircle2, 
  Radio, 
  Lock,
  Layers,
  Sparkles,
  X
} from 'lucide-react';

export const TenantWorkspaceSettings: React.FC = () => {
  const { 
    activeTenant, 
    audioLevels, 
    transcripts, 
    setView,
    speakText
  } = useApp();

  const [customDomain, setCustomDomain] = useState('aegis.keralabank.com');
  const [wakeKeyword, setWakeKeyword] = useState(activeTenant.wakeWord || 'Hey AGIES, Kerala Bank');
  const [meetingTranscribe, setMeetingTranscribe] = useState(true);
  const [isolatedMemory, setIsolatedMemory] = useState(true);
  const [robotPresence, setRobotPresence] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [tokenCopied, setTokenCopied] = useState(false);

  const handleSaveDomain = () => {
    speakText(`Custom domain ${customDomain} validated and SSL cert bound.`);
  };

  const handleSaveKeyword = () => {
    speakText(`Organization wake phrase updated to ${wakeKeyword}.`);
  };

  const handleCopyVoiceToken = () => {
    navigator.clipboard.writeText(`AEGIS-VOX-TOKEN-${activeTenant.slug.toUpperCase()}-2026-X99`);
    setTokenCopied(true);
    setTimeout(() => setTokenCopied(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 relative z-10 flex-1 max-w-7xl mx-auto w-full">

      {/* BANNER TITLE & TENANT METADATA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest">
              ORGANIZATION: {activeTenant.name.toUpperCase()} · TENANT ID #{activeTenant.id}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            {activeTenant.name} Controls & Settings
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure tenant voice recognition models, member seats, custom integrations, and data isolation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-medium text-xs shadow-glow-pill hover:opacity-95 transition-opacity flex items-center gap-2"
          >
            <Mic className="w-4 h-4" />
            <span>Invite Team via Voice Token</span>
          </button>
        </div>
      </div>

      {/* LIVE TENANT TRANSCRIPT & VOICE COMMAND HUD (Exact Stitch Match) */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              TENANT VOICE COMMAND STREAM
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">• Active Voice Session</span>
          </div>
          <span className="text-xs font-mono text-purple-300">
            Continuous Logging Enabled
          </span>
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

          {/* Dialog */}
          <div className="flex-1 text-xs font-mono bg-[#080E24] p-3 rounded-xl border border-cyan-500/25 w-full">
            <div className="text-slate-300">
              <span className="text-purple-400 font-bold">Ramesh (CIO Voice):</span> "Hey AGIES, show me this month's voice transcript hours and eKYC integration team activity."
            </div>
            <div className="text-cyan-300 mt-1">
              <span className="text-cyan-400 font-bold">AGIES (Tenant Agent):</span> "{activeTenant.name} team recorded 142 meeting transcript hours. eKYC integration sprint has 12 active tasks with 75% overall completion."
            </div>
          </div>
        </div>
      </div>

      {/* 2-COLUMN SETTINGS & AUDIT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT: TENANT CONFIGURATION & VOICE AGENT PREFERENCES */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold font-display text-white">Voice Agent & Workspace Settings</h3>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Custom Domain & CNAME</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={customDomain} 
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-400 outline-none"
                />
                <button 
                  onClick={handleSaveDomain}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl font-mono text-xs border border-slate-700 shrink-0"
                >
                  Verify SSL
                </button>
              </div>
              <p className="text-[10px] text-emerald-400 mt-1 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                SSL Certificate active (Auto-renewed by Let's Encrypt)
              </p>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Organization Wake Keyword</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={wakeKeyword} 
                  onChange={(e) => setWakeKeyword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-400 outline-none"
                />
                <button 
                  onClick={handleSaveKeyword}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-mono text-xs border border-slate-700 shrink-0"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Toggle controls */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <div className="font-semibold text-white">Real-Time Meeting Transcriptions</div>
                  <div className="text-[11px] text-slate-400">Auto-transcribe every voice command and team sprint sync</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={meetingTranscribe}
                  onChange={(e) => setMeetingTranscribe(e.target.checked)}
                  className="accent-cyan-400 w-4 h-4 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <div className="font-semibold text-white">Isolated Tenant Neural Memory</div>
                  <div className="text-[11px] text-slate-400">Dedicated encrypted vector partition for banking compliance</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={isolatedMemory}
                  onChange={(e) => setIsolatedMemory(e.target.checked)}
                  className="accent-cyan-400 w-4 h-4 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <div className="font-semibold text-white">3D Robot Animated Presence</div>
                  <div className="text-[11px] text-slate-400">Show humanoid robot walking and workstation posture</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={robotPresence}
                  onChange={(e) => setRobotPresence(e.target.checked)}
                  className="accent-cyan-400 w-4 h-4 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: RECENT VOICE TRANSCRIPTS AUDIT */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-display text-white">Recent Team Transcripts</h3>
            <span className="text-xs font-mono text-cyan-400">Live Auto-Sync</span>
          </div>

          <div className="space-y-3 font-mono text-xs max-h-[380px] overflow-y-auto pr-1">
            {transcripts.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="text-purple-400 font-semibold">{item.speaker} ({item.role})</span>
                  <span>{item.timestamp}</span>
                </div>
                <p className="text-slate-200 font-sans text-xs">"{item.userSpeech}"</p>
                <div className="text-cyan-300 mt-1 text-[11px] flex items-center gap-1.5 font-sans">
                  <span className="text-cyan-400 font-mono font-bold shrink-0">↳ AGIES:</span>
                  <span>"{item.agentResponse}"</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* INVITE TEAM MODAL */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel rounded-2xl p-6 max-w-md w-full border border-cyan-400/40 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <h3 className="font-display font-bold text-white text-base">Invite Organization Team Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1">Member Corporate Email</label>
                <input
                  type="email"
                  placeholder="colleague@keralabank.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">One-Time Voice Enrolment Token</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`AEGIS-VOX-TOKEN-${activeTenant.slug.toUpperCase()}-2026-X99`}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-300 font-mono text-[11px]"
                  />
                  <button
                    onClick={handleCopyVoiceToken}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 shrink-0"
                    title="Copy Token"
                  >
                    {tokenCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-[11px] text-slate-300">
                New member can activate their voice profile by saying this token into any AEGIS terminal.
              </div>

              <button
                onClick={() => {
                  speakText(`Invite sent to ${inviteEmail || 'team member'}.`);
                  setShowInviteModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-bold shadow-glow-pill mt-2"
              >
                Send Voice Invite Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
