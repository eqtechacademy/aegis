import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Navigation/Sidebar';
import { Header } from './components/Navigation/Header';
import { Footer } from './components/Common/Footer';
import { FuturisticDashboard } from './components/Dashboard/FuturisticDashboard';
import { SuperAdminPortal } from './components/Admin/SuperAdminPortal';
import { TenantWorkspaceSettings } from './components/Tenant/TenantWorkspaceSettings';
import { RoboticVoiceAssistant } from './components/Voice/RoboticVoiceAssistant';
import { RobotExperience3D } from './components/Robot3D/RobotExperience3D';
import { AutomationWorkflowSetup } from './components/Automations/AutomationWorkflowSetup';
import { ApiIntegrationsVault } from './components/Integrations/ApiIntegrationsVault';
import { SubscriptionPricing } from './components/Pricing/SubscriptionPricing';
import { AuthenticationModal } from './components/Auth/AuthenticationModal';
import { MemoryCenter } from './components/Memory/MemoryCenter';
import { ActivityTasksCenter } from './components/Tasks/ActivityTasksCenter';
import { Zap, Volume2, ShieldAlert } from 'lucide-react';

export const App: React.FC = () => {
  const { view, isWakeWordActive } = useApp();

  const renderActiveView = () => {
    switch (view) {
      case 'admin':
        return <SuperAdminPortal />;
      case 'tenant':
        return <TenantWorkspaceSettings />;
      case 'voice':
      case 'chat':
        return <RoboticVoiceAssistant />;
      case 'activity':
        return <ActivityTasksCenter />;
      case 'memory':
        return <MemoryCenter />;
      case 'robot3d':
        return <RobotExperience3D />;
      case 'automations':
        return <AutomationWorkflowSetup />;
      case 'integrations':
        return <ApiIntegrationsVault />;
      case 'pricing':
        return <SubscriptionPricing />;
      case 'dashboard':
      default:
        return <FuturisticDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex relative overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* Sci-Fi Background Glows */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-1/2 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed -bottom-40 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Persistent Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Dynamic Viewport */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen z-10">
        <Header />

        {/* Hotword "Hey AGIES" Visual Notification Banner */}
        {isWakeWordActive && (
          <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-6 py-2 flex items-center justify-between text-xs font-mono shadow-glow-cyan animate-pulse sticky top-16 z-30">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 animate-bounce" />
              <span>
                <strong>"Hey AGIES" Detected:</strong> Neural Core is actively listening to your voice stream.
              </span>
            </div>
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
              Continuous 48kHz Audio
            </span>
          </div>
        )}

        {/* Core Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {renderActiveView()}
        </main>

        {/* Mandatory EQMax Persistent Footer */}
        <Footer />
      </div>

      {/* Biometric Voice / Multi-Tenant Authentication Modal */}
      <AuthenticationModal />
    </div>
  );
};

export default App;

