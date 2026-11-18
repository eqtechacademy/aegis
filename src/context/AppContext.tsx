import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  ViewMode, 
  UserRole, 
  ThemeMode, 
  RobotMotionState, 
  OperationalState,
  Tenant, 
  ChatMessage, 
  AutomationRecipe, 
  AIModelConfig, 
  StorageConfig, 
  PaymentGateway, 
  VoiceTranscriptLog,
  MemoryRecord,
  ToolTaskAction,
  AuditLogEntry,
  NeuralBrainId
} from '../types';
import { executeUnifiedNeuralBrain } from '../services/brain/neuralBrainRouter';

interface AppContextType {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  theme: ThemeMode;
  cycleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  motionState: RobotMotionState;
  setMotionState: (state: RobotMotionState) => void;
  operationalState: OperationalState;
  setOperationalState: (state: OperationalState) => void;
  isMicLive: boolean;
  setIsMicLive: (live: boolean) => void;
  toggleMic: () => void;
  spokenLanguage: string;
  setSpokenLanguage: (lang: string) => void;
  isSpeaking: boolean;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  bargeIn: () => void;
  audioLevels: number[];
  tenants: Tenant[];
  addTenant: (tenant: Omit<Tenant, 'id' | 'transcriptsCount'>) => void;
  messages: ChatMessage[];
  sendMessage: (text: string, isVoice?: boolean) => void;
  recipes: AutomationRecipe[];
  runRecipe: (id: string) => void;
  models: AIModelConfig[];
  storages: StorageConfig[];
  payments: PaymentGateway[];
  transcripts: VoiceTranscriptLog[];
  activeTenant: Tenant;
  setActiveTenantId: (id: string) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  triggerWakeWord: () => void;
  isWakeWordActive: boolean;
  
  // Neural Brain Controller
  activeBrainId: NeuralBrainId;
  setActiveBrainId: (b: NeuralBrainId) => void;
  
  // Personal Memory Controls
  memories: MemoryRecord[];
  addMemory: (memory: Omit<MemoryRecord, 'id' | 'timestamp'>) => void;
  updateMemory: (id: string, updates: Partial<MemoryRecord>) => void;
  deleteMemory: (id: string) => void;
  toggleMemoryPause: (id: string) => void;
  isMemoryCapturePaused: boolean;
  setIsMemoryCapturePaused: (paused: boolean) => void;
  
