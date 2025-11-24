import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Search, Megaphone, Users, Settings, Sparkles, ChevronRight, PieChart, Database } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOpen: boolean;
  userRole?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen, userRole }) => {
  const navItems = [
    { id: ViewState.MARKETING_OVERVIEW, label: 'Visão Geral', icon: LayoutDashboard },
    { id: ViewState.SEO_BLOG, label: 'SEO – Blog da Delta', icon: Search },
    { id: ViewState.SEO_NATIVE, label: 'SEO – Native (GSC)', icon: Database },
    { id: ViewState.PAID_MEDIA, label: 'Mídia Paga', icon: Megaphone },
    { id: ViewState.LEADS_CONVERSIONS, label: 'Leads & Conversões', icon: Users },
  ];

  if (userRole === 'admin_marketing') {
    navItems.push({ id: ViewState.AI_INSIGHTS, label: 'Delta AI Strategy', icon: Sparkles });
  }

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-delta-navy border-r border-delta-navy/50 transform transition-transform duration-300 ease-in-out shadow-xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 flex flex-col
      `}
    >
      {/* Brand Header */}
      <div className="h-20 flex flex-col justify-center px-6 border-b border-white/10 bg-delta-navy sticky top-0">
        <div className="flex items-center space-x-3">
            {/* Symbol Representation */}
            <div className="w-8 h-8 rounded-tr-lg rounded-bl-lg bg-delta-blue flex items-center justify-center shrink-0">
                <PieChart className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
                <span className="text-white font-black text-lg tracking-tight leading-none">DELTA INSIGHTS</span>
                <span className="text-delta-blue text-xs font-semibold tracking-widest mt-1">MARKETING</span>
            </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-8 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`
                flex items-center w-full px-4 py-3.5 rounded-lg transition-all duration-200 group relative
                ${isActive 
                  ? 'bg-delta-blue text-white shadow-lg shadow-delta-blue/20' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'}
              `}
            >
              <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              <span className={`font-semibold text-sm ${isActive ? 'text-white' : ''}`}>{item.label}</span>
              
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto text-white/80" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / User Info Placeholder */}
      <div className="p-4 border-t border-white/10 mt-auto">
        <div className="bg-white/5 rounded-lg p-4 flex items-center space-x-3 border border-white/5">
             <div className="w-8 h-8 rounded-full bg-delta-yellow flex items-center justify-center text-delta-navy font-bold text-xs">
                 {userRole === 'admin_marketing' ? 'AD' : 'VI'}
             </div>
             <div className="flex flex-col overflow-hidden">
                 <span className="text-sm font-bold text-white truncate">
                    {userRole === 'admin_marketing' ? 'Admin Marketing' : 'Visitante'}
                 </span>
                 <span className="text-xs text-gray-400 truncate">Delta Global</span>
             </div>
        </div>
        <button 
            className="mt-3 w-full text-xs text-gray-500 hover:text-white transition-colors flex items-center justify-center py-2"
            onClick={() => window.location.reload()}
        >
            Sair da conta
        </button>
      </div>
    </aside>
  );
};