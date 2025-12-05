import React from 'react';
import type { EmotionData } from '../services/APIservice';

interface EmotionalDisplayProps {
  emotions: EmotionData;
  depressionLevel: string;
  message: string;
}

export const EmotionalDisplay: React.FC<EmotionalDisplayProps> = ({
  emotions,
  depressionLevel,
  message
}) => {
  const getEmotionConfig = (emotion: string) => {
    const configs: Record<string, { color: string; gradient: string }> = {
      marah: { 
        color: '#D97706', 
        gradient: 'from-orange-500 to-amber-600' 
      },
      sedih: { 
        color: '#3B82F6', 
        gradient: 'from-blue-500 to-blue-600' 
      },
      takut: { 
        color: '#A855F7', 
        gradient: 'from-purple-500 to-purple-600' 
      },
      senang: { 
        color: '#EAB308', 
        gradient: 'from-yellow-400 to-yellow-500' 
      },
      cinta: { 
        color: '#DC2626', 
        gradient: 'from-red-500 to-rose-600' 
      },
      netral: { 
        color: '#10B981', 
        gradient: 'from-emerald-500 to-green-600' 
      }
    };
    return configs[emotion] || { color: '#6B7280', gradient: 'from-gray-500 to-gray-600' };
  };

  const emotionLabels: Record<keyof EmotionData, string> = {
    marah: 'Marah',
    sedih: 'Sedih',
    takut: 'Takut',
    senang: 'Senang',
    cinta: 'Cinta',
    netral: 'Netral'
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Emotion Bars */}
      <div>
        <label className="block text-slate-200 text-sm font-medium mb-4">
          Emosi yang terbaca
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(emotions).map(([emotion, percentage], index) => {
            const config = getEmotionConfig(emotion);
            return (
              <div
                key={emotion}
                className={`bg-gradient-to-br ${config.gradient} rounded-xl p-4 flex items-center justify-between shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-default`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideUp 0.5s ease-out forwards'
                }}
              >
                <span className="text-white font-semibold text-sm">
                  {emotionLabels[emotion as keyof EmotionData]}
                </span>
                <span className="text-white font-bold text-xl">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analysis Message */}
      <div className="space-y-4 bg-slate-700/30 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
          <div className="flex-1 space-y-4">
            <p className="text-white text-sm leading-relaxed">
              Berdasarkan hasil analisis yang telah saya lakukan, kalimat tersebut menunjukkan adanya indikasi depresi pada tingkat{' '}
              <span className="font-bold text-purple-300 bg-purple-900/30 px-2 py-0.5 rounded">
                {depressionLevel}
              </span>.
            </p>
            <p className="text-slate-200 text-sm leading-relaxed">
              {message}
            </p>
            <p className="text-slate-200 text-sm leading-relaxed">
              Cobalah untuk berbagi cerita dengan orang yang dipercaya, melakukan aktivitas kecil yang menyenangkan, seperti berjalan santai, mendengarkan musik, atau menulis jurnal perasaan. Hal-hal sederhana ini dapat membantu meredakan beban pikiran dan memberi ruang bagi diri untuk pulih perlahan.
            </p>
            <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-4 mt-4">
              <p className="text-indigo-200 text-sm leading-relaxed">
                💡 <span className="font-semibold">Saran:</span> Jika perasaan tertekan terus berlanjut, jangan ragu untuk mencari bantuan profesional, seperti konselor, psikolog, atau terapis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};