import React from 'react';
import { Crown, Zap, UserPlus, Download } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="p-4 border-b border-amber-900/30 bg-[#1a1500] backdrop-blur sticky top-0 z-50">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Crown className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-amber-500 leading-none">OK CLUB</h1>
            <p className="text-[10px] text-amber-200/60 font-mono tracking-widest uppercase">VIP PREDICTOR</p>
          </div>
        </div>
        <div className="flex gap-2">
            <a 
            href="https://okwinslots4.com/#/register?invitationCode=63518446308"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/30 shadow-lg shadow-blue-900/20 transition-all"
            >
            <Download className="w-3 h-3" />
            <span className="text-[10px] font-bold">APP</span>
            </a>
            <a 
            href="https://okwinslots4.com/#/register?invitationCode=63518446308"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-3 py-1.5 rounded-full border border-red-400/50 shadow-lg shadow-red-900/40 transition-all"
            >
            <UserPlus className="w-3 h-3" />
            <span className="text-[10px] font-bold">JOIN</span>
            </a>
        </div>
      </div>
    </header>
  );
};

export default Header;