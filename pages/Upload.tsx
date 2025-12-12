import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Image, FileText, Info, Aperture } from 'lucide-react';

export const Upload: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'single' | 'multi'>('single');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Navigate directly to designer, skipping the processing animation page
        navigate('/designer', { state: { image: reader.result } });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full flex flex-col p-5 bg-black relative">
       {/* Scanning Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,30,1)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-20 pointer-events-none"></div>

      <div className="flex justify-between items-center mb-8 relative z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-900">
          <ArrowLeft size={20} className="text-zinc-400" />
        </button>
      </div>

      <div className="relative z-10 mb-8">
          <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Aperture size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Input Source</h1>
          <p className="text-zinc-500 text-sm">Select data ingestion method.</p>
      </div>

      {/* Tech Toggle */}
      <div className="bg-zinc-900 p-1 rounded-full flex mb-8 relative z-10 border border-zinc-800">
        <button 
            onClick={() => setMode('single')}
            className={`flex-1 py-3 rounded-full text-xs font-bold transition-all uppercase tracking-widest ${mode === 'single' ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700' : 'text-zinc-600'}`}
        >
            Standard
        </button>
        <button 
            onClick={() => setMode('multi')}
            className={`flex-1 py-3 rounded-full text-xs font-bold transition-all uppercase tracking-widest ${mode === 'multi' ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700' : 'text-zinc-600'}`}
        >
            LiDAR Scan
        </button>
      </div>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Input Methods */}
      <div className="space-y-3 relative z-10">
        <button onClick={handleTriggerUpload} className="w-full bg-zinc-900/50 border border-zinc-800 hover:border-cyan-500/50 group p-5 rounded-[2rem] flex items-center justify-between transition-all cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-black border border-zinc-800 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                    <Camera size={20} className="text-zinc-400 group-hover:text-cyan-400" />
                </div>
                <div className="text-left">
                    <span className="block font-bold text-base text-white">Camera</span>
                    <span className="text-xs text-zinc-500">Real-time capture</span>
                </div>
            </div>
        </button>

        <button onClick={handleTriggerUpload} className="w-full bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 group p-5 rounded-[2rem] flex items-center justify-between transition-all cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-black border border-zinc-800 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                    <Image size={20} className="text-zinc-400 group-hover:text-purple-400" />
                </div>
                <div className="text-left">
                    <span className="block font-bold text-base text-white">Gallery Import</span>
                    <span className="text-xs text-zinc-500">JPG / PNG / HEIC</span>
                </div>
            </div>
        </button>

        <button onClick={handleTriggerUpload} className="w-full bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 group p-5 rounded-[2rem] flex items-center justify-between transition-all cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-black border border-zinc-800 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                    <FileText size={20} className="text-zinc-400 group-hover:text-amber-400" />
                </div>
                <div className="text-left">
                    <span className="block font-bold text-base text-white">Cloud File</span>
                    <span className="text-xs text-zinc-500">iCloud / Drive</span>
                </div>
            </div>
        </button>
      </div>
    </div>
  );
};