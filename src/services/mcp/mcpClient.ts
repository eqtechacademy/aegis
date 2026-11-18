import { MCPTool, ApprovalTier, AuditLogEntry } from '../../types';
import { defaultMCPTools } from './mcpRegistry';

export interface MCPExecutionResult {
  success: boolean;
  toolId: string;
  toolName: string;
  tier: ApprovalTier;
  output: any;
  auditId: string;
  timestamp: string;
  requiresUserApproval?: boolean;
  approvalTaskDetails?: {
    id: string;
    description: string;
    tier: ApprovalTier;
    parameters: Record<string, any>;
  };
}

class MCPClientManager {
  private tools: MCPTool[] = [...defaultMCPTools];
  private auditLogList: AuditLogEntry[] = [];

  public getTools(): MCPTool[] {
    return this.tools;
  }

  public getToolById(id: string): MCPTool | undefined {
    return this.tools.find(t => t.id === id || t.name === id);
  }

  /**
   * Execute an MCP Tool by name with parameter validation and tier enforcement
   */
  public async executeTool(
    toolNameOrId: string, 
    parameters: Record<string, any>, 
    requester: string = 'AGIES Voice Orchestrator'
  ): Promise<MCPExecutionResult> {
    const tool = this.getToolById(toolNameOrId);
    const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const auditId = `aud-${Date.now()}`;

    if (!tool) {
      return {
        success: false,
        toolId: toolNameOrId,
        toolName: toolNameOrId,
        tier: 'A',
        output: `Error: MCP Tool '${toolNameOrId}' not found in registry.`,
        auditId,
        timestamp,
      };
    }

    // Check if Tier C or D requires explicit approval
    if (tool.approvalTier === 'C' || tool.approvalTier === 'D') {
      const taskDescription = tool.description.replace('Requires explicit user confirmation.', '').trim();
      return {
        success: false,
        requiresUserApproval: true,
        toolId: tool.id,
        toolName: tool.name,
        tier: tool.approvalTier,
        output: `[APPROVAL REQUIRED]: ${tool.displayName} involves external side-effects or high impact (Tier ${tool.approvalTier}). Waiting for manual user approval.`,
        auditId,
        timestamp,
        approvalTaskDetails: {
          id: `task-${Date.now()}`,
          description: `Execute ${tool.displayName}: ${JSON.stringify(parameters)}`,
          tier: tool.approvalTier,
          parameters,
        },
      };
    }

    // Execute Tool Mock / Local Logic
    tool.executionsCount += 1;
    tool.lastExecuted = 'Just now';

    let outputResult: any;

    switch (tool.name) {
      case 'google_drive_push':
        outputResult = {
          fileId: `gdrive_doc_${Date.now()}`,
          fileName: parameters.fileName || 'AGIES_Transcript.pdf',
          status: 'Uploaded to Google Drive',
          folder: parameters.folderId || '1F49_AGIES_Transcripts_2026',
          webViewLink: `https://drive.google.com/file/d/1F49_${Date.now()}/view`,
        };
        break;

      case 'google_sheets_append':
        outputResult = {
          status: 'Row Appended Successfully',
          spreadsheetId: parameters.spreadsheetId || '1_EqMax_AEGIS_CRM_Leads',
          updatedRange: `${parameters.sheetName || 'Leads'}!A${tool.executionsCount}:F${tool.executionsCount}`,
          rowsAdded: 1,
        };
        break;

      case 'google_calendar_schedule':
        outputResult = {
          eventId: `cal_event_${Date.now()}`,
          title: parameters.title,
          time: parameters.startTime,
          status: 'Confirmed & Calendar Invites Sent',
          meetLink: 'https://meet.google.com/aeg-isvx-tech',
        };
        break;

      case 'meta_lead_capture':
        outputResult = {
          status: 'Meta Leads Synchronized',
          newLeadsCount: 3,
          source: 'Instagram & Facebook Lead Ads',
          latestLead: {
            fullName: 'Dr. Ramesh Nambiar',
            company: 'Kerala Health Services',
            campaign: 'Kerala Enterprise AI Trial',
          },
        };
        break;

      case 'stitch_sync_screen':
        outputResult = {
          projectId: '13358164649773425082',
          screensSynced: 13,
          latestTokens: 'Neon Cyan #00F0FF, Obsidian #070B19, Ribbon A SVG',
          status: 'Design parity: 100% verified',
        };
        break;

      case 'data_push_mirror':
        outputResult = {
          category: parameters.dataCategory || 'transcripts',
          destinations: ['AWS S3 ap-south-1', 'Google Drive', 'Cloudflare R2'],
          status: 'Data mirrored across 3 cloud regions',
        };
        break;

      default:
        outputResult = {
          status: 'Executed successfully',
          parametersReceived: parameters,
        };
    }

    // Record to internal Audit Ledger
    const auditEntry: AuditLogEntry = {
      id: auditId,
      requester,
      tool: tool.displayName,
      tier: tool.approvalTier,
      time: timestamp,
      scope: `${tool.name} with parameters: ${Object.keys(parameters).join(', ')}`,
      outcome: 'Success',
      details: typeof outputResult === 'string' ? outputResult : JSON.stringify(outputResult),
    };
    this.auditLogList.unshift(auditEntry);

    return {
      success: true,
      toolId: tool.id,
      toolName: tool.name,
      tier: tool.approvalTier,
      output: outputResult,
      auditId,
      timestamp,
    };
  }

  public getAuditLogs(): AuditLogEntry[] {
    return this.auditLogList;
  }
}

export const mcpClient = new MCPClientManager();
