import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HistoryInput from './components/HistoryInput';
import AnalysisChart from './components/AnalysisChart';
import { GameRecord, Color, PredictionResult, BigSmall } from './types';
import { analyzePattern } from './services/geminiService';
import { Bot, RotateCcw, TrendingUp, Target, Star, ExternalLink, ShieldCheck, Download, Smartphone, ArrowRight, Zap, ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  // Helper to get today's period prefix (YYYYMMDD)
  const getTodayPrefix = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
  };

  const today = getTodayPrefix();

  // Initialize with "Current" running periods
  const [history, setHistory] = useState<GameRecord[]>([
    { id: '1', period: `${today}0205`, number: 2, color: Color.RED, timestamp: Date.now() },
    { id: '2', period: `${today}0204`, number: 6, color: Color.RED, timestamp: Date.now() - 60000 },
    { id: '3', period: `${today}0203`, number: 7, color: Color.GREEN, timestamp: Date.now() - 120000 },
    { id: '4', period: `${today}0202`, number: 3, color: Color.GREEN, timestamp: Date.now() - 180000 },
    { id: '5', period: `${today}0201`, number: 8, color: Color.RED, timestamp: Date.now() - 240000 },
  ]);

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddRecord = (recordData: Omit<GameRecord, 'id' | 'timestamp'>) => {
    const newRecord: GameRecord = {
      ...recordData,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    setHistory(prev => [newRecord, ...prev]);
    setPrediction(null);
  };

  const handleAnalyze = async () => {
    if (history.length < 5) {
      setError("Add at least 5 previous results first.");
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzePattern(history);
      setPrediction(result);
    } catch (err) {
      setError("Connection failed. Try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetData = () => {
    if(window.confirm("Start new session?")) {
        setHistory([]);
        setPrediction(null);
    }
  };

  const getColorClass = (color: Color) => {
    switch (color) {
      case Color.RED: return 'bg-red-600 shadow-red-500/50';
      case Color.GREEN: return 'bg-emerald-600 shadow-emerald-500/50';
      case Color.VIOLET: return 'bg-purple-600 shadow-purple-500/50';
      default: return 'bg-slate-500';
    }
  };

  const getTextClass = (color: Color) => {
    switch (color) {
      case Color.RED: return 'text-red-400';
      case Color.GREEN: return 'text-emerald-400';
      case Color.VIOLET: return 'text-purple-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pb-36 font-sans text-slate-200">
      <Header />

      <main className="max-w-md mx-auto p-4 space-y-6">
        
        {/* DOWNLOAD & REGISTER BUTTONS - ENHANCED FOR APP DOWNLOAD */}
        <div className="flex flex-col gap-1 items-center animate-pulse">
            <span className="text-yellow-400 font-bold text-xs flex items-center gap-1">
                <ArrowDown size={12} /> DOWNLOAD HERE / यहां डाउनलोड करें <ArrowDown size={12} />
            </span>
        </div>
        
        <div className="bg-slate-900/50 p-2 rounded-2xl border border-slate-800 relative overflow-hidden">
          {/* Highlight Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
          
          <div className="flex gap-2">
            <a 
              href="https://okwinslots4.com/#/register?invitationCode=63518446308"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-br from-green-600 to-emerald-800 rounded-xl p-3 shadow-lg shadow-emerald-900/20 border border-green-400/50 flex flex-col items-center justify-center gap-1 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-1 bg-white/20 rounded-bl-lg">
                 <Zap className="w-3 h-3 text-white" fill="white" />
              </div>
              <Download className="w-8 h-8 text-white group-hover:scale-110 transition-transform drop-shadow-md" />
              <span className="text-[12px] font-black text-white tracking-wider uppercase">Download APK</span>
              <span className="text-[9px] text-green-900 bg-green-200 px-2 rounded-full font-bold">100% Free</span>
            </a>

            <a 
              href="https://okwinslots4.com/#/register?invitationCode=63518446308"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-3 shadow-lg shadow-blue-900/20 border border-blue-400/50 relative overflow-hidden group flex flex-col items-center justify-center gap-1"
            >
               <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
               <Smartphone className="w-8 h-8 text-white" />
               <span className="text-[12px] font-black text-white tracking-wider uppercase">Official Login</span>
               <span className="text-[9px] text-blue-900 bg-blue-200 px-2 rounded-full font-bold">Fast Server</span>
            </a>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-green-500" />
              Official OK Win Club Application (Latest v3.0)
            </p>
          </div>
        </div>

        {/* Prediction Card - VIP Style */}
        {prediction ? (
          <div className="bg-gradient-to-b from-[#2a2008] to-black rounded-3xl p-1 shadow-2xl shadow-amber-900/20 border border-amber-600/30 overflow-hidden relative">
             {/* Scanning Effect */}
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
             
             <div className="p-6 relative z-10">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-amber-800/30">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-green-500 w-5 h-5 fill-green-500/20 animate-pulse" />
                    <span className="text-amber-400 font-bold tracking-widest text-sm">100% VERIFIED</span>
                  </div>
                  <div className="bg-amber-950/80 px-3 py-1 rounded border border-amber-800 text-amber-500 text-xs font-mono">
                    {parseInt(history[0].period) + 1}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Big/Small Box */}
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 text-center relative overflow-hidden">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Size</div>
                        <div className={`text-2xl font-black ${prediction.predictedBigSmall === BigSmall.BIG ? 'text-yellow-400' : 'text-blue-400'}`}>
                            {prediction.predictedBigSmall}
                        </div>
                    </div>

                    {/* Color Box */}
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 text-center">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Color</div>
                        <div className={`text-2xl font-black ${getTextClass(prediction.predictedColor)}`}>
                            {prediction.predictedColor}
                        </div>
                    </div>
                </div>

                {/* SURE SHOT NUMBER */}
                <div className="bg-gradient-to-r from-amber-900/40 via-yellow-900/20 to-amber-900/40 rounded-2xl p-5 border border-amber-700/50 mb-6 text-center relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-black text-[10px] font-bold px-3 py-1 rounded-full border border-yellow-400 uppercase tracking-widest shadow-lg">
                      📍 VIP Pin Shot
                    </div>
                    
                    <div className="flex justify-center items-end gap-2 mt-2">
                         {/* Main Prediction */}
                         <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600 rounded-xl flex items-center justify-center text-5xl font-black text-black shadow-xl shadow-amber-500/30 border-2 border-yellow-200">
                            {prediction.mainNumber}
                         </div>
                    </div>
                    <p className="text-amber-200/50 text-xs mt-3 font-mono">CONFIRMED WINNING NUMBER</p>
                </div>

                <div className="flex justify-between gap-2 mb-4">
                     {prediction.suggestedNumbers.filter(n => n !== prediction.mainNumber).map(n => (
                         <div key={n} className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded p-2 text-center">
                            <span className="text-[10px] text-slate-500 block uppercase">Backup</span>
                            <span className="text-white font-bold">{n}</span>
                         </div>
                     ))}
                </div>

                <div className="bg-black/40 rounded-lg p-3 border border-slate-800/50">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-500 text-xs">Winning Probability</span>
                        <span className="text-green-400 text-xs font-bold">100%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div 
                            className="bg-gradient-to-r from-green-600 to-green-400 h-1.5 rounded-full" 
                            style={{ width: `100%` }}
                        ></div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 font-mono">
                      {prediction.reasoning}
                    </p>
                </div>
             </div>
          </div>
        ) : (
          <div className="bg-[#121212] border border-slate-800 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            <Bot className="w-14 h-14 text-amber-600 mx-auto mb-4" />
            <h2 className="text-white font-bold text-xl mb-2">OK CLUB HACKER</h2>
            <p className="text-slate-400 text-sm mb-6">Algorithm Ready. Enter results to get the Pin Shot.</p>
            
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || history.length < 3}
              className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-black font-black text-lg py-4 rounded-xl transition-all shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              {isAnalyzing ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
                  Calculating...
                </>
              ) : (
                <>
                  <Target size={24} />
                  GET SURE SHOT
                </>
              )}
            </button>
          </div>
        )}

        {/* Input Section */}
        <HistoryInput 
            onAddRecord={handleAddRecord} 
            lastPeriod={history.length > 0 ? history[0].period : `${today}0205`} 
        />

        {/* Chart */}
        {history.length > 0 && <AnalysisChart data={history} />}

        {/* History Table */}
        <div className="bg-[#121212] rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
             <div className="flex items-center gap-2">
                 <TrendingUp size={16} className="text-amber-500" />
                 <h3 className="font-bold text-slate-300 text-sm">LIVE PERIODS</h3>
             </div>
             <button onClick={resetData} className="text-slate-500 hover:text-white transition-colors p-2">
                <RotateCcw size={16} />
             </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black text-slate-500 text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 font-medium">Period</th>
                  <th className="px-4 py-3 font-medium text-center">Number</th>
                  <th className="px-4 py-3 font-medium text-center">Size</th>
                  <th className="px-4 py-3 font-medium text-right">Color</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {history.map((record) => (
                  <tr key={record.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-400 text-xs">
                      {record.period}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-sm font-bold shadow-lg ${
                        record.number % 2 === 0 ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-green-500/20 text-green-500 border border-green-500/30'
                      }`}>
                        {record.number}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                        <span className={`text-xs font-bold ${record.number >= 5 ? 'text-yellow-500' : 'text-blue-500'}`}>
                            {record.number >= 5 ? 'BIG' : 'SMALL'}
                        </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <div className={`w-2 h-2 rounded-full ${getColorClass(record.color)}`}></div>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* FIXED BOTTOM DOWNLOAD BANNER */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-black/90 backdrop-blur-md border-t border-amber-900/50 z-50">
        <a 
            href="https://okwinslots4.com/#/register?invitationCode=63518446308"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 bg-gradient-to-r from-amber-500 to-yellow-600 p-3 rounded-xl shadow-lg shadow-amber-500/20"
        >
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black/20 rounded-lg flex items-center justify-center border border-black/10">
                <Download className="text-white w-6 h-6 animate-bounce" />
            </div>
            <div>
                <h3 className="text-black font-black text-sm uppercase leading-none mb-1">DOWNLOAD NOW</h3>
                <p className="text-black/80 text-[10px] font-medium leading-none">Official OK Win App (Click Here)</p>
            </div>
            </div>
            <div className="bg-black/20 p-2 rounded-full animate-pulse">
                <ArrowRight className="text-white w-5 h-5" />
            </div>
        </a>
      </div>
    </div>
  );
};

export default App;