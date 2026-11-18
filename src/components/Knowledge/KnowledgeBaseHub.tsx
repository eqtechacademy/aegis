import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Search, 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Database,
  ArrowRight
} from 'lucide-react';

interface KnowledgeDoc {
  id: string;
  type: string;
  size: string;
  title: string;
  description: string;
  indexedStatus: string;
  borderCol: string;
  tagCol: string;
}

export const KnowledgeBaseHub: React.FC = () => {
  const { 
    messages, 
    sendMessage, 
    audioLevels, 
    speakText, 
    isSpeaking,
    triggerWakeWord,
    isWakeWordActive
  } = useApp();

  const [docs, setDocs] = useState<KnowledgeDoc[]>([
    {
      id: 'doc-1',
      type: 'PDF CONTRACT',
      size: '1.4 MB',
      title: 'Kerala_Bank_eKYC_SLA.pdf',
      description: 'Full biometric authentication service level agreement and cloud compliance guidelines.',
      indexedStatus: '✓ 84 pages indexed into vector memory',
      borderCol: 'border-cyan-400',
      tagCol: 'text-cyan-400'
    },
    {
      id: 'doc-2',
      type: 'MEETING DOSSIER',
      size: '820 KB',
      title: 'EQTech_Academy_Website_Spec.docx',
      description: 'Student dashboard architecture, Razorpay payment flow, and LMS integration wireframes.',
      indexedStatus: '✓ 42 pages indexed into vector memory',
      borderCol: 'border-purple-500',
      tagCol: 'text-purple-300'
    },
    {
      id: 'doc-3',
      type: 'AUDIO TRANSCRIPT',
      size: '2.1 MB',
      title: 'Sprint_4_Retrospective_Transcript.txt',
      description: "Automated voice transcription of Monday's executive team standup call with action items.",
      indexedStatus: '✓ Auto-indexed from voice recording',
      borderCol: 'border-emerald-400',
      tagCol: 'text-emerald-400'
    }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docDescription, setDocDescription] = useState('');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;
    const newDoc: KnowledgeDoc = {
      id: `doc-${Date.now()}`,
      type: 'DOCUMENT',
      size: '540 KB',
      title: docTitle,
      description: docDescription || 'Uploaded to vector memory',
      indexedStatus: '✓ Indexed into vector database',
      borderCol: 'border-amber-400',
      tagCol: 'text-amber-300'
    };
    setDocs([newDoc, ...docs]);
    speakText(`Document ${docTitle} successfully parsed and indexed into neural memory.`);
    sendMessage(`Indexed document into vector memory: ${docTitle}`, false);
    setDocTitle('');
    setDocDescription('');
    setShowUploadModal(false);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 relative z-10 flex-1 w-full">
      
      {/* HEADER SECTION (Stitch Exact) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              VECTOR DATABASE · ENCRYPTED COMPANY MEMORY
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold font-display text-white">
            Company Knowledge & Neural Memory
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Ask questions verbally to recall client contracts, meeting transcripts, and code documentation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-cyan-300 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 hidden sm:block">
            Voice Query: <strong className="text-white">"Hey AGIES, find Kerala Bank SLA"</strong>
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-medium text-xs shadow-glow-pill hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" />
            <span>Upload PDF / Document</span>
          </button>
        </div>
      </div>

      {/* NEURAL RECALL TRANSCRIPT STREAM HUD (Stitch Exact) */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              NEURAL RECALL TRANSCRIPT STREAM
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400">Embedding Search: 24ms</span>
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
              <span className="text-purple-400 font-bold">Unnikrishnan (Voice):</span> "Hey AGIES, what is the maximum latency specified in Kerala Bank's SLA contract?"
            </div>
            <div className="text-cyan-300 mt-1">
              <span className="text-cyan-400 font-bold">AGIES (Synthetic Agent):</span> "According to Section 4.2 of 'Kerala_Bank_eKYC_SLA.pdf', biometric verification must resolve within 150 milliseconds with 99.9% uptime."
            </div>
          </div>
        </div>
      </div>

      {/* INDEXED DOCUMENT REPOSITORIES (Stitch Exact 3-Col Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {docs.map(doc => (
          <div 
            key={doc.id}
            className={`glass-panel rounded-2xl p-5 space-y-3 border-l-4 ${doc.borderCol} hover:scale-[1.01] transition-all`}
          >
            <div className="flex justify-between items-center text-xs font-mono">
              <span className={`font-bold ${doc.tagCol}`}>{doc.type}</span>
              <span className="text-slate-400">{doc.size}</span>
            </div>
            <h4 className="font-bold text-sm text-white font-display">{doc.title}</h4>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {doc.description}
            </p>
            <div className="text-[10px] font-mono text-emerald-400 pt-2 border-t border-slate-800">
              {doc.indexedStatus}
            </div>
          </div>
        ))}
      </div>

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl p-6 max-w-md w-full border border-cyan-500/30 space-y-4">
            <h3 className="text-lg font-bold font-display text-white">Upload Document to Vector Brain</h3>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-mono">Document Title / File Name</label>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="e.g. Kerala_Bank_Architecture_v2.pdf"
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-mono">Summary / Context</label>
                <textarea
                  value={docDescription}
                  onChange={(e) => setDocDescription(e.target.value)}
                  placeholder="Key notes or clauses for semantic vector indexing..."
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 h-24"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold shadow-glow-pill"
                >
                  Upload & Vectorize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
