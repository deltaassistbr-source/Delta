
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatsCard } from './components/StatsCard';
import { AIHub } from './components/AIHub';
import { NativeSeoDashboard } from './components/NativeSeoDashboard';
import { Metric, ViewState, ChartDataPoint, User } from './types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Menu, Search, Bell, LogIn, PieChart, Lock, User as UserIcon, ShieldCheck, Eye } from 'lucide-react';

const App: React.FC = () => {
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // App State
  const [view, setView] = useState<ViewState>(ViewState.MARKETING_OVERVIEW);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Data State (Marketing Context)
  const [metrics, setMetrics] = useState<Metric[]>([
    { id: '1', label: 'Sessões Blog', value: '45.2k', change: 12.5, trend: 'up', iconName: 'globe', description: 'Últimos 30 dias' },
    { id: '2', label: 'Leads Gerados', value: '328', change: 5.2, trend: 'up', iconName: 'users', description: 'Origem Orgânica' },
    { id: '3', label: 'CTR Médio', value: '2.4%', change: -0.4, trend: 'neutral', iconName: 'clicks', description: 'Posição média 8.2' },
    { id: '4', label: 'Top Palavra-Chave', value: 'Gestão Frotas', change: 14.2, trend: 'up', iconName: 'search', description: 'Vol. 12k/mês' },
  ]);

  const [chartData, setChartData] = useState<ChartDataPoint[]>([
    { name: '01/Set', value: 1200, secondary: 800 },
    { name: '05/Set', value: 1350, secondary: 900 },
    { name: '10/Set', value: 1100, secondary: 1100 },
    { name: '15/Set', value: 1580, secondary: 1200 },
    { name: '20/Set', value: 1890, secondary: 1400 },
    { name: '25/Set', value: 2100, secondary: 1500 },
    { name: '30/Set', value: 2390, secondary: 1700 },
  ]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@deltaglobal.com.br' && password === 'delta123') {
        setUser({ id: '1', name: 'Admin Marketing', email, role: 'admin_marketing' });
        setAuthError('');
    } else if (email === 'viewer@deltaglobal.com.br' && password === 'delta123') {
        setUser({ id: '2', name: 'Visitante', email, role: 'visualizacao' });
        setAuthError('');
    } else {
        setAuthError('Credenciais inválidas. Tente admin@deltaglobal.com.br / delta123');
    }
  };

  // Render Logic
  const renderContent = () => {
    switch (view) {
      case ViewState.AI_INSIGHTS:
        return <AIHub metrics={metrics} chartData={chartData} />;
        
      case ViewState.SEO_NATIVE:
        return <NativeSeoDashboard />;

      case ViewState.SEO_BLOG:
        return (
          <div className="flex flex-col h-full space-y-4 animate-fadeIn">
            {/* Header Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-xl font-black text-delta-navy">Dashboard SEO – Blog da Delta</h2>
                    <p className="text-sm text-slate-500">Performance orgânica: Impressões, Cliques, CTR e Indexação.</p>
                </div>
                <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                        Ao vivo
                    </span>
                </div>
            </div>

            {/* Responsive Iframe Container */}
            <div className="relative w-full flex-1 bg-white rounded-xl overflow-hidden border border-slate-200 shadow-card" style={{ minHeight: '600px', height: 'calc(100vh - 180px)' }}>
                 <iframe 
                    title="Dashboard SEO Looker Studio"
                    src="https://lookerstudio.google.com/embed/reporting/e62ce5e8-d15f-4863-9ec4-030af1b7d91e/page/6zXD" 
                    frameBorder="0" 
                    style={{border:0, width: '100%', height: '100%'}} 
                    allowFullScreen 
                    sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    className="absolute inset-0 w-full h-full"
                ></iframe>
            </div>
          </div>
        );

      case ViewState.PAID_MEDIA:
        return (
          <div className="flex flex-col items-center justify-center h-[600px] bg-white border border-slate-200 rounded-xl shadow-sm text-center p-8">
             <div className="w-20 h-20 bg-delta-yellow/20 rounded-full flex items-center justify-center mb-6">
                <PieChart className="w-10 h-10 text-delta-yellow" />
             </div>
             <h2 className="text-2xl font-black text-delta-navy mb-2">Mídia Paga</h2>
             <p className="text-slate-500 max-w-md">
                 Em breve: Dashboards integrados de Google Ads, Meta Ads e Globo Ads estarão disponíveis nesta seção.
             </p>
          </div>
        );

      case ViewState.LEADS_CONVERSIONS:
         return (
          <div className="flex flex-col items-center justify-center h-[600px] bg-white border border-slate-200 rounded-xl shadow-sm text-center p-8">
             <div className="w-20 h-20 bg-delta-blue/10 rounded-full flex items-center justify-center mb-6">
                <UserIcon className="w-10 h-10 text-delta-blue" />
             </div>
             <h2 className="text-2xl font-black text-delta-navy mb-2">Leads & Conversões</h2>
             <p className="text-slate-500 max-w-md">
                 O funil de conversão e qualificação de leads do CRM será exibido aqui.
             </p>
          </div>
        );

      case ViewState.MARKETING_OVERVIEW:
      default:
        return (
          <div className="space-y-6 animate-fadeIn">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map(metric => (
                <StatsCard key={metric.id} metric={metric} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Chart */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-8 shadow-card">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-black text-delta-navy">Tráfego Geral</h3>
                    <p className="text-xs text-slate-400">Sessões vs Novos Usuários</p>
                  </div>
                  <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg p-2 outline-none focus:border-delta-blue">
                    <option>Últimos 30 Dias</option>
                    <option>Este Ano</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#009CD6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#009CD6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorSec" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10264E" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#10264E" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#10264E', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#10264E', fontWeight: 600 }}
                      />
                      <Area type="monotone" dataKey="value" name="Sessões" stroke="#009CD6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                      <Area type="monotone" dataKey="secondary" name="Novos Usuários" stroke="#10264E" strokeWidth={3} fillOpacity={1} fill="url(#colorSec)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Side List */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-card flex flex-col">
                <h3 className="text-lg font-black text-delta-navy mb-6">Top Canais</h3>
                <div className="space-y-6 flex-1">
                    <div className="group">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-sm font-semibold text-slate-600">Organic Search</span>
                            <span className="text-sm font-bold text-delta-navy">54%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-delta-blue h-2 rounded-full" style={{ width: '54%' }}></div>
                        </div>
                    </div>
                    <div className="group">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-sm font-semibold text-slate-600">Direct</span>
                            <span className="text-sm font-bold text-delta-navy">22%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-delta-navy h-2 rounded-full" style={{ width: '22%' }}></div>
                        </div>
                    </div>
                     <div className="group">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-sm font-semibold text-slate-600">Paid Search</span>
                            <span className="text-sm font-bold text-delta-navy">15%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-delta-yellow h-2 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                    </div>
                     <div className="group">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-sm font-semibold text-slate-600">Social</span>
                            <span className="text-sm font-bold text-delta-navy">9%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-slate-400 h-2 rounded-full" style={{ width: '9%' }}></div>
                        </div>
                    </div>
                </div>
                 <button 
                    onClick={() => setView(ViewState.SEO_BLOG)}
                    className="w-full mt-6 py-2 border border-delta-blue text-delta-blue font-bold rounded-lg text-sm hover:bg-delta-blue hover:text-white transition-colors"
                >
                    Ver Detalhes SEO
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  // Login Screen
  if (!user) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-delta-navy rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                         <PieChart className="w-8 h-8 text-delta-yellow" />
                    </div>
                </div>
                <h2 className="mt-2 text-center text-3xl font-black tracking-tight text-delta-navy">
                    Delta Insights
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500">
                    Acesso exclusivo para equipe de Marketing
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-card sm:rounded-xl sm:px-10 border border-slate-100">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-delta-navy">
                                Email
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-delta-blue focus:border-delta-blue sm:text-sm transition duration-150 ease-in-out"
                                    placeholder="seu.email@deltaglobal.com.br"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-delta-navy">
                                Senha
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-delta-blue focus:border-delta-blue sm:text-sm transition duration-150 ease-in-out"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {authError && (
                            <div className="text-red-500 text-xs font-semibold bg-red-50 p-2 rounded border border-red-100">
                                {authError}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-delta-blue hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-delta-blue transition-colors"
                            >
                                Entrar na Plataforma
                            </button>
                        </div>
                    </form>

                    {/* Quick Fill Buttons for Demo */}
                    <div className="mt-6 pt-6 border-t border-slate-100">
                        <p className="text-center text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">Acesso Rápido (Demo)</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setEmail('admin@deltaglobal.com.br');
                                    setPassword('delta123');
                                }}
                                className="flex items-center justify-center px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold text-delta-navy hover:bg-slate-50 hover:border-delta-blue/30 transition-all group"
                            >
                                <ShieldCheck className="w-3 h-3 mr-2 text-delta-blue group-hover:scale-110 transition-transform" />
                                Admin
                            </button>
                             <button
                                type="button"
                                onClick={() => {
                                    setEmail('viewer@deltaglobal.com.br');
                                    setPassword('delta123');
                                }}
                                className="flex items-center justify-center px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all group"
                            >
                                <Eye className="w-3 h-3 mr-2 text-slate-400 group-hover:scale-110 transition-transform" />
                                Visitante
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400">
                        &copy; 2024 Delta Global. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
  }

  // Main App Interface
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800 font-sans selection:bg-delta-blue/20">
      <Sidebar 
        currentView={view} 
        onChangeView={(v) => { setView(v); setIsSidebarOpen(false); }}
        isOpen={isSidebarOpen} 
        userRole={user.role}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
          <button 
            className="md:hidden text-slate-500 hover:text-delta-navy"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div 
                className="fixed inset-0 bg-delta-navy/50 z-40 md:hidden backdrop-blur-sm"
                onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Breadcrumb / Title */}
          <div className="hidden md:flex items-center">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Delta Insights</span>
             <span className="mx-2 text-slate-300">/</span>
             <span className="text-sm font-bold text-delta-navy">
                {view === ViewState.MARKETING_OVERVIEW ? 'Visão Geral' : 
                 view === ViewState.SEO_BLOG ? 'SEO Blog (Iframe)' : 
                 view === ViewState.SEO_NATIVE ? 'SEO Native (GSC)' :
                 view === ViewState.PAID_MEDIA ? 'Mídia Paga' : 
                 view === ViewState.AI_INSIGHTS ? 'AI Strategy' :
                 'Leads'}
             </span>
          </div>

          <div className="flex items-center ml-auto space-x-4">
            <div className="relative hidden lg:block">
               <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="Buscar relatórios..." 
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-delta-blue focus:ring-1 focus:ring-delta-blue transition-all"
               />
            </div>
            
            <button className="relative p-2 text-slate-500 hover:text-delta-blue transition-colors rounded-full hover:bg-slate-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <div className="flex items-center space-x-2 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-delta-navy">{user.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase">{user.role.replace('_', ' ')}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-delta-navy text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        {/* Conditional padding for Full Width vs Boxed Views */}
        <main className={`flex-1 overflow-y-auto scroll-smooth bg-slate-50 ${(view === ViewState.SEO_BLOG || view === ViewState.SEO_NATIVE) ? 'p-2 md:p-4' : 'p-4 md:p-8'}`}>
          <div className={`mx-auto h-full ${(view === ViewState.SEO_BLOG || view === ViewState.SEO_NATIVE) ? 'w-full max-w-full' : 'max-w-7xl pb-10'}`}>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
