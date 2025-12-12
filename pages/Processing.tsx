import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Processing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState(0);
  const uploadedImage = location.state?.image;

  const stages = [
    "Initializing Neural Engine...",
    "Analyzing Room Geometry...",
    "Detecting Light Sources...",
    "Preparing Design Matrix...",
    "Ready for Redesign..."
  ];

  useEffect(() => {
    // Ensure we have an image, otherwise redirect back to upload
    if (!uploadedImage) {
        navigate('/upload');
        return;
    }

    const interval = setInterval(() => {
        setStage(prev => {
            if (prev < stages.length - 1) return prev + 1;
            clearInterval(interval);
            // Pass the image forward to the designer
            setTimeout(() => navigate('/designer', { state: { image: uploadedImage } }), 800);
            return prev;
        });
    }, 1200);

    return () => clearInterval(interval);
  }, [navigate, uploadedImage]);

  const progress = ((stage + 1) / stages.length) * 100;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.2)_0%,black_70%)]"></div>

        <div className="relative z-10 w-full max-w-xs text-center">
            {/* Neon Loader */}
            <div className="w-40 h-40 mx-auto mb-12 relative flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-zinc-900 rounded-full"></div>
                <div 
                    className="absolute inset-0 border-2 border-cyan-500 rounded-full border-t-transparent animate-spin shadow-[0_0_20px_cyan]"
                    style={{ animationDuration: '1.5s' }}
                ></div>
                <div 
                    className="absolute inset-4 border-2 border-purple-500 rounded-full border-b-transparent animate-spin"
                    style={{ animationDuration: '2.5s', animationDirection: 'reverse' }}
                ></div>
                <span className="text-3xl font-bold text-white font-mono">{Math.round(progress)}%</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-2 tracking-widest uppercase">Processing</h2>
            <p className="text-cyan-400 text-xs font-mono mb-12 h-6 uppercase tracking-wide animate-pulse">
                {stages[stage]}
            </p>

            {/* Terminal style log */}
            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 text-left font-mono text-[10px] text-zinc-500 h-32 overflow-hidden flex flex-col justify-end">
                {stages.slice(0, stage + 1).map((s, i) => (
                    <div key={i} className="mb-1">
                        <span className="text-green-500 mr-2">✔</span>
                        <span className="text-zinc-300">{s}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};