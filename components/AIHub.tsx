import React, { useState } from 'react';
import { Metric, ChartDataPoint } from '../types';
import { analyzeDashboard, chatWithData } from '../services/geminiService';
import { Bot, Send, Sparkles, Loader2, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AIHubProps {
  metrics: Metric[];
  chartData: ChartDataPoint[];
}

export const AIHub: React.FC<AIHubProps> = ({ metrics, chartData }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'model', text: string}>>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleGenerateAnalysis = async () => {
    setIsLoadingAnalysis(true);
    const result = await analyzeDashboard(metrics, chartData);
    setAnalysis(result);
    setIsLoadingAnalysis(false);
  };

  const handleChatSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);

    const historyStrings = chatHistory.map(h => h.text);
    const response = await chatWithData(historyStrings, userMsg);

    setChatHistory(prev => [...prev, { role: 'model', text: response }]);
    setIsChatLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)] min-h-[600px]">
      {/* Left Panel: Strategic Analysis */}
      <div className="bg-white border border-slate-100 rounded-xl p-8 shadow-card flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div>
                <h2 className="text-xl font-black text-delta-navy">Análise Estratégica</h2>
                <p className="text-xs text-slate-500">Powered by Gemini 2.5</p>
            </div>
          </div>
          <button
            onClick={handleGenerateAnalysis}
            disabled={isLoadingAnalysis}
            className="flex items-center px-5 py-2.5 bg-delta-blue hover:bg-sky-600 text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-delta-blue/20"
          >
            {isLoadingAnalysis ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            {isLoadingAnalysis ? 'Gerando...' : 'Gerar Relatório'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar bg-slate-50 rounded-lg p-6 border border-slate-200">
          {analysis ? (
            <div className="prose prose-slate prose-headings:text-delta-navy prose-a:text-delta-blue max-w-none">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Bot className="w-16 h-16 mb-4 opacity-10 text-delta-navy" />
              <p className="text-sm font-medium">Clique em "Gerar Relatório" para analisar os KPIs de marketing.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Chat Assistant */}
      <div className="bg-white border border-slate-100 rounded-xl p-8 shadow-card flex flex-col h-full">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-delta-blue/10 rounded-lg mr-3">
             <Bot className="w-6 h-6 text-delta-blue" />
          </div>
          <div>
            <h2 className="text-xl font-black text-delta-navy">Assistente Delta</h2>
            <p className="text-xs text-slate-500">Tire dúvidas sobre os dados</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
               <Info className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-sm">Olá! Como posso ajudar com os insights do blog hoje?</p>
            </div>
          )}
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                max-w-[80%] rounded-2xl p-4 text-sm font-medium shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-delta-blue text-white rounded-br-sm' 
                  : 'bg-slate-100 text-slate-700 rounded-bl-sm border border-slate-200'}
              `}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-500 rounded-2xl rounded-bl-sm p-4 text-sm flex items-center border border-slate-200">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce mr-1"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce mr-1 delay-75"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleChatSend} className="relative">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Pergunte sobre as sessões orgânicas..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg pl-4 pr-12 py-3.5 focus:outline-none focus:border-delta-blue focus:ring-1 focus:ring-delta-blue transition-all placeholder-slate-400 font-medium"
          />
          <button 
            type="submit"
            disabled={!chatInput.trim() || isChatLoading}
            className="absolute right-2 top-2.5 p-1.5 text-delta-blue hover:text-delta-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};