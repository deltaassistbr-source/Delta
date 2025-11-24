import { GoogleGenAI } from "@google/genai";
import { Metric, ChartDataPoint } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeDashboard = async (metrics: Metric[], recentData: ChartDataPoint[]): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Chave de API não configurada. Verifique suas variáveis de ambiente.";

  const prompt = `
    Você é o CMO (Chief Marketing Officer) virtual da "Delta Insights".
    Analise as métricas de marketing digital e SEO abaixo.
    Forneça um resumo executivo focado em performance, identifique oportunidades de crescimento no blog e canais pagos, e sugira uma ação estratégica.
    
    Métricas Atuais:
    ${JSON.stringify(metrics, null, 2)}
    
    Tendência de Performance (Último Período):
    ${JSON.stringify(recentData, null, 2)}
    
    Formate a resposta em Markdown. Use tom profissional, analítico e em Português do Brasil.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });
    return response.text || "Nenhuma análise gerada.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Falha ao gerar análise no momento. Tente novamente mais tarde.";
  }
};

export const chatWithData = async (history: string[], message: string): Promise<string> => {
    const ai = getClient();
    if (!ai) return "Chave de API ausente.";

    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "Você é o assistente inteligente do Delta Insights – Marketing. Você ajuda analistas de performance a entender dados de SEO, Mídia Paga e Leads. Responda sempre em Português do Brasil, de forma concisa e útil."
            },
            history: history.map((msg, index) => ({
                role: index % 2 === 0 ? 'user' : 'model',
                parts: [{ text: msg }]
            }))
        });

        const result = await chat.sendMessage({ message });
        return result.text || "Não consegui processar essa solicitação.";
    } catch (error) {
        console.error("Chat Error:", error);
        return "Erro de conexão com Delta Insights AI.";
    }
}