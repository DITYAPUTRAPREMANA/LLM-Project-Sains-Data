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
  const getEmotionColor = (emotion: string): string => {
    const colors: Record<string, string> = {
      marah: '#D97706',
      sedih: '#3B82F6',
      takut: '#A855F7',
      senang: '#EAB308',
      cinta: '#DC2626',
      netral: '#10B981'
    };
    return colors[emotion] || '#6B7280';
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
    <div className="space-y-6">
      {/* Emotion Bars */}
      <div>
        <label className="block text-white text-sm mb-3">Emosi yang terbaca</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(emotions).map(([emotion, percentage]) => (
            <div
              key={emotion}
              className="rounded-lg p-4 flex items-center justify-between"
              style={{ backgroundColor: getEmotionColor(emotion) }}
            >
              <span className="text-white font-medium">
                {emotionLabels[emotion as keyof EmotionData]}
              </span>
              <span className="text-white font-bold text-lg">
                {percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Message */}
      <div className="space-y-4">
        <p className="text-white text-sm leading-relaxed">
          Berdasarkan hasil analisis yang telah saya lakukan, kalimat tersebut menunjukkan adanya indikasi depresi pada tingkat <span className="font-semibold">{depressionLevel}</span>.
        </p>
        <p className="text-white text-sm leading-relaxed">
          {message}
        </p>
        <p className="text-white text-sm leading-relaxed">
          Cobalah untuk berbagi cerita dengan orang yang dipercaya, melakukan aktivitas kecil yang menyenangkan, seperti berjalan santai, mendengarkan musik, atau menulis jurnal perasaan. Hal-hal sederhana ini dapat membantu meredakan beban pikiran dan memberi ruang bagi diri untuk pulih perlahan.
        </p>
        <p className="text-white text-sm leading-relaxed">
          Jika perasaan tertekan terus berlanjut, jangan ragu untuk mencari bantuan profesional, seperti konselor, psikolog, atau terapis.
        </p>
      </div>
    </div>
  );
};