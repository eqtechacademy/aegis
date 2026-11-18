import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MCPServerConfig, MCPTool } from '../../types';
import { defaultMCPServers, defaultMCPTools } from '../../services/mcp/mcpRegistry';
import { mcpClient } from '../../services/mcp/mcpClient';
import { 
  Server, 
  Terminal, 
  Play, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Database, 
  Share2, 
  Sparkles, 
  Zap, 
  RefreshCw, 
  Layers,
  HardDrive,
  FileSpreadsheet,
  Globe,
  Radio,
  ExternalLink
} from 'lucide-react';

export const MCPServerManager: React.FC = () => {
  const { speakText, audioLevels, setView } = useApp();

  const [servers] = useState<MCPServerConfig[]>(defaultMCPServers);
  const [tools, setTools] = useState<MCPTool[]>(defaultMCPTools);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [testOutput, setTestOutput] = useState<string>('');
  const [isTesting, setIsTesting] = useState<boolean>(false);

  const filteredTools = tools.filter(t => 
    selectedCategory === 'all' || t.category === selectedCategory
  );

  const handleTestTool = async (tool: MCPTool) => {
    setIsTesting(true);
    setTestOutput(`Initiating ${tool.displayName} execution...`);
    speakText(`Testing MCP tool ${tool.displayName}.`);

    let sampleParams: Record<string, any> = {};
    if (tool.name === 'google_drive_push') {
      sampleParams = { fileName: 'KeralaBank_eKYC_Audit.pdf', content: 'Sample test transcript payload' };
    } else if (tool.name === 'google_sheets_append') {
      sampleParams = { spreadsheetId: '1_EqMax_AEGIS_CRM_Leads', rowValues: ['Unnikrishnan', 'unni@eqmax.com', '+91 94471 00000'] };
    } else if (tool.name === 'stitch_sync_screen') {
      sampleParams = { projectId: '13358164649773425082' };
    } else if (tool.name === 'meta_lead_capture') {
      sampleParams = { adAccountId: 'act_991840192', limit: 5 };
    } else {
      sampleParams = { prompt: 'Verify neural routing latency and type safety.' };
    }

    const res = await mcpClient.executeTool(tool.id, sampleParams);
    setIsTesting(false);
    setTestOutput(JSON.stringify(res, null, 2));

    if (res.success) {
      speakText(`${tool.displayName} executed successfully.`);
    } else if (res.requiresUserApproval) {
      speakText(`${tool.displayName} is Tier ${res.tier} and requires manual user approval.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6 pb-12 animate-fade-in font-sans">
      
      {/* HEADER BANNER */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-cyan-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                MODEL CONTEXT PROTOCOL (MCP) · CORE ORCHESTRATION ENGINE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              MCP Server & Tool Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Centralized tool registry connecting Google APIs, Meta Graph Studio, Stitch Studio, and multi-NLLM neural brains for automated data push and retrieval.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>5 MCP SERVERS ONLINE</span>
            </span>
          </div>
        </div>
      </div>

      {/* 5 ACTIVE MCP SERVERS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {servers.map((srv) => (
          <div key={srv.id} className="glass-panel rounded-2xl p-4 border border-cyan-500/20 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <span className="font-display text-xs font-bold text-white">{srv.name}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 font-mono text-[9px] font-bold">
                CONNECTED
              </span>
            </div>

            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              {srv.description}
            </p>

            <div className="pt-1 flex items-center justify-between font-mono text-[10px] text-slate-400">
              <span>{srv.toolsCount} Active Tools</span>
              <span className="text-cyan-300 truncate max-w-[150px]">{srv.endpoint}</span>
            </div>
          </div>
        ))}
      </div>

      {/* LIVE TEST EXECUTION CONSOLE */}
      {testOutput && (
        <div className="glass-panel rounded-2xl p-4 border border-purple-500/30 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="text-purple-300 font-bold flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>MCP Tool Execution Output</span>
            </span>
            <button 
              onClick={() => setTestOutput('')}
              className="text-[10px] text-slate-400 hover:text-white"
            >
              Clear
            </button>
          </div>
          <pre className="bg-[#03060A] p-3 rounded-xl overflow-x-auto text-cyan-300 text-[11px] max-h-48">
            {testOutput}
          </pre>
        </div>
      )}

      {/* FILTER BUTTONS & TOOL REGISTRY TABLE */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {['all', 'google', 'meta', 'stitch', 'nllm', 'data_push'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-glow-pill'
                    : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-slate-400">
            Showing {filteredTools.length} Registered Tools
          </span>
        </div>

        {/* TOOLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <div className="font-display font-bold text-white text-sm">{tool.displayName}</div>
                  <div className="text-[10px] text-cyan-400 font-mono">mcp://{tool.name}</div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  tool.approvalTier === 'A'
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                    : tool.approvalTier === 'B'
                    ? 'bg-blue-950/80 text-blue-300 border border-blue-500/30'
                    : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                }`}>
                  Tier {tool.approvalTier}
                </span>
              </div>

              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                {tool.description}
              </p>

              {/* Tool Parameters */}
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1 text-[11px]">
                <div className="text-slate-400 font-bold text-[10px] uppercase">Input Parameters:</div>
                {tool.parameters.map((p) => (
                  <div key={p.name} className="flex items-center justify-between text-slate-300">
                    <span>
                      <code className="text-cyan-300">{p.name}</code> ({p.type})
                      {p.required && <span className="text-rose-400 ml-1">*</span>}
                    </span>
                    <span className="text-slate-500 text-[10px] truncate max-w-[140px]">{p.description}</span>
                  </div>
                ))}
              </div>

              {/* Action Bar */}
              <div className="pt-1 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">
                  {tool.executionsCount} runs • {tool.lastExecuted}
                </span>
                <button
                  onClick={() => handleTestTool(tool)}
                  disabled={isTesting}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-bold text-[11px] shadow-sm hover:opacity-95 transition-opacity flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3" />
                  <span>Execute Test</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
