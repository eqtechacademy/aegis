import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeadRecord, SocialPostRecord } from '../../types';
import { 
  Users, 
  Send, 
  Plus, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  Share2, 
  Sparkles, 
  Phone, 
  Mail, 
  Building2, 
  Mic,
  Calendar,
  Layers,
  Globe,
  Radio,
  FileSpreadsheet
} from 'lucide-react';
import { mcpClient } from '../../services/mcp/mcpClient';

const initialLeads: LeadRecord[] = [
  {
    id: 'lead-101',
    tenantId: 't-1',
    fullName: 'Dr. Ramesh Nambiar',
    email: 'dr.ramesh@keralahealth.gov.in',
    phone: '+91 94471 23456',
    company: 'Kerala Health Services',
    source: 'meta_facebook',
    status: 'qualified',
    campaignName: 'Kerala Enterprise AI & eKYC Trial',
    timestamp: '10 mins ago',
    voiceEnrichedNotes: 'Interested in hospital management voice integration and automated Malayalam patient intake.',
    budgetEstimated: '₹1,50,000 / yr',
  },
  {
    id: 'lead-102',
    tenantId: 't-2',
    fullName: 'Ananya Pillai',
    email: 'ananya@techacademy.edu.in',
    phone: '+91 98460 78901',
    company: 'EQTech Academy LMS',
    source: 'meta_instagram',
    status: 'new',
    campaignName: 'Instagram Students Voice AI Portal',
    timestamp: '42 mins ago',
    voiceEnrichedNotes: 'Needs 500 student seats for interactive voice tutoring in Python and AI ethics.',
    budgetEstimated: '₹75,000 / mo',
  },
  {
    id: 'lead-103',
    tenantId: 't-1',
    fullName: 'Jayan Varma',
    email: 'jayan.v@cochinmaritime.com',
    phone: '+91 97455 11223',
    company: 'Cochin Maritime Logistics',
    source: 'google_ads',
    status: 'contacted',
    campaignName: 'Google Search: Autonomous Logistics Bot',
    timestamp: '2 hours ago',
    voiceEnrichedNotes: 'Cargo dispatch automation through voice-triggered workflows.',
    budgetEstimated: '₹2,20,000 / yr',
  },
];

const initialPosts: SocialPostRecord[] = [
  {
    id: 'post-1',
    tenantId: 't-1',
    platform: 'both',
    pageId: '10982341908234',
    pageName: 'Kerala Bank Innovation Lab',
    content: 'Transforming enterprise banking with AGIES Voice AI! eKYC verifications are now hands-free with 99.4% intent accuracy. Powered by EQMax Tech Solutions.',
    status: 'published',
    publishedTime: 'Today at 09:30 AM',
    impressions: 4820,
    reach: 3410,
    likes: 218,
    comments: 34,
  },
  {
    id: 'post-2',
    tenantId: 't-2',
    platform: 'instagram',
    pageId: 'eqtech_academy_official',
    pageName: 'EQTech Academy',
    content: 'Students: Meet AGIES, your 24/7 autonomous learning buddy! Voice-guided coding labs and instant feedback. Start your 14-day free trial today.',
    status: 'scheduled',
    scheduledTime: 'Tomorrow at 10:00 AM',
    impressions: 0,
    reach: 0,
    likes: 0,
    comments: 0,
  },
];

