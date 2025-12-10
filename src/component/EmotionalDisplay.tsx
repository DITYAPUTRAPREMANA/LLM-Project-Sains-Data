import React from 'react';
import type { EmotionData } from '../services/APIservice';

interface EmotionalDisplayProps {
  emotions: EmotionData;
  depressionLevel: string;
}

export const EmotionalDisplay: React.FC<EmotionalDisplayProps> = ({
  emotions
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
    </div>
  );
};