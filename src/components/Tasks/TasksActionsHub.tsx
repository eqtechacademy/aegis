import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckSquare, 
  Plus, 
  Mic, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  Filter
} from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: 'due_today' | 'in_progress' | 'completed';
  dueText: string;
  assignedTo: string;
  checked: boolean;
}

export const TasksActionsHub: React.FC = () => {
  const { 
    messages, 
    sendMessage, 
    audioLevels, 
    speakText, 
    isSpeaking,
    triggerWakeWord,
    isWakeWordActive
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'due_today' | 'in_progress' | 'completed'>('all');
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 'task-1',
      title: 'Complete pending client update for Kerala Bank',
      description: 'Biometric facial auth SDK checklist & compliance hash verification',
      status: 'due_today',
      dueText: 'DUE TODAY',
      assignedTo: 'Unnikrishnan',
      checked: false
    },
    {
      id: 'task-2',
      title: 'EQTech Academy website demo rehearsal',
      description: 'Prepare slide walkthrough and student LMS dashboard preview at 2:00 PM',
      status: 'due_today',
      dueText: 'DUE 2:00 PM',
      assignedTo: 'Devika M.',
      checked: false
    },
    {
      id: 'task-3',
      title: 'AWS S3 Mumbai cold storage backup script',
      description: 'Automate daily episodic neural memory snapshots to ap-south-1',
      status: 'in_progress',
      dueText: 'IN PROGRESS',
      assignedTo: 'Anand V.',
      checked: false
    },
    {
      id: 'task-4',
      title: 'Razorpay UPI Autopay webhook test',
      description: 'Verified ₹699+GST recurring mandate trigger after 14-day trial',
      status: 'completed',
      dueText: 'COMPLETED',
      assignedTo: 'Shipped',
      checked: true
    },
    {
      id: 'task-5',
      title: 'Deploy Meta Lead webhook listener',
      description: 'Real-time Instagram & Facebook lead sync into Google Sheets',
      status: 'completed',
      dueText: 'COMPLETED',
      assignedTo: 'Unnikrishnan',
      checked: true
    },
    {
      id: 'task-6',
      title: 'Multi-LLM failover benchmarks test',
      description: 'Verify 0.12s latency switch between Gemini 1.5 Flash and Claude 3.5 Sonnet',
      status: 'completed',
      dueText: 'COMPLETED',
      assignedTo: 'Anand V.',
      checked: true
    }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextChecked = !t.checked;
        if (nextChecked) {
          speakText(`Task completed: ${t.title}`);
          sendMessage(`Completed task: ${t.title}`, false);
        }
        return {
          ...t,
          checked: nextChecked,
          status: nextChecked ? 'completed' : 'in_progress'
        };
      }
      return t;
    }));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      description: 'Assigned via AGIES hands-free dispatch',
      status: 'due_today',
      dueText: 'DUE TODAY',
      assignedTo: 'Unnikrishnan',
      checked: false
    };
    setTasks([newTask, ...tasks]);
    speakText(`Task created: ${newTaskTitle}`);
    sendMessage(`Created task: ${newTaskTitle}`, false);
    setNewTaskTitle('');
    setShowAddModal(false);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 relative z-10 flex-1 w-full">
      
      {/* HEADER SECTION (Stitch Exact) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              TASKS ENGINE · {tasks.length} ASSIGNED · {tasks.filter(t => t.status === 'due_today').length} DUE TODAY
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold font-display text-white">
            Daily Tasks & Actions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Speak to check off items, reassign priority deadlines, or auto-generate sprint reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-cyan-300 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 hidden sm:block">
            Spoken Command: <strong className="text-white">"Hey AGIES, mark eKYC test complete"</strong>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-medium text-xs shadow-glow-pill hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Assign Task via Speech</span>
          </button>
        </div>
      </div>

      {/* VOICE TRANSCRIPT INTERACTIVE HUD (Stitch Exact) */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              TASK DISPATCH TRANSCRIPT STREAM
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400">Zero Hardware Clicks</span>
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
              <span className="text-purple-400 font-bold">Unnikrishnan (Voice):</span> "Hey AGIES, show my tasks due before 5 PM today."
            </div>
            <div className="text-cyan-300 mt-1">
              <span className="text-cyan-400 font-bold">AGIES (Synthetic Agent):</span> "Task 1: Complete pending client update for Kerala Bank. Task 2: Review EQTech Academy demo rehearsal with Devika."
            </div>
          </div>
        </div>
      </div>

      {/* FILTERABLE TASK LIST (Stitch Exact) */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 font-bold shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All ({tasks.length})
            </button>
            <button 
              onClick={() => setFilter('due_today')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'due_today'
                  ? 'bg-rose-950/80 border border-rose-400/60 text-rose-300 font-bold shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Due Today ({tasks.filter(t => t.status === 'due_today').length})
            </button>
            <button 
              onClick={() => setFilter('in_progress')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'in_progress'
                  ? 'bg-purple-950/80 border border-purple-400/60 text-purple-300 font-bold shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              In Progress ({tasks.filter(t => t.status === 'in_progress').length})
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'completed'
                  ? 'bg-emerald-950/80 border border-emerald-400/60 text-emerald-300 font-bold shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Completed ({tasks.filter(t => t.status === 'completed').length})
            </button>
          </div>
          <span className="text-xs font-mono text-slate-400">Sorted by Priority</span>
        </div>

        {/* Task Rows */}
        <div className="space-y-3 font-mono text-xs">
          {filteredTasks.map(task => {
            const isCompleted = task.checked;
            const isDueToday = task.status === 'due_today';

            return (
              <div 
                key={task.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl transition-all gap-3 ${
                  isCompleted
                    ? 'bg-slate-900/40 border border-slate-800/60 opacity-60'
                    : isDueToday
                    ? 'bg-slate-900/80 border border-rose-500/40 hover:border-rose-400'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={task.checked}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 accent-cyan-400 rounded mt-0.5 sm:mt-0 cursor-pointer"
                  />
                  <div>
                    <div className={`font-bold text-sm ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                      {task.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                      {task.description}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pl-7 sm:pl-0">
                  <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${
                    task.status === 'due_today'
                      ? 'bg-rose-950/60 text-rose-300 border-rose-500/30'
                      : task.status === 'completed'
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                      : 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30'
                  }`}>
                    {task.dueText}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Assigned: {task.assignedTo}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL FOR NEW TASK */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl p-6 max-w-md w-full border border-cyan-500/30 space-y-4">
            <h3 className="text-lg font-bold font-display text-white">Assign New Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-mono">Task Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Audit Spanner database partitions"
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold shadow-glow-pill"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
