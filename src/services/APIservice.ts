export interface EmotionData {
  marah: number;
  sedih: number;
  takut: number;
  senang: number;
  cinta: number;
  netral: number;
}

export interface AnalysisResult {
  emotions: EmotionData;
  depressionLevel: string;
}

interface APIResponse {
  input: string;
  predicted_emotion: string;
  probabilities: {
    anger: number;
    sadness: number;
    joy: number;
    fear: number;
    love: number;
    neutral: number;
  };
}

export const API_CONFIG = {
  BASE_URL: '/api',
  ENDPOINTS: {
    PREDICT: '/predict',
  }
};

const calculateDepressionLevel = (probabilities: APIResponse['probabilities']): string => {
  const negativeScore = probabilities.sadness + probabilities.anger + probabilities.fear;
  const positiveScore = probabilities.joy + probabilities.love;
  
  if (negativeScore > 60) return 'tinggi';
  if (negativeScore > 30 && negativeScore > positiveScore) return 'moderat';
  return 'rendah';
};
export const apiService = {
  analyzeText: async (text: string): Promise<AnalysisResult> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PREDICT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: APIResponse = await response.json();
      
      // Map English emotion names to Indonesian
      const emotions: EmotionData = {
        marah: Math.round(data.probabilities.anger * 100) / 100,
        sedih: Math.round(data.probabilities.sadness * 100) / 100,
        takut: Math.round(data.probabilities.fear * 100) / 100,
        senang: Math.round(data.probabilities.joy * 100) / 100,
        cinta: Math.round(data.probabilities.love * 100) / 100,
        netral: Math.round(data.probabilities.neutral * 100) / 100
      };
      
      const depressionLevel = calculateDepressionLevel(data.probabilities);
      
      return {
        emotions,
        depressionLevel,
      };
    } catch (error) {
      console.error('Error analyzing text:', error);
      throw error;
    }
  },

  getResults: async (_userId?: string) => {
    try {
      return null;
    } catch (error) {
      console.error('Error fetching results:', error);
      throw error;
    }
  },

  saveFeedback: async (_feedbackData: unknown) => {
    try {
      return { success: true };
    } catch (error) {
      console.error('Error saving feedback:', error);
      throw error;
    }
  }
};