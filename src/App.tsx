import React, { useState, useEffect } from 'react';
import { TextInput } from './component/TextInput';
import { EmotionalDisplay } from './component/EmotionalDisplay';
import { apiService } from './services/APIservice';
import type { AnalysisResult } from './services/APIservice';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load previous results on mount (optional)
  useEffect(() => {
    // apiService.getResults().then(data => {
    //   if (data) setAnalysisResult(data);
    // });
  }, []);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const result = await apiService.analyzeText(inputText);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Terjadi kesalahan saat menganalisis teks');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/70 backdrop-blur-sm rounded-t-2xl p-6 border-b border-slate-700">
          <h1 className="text-3xl font-bold text-white mb-1">BUBADIBAKO</h1>
          <p className="text-slate-300 text-sm">Depression detection system</p>
        </div>

        {/* Main Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-b-2xl p-6 space-y-6">
          {/* Text Input Component */}
          <TextInput
            value={inputText}
            onChange={setInputText}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {/* Emotional Display Component */}
          {analysisResult && (
            <EmotionalDisplay
              emotions={analysisResult.emotions}
              depressionLevel={analysisResult.depressionLevel}
              message={analysisResult.message}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;