  // 4-Tier Task Approvals & Audit Trail
  tasks: ToolTaskAction[];
  approveTask: (id: string) => void;
  rejectTask: (id: string) => void;
  undoTask: (id: string) => void;
  activeApprovalModalTask: ToolTaskAction | null;
  setActiveApprovalModalTask: (task: ToolTaskAction | null) => void;
  auditLogs: AuditLogEntry[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialTenants: Tenant[] = [
  {
    id: 't-1',
    name: 'Kerala Bank HQ',
    slug: 'keralabank',
    domain: 'keralabank.eqmaxtech.com',
    status: 'paid',
    trialDaysRemaining: 0,
    voiceAgentStatus: 'Continuous Speech ON',
    monthlyBilling: '₹699+GST / mo (Auto-debit)',
    plan: 'Enterprise Pro',
    memberCount: 18,
    transcriptsCount: 1420,
    wakeWord: 'Hey AGIES, Kerala Bank',
  },
  {
    id: 't-2',
    name: 'EQTech Academy',
    slug: 'eqtechacademy',
    domain: 'eqtechacademy.eqmaxtech.com',
    status: 'paid',
    trialDaysRemaining: 0,
    voiceAgentStatus: 'Voice Transcripts ON',
    monthlyBilling: '₹699+GST / mo (Auto-debit)',
    plan: 'Pro Workspace',
    memberCount: 34,
    transcriptsCount: 3820,
    wakeWord: 'Hey AGIES, EQTech',
  },
  {
    id: 't-3',
    name: 'Hospital Management Pro',
    slug: 'hospitalpro',
    domain: 'hospitalpro.eqmaxtech.com',
    status: 'trial',
    trialDaysRemaining: 2,
    voiceAgentStatus: 'Trial Active',
    monthlyBilling: '₹0 until trial expires (Card Pending)',
    plan: '14-Day Free Trial',
    memberCount: 8,
    transcriptsCount: 412,
    wakeWord: 'Hey AGIES, MedCare',
  },
  {
    id: 't-4',
    name: 'Unnikrishnan Tech Studio',
    slug: 'unnikrishnan',
    domain: 'unnikrishnan.eqmaxtech.com',
    status: 'trial',
    trialDaysRemaining: 11,
    voiceAgentStatus: '3D Robot + Voice ON',
    monthlyBilling: '₹0 (Zero Card Required)',
    plan: '14-Day Free Trial',
    memberCount: 5,
    transcriptsCount: 980,
    wakeWord: 'Hey AGIES',
  },
  {
    id: 't-5',
    name: 'Apex Logistics Global',
    slug: 'apexlogistics',
    domain: 'apex.eqmaxtech.com',
    status: 'trial',
    trialDaysRemaining: 1,
    voiceAgentStatus: 'Trial Active',
    monthlyBilling: '₹0 until trial expires',
    plan: '14-Day Free Trial',
    memberCount: 12,
    transcriptsCount: 650,
    wakeWord: 'Hey AGIES, Dispatch',
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'aegis',
    time: '12:54 PM',
    text: 'Hello. I have seated myself in front of your workstation computer. I am listening continuously through the 48kHz audio stream. What would you like me to search for on the web or execute on your PC?',
    badge: 'SPOKEN AUDIO',
    audioLatency: '0.12s',
    modelUsed: 'Claude 3.5 Sonnet',
  },
  {
    id: 'msg-2',
    sender: 'user',
    time: '12:55 PM',
    text: 'AEGIS, search for the newest multi-modal robotics foundation models published this week. Check their benchmarks on the PC browser and tell me how they compare to your vision system.',
    badge: 'VOICE INPUT',
  },
  {
    id: 'msg-3',
    sender: 'aegis',
    time: '12:55 PM',
    text: 'I have typed the query into our autonomous Chromium browser on Monitor #2 and evaluated three recent preprints. The leading model demonstrates an 88.4% success rate in zero-shot physical tool manipulation, whereas my current fine-tuned vision pipeline achieves 94.2% in precision workstation tasks.',
    badge: 'RESEARCH COMPLETED',
    audioLatency: '0.14s',
    modelUsed: 'Google Gemini 1.5 Pro',
    browserProof: {
      title: 'AUTONOMOUS PC BROWSER (3 TABS SCRAPED)',
      tabs: [
        { url: 'arxiv.org/abs/2411.08912', note: 'Extracted Benchmark Table' },
        { url: 'github.com/robotics-vla/core', note: 'Verified Model Weights' },
        { url: 'huggingface.co/papers/robot-multimodal', note: 'Context Scraped' },
      ],
      vectorNode: 'VECTOR NODE #8416',
    },
    question: 'Would you like me to download the open-source checkpoints to your local PC storage, or should I prepare an executive briefing for your team first?',
    options: ['Option A: Download Checkpoints to PC', 'Option B: Draft Team Briefing Memo'],
  },
];

const initialRecipes: AutomationRecipe[] = [
  {
    id: 'rec-1',
    name: 'Prepare Client Demo',
    triggerPhrase: 'Hey AGIES, Prepare Client Demo',
    status: 'ready',
    lastRun: '10 mins ago',
    steps: [
      {
        stepNumber: 1,
        title: 'Voice Wake Trigger',
        category: 'Audio Listener',
        description: 'Detect keyword: "Hey AGIES, Prepare Client Demo"',
        detail: 'Confidence threshold: 98.5% • Continuous background detection',
      },
      {
        stepNumber: 2,
        title: 'Autonomous Browser Navigation',
        category: 'Chrome CDP Sandbox',
        description: 'Navigate to https://keralabank.eqmaxtech.com/staging and extract eKYC verification summary.',
        detail: 'Auth Token: Vault Key #9 • Headless execution on Monitor #2',
      },
      {
        stepNumber: 3,
        title: 'Synthesize Transcript & Notify Team',
        category: 'Dispatch Webhook',
        description: 'Post formatted meeting summary into Slack channel #kerala-bank-demo and tag Devika.',
        detail: 'Audio playback: "Client demo dossier ready on your secondary screen."',
      },
    ],
  },
  {
    id: 'rec-2',
    name: 'Daily Morning Executive Briefing',
    triggerPhrase: 'Hey AGIES, Run Daily Morning Briefing',
    status: 'ready',
    lastRun: 'Today, 08:30 AM',
    steps: [
      {
        stepNumber: 1,
        title: 'Calendar & Sprint Sync',
        category: 'Google Calendar API',
        description: 'Fetch today\'s schedule and identify critical due dates for Kerala Bank and EQTech.',
        detail: 'Filter for High Priority tags',
      },
      {
        stepNumber: 2,
        title: 'Voice Synthesis Delivery',
        category: 'ElevenLabs Voice Engine',
        description: 'Speak audible morning overview through workstation speakers.',
        detail: 'Natural cadence at 1.0x pitch',
      },
    ],
  },
];

const initialTranscripts: VoiceTranscriptLog[] = [
  {
    id: 'tr-1',
    speaker: 'Unnikrishnan',
    role: 'Lead Architect',
    timestamp: 'Today, 12:54 PM',
    userSpeech: 'Hey AGIES, show my priority deadlines and reschedule the EQTech review to 2 PM.',
    agentResponse: 'Done. EQTech Academy review shifted to 14:00. Kerala Bank eKYC testing is flagged as top priority due today.',
    confidence: 99.4,
    intent: 'Schedule Modification & Priority Retrieval',
  },
  {
    id: 'tr-2',
    speaker: 'Anand V.',
    role: 'Lead Security (Kerala Bank)',
    timestamp: 'Today, 11:24 AM',
    userSpeech: 'Hey AGIES, verify SHA256 hashes for biometric eKYC SDK before sprint release.',
    agentResponse: 'Hashes matched 100%. Released to QA testing environment.',
    confidence: 99.8,
    intent: 'Biometric Hash Verification',
  },
  {
    id: 'tr-3',
    speaker: 'Ramesh Kumar',
    role: 'Chief IT Officer (Kerala Bank)',
    timestamp: 'Today, 10:00 AM',
    userSpeech: 'Hey AGIES, generate status summary of Kerala Bank sprint 4.',
    agentResponse: 'Summary compiled and sent to executive leadership email.',
    confidence: 99.1,
    intent: 'Sprint Progress Compilation',
  },
];

const initialModels: AIModelConfig[] = [
  {
    id: 'm-1',
    name: 'Anthropic — Claude 3.5 Sonnet',
    provider: 'Anthropic',
    modelId: 'claude-3-5-sonnet-20241022',
    status: 'active_default',
    role: 'Deep code generation, autonomous artifacts & reasoning',
    latencyMs: 165,
    keyMasked: 'sk-ant-api03-884190ba324409bb104f',
  },
  {
    id: 'm-2',
    name: 'Google Gemini — 1.5 Pro & Flash',
    provider: 'Google',
    modelId: 'gemini-1.5-pro-latest',
    status: 'connected',
    role: '2M context window, multimodal video/audio & documents',
    latencyMs: 118,
    keyMasked: 'AIzaSyB892a01490ccf98214fa8b3014a90',
  },
  {
    id: 'm-3',
    name: 'OpenAI — GPT-4o / ChatGPT',
    provider: 'OpenAI',
    modelId: 'gpt-4o-2024-11-20',
    status: 'connected',
    role: 'General conversational reasoning & synthetic chat',
    latencyMs: 142,
    keyMasked: 'sk-proj-994821a8f9038ba771234900a89d98',
  },
  {
    id: 'm-4',
    name: 'Perplexity AI — Sonar Online',
    provider: 'Perplexity',
    modelId: 'llama-3.1-sonar-huge-128k-online',
    status: 'connected',
    role: 'Live web grounding & instant citation search',
    latencyMs: 190,
    keyMasked: 'pplx-889104fa28c091490214bb789014',
  },
];

const initialStorages: StorageConfig[] = [
  {
    id: 's-1',
    name: 'Google Cloud Storage (GCS)',
    provider: 'Google Cloud',
    status: 'Connected & Verified',
    location: 'asia-south1 (Mumbai)',
    resource: 'gs://aegis-keralabank-secure-vault',
  },
  {
    id: 's-2',
    name: 'AWS S3 Vault Bucket',
    provider: 'Amazon Web Services',
    status: 'Standby Mirror',
    location: 'ap-south-1 (Mumbai)',
    resource: 's3://aegis-backup-mirror-2026',
  },
  {
    id: 's-3',
    name: 'Google Drive Connector',
    provider: 'Google Workspace',
    status: 'OAuth Authorized',
    location: 'Cloud Drive',
    resource: 'Shared Folder: /Kerala-Bank-eKYC-Assets',
  },
];

const initialPayments: PaymentGateway[] = [
  {
    id: 'p-1',
    name: 'Razorpay UPI Autopay',
    type: 'Recurring UPI E-Mandate',
    status: 'primary',
    currency: 'INR (₹)',
    mandate: '₹699 + 18% GST / month (₹824.82)',
    keyId: 'rzp_live_89124a980bb1',
  },
  {
    id: 'p-2',
    name: 'PhonePe Corporate Gateway',
    type: 'UPI & NetBanking Standby',
    status: 'standby',
    currency: 'INR (₹)',
    mandate: 'Direct B2B Invoicing',
    keyId: 'M23065409324',
  },
  {
    id: 'p-3',
    name: 'Stripe International',
    type: 'Global Corporate Cards',
    status: 'global',
    currency: 'USD ($)',
    mandate: '$9.99 / seat / mo',
    keyId: 'pk_live_51M920ab4...',
  },
];

// Initial Personal Memories with strict tenant tagging
const initialMemories: MemoryRecord[] = [
  {
    id: 'mem-1',
    tenantId: 't-1',
    title: 'Kerala Bank Compliance Guideline',
    content: 'Always format eKYC biometric verification logs with SHA-256 integrity checksums before notifying security personnel.',
    category: 'directive',
    source: 'CIO Instruction (Ramesh Kumar)',
    timestamp: 'Nov 17, 2026, 10:15 AM',
    retentionDays: 365,
    isPaused: false,
    confidenceScore: 99.8,
  },
  {
    id: 'mem-2',
    tenantId: 't-1',
    title: 'Morning Executive Delivery Cadence',
    content: 'Deliver executive audio briefings at 08:30 AM IST sharp, summarizing high-priority issues across Kerala Bank and EQTech Academy.',
    category: 'instruction',
    source: 'Calendar Sync & Voice Request',
    timestamp: 'Nov 16, 2026, 04:20 PM',
    retentionDays: 180,
    isPaused: false,
    confidenceScore: 98.4,
  },
  {
    id: 'mem-3',
    tenantId: 't-4',
    title: 'Unnikrishnan Development Stack Preference',
    content: 'Target React 19 + TypeScript with Tailwind CSS for web apps, and configure Vercel Edge SPA rewrites by default.',
    category: 'preference',
    source: 'Lead Architect Console Command',
    timestamp: 'Nov 18, 2026, 01:05 AM',
    retentionDays: 90,
    isPaused: false,
    confidenceScore: 99.9,
  },
  {
    id: 'mem-4',
    tenantId: 't-2',
    title: 'EQTech Academy Review Schedule',
    content: 'Website v2 sprint reviews must only occur after 2:00 PM IST to accommodate student trainer availability.',
    category: 'context',
    source: 'Slack Webhook Note',
    timestamp: 'Nov 17, 2026, 02:30 PM',
    retentionDays: 60,
    isPaused: false,
    confidenceScore: 97.2,
  },
];

// Initial Controlled Tool Tasks with 4-Tier Approval Structure
const initialTasks: ToolTaskAction[] = [
  {
    id: 'task-101',
    toolName: 'Autonomous Chromium Scraper',
    tier: 'A',
    tierLabel: 'Tier A — Low-Risk Read',
    requester: 'Unnikrishnan',
    tenantId: 't-4',
    description: 'Scrape latest multimodal robotics benchmarks from arXiv and Hugging Face.',
    parameters: { query: 'multimodal robotics foundation model benchmarks', tabs: 3 },
    status: 'completed',
    timestamp: '12:55 PM',
    result: '3 papers summarized. Highest accuracy found: 94.2% in precision manipulation.',
    canUndo: false,
  },
  {
    id: 'task-102',
    toolName: 'Google Calendar API',
    tier: 'B',
    tierLabel: 'Tier B — Reversible Action',
    requester: 'Unnikrishnan',
    tenantId: 't-4',
    description: 'Reschedule EQTech Academy sprint review to 2:00 PM IST.',
    parameters: { event: 'EQTech Academy v2 Review', newTime: '14:00 IST', duration: '45m' },
    status: 'completed',
    timestamp: '12:56 PM',
    result: 'Calendar slot updated. Tentative reminder dispatched with undo option.',
    canUndo: true,
  },
  {
    id: 'task-103',
    toolName: 'Slack Webhook & Team Dispatcher',
    tier: 'C',
    tierLabel: 'Tier C — External Side Effect (Requires Approval)',
    requester: 'Autonomous Workflow Engine',
    tenantId: 't-1',
    description: 'Post executive eKYC sprint summary into public channel #kerala-bank-demo and ping Devika.',
    parameters: { channel: '#kerala-bank-demo', mention: '@devika', payloadSize: '2.4 KB' },
    status: 'pending_approval',
    timestamp: '01:10 PM',
    canUndo: false,
  },
  {
    id: 'task-104',
    toolName: 'Razorpay Billing Mandate Executor',
    tier: 'D',
    tierLabel: 'Tier D — High Impact / Financial (Strict Confirmation)',
    requester: 'SaaS Subscription Engine',
    tenantId: 't-3',
    description: 'Authorize trial transition to ₹699 + 18% GST (₹824.82/month) via UPI e-mandate for Hospital Management Pro.',
    parameters: { amount: 824.82, currency: 'INR', plan: 'Pro Enterprise', mandateId: 'umn_890123' },
    status: 'pending_approval',
    timestamp: '01:25 PM',
    canUndo: false,
  },
];

const initialAuditLogs: AuditLogEntry[] = [
  {
    id: 'aud-1',
    requester: 'Unnikrishnan',
    tool: 'Autonomous Chromium Scraper',
    tier: 'A',
    time: '12:55 PM',
    scope: 'Read web search & scrape 3 arXiv preprints',
    outcome: 'Success',
    details: 'Extracted benchmark tables into vector node #8416.',
  },
  {
    id: 'aud-2',
    requester: 'Unnikrishnan',
    tool: 'Google Calendar API',
    tier: 'B',
    time: '12:56 PM',
    scope: 'Update event timestamp to 14:00',
    outcome: 'Success',
    details: 'EQTech review shifted with 1-click revert capability preserved.',
  },
  {
    id: 'aud-3',
    requester: 'Anand V.',
    tool: 'SHA256 Hash Verifier',
    tier: 'A',
    time: '11:24 AM',
    scope: 'Kerala Bank biometric eKYC binary verification',
    outcome: 'Success',
    details: '100% hash parity verified across staging build.',
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Helper to parse query parameter for view
  const getInitialView = (): ViewMode => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('view');
      if (v === 'admin') return 'admin';
      if (v === 'tenant') return 'tenant';
      if (v === 'voice') return 'voice';
      if (v === 'chat') return 'voice';
      if (v === 'automations') return 'automations';
      if (v === 'integrations') return 'integrations';
      if (v === 'pricing') return 'pricing';
      if (v === 'services') return 'services';
      if (v === 'desktop') return 'desktop';
      if (v === 'mobile') return 'mobile';
      if (v === 'robot3d') return 'robot3d';
      if (v === 'memory') return 'memory';
      if (v === 'activity') return 'activity';
      if (v === 'leads') return 'leads';
      if (v === 'mcp') return 'mcp';
    }
    return 'dashboard';
  };

  const [view, setViewState] = useState<ViewMode>(getInitialView);
  const [role, setRole] = useState<UserRole>('super_admin');
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [motionState, setMotionState] = useState<RobotMotionState>('seated');
  const [operationalState, setOperationalState] = useState<OperationalState>('idle');
  const [isMicLive, setIsMicLive] = useState<boolean>(false);
  const [spokenLanguage, setSpokenLanguage] = useState<string>('en');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [audioLevels, setAudioLevels] = useState<number[]>([6, 6, 6, 6, 6]);
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const [activeTenantId, setActiveTenantId] = useState<string>('t-1');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [recipes, setRecipes] = useState<AutomationRecipe[]>(initialRecipes);
  const [transcripts, setTranscripts] = useState<VoiceTranscriptLog[]>(initialTranscripts);
  const [models] = useState<AIModelConfig[]>(initialModels);
  const [storages] = useState<StorageConfig[]>(initialStorages);
  const [payments] = useState<PaymentGateway[]>(initialPayments);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [isWakeWordActive, setIsWakeWordActive] = useState<boolean>(false);

  // Neural Brain Controller state
  const [activeBrainId, setActiveBrainId] = useState<NeuralBrainId>('gemini');

  // Memory states
  const [memories, setMemories] = useState<MemoryRecord[]>(initialMemories);
  const [isMemoryCapturePaused, setIsMemoryCapturePaused] = useState<boolean>(false);

  // 4-Tier Task states
  const [tasks, setTasks] = useState<ToolTaskAction[]>(initialTasks);
  const [activeApprovalModalTask, setActiveApprovalModalTask] = useState<ToolTaskAction | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(initialAuditLogs);

  // Synchronize view state with URL query parameter
  const setView = (newView: ViewMode) => {
    setViewState(newView);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (newView === 'dashboard') {
        url.searchParams.delete('view');
      } else {
        url.searchParams.set('view', newView);
      }
      window.history.pushState({}, '', url.toString());
    }
  };

