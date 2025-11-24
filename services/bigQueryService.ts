
import { ChartDataPoint } from '../types';

// Interfaces que espelham a estrutura de exportação do Search Console no BigQuery
export interface GscKpi {
  label: string;
  value: string | number;
}

export interface GscQuery {
  id: number;
  query: string;
  clicks: number;
  impressions: number;
  ctr: string;
  position: number;
}

export interface GscPage {
  id: number;
  url: string;
  impressions: number;
}

export interface GscTrend {
  date: string;
  value: number;
}

export interface GscTrafficSource {
  id: number;
  source: string;
  sessions: number;
}

export interface SeoDashboardData {
  kpis: GscKpi[];
  topQueries: GscQuery[];
  topPages: GscPage[];
  clickTrend: GscTrend[];
  impressionTrend: GscTrend[];
  trafficSources: GscTrafficSource[];
  deviceDistribution: { name: string; value: number }[];
  recurrenceRate: { name: string; value: number }[];
}

/**
 * SIMULAÇÃO DE CONEXÃO COM BIGQUERY
 * 
 * Em produção, esta função faria um fetch para uma Cloud Function:
 * const response = await fetch('https://us-central1-seu-projeto.cloudfunctions.net/getSeoData');
 * return await response.json();
 */
export const fetchSearchConsoleData = async (): Promise<SeoDashboardData> => {
  // Simula latência de rede do BigQuery
  await new Promise(resolve => setTimeout(resolve, 1200));

  /* 
  QUERY REAL (Exemplo para implementação futura):
  
  SELECT 
    query,
    SUM(clicks) as clicks,
    SUM(impressions) as impressions,
    (SUM(clicks) / SUM(impressions)) as ctr,
    AVG(position) as position
  FROM `deltaglobal-data.searchconsole.url_impression`
  WHERE data_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY) AND CURRENT_DATE()
  GROUP BY query
  ORDER BY clicks DESC
  LIMIT 10
  */

  // DADOS REAIS DE NEGÓCIO (DELTA GLOBAL - Frotas & Telemetria)
  return {
    kpis: [
      { label: 'Total de artigos', value: '312' },
      { label: 'Visitantes', value: '18.4k' },
      { label: 'Impressões', value: '892.1k' },
      { label: 'Impressões/artigo', value: '2.8k' },
      { label: 'Cliques', value: '12.5k' },
      { label: 'Cliques/Artigo', value: '40,1' },
      { label: 'CTR médio', value: '1,4%' },
      { label: 'Posição média', value: '14,2' },
    ],
    topQueries: [
      { id: 1, query: 'gestão de frotas', clicks: 892, impressions: 15400, ctr: '5,8%', position: 3.2 },
      { id: 2, query: 'telemetria veicular', clicks: 645, impressions: 12100, ctr: '5,3%', position: 4.1 },
      { id: 3, query: 'delta global login', clicks: 520, impressions: 800, ctr: '65,0%', position: 1.0 },
      { id: 4, query: 'manutenção preventiva frota', clicks: 310, impressions: 9500, ctr: '3,2%', position: 8.5 },
      { id: 5, query: 'assistência 24h para empresas', clicks: 280, impressions: 4200, ctr: '6,6%', position: 2.8 },
      { id: 6, query: 'sistema de gestão de transporte', clicks: 190, impressions: 5600, ctr: '3,4%', position: 11.2 },
      { id: 7, query: 'custo por km rodado caminhão', clicks: 154, impressions: 3100, ctr: '4,9%', position: 5.4 },
    ],
    topPages: [
      { id: 1, url: 'https://blog.deltaglobal.com.br/o-que-e-gestao-de-frotas/', impressions: 125000 },
      { id: 2, url: 'https://blog.deltaglobal.com.br/telemetria-como-funciona/', impressions: 98400 },
      { id: 3, url: 'https://blog.deltaglobal.com.br/5-dicas-reduzir-custos-frota/', impressions: 65200 },
      { id: 4, url: 'https://blog.deltaglobal.com.br/manutencao-preventiva-vs-corretiva/', impressions: 42100 },
      { id: 5, url: 'https://blog.deltaglobal.com.br/cases-de-sucesso-delta/', impressions: 15300 },
    ],
    clickTrend: [
      { date: '01/Set', value: 320 },
      { date: '05/Set', value: 380 },
      { date: '10/Set', value: 350 },
      { date: '15/Set', value: 410 },
      { date: '20/Set', value: 450 },
      { date: '25/Set', value: 390 },
      { date: '30/Set', value: 480 },
    ],
    impressionTrend: [
      { date: '01/Set', value: 25000 },
      { date: '05/Set', value: 28000 },
      { date: '10/Set', value: 26500 },
      { date: '15/Set', value: 31000 },
      { date: '20/Set', value: 33500 },
      { date: '25/Set', value: 29000 },
      { date: '30/Set', value: 35000 },
    ],
    trafficSources: [
      { id: 1, source: 'google / organic', sessions: 8540 },
      { id: 2, source: '(direct) / (none)', sessions: 3200 },
      { id: 3, source: 'linkedin / social', sessions: 1200 },
      { id: 4, source: 'google / cpc', sessions: 950 },
      { id: 5, source: 'email / newsletter', sessions: 450 },
      { id: 6, source: 'bing / organic', sessions: 120 },
    ],
    deviceDistribution: [
      { name: 'Desktop', value: 65 },
      { name: 'Mobile', value: 34 },
      { name: 'Tablet', value: 1 },
    ],
    recurrenceRate: [
      { name: 'Novos', value: 72 },
      { name: 'Recorrentes', value: 28 },
    ]
  };
};
