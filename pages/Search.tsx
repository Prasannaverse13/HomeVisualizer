import React from 'react';
import { Menu, Database } from 'lucide-react';

export const Search: React.FC = () => {
  return (
    <div className="p-6 bg-black h-full flex flex-col">
      <header className="flex items-center mb-8 relative justify-center">
         <div className="absolute left-0">
            <Menu size={20} className="text-zinc-500" />
         </div>
        <h1 className="text-lg font-bold text-white tracking-widest uppercase">Database</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 pb-20">
         {/* Tech Background Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,30,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,0.5)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-20 pointer-events-none"></div>

         <div className="w-24 h-24 bg-zinc-900/50 rounded-2xl border border-zinc-800 flex items-center justify-center mb-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <Database size={32} className="text-blue-400" />
         </div>
         
         <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Access Denied</h2>
         <p className="text-zinc-500 text-sm max-w-[240px] mb-8">
            The global asset database is initializing. Search functionality is coming soon.
         </p>
         
         <button className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-bold text-zinc-400 cursor-not-allowed">
            Request Early Access
         </button>
      </div>
    </div>
  );
};