  // Listen to popstate
  useEffect(() => {
    const handlePopState = () => {
      setViewState(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Theme application
  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark', 'light', 'jarvis');
      document.documentElement.classList.add(newTheme);
      localStorage.setItem('aegis_theme', newTheme);
    }
  };

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('jarvis');
    else setTheme('dark');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('aegis_theme') as ThemeMode;
    if (savedTheme && ['dark', 'light', 'jarvis'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      setTheme('dark');
    }
  }, []);

  // Barge-In / Interruption Handler (Master Prompt Section 1)
  const bargeIn = () => {
    if (isSpeaking) {
      stopSpeaking();
      setOperationalState('interrupted');
      setTimeout(() => {
        setOperationalState(isMicLive ? 'listening' : 'idle');
      }, 350);
    }
  };

  // Mic toggle with barge-in
  const toggleMic = () => {
    if (!isMicLive) {
      if (isSpeaking) {
        bargeIn();
      }
      setIsMicLive(true);
      setOperationalState('listening');
    } else {
      setIsMicLive(false);
      setOperationalState('idle');
    }
  };

  // Audio Equalizer simulator
  useEffect(() => {
    if (!isMicLive && !isSpeaking) {
      setAudioLevels([6, 6, 6, 6, 6]);
      return;
    }
    const interval = setInterval(() => {
      setAudioLevels([
        Math.floor(Math.random() * 20) + 8,
        Math.floor(Math.random() * 26) + 10,
        Math.floor(Math.random() * 32) + 12,
        Math.floor(Math.random() * 24) + 8,
        Math.floor(Math.random() * 18) + 6,
      ]);
    }, 180);
    return () => clearInterval(interval);
  }, [isMicLive, isSpeaking]);

  // Speech Synthesis with Malayalam and Barge-In
  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 0.95;
      
      // Multi-Language Support (English, Malayalam, Spanish, German, Japanese)
      if (spokenLanguage === 'ml') {
        utterance.lang = 'ml-IN'; // Malayalam
      } else if (spokenLanguage === 'es') {
        utterance.lang = 'es-ES';
      } else if (spokenLanguage === 'de') {
        utterance.lang = 'de-DE';
      } else if (spokenLanguage === 'ja') {
        utterance.lang = 'ja-JP';
      } else {
        utterance.lang = 'en-US';
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setOperationalState('speaking');
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setOperationalState(isMicLive ? 'listening' : 'idle');
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setOperationalState('idle');
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(true);
      setOperationalState('speaking');
      setTimeout(() => {
        setIsSpeaking(false);
        setOperationalState(isMicLive ? 'listening' : 'idle');
      }, 2500);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const triggerWakeWord = () => {
    setIsWakeWordActive(true);
    setOperationalState('listening');
    speakText("Yes, I am listening. How can I assist you right now?");
    setTimeout(() => setIsWakeWordActive(false), 3500);
  };

  // Send message with Unified Neural Brain & Voice Engine
  const sendMessage = async (text: string, isVoice = false) => {
    if (!text.trim()) return;

    // If assistant was speaking, user speaking triggers barge-in
    bargeIn();

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
      badge: isVoice ? 'VOICE INPUT' : 'TYPED INPUT',
    };

    setMessages((prev) => [...prev, userMsg]);
    setOperationalState('processing');

    try {
      const res = await executeUnifiedNeuralBrain({
        prompt: text,
        brainId: activeBrainId,
        spokenLanguage: spokenLanguage,
        tenantId: activeTenantId,
        userName: 'Unnikrishnan',
      });

      const robotMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'aegis',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: res.answerText,
        badge: 'VOICE SYNTHESIS',
        audioLatency: `${(res.latencyMs / 1000).toFixed(2)}s`,
        modelUsed: res.brainUsed.name,
        browserProof: res.toolInvoked ? {
          title: `MCP TOOL: ${res.toolInvoked.toUpperCase()}`,
          tabs: [{ url: `mcp://tool/${res.toolInvoked}`, note: JSON.stringify(res.toolResult || 'Executed') }],
          vectorNode: res.vectorNodeId || `NODE #${Math.floor(1000 + Math.random() * 9000)}`,
        } : undefined,
      };

      setMessages((prev) => [...prev, robotMsg]);
      speakText(res.spokenText);

      // Add to transcript log
      const newLog: VoiceTranscriptLog = {
        id: `tr-${Date.now()}`,
        speaker: 'You (Spoken / Console)',
        role: role === 'super_admin' ? 'Master Admin' : role === 'tenant_admin' ? 'Tenant Admin' : 'Workspace Member',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        userSpeech: text,
        agentResponse: res.answerText,
        confidence: 99.4,
        intent: res.toolInvoked ? `MCP Action: ${res.toolInvoked}` : 'Work Execution & Assistant Query',
      };
      setTranscripts((prev) => [newLog, ...prev]);

      // If action requires Tier C / D approval
      if (res.requiresApproval && res.approvalTask) {
        setTasks((prev) => [res.approvalTask, ...prev]);
        setActiveApprovalModalTask(res.approvalTask);
      }

      // If memory capture not paused, potentially record relevant context
      const lower = text.toLowerCase();
      if (!isMemoryCapturePaused && (lower.includes('remember') || lower.includes('prefer') || lower.includes('always') || lower.includes('note'))) {
        const newMem: MemoryRecord = {
          id: `mem-${Date.now()}`,
          tenantId: activeTenantId,
          title: 'User Expressed Preference',
          content: text,
          category: 'preference',
          source: 'Live Conversation',
          timestamp: new Date().toLocaleString(),
          retentionDays: 90,
          isPaused: false,
          confidenceScore: 98.1,
        };
        setMemories((prev) => [newMem, ...prev]);
      }
    } catch (err) {
      console.error('Error in executeUnifiedNeuralBrain:', err);
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'aegis',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: "I encountered an error executing the query through the neural brain pipeline. Fallback active.",
        badge: 'ERROR FALLBACK',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      setOperationalState('idle');
    }
  };

