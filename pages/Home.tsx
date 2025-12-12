import React, { useState } from 'react';
import { Search, PenTool, ShoppingCart, Plus, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isGlowing, setIsGlowing] = useState(false);

  const handleStart = () => {
    setIsGlowing(true);
    setTimeout(() => {
      setIsGlowing(false);
      navigate('/upload');
    }, 600);
  };

  return (
    <div className={`p-5 bg-black min-h-full relative transition-all duration-700 ${isGlowing ? 'bg-zinc-900' : ''}`}>
      {/* Dark Ambient Glows */}
      <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[20%] left-[-20%] w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <header className="flex justify-between items-center mb-6 relative z-10">
        <h1 className="text-lg font-bold text-white tracking-wide">Home</h1>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full chrome-glass flex items-center justify-center hover:bg-white/10 transition-colors">
            <Search className="text-zinc-300" size={18} />
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full chrome-glass p-0.5 overflow-hidden"
          >
            <img src="https://picsum.photos/100/100?random=1" alt="User" className="w-full h-full rounded-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </header>

      {/* Title */}
      <div className="mb-8 relative z-10">
        <h2 className="text-4xl font-bold text-white leading-tight tracking-tighter drop-shadow-lg">
          Visualize<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">Reality</span>
        </h2>
      </div>

      {/* NEW: Central Liquid Chrome Card */}
      <div className="mb-10 relative z-10">
        <div 
            onClick={handleStart}
            className="w-full h-64 rounded-[2.5rem] p-8 relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform duration-300 border border-white/10 shadow-[0_0_30px_rgba(0,198,255,0.15)]"
        >
            {/* Liquid Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 opacity-80 animate-liquid-glow"></div>
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
            
            {/* Glass Highlight Overlay */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/10 to-transparent"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-full bg-black/30 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-4 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
                    <Plus size={36} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1 text-glow">New Scan</h3>
                <p className="text-white/70 text-sm font-medium tracking-wide">Capture your space</p>
            </div>
            
            {/* Tech details */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                 <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    <Sparkles size={12} className="text-cyan-400" />
                    <span className="text-[10px] font-bold text-cyan-100 uppercase">AI Ready</span>
                 </div>
                 <Zap size={16} className="text-amber-400 fill-amber-400" />
            </div>
        </div>
      </div>

      {/* Secondary Chrome Panels */}
      <div className="flex gap-4 mb-24 relative z-10">
         <div onClick={() => navigate('/explore')} className="flex-1 chrome-glass p-5 rounded-[2rem] cursor-pointer active:scale-[0.98] transition-transform relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 blur-2xl -mr-5 -mt-5 transition-opacity opacity-50 group-hover:opacity-100"></div>
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mb-3 border border-white/10">
                <ShoppingCart size={18} className="text-zinc-200" />
            </div>
            <h4 className="font-bold text-white text-sm leading-tight">Shop<br/>Assets</h4>
         </div>

         <div onClick={() => navigate('/explore')} className="flex-1 chrome-glass p-5 rounded-[2rem] cursor-pointer active:scale-[0.98] transition-transform relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 blur-2xl -mr-5 -mt-5 transition-opacity opacity-50 group-hover:opacity-100"></div>
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mb-3 border border-white/10">
                <ArrowRight size={18} className="text-zinc-200 -rotate-45" />
            </div>
            <h4 className="font-bold text-white text-sm leading-tight">View<br/>Gallery</h4>
         </div>
      </div>
    </div>
  );
};