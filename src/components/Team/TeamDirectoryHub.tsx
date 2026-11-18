import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Mic, 
  ShieldCheck, 
  Key, 
  Plus, 
  Sparkles,
  CheckCircle2,
  Volume2
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  voiceprintId: string;
  confidence: string;
  permissions: string;
  borderCol: string;
  tagCol: string;
}

export const TeamDirectoryHub: React.FC = () => {
  const { 
    messages, 
    sendMessage, 
    audioLevels, 
    speakText, 
    isSpeaking,
    triggerWakeWord,
    isWakeWordActive
  } = useApp();

  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: 'unni',
      name: 'Unnikrishnan',
      role: 'Lead Architect & Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      voiceprintId: 'VP-UNNI-001',
      confidence: '99.8% Match',
      permissions: 'Super Access',
      borderCol: 'border-cyan-400',
      tagCol: 'text-cyan-400'
    },
    {
      id: 'devi',
      name: 'Devika M.',
      role: 'Product Manager',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      voiceprintId: 'VP-DEVI-002',
      confidence: '99.4% Match',
      permissions: 'Sprint & Tasks',
      borderCol: 'border-purple-500',
      tagCol: 'text-purple-300'
    },
    {
      id: 'anan',
      name: 'Anand V.',
      role: 'Security & Backend Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      voiceprintId: 'VP-ANAN-003',
      confidence: '99.1% Match',
      permissions: 'KMS & Cloud',
      borderCol: 'border-blue-500',
      tagCol: 'text-blue-300'
    }
  ]);

  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    const newMember: TeamMember = {
      id: `mem-${Date.now()}`,
      name: newMemberName,
      role: newMemberRole || 'Team Member',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      voiceprintId: `VP-${newMemberName.slice(0, 4).toUpperCase()}-00${members.length + 1}`,
      confidence: '98.9% Match',
      permissions: 'General Access',
      borderCol: 'border-emerald-400',
      tagCol: 'text-emerald-400'
    };
    setMembers([...members, newMember]);
    speakText(`Biometric voiceprint enrolled for ${newMemberName}. Access permissions active.`);
    sendMessage(`Enrolled team member: ${newMemberName}`, false);
    setNewMemberName('');
    setNewMemberRole('');
    setShowEnrollModal(false);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 relative z-10 flex-1 w-full">
      
      {/* TOP HEADER SECTION (Stitch Exact) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              ORGANIZATION TEAM · 18 BIOMETRIC VOICEPRINTS
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold font-display text-white">
            Team Members & Voice Credentials
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Multi-user voice biometric authentication with custom role delegation and encrypted transcript access.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-cyan-300 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 hidden sm:block">
            Wake Recognition: <strong className="text-white">Multi-Speaker Isolation (99.8%)</strong>
          </div>
          <button 
            onClick={() => setShowEnrollModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-medium text-xs shadow-glow-pill hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            <Mic className="w-4 h-4" />
            <span>Enroll New Voiceprint</span>
          </button>
        </div>
      </div>

      {/* SPEAKER IDENTIFICATION TRANSCRIPT HUD (Stitch Exact) */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              SPEAKER IDENTIFICATION TRANSCRIPT HUD
            </span>
          </div>
          <span className="text-xs font-mono text-purple-300">Continuous Biometric Matching</span>
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
              <span className="text-purple-400 font-bold">Unnikrishnan (Lead Voiceprint):</span> "Hey AGIES, verify Devika's permission to export Kerala Bank transcripts."
            </div>
            <div className="text-cyan-300 mt-1">
              <span className="text-cyan-400 font-bold">AGIES (Synthetic Agent):</span> "Devika M. possesses 'Product Lead' clearance. Export granted and logged in audit ledger."
            </div>
          </div>
        </div>
      </div>

      {/* TEAM ROSTER CARDS (Stitch Exact 3-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map(member => (
          <div 
            key={member.id}
            className={`glass-panel rounded-2xl p-5 space-y-4 border-l-4 ${member.borderCol} hover:scale-[1.01] transition-all`}
          >
            <div className="flex items-center gap-3">
              <img 
                className={`w-12 h-12 rounded-full object-cover border-2 ${member.borderCol} p-0.5`}
                src={member.avatar} 
                alt={member.name}
              />
              <div>
                <h4 className="font-bold text-sm text-white">{member.name}</h4>
                <p className={`text-[11px] font-mono ${member.tagCol}`}>{member.role}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono text-slate-300 border-t border-slate-800 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Voiceprint ID:</span>
                <span className="text-white font-semibold">{member.voiceprintId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Confidence:</span>
                <span className="text-emerald-400 font-semibold">{member.confidence}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Permissions:</span>
                <span className="text-purple-300 font-semibold">{member.permissions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ENROLL VOICEPRINT MODAL */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl p-6 max-w-md w-full border border-cyan-500/30 space-y-4">
            <h3 className="text-lg font-bold font-display text-white">Enroll Team Voiceprint</h3>
            <p className="text-xs text-slate-400">
              Record a 5-second acoustic phrase ("Hey AGIES, I authorize access") to generate a 512-dimension biometric vector.
            </p>
            <form onSubmit={handleEnroll} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-mono">Member Name</label>
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Rahul Nair"
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-mono">Role / Designation</label>
                <input
                  type="text"
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  placeholder="e.g. Lead QA Engineer"
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold shadow-glow-pill"
                >
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

