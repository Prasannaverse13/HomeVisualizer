import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Search, Menu, ChevronDown, Box, Cpu } from 'lucide-react';
import { getDesignAdvice } from '../services/geminiService';

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdvice = async () => {
      setLoading(true);
      const advice = await getDesignAdvice("Living Room", "Modern Industrial");
      setAiAdvice(advice);
      setLoading(false);
    };
    fetchAdvice();
  }, [id]);

  return (
    <div className="p-6 bg-black pb-32 min-h-full relative">
      
      {/* Ambient Lighting */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-900/30 rounded-full blur-[80px] pointer-events-none"></div>

      <header className="flex justify-between items-center mb-6 relative z-10">
        <h1 className="text-lg font-bold text-white tracking-widest">ASSET</h1>
        <div className="flex gap-4">
          <Search size={20} className="text-zinc-400" />
          <Menu size={20} className="text-zinc-400" />
        </div>
      </header>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 transition-colors">
          <ArrowLeft size={18} className="text-white" />
        </button>
        <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:border-red-900/50 transition-colors group">
           <Heart size={18} className="text-zinc-600 group-hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Holographic Hero */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] h-80 mb-8 flex items-center justify-center relative overflow-hidden">
         <img src={`https://picsum.photos/600/400?random=${id}`} className="absolute inset-0 w-full h-full object-cover opacity-70" alt="product" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
         
         {/* Tech Overlay */}
         <div className="absolute top-6 right-6 chrome-glass px-3 py-1.5 rounded-full border border-cyan-500/30">
            <span className="text-[10px] font-bold text-cyan-300 flex items-center gap-2 uppercase tracking-wider">
                <Box size={12} />
                AR Ready
            </span>
         </div>

         <div className="absolute bottom-6 left-6 z-10 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-1 text-glow">Obsidian Sofa</h2>
            <p className="text-zinc-400 text-xs">Premium • Series 4</p>
         </div>
      </div>

      {/* AI Analysis Panel */}
      <div className="mb-8 relative z-10">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Cpu size={14} className="text-purple-500" />
            AI Analysis
        </h3>
        <div className="chrome-glass p-5 rounded-[2rem] relative overflow-hidden border border-purple-500/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
          {loading ? (
            <div className="flex gap-1 items-center h-full">
                 <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                 <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-75"></div>
                 <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-150"></div>
            </div>
          ) : (
            <p className="text-sm text-zinc-300 leading-relaxed font-medium relative z-10">
              "{aiAdvice}"
            </p>
          )}
        </div>
      </div>

      {/* Price / Action */}
      <div className="flex gap-4 mb-8 relative z-10">
        <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between px-5 py-4">
          <div>
             <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Unit Cost</span>
             <span className="text-white font-bold text-2xl">$899</span>
          </div>
        </div>
         <button className="bg-zinc-900 border border-zinc-800 rounded-2xl w-16 flex items-center justify-center hover:bg-zinc-800 transition-colors">
             <ChevronDown size={20} className="text-zinc-400" />
         </button>
      </div>

      <div className="space-y-3 relative z-10">
        <button className="btn-chrome w-full py-5 rounded-full font-bold text-sm tracking-widest uppercase border-white/10">
          Add to Project
        </button>
      </div>
    </div>
  );
};