  const addTenant = (newT: Omit<Tenant, 'id' | 'transcriptsCount'>) => {
    const created: Tenant = {
      ...newT,
      id: `t-${Date.now()}`,
      transcriptsCount: 0,
    };
    setTenants((prev) => [created, ...prev]);
  };

  const runRecipe = (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === recipeId ? { ...r, status: 'running' } : r))
    );
    speakText("Executing autonomous workflow recipe. Sandboxes hooked on Monitor #2.");
    setTimeout(() => {
      setRecipes((prev) =>
        prev.map((r) =>
          r.id === recipeId
            ? { ...r, status: 'ready', lastRun: 'Just now (Completed 100%)' }
            : r
        )
      );
      speakText("Recipe execution completed successfully with zero manual intervention.");
    }, 2500);
  };

  // Memory actions
  const addMemory = (newM: Omit<MemoryRecord, 'id' | 'timestamp'>) => {
    const created: MemoryRecord = {
      ...newM,
      id: `mem-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
    };
    setMemories((prev) => [created, ...prev]);
  };

  const updateMemory = (id: string, updates: Partial<MemoryRecord>) => {
    setMemories((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const deleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleMemoryPause = (id: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isPaused: !m.isPaused } : m))
    );
  };

  // 4-Tier Task Approvals & Audit Actions
  const approveTask = (id: string) => {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'running' } : t))
    );

    speakText(`Approved ${target.toolName}. Executing with sandbox verified credentials.`);

    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                status: 'completed',
                result: `Execution succeeded. Dispatched to ${target.parameters.channel || target.parameters.event || 'target destination'}.`,
              }
            : t
        )
      );

      // Record in audit log
      const log: AuditLogEntry = {
        id: `aud-${Date.now()}`,
        requester: target.requester,
        tool: target.toolName,
        tier: target.tier,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        scope: target.description,
        outcome: 'Success',
        details: `Explicit user approval granted. Executed successfully under tenant ${target.tenantId}.`,
      };
      setAuditLogs((prev) => [log, ...prev]);
      setActiveApprovalModalTask(null);
    }, 1200);
  };

  const rejectTask = (id: string) => {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'rejected' } : t))
    );

    speakText(`Action cancelled. ${target.toolName} was rejected and blocked.`);

    const log: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      requester: target.requester,
      tool: target.toolName,
      tier: target.tier,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      scope: target.description,
      outcome: 'Denied',
      details: 'User explicitly denied authorization.',
    };
    setAuditLogs((prev) => [log, ...prev]);
    setActiveApprovalModalTask(null);
  };

  const undoTask = (id: string) => {
    const target = tasks.find((t) => t.id === id);
    if (!target || !target.canUndo) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: 'rejected',
              result: 'Action reverted by user. Calendar schedule restored to previous state.',
            }
          : t
      )
    );

    speakText(`Reverted changes for ${target.toolName}. Previous state restored.`);

    const log: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      requester: target.requester,
      tool: target.toolName,
      tier: target.tier,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      scope: target.description,
      outcome: 'Reverted',
      details: 'User executed instant undo within grace window.',
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const activeTenant = tenants.find((t) => t.id === activeTenantId) || tenants[0];

  return (
    <AppContext.Provider
      value={{
        view,
        setView,
        role,
        setRole,
        theme,
        cycleTheme,
        setTheme,
        motionState,
        setMotionState,
        operationalState,
        setOperationalState,
        isMicLive,
        setIsMicLive,
        toggleMic,
        spokenLanguage,
        setSpokenLanguage,
        isSpeaking,
        speakText,
        stopSpeaking,
        bargeIn,
        audioLevels,
        tenants,
        addTenant,
        messages,
        sendMessage,
        recipes,
        runRecipe,
        models,
        storages,
        payments,
        transcripts,
        activeTenant,
        setActiveTenantId,
        showAuthModal,
        setShowAuthModal,
        triggerWakeWord,
        isWakeWordActive,
        
        activeBrainId,
        setActiveBrainId,
        
        memories,
        addMemory,
        updateMemory,
        deleteMemory,
        toggleMemoryPause,
        isMemoryCapturePaused,
        setIsMemoryCapturePaused,

        tasks,
        approveTask,
        rejectTask,
        undoTask,
        activeApprovalModalTask,
        setActiveApprovalModalTask,
        auditLogs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
