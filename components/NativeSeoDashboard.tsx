
import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { ChevronDown, ChevronLeft, ChevronRight, Calendar, PieChart as PieChartIcon, Loader2, RefreshCw } from 'lucide-react';
import { fetchSearchConsoleData, SeoDashboardData } from '../services/bigQueryService';

const COLORS = ['#10264E', '#94a3b8', '#CBD5E1']; // Navy, Gray, Light Gray

export const NativeSeoDashboard: React.FC = () => {
  const [data, setData] = useState<SeoDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await fetchSearchConsoleData();
      setData(result);
    } catch (err) {
      setError('Erro ao carregar dados do BigQuery.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] animate-fadeIn">
        <Loader2 className="w-12 h-12 text-delta-blue animate-spin mb-4" />
        <h3 className="text-lg font-bold text-delta-navy">Sincronizando Search Console...</h3>
        <p className="text-sm text-slate-400">Consultando: `deltaglobal-data.searchconsole`</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)]">
         <p className="text-red-500 font-bold mb-4">{error}</p>
         <button onClick={loadData} className="px-4 py-2 bg-delta-blue text-white rounded-lg flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" /> Tentar Novamente
         </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 font-sans text-delta-navy pb-10 animate-fadeIn">
      
      {/* Top Bar / Logo Area mimicking report header */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between shadow-sm">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 bg-delta-navy rounded-tl-xl rounded-br-xl flex items-center justify-center mr-3">
             <PieChartIcon className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-delta-navy italic tracking-tighter">DELTA</h1>
            <p className="text-xs font-bold tracking-[0.2em] text-delta-navy ml-1">GLOBAL</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
           <div className="bg-delta-navy text-white px-4 py-1 text-xs font-bold uppercase rounded-t-sm w-32 flex items-center justify-center md:hidden">
              Filtros
           </div>
           <div className="flex flex-col">
              <label className="text-white bg-delta-navy px-2 py-0.5 text-[10px] font-bold uppercase w-fit rounded-t-sm">Pesquisar Conteúdo</label>
              <div className="relative w-full sm:w-64">
                <select className="w-full appearance-none bg-white border border-slate-300 text-slate-700 py-2 px-3 pr-8 rounded-b-sm rounded-tr-sm focus:outline-none focus:border-delta-blue text-sm">
                    <option>Todos os artigos</option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
           </div>
           <div className="flex flex-col">
              <label className="text-white bg-delta-navy px-2 py-0.5 text-[10px] font-bold uppercase w-fit rounded-t-sm">Selecionar período</label>
              <div className="relative w-full sm:w-72">
                 <button className="w-full bg-white border border-slate-300 text-slate-700 py-2 px-3 rounded-b-sm rounded-tr-sm flex items-center justify-between text-sm hover:bg-slate-50">
                    <span>Últimos 30 Dias</span>
                    <Calendar className="w-4 h-4 text-slate-500" />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
        {data.kpis.map((kpi, index) => (
          <div key={index} className="bg-white border-2 border-slate-200 rounded-lg p-2 text-center shadow-sm">
            <p className="text-[10px] text-slate-500 font-semibold uppercase mb-1">{kpi.label}</p>
            <p className="text-lg md:text-xl font-black text-slate-700 leading-tight">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Table: Principais Termos de Busca */}
        <div className="bg-white border-2 border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-2">
            <h3 className="text-sm font-bold text-delta-navy">Principais Termos de Busca (GSC)</h3>
          </div>
          <div className="overflow-auto flex-1 custom-scrollbar">
            <table className="w-full text-xs text-left">
              <thead className="bg-delta-navy text-white font-bold uppercase sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2">Consulta</th>
                  <th className="px-3 py-2">Cliques</th>
                  <th className="px-3 py-2">Impressões</th>
                  <th className="px-3 py-2 text-right">CTR</th>
                  <th className="px-3 py-2 text-right">Pos.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.topQueries.map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="px-3 py-2 font-medium text-slate-600 border-r border-slate-100">
                      {item.query}
                    </td>
                    <td className="px-3 py-2 text-slate-600">{item.clicks}</td>
                    <td className="px-3 py-2 text-slate-600">{item.impressions.toLocaleString()}</td>
                    <td className="px-3 py-2 text-slate-600 text-right">{item.ctr}</td>
                    <td className="px-3 py-2 text-slate-600 text-right">{item.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-auto border-t border-slate-200 p-2 flex justify-between items-center text-xs text-slate-500 bg-slate-50">
             <span>1 - {data.topQueries.length} de muitos</span>
             <div className="flex space-x-1">
                <button className="p-1 hover:bg-slate-200 rounded"><ChevronLeft className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-slate-200 rounded"><ChevronRight className="w-4 h-4" /></button>
             </div>
          </div>
        </div>

        {/* Table: Conteúdos de Maior Alcance */}
        <div className="bg-white border-2 border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-2">
            <h3 className="text-sm font-bold text-delta-navy">Conteúdos de Maior Alcance</h3>
          </div>
           <div className="overflow-auto flex-1 custom-scrollbar">
            <table className="w-full text-xs text-left">
              <thead className="bg-delta-navy text-white font-bold uppercase sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2">Artigo</th>
                  <th className="px-3 py-2 text-right">Impressões</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.topPages.map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                     <td className="px-3 py-2 font-medium text-slate-600 max-w-[300px] truncate border-r border-slate-100">
                      <span className="truncate underline cursor-pointer hover:text-delta-blue block w-full" title={item.url}>
                        {item.url.replace('https://blog.deltaglobal.com.br/', '/')}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-600 text-right font-bold">{item.impressions.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-auto border-t border-slate-200 p-2 flex justify-between items-center text-xs text-slate-500 bg-slate-50">
             <span>1 - {data.topPages.length} de muitos</span>
             <div className="flex space-x-1">
                <button className="p-1 hover:bg-slate-200 rounded"><ChevronLeft className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-slate-200 rounded"><ChevronRight className="w-4 h-4" /></button>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
         {/* Chart: Tendência de Cliques */}
         <div className="bg-white border-2 border-slate-200 rounded-lg p-4 shadow-sm h-64">
            <h3 className="text-sm font-bold text-delta-navy mb-2 border-l-4 border-delta-navy pl-2">Tendência de Cliques (Últimos 30 dias)</h3>
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data.clickTrend} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{fontSize: 10}} angle={-45} textAnchor="end" />
                  <YAxis tick={{fontSize: 10}} />
                  <Tooltip labelStyle={{color: 'black'}} itemStyle={{color: '#10264E'}} />
                  <Area type="monotone" dataKey="value" stroke="#10264E" fill="#10264E" fillOpacity={0.1} strokeWidth={2} name="Cliques" />
               </AreaChart>
            </ResponsiveContainer>
         </div>

          {/* Chart: Tendência de Impressões */}
         <div className="bg-white border-2 border-slate-200 rounded-lg p-4 shadow-sm h-64">
            <h3 className="text-sm font-bold text-delta-navy mb-2 border-l-4 border-delta-navy pl-2">Tendência de Impressões (Últimos 30 dias)</h3>
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data.impressionTrend} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{fontSize: 10}} angle={-45} textAnchor="end" />
                  <YAxis tick={{fontSize: 10}} tickFormatter={(value) => `${value/1000}k`} />
                  <Tooltip labelStyle={{color: 'black'}} itemStyle={{color: '#10264E'}} />
                  <Area type="monotone" dataKey="value" stroke="#10264E" fill="#10264E" fillOpacity={0.1} strokeWidth={2} name="Impressões" />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Table: Canais de Aquisição */}
           <div className="lg:col-span-2 bg-white border-2 border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-[300px]">
            <div className="bg-slate-50 border-b border-slate-200 px-3 py-2">
                <h3 className="text-sm font-bold text-delta-navy">Canais de Aquisição</h3>
            </div>
             <div className="overflow-auto flex-1 custom-scrollbar">
                <table className="w-full text-xs text-left">
                <thead className="bg-delta-navy text-white font-bold uppercase sticky top-0 z-10">
                    <tr>
                    <th className="px-3 py-2">Origem</th>
                    <th className="px-3 py-2 text-right">Sessões</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.trafficSources.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                        <td className="px-3 py-2 font-medium text-slate-600 flex items-center gap-2">
                        <span className="text-slate-400">{item.id}.</span> {item.source}
                        </td>
                        <td className="px-3 py-2 text-slate-600 text-right font-bold">{item.sessions}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>

        {/* Pie Charts */}
        <div className="flex flex-col gap-4">
             {/* Novos X Recorrentes */}
             <div className="bg-white border-2 border-slate-200 rounded-lg p-4 shadow-sm flex-1 flex flex-col min-h-[140px]">
                 <h3 className="text-sm font-bold text-delta-navy mb-2">Novos X Recorrentes</h3>
                 <div className="flex-1 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data.recurrenceRate}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                fill="#8884d8"
                                paddingAngle={0}
                                dataKey="value"
                            >
                                {data.recurrenceRate.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 0 ? '#10264E' : '#CBD5E1'} />
                                ))}
                            </Pie>
                            <Legend layout="vertical" verticalAlign="middle" align="right" iconSize={8} wrapperStyle={{fontSize: '10px'}} />
                        </PieChart>
                     </ResponsiveContainer>
                 </div>
             </div>

              {/* Distribuição por Dispositivo */}
             <div className="bg-white border-2 border-slate-200 rounded-lg p-4 shadow-sm flex-1 flex flex-col min-h-[140px]">
                 <h3 className="text-sm font-bold text-delta-navy mb-2">Por Dispositivo</h3>
                 <div className="flex-1 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data.deviceDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={0}
                                outerRadius={60}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.deviceDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                             <Legend layout="vertical" verticalAlign="middle" align="right" iconSize={8} wrapperStyle={{fontSize: '10px'}} />
                        </PieChart>
                     </ResponsiveContainer>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};
