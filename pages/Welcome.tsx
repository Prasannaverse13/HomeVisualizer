import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-black relative overflow-hidden">
      {/* Deep Space Blobs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600 neon-blob rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 -left-20 w-64 h-64 bg-purple-600 neon-blob rounded-full animate-pulse delay-1000"></div>
      <div className="absolute -bottom-20 right-10 w-72 h-72 bg-amber-600 neon-blob rounded-full opacity-20"></div>

      {/* Spacer */}
      <div className="h-4"></div>

      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
        <h1 className="text-5xl font-bold mb-4 tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          Home<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Visualizer</span>
        </h1>
        <p className="text-lg text-zinc-400 mb-12 font-light tracking-wide">
          Redesign your reality.
        </p>

        {/* Futuristic Orb Graphic */}
        <div className="relative w-72 h-72">
           {/* Outer Rings */}
           <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
           <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
           
           {/* Core Glows */}
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl"></div>
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/30 rounded-full blur-xl animate-pulse"></div>

           {/* Solid Chrome Center */}
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full shadow-[inset_0_2px_10px_rgba(255,255,255,0.5),0_0_30px_rgba(0,150,255,0.4)] bg-black border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-80"></div>
              <div className="w-12 h-12 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full blur-md animate-pulse"></div>
           </div>
           
           {/* Floating Particles */}
           <div className="absolute top-10 right-10 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-ping"></div>
           <div className="absolute bottom-20 left-10 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_cyan]"></div>
        </div>
      </div>

      <div className="mb-8 relative z-10">
        <button
          onClick={() => navigate('/onboarding')}
          className="btn-chrome w-full py-5 rounded-full font-bold text-lg tracking-widest text-white border-white/20"
        >
          ENTER EXPERIENCE
        </button>
      </div>
    </div>
  );
};