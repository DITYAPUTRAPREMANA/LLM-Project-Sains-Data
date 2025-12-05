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
    message: string;
  }
  
  export const API_CONFIG = {
    BASE_URL: 'https://your-api-url.com/api',
    ENDPOINTS: {
      ANALYZE: '/analyze',
      GET_RESULTS: '/results',
      SAVE_FEEDBACK: '/feedback'
    }
  };
  
  export const apiService = {
    analyzeText: async (_text: string): Promise<AnalysisResult> => {
      try {
        // const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ANALYZE}`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ text })
        // });
        // return await response.json();
        
        // MOCK DATA
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              emotions: {
                marah: 30,
                sedih: 70,
                takut: 30,
                senang: 5,
                cinta: 0,
                netral: 20
              },
              depressionLevel: 'moderat',
              message: 'Merasa sedih, hampa, atau kesepian adalah hal yang manusiawi dan bisa dialami siapa pun. Namun, jika perasaan tersebut berlangsung cukup lama atau mulai memengaruhi aktivitas sehari-hari, penting untuk memberikan perhatian lebih terhadap kondisi emosional diri sendiri.'
            });
          }, 1500);
        });
      } catch (error) {
        console.error('Error analyzing text:', error);
        throw error;
      }
    },
  
    getResults: async (_userId?: string) => {
      try {
        // const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_RESULTS}?userId=${userId}`);
        // return await response.json();
        return null;
      } catch (error) {
        console.error('Error fetching results:', error);
        throw error;
      }
    },
  
    saveFeedback: async (_feedbackData: unknown) => {
      try {
        // const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SAVE_FEEDBACK}`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(feedbackData)
        // });
        // return await response.json();
        return { success: true };
      } catch (error) {
        console.error('Error saving feedback:', error);
        throw error;
      }
    }
  };