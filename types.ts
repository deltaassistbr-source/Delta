export interface Metric {
  id: string;
  label: string;
  value: string | number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  iconName: string;
  description?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
}

export enum ViewState {
  MARKETING_OVERVIEW = 'MARKETING_OVERVIEW',
  SEO_BLOG = 'SEO_BLOG',
  SEO_NATIVE = 'SEO_NATIVE',
  PAID_MEDIA = 'PAID_MEDIA',
  LEADS_CONVERSIONS = 'LEADS_CONVERSIONS',
  AI_INSIGHTS = 'AI_INSIGHTS',
  SETTINGS = 'SETTINGS'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin_marketing' | 'visualizacao';
  avatar?: string;
}

export interface DashboardConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: 'Looker Studio' | 'GA4' | 'Outro';
  embedUrl?: string;
  category: string;
  active: boolean;
}