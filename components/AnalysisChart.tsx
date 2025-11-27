import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GameRecord, Color } from '../types';

interface AnalysisChartProps {
  data: GameRecord[];
}

const AnalysisChart: React.FC<AnalysisChartProps> = ({ data }) => {
  // Transform data for chart: Mapping colors to numeric values for trend visualization
  // Green = 1, Red = -1, Violet = 0 (Neutral/Volatile)
  const chartData = [...data].reverse().map((record) => ({
    period: record.period.slice(-3),
    value: record.color === Color.GREEN ? 10 : record.color === Color.RED ? -10 : 0,
    number: record.number,
    color: record.color
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-800 border border-slate-700 p-2 rounded shadow-lg text-xs">
          <p className="font-mono text-slate-400">Period: {label}</p>
          <p className="font-bold text-white">Number: {data.number}</p>
          <p style={{ 
            color: data.color === Color.GREEN ? '#4ade80' : data.color === Color.RED ? '#f87171' : '#c084fc' 
          }}>
            {data.color}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full bg-slate-900/50 rounded-xl p-4 border border-slate-800 backdrop-blur-sm">
      <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Pattern Volatility</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f87171" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis dataKey="period" stroke="#64748b" fontSize={10} tickLine={false} />
          <YAxis hide domain={[-15, 15]} />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#94a3b8" 
            strokeWidth={2}
            fill="url(#colorValue)" 
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalysisChart;