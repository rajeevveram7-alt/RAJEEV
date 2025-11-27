import React, { useState } from 'react';
import { GameRecord, Color } from '../types';
import { ArrowRight, Plus } from 'lucide-react';

interface HistoryInputProps {
  onAddRecord: (record: Omit<GameRecord, 'id' | 'timestamp'>) => void;
  lastPeriod: string;
}

const HistoryInput: React.FC<HistoryInputProps> = ({ onAddRecord, lastPeriod }) => {
  const [number, setNumber] = useState<string>('');

  const calculateNextPeriod = (current: string) => {
    if (!current) return "20240001";
    const num = parseInt(current);
    return (num + 1).toString();
  };

  const getAutoColor = (num: number): Color => {
    if ([0, 5].includes(num)) return Color.VIOLET; // Simplified for UI
    if ([1, 3, 7, 9].includes(num)) return Color.GREEN;
    return Color.RED;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numVal = parseInt(number);
    if (isNaN(numVal) || numVal < 0 || numVal > 9) return;

    onAddRecord({
      period: calculateNextPeriod(lastPeriod),
      number: numVal,
      color: getAutoColor(numVal)
    });
    setNumber('');
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg">
      <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Manual Entry</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1">
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Result Number (0-9)"
            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg"
            max="9"
            min="0"
          />
        </div>
        <button
          type="submit"
          disabled={!number}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 rounded-lg flex items-center justify-center transition-alltransition-all"
transition-all  >
          <Plus size={24} />
        </button>
      </form>
      <div className="mt-2 text-xs text-slate-500 flex justify-between">
        <span>Next Period: {calculateNextPeriod(lastPeriod).slice(-4)}</span>
        <span>Auto-Color Detect</span>
      </div>
    </div>
  );
};

export default HistoryInput;