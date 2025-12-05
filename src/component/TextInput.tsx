import React from 'react';
import { Send } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-slate-200 text-sm font-medium mb-3">
          Teks kamu
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Aku tidak tahu kenapa selalu aku yang disalahkan dan dijauhi"
          className="w-full bg-slate-700/60 backdrop-blur-sm text-white rounded-xl p-4 min-h-[120px] border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder-slate-400 resize-none transition-all duration-200 shadow-lg"
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Masukkan kalimatnya untuk tahu persaannya"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-slate-700/60 backdrop-blur-sm text-white rounded-xl px-5 py-3.5 text-sm border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder-slate-400 transition-all duration-200 shadow-lg"
          disabled={isLoading}
        />
        <button
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-slate-700 disabled:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl p-3.5 transition-all duration-200 shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};