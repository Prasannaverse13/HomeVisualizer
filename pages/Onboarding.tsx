import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState<string>('');

  return (
    <div className="h-full flex flex-col p-6 bg-black relative overflow-hidden">
      {/* Decorative Ambient */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none"></div>

      <div className="pt-4 text-zinc-500 mb-6 font-bold tracking-widest relative z-10 text-[10px] uppercase">
        Setup // 01
      </div>

      {/* Neon Progress */}
      <div className="mb-10 relative z-10">
        <div className="flex justify-between items-end mb-2">
           <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">Step 1 of 4</span>
        </div>
        <div className="h-1 bg-zinc-800 rounded-full w-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-white w-1/4 rounded-full shadow-[0_0_10px_cyan]"></div>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 relative z-10 flex flex-col">
        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight leading-tight">
          Initialize<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">User Profile</span>
        </h2>

        <div className="space-y-6">
          <div className="group">
            <label className="block text-[10px] font-bold text-zinc-500 mb-2 pl-1 uppercase tracking-wider group-focus-within:text-cyan-400 transition-colors">Identity</label>
            <input 
              type="text" 
              placeholder="Enter name"
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-white font-medium placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:bg-zinc-900 transition-all shadow-inner"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] font-bold text-zinc-500 mb-2 pl-1 uppercase tracking-wider group-focus-within:text-cyan-400 transition-colors">Age</label>
            <input 
              type="number" 
              placeholder="25"
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-white font-medium placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:bg-zinc-900 transition-all shadow-inner"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-500 mb-3 pl-1 uppercase tracking-wider">Gender</label>
            <div className="flex gap-3">
              {['Male', 'Female', 'Other'].map((option) => (
                <label key={option} className={`flex-1 relative cursor-pointer group transition-all`}>
                  <input type="radio" name="gender" className="hidden" onChange={() => setGender(option)} />
                  <div className={`
                    rounded-2xl p-2 flex flex-col items-center justify-center border transition-all duration-300 h-16
                    ${gender === option 
                      ? 'border-cyan-500/50 bg-cyan-900/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                      : 'border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900'}
                  `}>
                    <div className={`w-2 h-2 rounded-full mb-2 flex items-center justify-center transition-all
                       ${gender === option ? 'bg-cyan-400 shadow-[0_0_8px_cyan]' : 'bg-zinc-700'}
                    `}></div>
                    <span className={`text-[10px] font-bold ${gender === option ? 'text-cyan-100' : 'text-zinc-500'}`}>{option}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-12 mb-4 space-y-4 relative z-10">
        <button
          onClick={() => navigate('/home')}
          className="btn-chrome w-full py-4 rounded-full font-bold text-base tracking-widest"
        >
          CONTINUE
        </button>
        <button
          onClick={() => navigate('/home')}
          className="w-full text-zinc-600 hover:text-zinc-400 py-2 text-[10px] font-bold transition-colors uppercase tracking-widest"
        >
          Skip Setup
        </button>
      </div>
    </div>
  );
};