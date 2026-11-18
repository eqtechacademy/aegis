import React from 'react';
import { useApp } from '../../context/AppContext';
import { ViewMode } from '../../types';
import { 
  Home, 
  LayoutDashboard, 
  ShieldCheck, 
  Building2, 
  Mic, 
  Workflow, 
  Key, 
  CreditCard, 
  Boxes,
  Lock,
  Layers,
  Brain,
  ListOrdered,
  Sparkles,
  Monitor,
  Smartphone,
  Users,
  Server
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { view, setView, role, setShowAuthModal, activeTenant } = useApp();

  const navItems = [
    {
      id: 'dashboard' as ViewMode,
      label: 'Home Dashboard',
      icon: Home,
      roles: ['super_admin', 'tenant_admin', 'user'],
    },
    {
      id: 'voice' as ViewMode,
      label: 'Voice AI Assistant',
      icon: Mic,
      badge: 'Always-On',
      roles: ['super_admin', 'tenant_admin', 'user'],
    },
    {
      id: 'activity' as ViewMode,
      label: 'Activity & Approvals',
      icon: ListOrdered,
      badge: '4 Tiers',
      roles: ['super_admin', 'tenant_admin', 'user'],
    },
    {
      id: 'leads' as ViewMode,
      label: 'Meta & Google Leads',
      icon: Users,
      badge: 'Capture',
      roles: ['super_admin', 'tenant_admin', 'user'],
    },
    {
      id: 'mcp' as ViewMode,
      label: 'MCP Server Manager',
      icon: Server,
      badge: '5 MCPs',
      roles: ['super_admin', 'tenant_admin'],
    },
    {
      id: 'memory' as ViewMode,
      label: 'Personal Memory',
      icon: Brain,
      badge: 'Context',
      roles: ['super_admin', 'tenant_admin', 'user'],
    },
    {
      id: 'robot3d' as ViewMode,
      label: '3D Robot Experience',
      icon: Boxes,
      badge: 'Live Gait',
      roles: ['super_admin', 'tenant_admin', 'user'],
    },
    {
      id: 'automations' as ViewMode,
      label: 'Voice Automations',
      icon: Workflow,
      badge: 'Recipes',
      roles: ['super_admin', 'tenant_admin', 'user'],
    },
    {
      id: 'integrations' as ViewMode,
      label: 'Neural APIs & Vault',
      icon: Key,
      badge: '4 LLMs',
      roles: ['super_admin', 'tenant_admin'],
    },
    {
      id: 'admin' as ViewMode,
      label: 'SaaS Super Admin',
      icon: ShieldCheck,
      badge: 'Master Key',
      roles: ['super_admin'],
    },
    {
      id: 'tenant' as ViewMode,
      label: 'Tenant Workspace',
      icon: Building2,
      badge: activeTenant.slug,
      roles: ['super_admin', 'tenant_admin'],
    },
    {
      id: 'pricing' as ViewMode,
      label: 'Subscription & Pricing',
      icon: CreditCard,
      badge: '₹699+GST',
      roles: ['super_admin', 'tenant_admin', 'user'],
    },
    {
      id: 'services' as ViewMode,
      label: 'Services & Capabilities',
      icon: Sparkles,
      badge: 'Zero Card',
      roles: ['super_admin', 'tenant_admin', 'user'],
    },
    {
      id: 'desktop' as ViewMode,
      label: 'Desktop App (Win EXE)',
      icon: Monitor,
      badge: 'PID 10424',
      roles: ['super_admin', 'tenant_admin', 'user'],
    },
    {
      id: 'mobile' as ViewMode,
      label: 'Mobile Companion',
      icon: Smartphone,
      badge: 'iOS/APK',
      roles: ['super_admin', 'tenant_admin', 'user'],
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#070D1F]/90 backdrop-blur-xl border-r border-cyan-500/15 flex flex-col justify-between p-5 z-20 h-screen sticky top-0 overflow-y-auto">
      <div className="space-y-5">
        {/* BRAND LOGO (Gradient Ribbon "A" + Typography) */}
        <div 
          onClick={() => setView('dashboard')}
          className="flex items-center gap-3 px-2 pt-1 cursor-pointer group"
        >
          <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-600 to-fuchsia-500 blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
            {/* Custom Ribbon A SVG Logo */}
            <svg className="relative w-10 h-10 drop-shadow" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGrad1" x1="4" y1="40" x2="38" y2="8" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00F0FF" />
                  <stop offset="40%" stopColor="#2563EB" />
                  <stop offset="80%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <linearGradient id="logoGrad2" x1="16" y1="28" x2="44" y2="34" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="60%" stopColor="#9333EA" />
                  <stop offset="100%" stopColor="#F43F5E" />
                </linearGradient>
              </defs>
              <path d="M12 40L24 8L36 40" stroke="url(#logoGrad1)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 28C22 24 32 23 38 27C42 30 39 37 32 37H16" stroke="url(#logoGrad2)" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="24" cy="8" r="3" fill="#00F0FF" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider font-display brand-gradient-text uppercase leading-tight">
              AGIES
            </h1>
            <p className="text-[10px] text-cyan-300/80 font-medium tracking-wide">
              Your AI Work Assistant
            </p>
          </div>
        </div>

        {/* NAVIGATION MENU */}
        <nav className="space-y-1 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = view === item.id;
            const isVisible = item.roles.includes(role);

            if (!isVisible) return null;

            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium text-xs transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/90 to-purple-600/90 text-white shadow-glow-pill font-semibold'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM PLAN INFO & EQMAX BRANDING */}
      <div className="space-y-3 pt-4 border-t border-cyan-500/15">
        <div 
          onClick={() => setView('pricing')}
          className="p-3 rounded-xl bg-gradient-to-br from-indigo-950/70 to-slate-900/90 border border-purple-500/20 cursor-pointer hover:border-cyan-400/50 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white">AGIES Workspace</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 font-mono">14d Trial</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">
            ₹699+GST / mo after trial
          </p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full w-2/5"></div>
          </div>
        </div>

        {/* Auth / Demo Quick Link */}
        <button
          onClick={() => setShowAuthModal(true)}
          className="w-full py-1.5 px-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-700/80 text-slate-300 hover:text-cyan-300 text-xs font-mono flex items-center justify-center gap-2 transition-colors"
        >
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Switch Account / Demo</span>
        </button>

        <div className="text-center pt-0.5">
          <p className="text-[10px] text-cyan-400/90 font-mono tracking-wider">
            Powered and Developed by
          </p>
          <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-300">
            EQMax Tech Solutions.
          </p>
        </div>
      </div>
    </aside>
  );
};