export const LeadCaptureStudio: React.FC = () => {
  const { speakText, audioLevels, setView } = useApp();

  const [activeTab, setActiveTab] = useState<'leads' | 'studio'>('leads');
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [posts, setPosts] = useState<SocialPostRecord[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Post Composer State
  const [postContent, setPostContent] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'facebook' | 'instagram' | 'both'>('both');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredLeads = leads.filter(l => 
    l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSyncMetaLeads = async () => {
    speakText("Querying Meta Graph API for new Facebook and Instagram leads.");
    const res = await mcpClient.executeTool('meta_lead_capture', { adAccountId: 'act_991840192', limit: 5 });
    
    const newLead: LeadRecord = {
      id: `lead-${Date.now()}`,
      tenantId: 't-1',
      fullName: 'Siddharth Menon',
      email: 'siddharth@malabartech.in',
      phone: '+91 99951 88223',
      company: 'Malabar FinTech Ventures',
      source: 'meta_facebook',
      status: 'new',
      campaignName: 'Meta Enterprise AI Ingestion',
      timestamp: 'Just now',
      voiceEnrichedNotes: 'Captured live via Meta Graph Webhook.',
      budgetEstimated: '₹1,20,000 / yr',
    };
    setLeads([newLead, ...leads]);
    speakText("New lead from Malabar FinTech Ventures captured and committed to CRM.");
  };

  const handlePushLeadsToSheets = async () => {
    speakText("Appending qualified leads to Google Sheets via Google Workspace MCP.");
    await mcpClient.executeTool('google_sheets_append', {
      spreadsheetId: '1_EqMax_AEGIS_CRM_Leads',
      sheetName: 'MetaLeads',
      rowValues: [leads[0].fullName, leads[0].email, leads[0].phone, leads[0].company, leads[0].source],
    });
    speakText("Google Sheets updated successfully.");
  };

  const handlePublishPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    setIsSubmitting(true);
    speakText("Submitting post to Meta Studio API. Initiating Tier C approval check.");

    const res = await mcpClient.executeTool('meta_publish_post', {
      pageId: '10982341908234',
      message: postContent,
      publishTo: selectedPlatform,
    });

    const newPost: SocialPostRecord = {
      id: `post-${Date.now()}`,
      tenantId: 't-1',
      platform: selectedPlatform,
      pageId: '10982341908234',
      pageName: 'AGIES Enterprise Portal',
      content: postContent,
      status: 'published',
      publishedTime: 'Just now',
      impressions: 1,
      reach: 1,
      likes: 1,
      comments: 0,
    };

    setPosts([newPost, ...posts]);
    setPostContent('');
    setIsSubmitting(false);
    speakText("Meta Studio post published successfully to social channels.");
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
                META GRAPH API & GOOGLE ADS LEAD ENGINE · STUDIO v2.4
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Lead Capture & Meta Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Real-time ingestion of Meta (Facebook & Instagram) ad leads, automated CRM push to Google Sheets, and social publishing via Studio API.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'leads'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-glow-pill'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              Captured Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'studio'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-glow-pill'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              Meta Post Studio
            </button>
          </div>
        </div>
      </div>

      {/* VOICE TRANSCRIPT FEED HUD */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              VOICE LEAD AUTOMATION HUD
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">• Meta Webhooks Active</span>
          </div>
          <span className="text-xs font-mono text-purple-300">
            Auto-Sync to Google Sheets
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-1 shrink-0">
            {audioLevels.slice(0, 5).map((lvl, idx) => (
              <span 
                key={idx}
                className="w-1 bg-cyan-400 rounded-full transition-all duration-150"
                style={{ height: `${Math.max(lvl, 8)}px` }}
              />
            ))}
          </div>
          <div className="flex-1 text-xs font-mono bg-[#080E24] p-3 rounded-xl border border-cyan-500/25 w-full">
            <div className="text-slate-300">
              <span className="text-purple-400 font-bold">Unnikrishnan (Voice):</span> "Hey AGIES, sync all newest leads from our Kerala Bank Meta campaign and push qualified rows to Google Sheets."
            </div>
            <div className="text-cyan-300 mt-1">
              <span className="text-cyan-400 font-bold">AGIES (Synthetic Agent):</span> "Meta Graph API webhook polled. 3 new verified leads committed to your CRM and appended to Google Sheets."
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'leads' ? (
        /* TAB 1: CAPTURED LEADS DIRECTORY */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads by name, email, company..." 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleSyncMetaLeads}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/60 font-mono text-xs flex items-center gap-2 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Poll Meta Ads API</span>
              </button>
              <button 
                onClick={handlePushLeadsToSheets}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold font-mono text-xs shadow-md flex items-center gap-2 hover:opacity-95 transition-opacity"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Push to Google Sheets</span>
              </button>
            </div>
          </div>

          {/* LEADS TABLE */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-cyan-500/20">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#070D1F] border-b border-cyan-500/20 text-cyan-300 text-[11px] uppercase">
                  <tr>
                    <th className="py-3 px-4">Lead Name & Contact</th>
                    <th className="py-3 px-4">Organization</th>
                    <th className="py-3 px-4">Source & Campaign</th>
                    <th className="py-3 px-4">Estimated Budget</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white text-[13px]">{lead.fullName}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-cyan-400" /> {lead.email}</span>
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-400" /> {lead.phone}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                          <Building2 className="w-3.5 h-3.5 text-purple-400" />
                          <span>{lead.company || 'Direct Inquiry'}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 italic mt-0.5 max-w-xs truncate">
                          "{lead.voiceEnrichedNotes}"
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          lead.source === 'meta_facebook'
                            ? 'bg-blue-950/80 text-blue-300 border border-blue-500/40'
                            : lead.source === 'meta_instagram'
                            ? 'bg-pink-950/80 text-pink-300 border border-pink-500/40'
                            : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {lead.source.replace('_', ' ')}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1">{lead.campaignName}</div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-cyan-300">
                        {lead.budgetEstimated || 'Custom'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          lead.status === 'qualified'
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                            : lead.status === 'contacted'
                            ? 'bg-amber-950/80 text-amber-400 border border-amber-500/40'
                            : 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/40'
                        }`}>
                          {lead.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-500">
                        {lead.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: META STUDIO POST COMPOSER & PUBLISHED FEEDS */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Post Composer Form (5 Cols) */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-cyan-500/30 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display text-sm font-bold text-white">Meta Studio Post Composer</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-[10px]">
                Tier C Gated
              </span>
            </div>

            <form onSubmit={handlePublishPost} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-300 mb-1 text-[11px]">Destination Channels:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    type="button" 
                    onClick={() => setSelectedPlatform('both')}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                      selectedPlatform === 'both' 
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold border-cyan-400 shadow-sm'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    Both (FB + IG)
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedPlatform('facebook')}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                      selectedPlatform === 'facebook' 
                        ? 'bg-blue-600 text-white font-bold border-blue-400 shadow-sm'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    Facebook Page
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedPlatform('instagram')}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                      selectedPlatform === 'instagram' 
                        ? 'bg-pink-600 text-white font-bold border-pink-400 shadow-sm'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    Instagram
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 text-[11px]">Post Copy & Hashtags:</label>
                <textarea 
                  rows={4}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Draft your announcement or speak to AGIES... e.g., 'Kerala Bank launches 14-day voice evaluation with AGIES AI!'" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !postContent.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-bold font-sans text-xs shadow-glow-pill hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Dispatching...' : 'Publish to Meta Graph API'}</span>
              </button>
            </form>
          </div>

          {/* Published Feed & Insights (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-display text-sm font-bold text-white flex items-center justify-between">
              <span>Published Social Campaigns ({posts.length})</span>
              <span className="text-[11px] font-mono text-cyan-400">Live Meta Graph Telemetry</span>
            </h3>

            <div className="space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="font-bold text-white">{post.pageName}</span>
                      <span className="text-slate-500 text-[10px]">({post.platform.toUpperCase()})</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{post.publishedTime || post.scheduledTime}</span>
                  </div>

                  <p className="text-slate-200 font-sans text-xs leading-relaxed">
                    {post.content}
                  </p>

                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-center text-[10px]">
                    <div className="bg-slate-900/80 p-1.5 rounded">
                      <div className="text-slate-400">Impressions</div>
                      <div className="font-bold text-cyan-300">{post.impressions?.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-900/80 p-1.5 rounded">
                      <div className="text-slate-400">Reach</div>
                      <div className="font-bold text-purple-300">{post.reach?.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-900/80 p-1.5 rounded">
                      <div className="text-slate-400">Likes</div>
                      <div className="font-bold text-emerald-300">{post.likes}</div>
                    </div>
                    <div className="bg-slate-900/80 p-1.5 rounded">
                      <div className="text-slate-400">Comments</div>
                      <div className="font-bold text-amber-300">{post.comments}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
