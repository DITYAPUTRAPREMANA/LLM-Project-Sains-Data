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
    // Fungsi untuk menganalisis teks
    analyzeText: async (_text: string): Promise<AnalysisResult> => {
      try {
        // const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ANALYZE}`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ text })
        // });
        // const data = await response.json();
        // return data;
        
        // MOCK DATA - Ganti dengan API call yang sebenarnya
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
              depressionLevel: 'moderate',
              message: 'Merasa sedih, hampa, atau kesepian adalah hal yang manusiawi dan bisa dialami siapa pun...'
            });
          }, 1000);
        });
      } catch (error) {
        console.error('Error analyzing text:', error);
        throw error;
      }
    },
  
    // Fungsi untuk mendapatkan hasil sebelumnya
    getResults: async (_userId?: string) => {
      try {
        // const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_RESULTS}?userId=${userId}`);
        // const data = await response.json();
        // return data;
        
        return null; // MOCK - Ganti dengan API call
      } catch (error) {
        console.error('Error fetching results:', error);
        throw error;
      }
    },
  
    // Fungsi untuk menyimpan feedback
    saveFeedback: async (_feedbackData: unknown) => {
      try {
        // const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SAVE_FEEDBACK}`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(feedbackData)
        // });
        // return response.json();
        
        return { success: true }; // MOCK - Ganti dengan API call
      } catch (error) {
        console.error('Error saving feedback:', error);
        throw error;
      }
    }
  };