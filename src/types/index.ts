export type ViewMode = 
  | 'dashboard' 
  | 'admin' 
  | 'tenant' 
  | 'chat' 
  | 'voice' 
  | 'automations' 
  | 'integrations' 
  | 'pricing' 
  | 'services'
  | 'desktop'
  | 'mobile'
  | 'robot3d' 
  | 'auth'
  | 'memory'
  | 'activity'
  | 'leads'
  | 'mcp';

export type UserRole = 'super_admin' | 'tenant_admin' | 'user';

export type ThemeMode = 'dark' | 'light' | 'jarvis';

export type RobotMotionState = 'seated' | 'walking' | 'stand';

export type OperationalState = 
  | 'idle' 
  | 'listening' 
  | 'processing' 
  | 'speaking' 
  | 'interrupted' 
  | 'offline' 
  | 'error';

export type ApprovalTier = 'A' | 'B' | 'C' | 'D';

export type MemoryCategory = 'preference' | 'directive' | 'instruction' | 'context';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain: string;
  status: 'paid' | 'trial' | 'past_due';
  trialDaysRemaining: number;
  voiceAgentStatus: string;
  monthlyBilling: string;
  plan: string;
  memberCount: number;
  transcriptsCount: number;
  wakeWord: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'aegis';
  time: string;
  text: string;
  badge?: string;
  audioLatency?: string;
  modelUsed?: string;
  browserProof?: {
    title: string;
    tabs: { url: string; note: string }[];
    vectorNode: string;
  };
  question?: string;
  options?: string[];
}

export interface AutomationRecipe {
  id: string;
  name: string;
  triggerPhrase: string;
  status: 'ready' | 'running' | 'idle';
  lastRun?: string;
  steps: {
    stepNumber: number;
    title: string;
    category: string;
    description: string;
    detail: string;
  }[];
}

export interface AIModelConfig {
  id: string;
  name: string;
  provider: 'Anthropic' | 'Google' | 'OpenAI' | 'Perplexity';
  modelId: string;
  status: 'connected' | 'active_default' | 'standby';
  role: string;
  latencyMs: number;
  keyMasked: string;
}

export interface StorageConfig {
  id: string;
  name: string;
  provider: string;
  status: string;
  location: string;
  resource: string;
}

export interface PaymentGateway {
  id: string;
  name: string;
  type: string;
  status: 'primary' | 'standby' | 'global';
  currency: string;
  mandate: string;
  keyId: string;
}

export interface VoiceTranscriptLog {
  id: string;
  speaker: string;
  role: string;
  timestamp: string;
  userSpeech: string;
  agentResponse: string;
  confidence: number;
  intent: string;
}

export interface MemoryRecord {
  id: string;
  tenantId: string;
  title: string;
  content: string;
  category: MemoryCategory;
  source: string;
  timestamp: string;
  retentionDays: number;
  isPaused: boolean;
  confidenceScore: number;
}

export interface ToolTaskAction {
  id: string;
  toolName: string;
  tier: ApprovalTier;
  tierLabel: string;
  requester: string;
  tenantId: string;
  description: string;
  parameters: Record<string, any>;
  status: 'pending_approval' | 'running' | 'completed' | 'rejected';
  timestamp: string;
  result?: string;
  canUndo?: boolean;
}

export interface AuditLogEntry {
  id: string;
  requester: string;
  tool: string;
  tier: ApprovalTier;
  time: string;
  scope: string;
  outcome: 'Success' | 'Pending' | 'Denied' | 'Reverted';
  details: string;
}

// MCP (Model Context Protocol) Server & Tool Interfaces
export type MCPServerStatus = 'connected' | 'standby' | 'error' | 'syncing';

export interface MCPToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  required: boolean;
  default?: any;
}

export interface MCPTool {
  id: string;
  name: string;
  displayName: string;
  category: 'google' | 'meta' | 'stitch' | 'nllm' | 'data_push' | 'system';
  description: string;
  serverName: string;
  approvalTier: ApprovalTier;
  parameters: MCPToolParameter[];
  isAvailable: boolean;
  executionsCount: number;
  lastExecuted?: string;
}

export interface MCPServerConfig {
  id: string;
  name: string;
  endpoint: string;
  protocol: 'stdio' | 'sse' | 'http' | 'in_process';
  status: MCPServerStatus;
  toolsCount: number;
  authHeaderMasked?: string;
  category: 'google_workspace' | 'meta_graph' | 'stitch_studio' | 'neural_brains' | 'cloud_storage';
  description: string;
}

// Universal Neural Brain / NLLM Interface
export type NeuralBrainId = 
  | 'chatgpt' 
  | 'gemini' 
  | 'claude' 
  | 'claude_code' 
  | 'antigravity' 
  | 'perplexity';

export interface NeuralBrainInfo {
  id: NeuralBrainId;
  name: string;
  provider: string;
  model: string;
  contextWindow: string;
  status: 'active' | 'ready' | 'standby';
  latencyMs: number;
  capabilities: string[];
  description: string;
  badge: string;
}

// Meta & Google Lead Capture Interface
export interface LeadRecord {
  id: string;
  tenantId: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  source: 'meta_facebook' | 'meta_instagram' | 'google_ads' | 'website_form';
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  campaignName: string;
  adSetId?: string;
  formId?: string;
  timestamp: string;
  voiceEnrichedNotes?: string;
  budgetEstimated?: string;
}

// Meta Studio Social Post Interface
export interface SocialPostRecord {
  id: string;
  tenantId: string;
  platform: 'facebook' | 'instagram' | 'both';
  pageId: string;
  pageName: string;
  content: string;
  mediaUrl?: string;
  status: 'published' | 'scheduled' | 'draft';
  scheduledTime?: string;
  publishedTime?: string;
  impressions?: number;
  reach?: number;
  likes?: number;
  comments?: number;
  studioPromptRef?: string;
}

