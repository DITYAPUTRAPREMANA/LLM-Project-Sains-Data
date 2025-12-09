import React, { useState, useEffect } from 'react';
import { TextInput } from './component/TextInput';
import { EmotionalDisplay } from './component/EmotionalDisplay';
import { apiService } from './services/APIservice';
import type { AnalysisResult } from './services/APIservice';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fadeIn {
        animation: fadeIn 0.6s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-t-3xl p-6 sm:p-8 border-b border-slate-700/50 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🧠</span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                MINDSENSE
              </h1>
              <p className="text-slate-400 text-sm mt-1">Depression detection system</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-slate-800/60 backdrop-blur-xl rounded-b-3xl p-6 sm:p-8 space-y-8 border border-slate-700/50 shadow-2xl">
          <TextInput
            value={inputText}
            onChange={setInputText}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {analysisResult && (
            <EmotionalDisplay
              emotions={analysisResult.emotions}
              depressionLevel={analysisResult.depressionLevel}
              message={analysisResult.message}
            />
          )}

          {!analysisResult && !isLoading && (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-slate-700/30 rounded-2xl mb-4">
                <span className="text-6xl">💭</span>
              </div>
              <p className="text-slate-400 text-sm">
                Masukkan teks untuk memulai analisis emosi
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;