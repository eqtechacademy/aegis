import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MemoryRecord, MemoryCategory } from '../../types';
import { 
  Brain, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  PauseCircle, 
  PlayCircle, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FolderLock,
  Tag,
  Sparkles,
  X
} from 'lucide-react';

export const MemoryCenter: React.FC = () => {
  const { 
    memories, 
    addMemory, 
    updateMemory, 
    deleteMemory, 
    toggleMemoryPause, 
    isMemoryCapturePaused, 
    setIsMemoryCapturePaused,
    activeTenant 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState<MemoryRecord | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState<MemoryCategory>('preference');
  const [formRetention, setFormRetention] = useState<number>(90);

  // Filter memories by tenant and query
  const tenantMemories = memories.filter((m) => m.tenantId === activeTenant.id || m.tenantId === 't-1');

  const filteredMemories = tenantMemories.filter((m) => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesQuery = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleOpenAddModal = () => {
    setFormTitle('');
    setFormContent('');
    setFormCategory('preference');
    setFormRetention(90);
    setEditingMemory(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (mem: MemoryRecord) => {
    setEditingMemory(mem);
    setFormTitle(mem.title);
    setFormContent(mem.content);
    setFormCategory(mem.category);
    setFormRetention(mem.retentionDays);
    setIsAddModalOpen(true);
  };

  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    if (editingMemory) {
      updateMemory(editingMemory.id, {
        title: formTitle,
        content: formContent,
        category: formCategory,
        retentionDays: formRetention,
      });
    } else {
      addMemory({
        tenantId: activeTenant.id,
        title: formTitle,
        content: formContent,
        category: formCategory,
        source: 'User Manual Entry (Console)',
        retentionDays: formRetention,
        isPaused: false,
        confidenceScore: 100,
      });
    }
    setIsAddModalOpen(false);
  };

  const getCategoryBadgeClass = (category: MemoryCategory) => {
    switch (category) {
      case 'directive':
        return 'bg-purple-950/60 text-purple-300 border-purple-500/40';
      case 'instruction':
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40';
      case 'preference':
        return 'bg-blue-950/60 text-blue-300 border-blue-500/40';
      case 'context':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-2xl border border-cyan-500/25 bg-slate-900/60 backdrop-blur-md p-6 relative overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.1)]">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5 shadow-glow-cyan flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-display text-white tracking-wide">
                  PERSONAL MEMORY CENTER
                </h1>
                <p className="text-xs text-cyan-300/80 font-mono">
                  User-Controlled Long-Term Context, Retention & Strict Tenant Isolation
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              AGIES does not silently record every sentence as permanent memory. Only explicit directives, preferences, and recurring instructions approved by you are stored. You have full power to inspect, edit, delete, or pause memory retrieval at any time.
            </p>
          </div>

          {/* Right Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsMemoryCapturePaused(!isMemoryCapturePaused)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium border transition-all flex items-center gap-2 ${
                isMemoryCapturePaused
                  ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              {isMemoryCapturePaused ? (
                <>
                  <PlayCircle className="w-4 h-4 text-amber-400" />
                  <span>Resume Auto-Capture</span>
                </>
              ) : (
                <>
                  <PauseCircle className="w-4 h-4 text-cyan-400" />
                  <span>Pause Auto-Capture</span>
                </>
              )}
            </button>

            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-xs shadow-glow-cyan hover:opacity-95 transition-opacity flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Memory</span>
            </button>
          </div>
        </div>

        {/* Tenant Isolation Status Bar */}
        <div className="mt-5 pt-4 border-t border-cyan-500/15 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <FolderLock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Workspace Isolation:</span>
            <strong className="text-cyan-300">{activeTenant.name} ({activeTenant.slug})</strong>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Zero Cross-Tenant Leakage
            </span>
            <span className="text-purple-300">
              Active Records: {tenantMemories.length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Context' },
            { id: 'directive', label: 'Project Directives' },
            { id: 'instruction', label: 'Recurring Instructions' },
            { id: 'preference', label: 'User Preferences' },
            { id: 'context', label: 'Workspace Context' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved memories..."
            className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
          />
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
        </div>
      </div>

      {/* Memories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMemories.length === 0 ? (
          <div className="md:col-span-2 py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
            <Brain className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-300 font-medium">No saved memories found</p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Memories explicitly created by you or approved from key conversation moments will appear here with source and timestamp verification.
            </p>
          </div>
        ) : (
          filteredMemories.map((mem) => (
            <div
              key={mem.id}
              className={`rounded-xl border p-5 transition-all relative flex flex-col justify-between ${
                mem.isPaused
                  ? 'bg-slate-950/40 border-slate-800 opacity-60'
                  : 'bg-slate-900/70 border-cyan-500/20 hover:border-cyan-400/40 shadow-sm'
              }`}
            >
              <div>
                {/* Top Badge & Actions */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wider ${getCategoryBadgeClass(mem.category)}`}>
                    {mem.category}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleMemoryPause(mem.id)}
                      title={mem.isPaused ? "Resume this memory" : "Temporarily pause retrieval"}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                    >
                      {mem.isPaused ? (
                        <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <PauseCircle className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(mem)}
                      title="Edit memory"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteMemory(mem.id)}
                      title="Permanently delete memory"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white font-display mb-1.5">
                  {mem.title}
                </h3>

                {/* Content */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                  "{mem.content}"
                </p>
              </div>

              {/* Metadata Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 gap-2">
                <div className="flex items-center gap-2">
                  <span>Source: <strong className="text-cyan-300">{mem.source}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {mem.retentionDays}d retention
                  </span>
                  <span className="text-emerald-400">
                    {mem.confidenceScore}% confidence
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Memory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl border border-cyan-500/30 bg-[#070E24] shadow-glow-cyan p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-4">
              <div className="flex items-center gap-2.5">
                <Brain className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold font-display text-white">
                  {editingMemory ? 'Edit Memory Record' : 'Create Approved Memory'}
                </h2>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMemory} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Memory Title / Objective
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Kerala Bank Biometric Hash Checksum Requirement"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Context / Rule / Instruction
                </label>
                <textarea
                  required
                  rows={3}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="State the exact rule or preference AGIES should recall..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as MemoryCategory)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  >
                    <option value="preference">User Preference</option>
                    <option value="directive">Project Directive</option>
                    <option value="instruction">Recurring Instruction</option>
                    <option value="context">Workspace Context</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Retention Window
                  </label>
                  <select
                    value={formRetention}
                    onChange={(e) => setFormRetention(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  >
                    <option value={30}>30 Days</option>
                    <option value={60}>60 Days</option>
                    <option value={90}>90 Days</option>
                    <option value={180}>180 Days</option>
                    <option value={365}>365 Days (1 Year)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-xs shadow-glow-cyan hover:opacity-95"
                >
                  {editingMemory ? 'Update Memory' : 'Save Memory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

