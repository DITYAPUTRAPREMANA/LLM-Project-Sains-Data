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
      {/* Textarea Input */}
      <div>
        <label className="block text-white text-sm mb-2">Teks kamu</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Aku tidak tahu kenapa selalu aku yang disalahkan dan dijauhi"
          className="w-full bg-slate-700/70 text-white rounded-lg p-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-400 resize-none"
          disabled={isLoading}
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Masukkan kalimatnya untuk tahu persaannya"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-slate-700/70 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-400"
          disabled={isLoading}
        />
        <button
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className="bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 disabled:opacity-50 text-white rounded-lg p-3 transition-colors"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};