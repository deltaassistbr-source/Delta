import React from 'react';
import { Metric } from '../types';
import { ArrowUpRight, ArrowDownRight, Minus, MousePointer, Users, Globe, Search } from 'lucide-react';

interface StatsCardProps {
  metric: Metric;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'users': return Users;
    case 'globe': return Globe;
    case 'clicks': return MousePointer;
    case 'search': return Search;
    default: return MousePointer;
  }
};

export const StatsCard: React.FC<StatsCardProps> = ({ metric }) => {
  const Icon = getIcon(metric.iconName);
  const isPositive = metric.trend === 'up';
  const isNeutral = metric.trend === 'neutral';

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-card hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
      {/* Top Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-delta-navy to-delta-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-delta-navy/5 rounded-lg group-hover:bg-delta-blue/10 transition-colors">
          <Icon className="w-5 h-5 text-delta-navy group-hover:text-delta-blue transition-colors" />
        </div>
        <div className={`
          flex items-center px-2.5 py-1 rounded-full text-xs font-bold
          ${isPositive ? 'bg-green-100 text-green-700' : isNeutral ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'}
        `}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : isNeutral ? <Minus className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {Math.abs(metric.change)}%
        </div>
      </div>
      
      <div>
        <h3 className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wide">{metric.label}</h3>
        <p className="text-3xl font-black text-delta-navy tracking-tight">{metric.value}</p>
        {metric.description && (
            <p className="text-xs text-slate-400 mt-2 font-light">{metric.description}</p>
        )}
      </div>
    </div>
  );
};