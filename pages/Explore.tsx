import React from 'react';
import { Search, Menu, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Explore: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-black min-h-full h-full relative flex flex-col">
      
      <header className="flex justify-between items-center mb-8 relative z-10">
        <h1 className="text-xl font-bold text-white tracking-widest">EXPLORE</h1>
        <div className="flex gap-4">
          <Menu size={20} className="text-zinc-400" />
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 pb-20">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.2)_0%,black_70%)] pointer-events-none"></div>
         
         <div className="w-24 h-24 bg-zinc-900/50 rounded-full border border-zinc-800 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <AlertTriangle size={32} className="text-amber-500" />
         </div>
         
         <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">System Offline</h2>
         <p className="text-zinc-500 text-sm max-w-[200px] mb-8">
            The Exploration Module is currently under development. Check back in v2.0.
         </p>
         
         <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full">
            <span className="text-[10px] font-mono text-cyan-500 animate-pulse">EST_ARRIVAL: Q3_2024</span>
         </div>
      </div>
    </div>
  );
};