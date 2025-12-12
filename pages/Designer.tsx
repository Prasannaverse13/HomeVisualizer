import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Save, Edit2, Box, ShoppingBag, Layers, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { redesignRoom } from '../services/geminiService';

export const Designer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMode, setActiveMode] = useState<'view' | 'ar' | 'edit' | 'shop'>('view');
  
  // State for images
  const initialImage = location.state?.image || "https://picsum.photos/800/1200?random=99";
  // We keep track of the original for comparison
  const [originalImage] = useState<string>(initialImage);
  const [currentImage, setCurrentImage] = useState<string>(initialImage);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptText, setPromptText] = useState("");
  
  // Slider State
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasChanges = currentImage !== originalImage;

  const handleRedesign = async (style: string) => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
        // Style mode uses the ORIGINAL image as base to avoid deep frying the image with multiple style passes
        const newImage = await redesignRoom(originalImage, style, 'style');
        if (newImage) {
            setCurrentImage(newImage);
            setSliderPosition(50); // Reset slider to center to show comparison
        }
    } catch (e) {
        alert("Unable to redesign at this moment. Please check API key configuration.");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleTextRedesign = async () => {
    if (!promptText) return;
    setIsGenerating(true);
    try {
        // Edit mode applies changes to the CURRENT image (so you can stack edits)
        const newImage = await redesignRoom(currentImage, promptText, 'edit');
        if (newImage) {
            setCurrentImage(newImage);
            setSliderPosition(50);
        }
    } catch (e) {
         alert("Unable to process edit.");
    } finally {
        setIsGenerating(false);
        setPromptText("");
    }
  };

  const handleUpcomingFeature = (mode: 'ar' | 'shop') => {
    setActiveMode(mode);
  };

  // Slider Logic
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
     handleMove(e.touches[0].clientX);
  };

  // Global mouse up listener
  useEffect(() => {
    const stopDrag = () => setIsDragging(false);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
    return () => {
        window.removeEventListener('mouseup', stopDrag);
        window.removeEventListener('touchend', stopDrag);
    };
  }, []);


  return (
    <div className="h-full flex flex-col bg-black relative overflow-hidden">
      
      {/* Top Chrome Bar */}
      <div className="absolute top-0 left-0 right-0 p-5 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <button onClick={() => navigate('/home')} className="w-10 h-10 rounded-full chrome-glass flex items-center justify-center pointer-events-auto hover:bg-white/10">
            <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="flex gap-3 pointer-events-auto">
             <button className="w-10 h-10 rounded-full chrome-glass flex items-center justify-center hover:bg-white/10">
                <Sparkles size={18} className="text-cyan-400" />
            </button>
            <button className="w-10 h-10 rounded-full chrome-glass flex items-center justify-center hover:bg-white/10">
                <Save size={18} className="text-white" />
            </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="flex-1 relative bg-zinc-900 overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,1)_0%,black_100%)] opacity-50"></div>
         
         {/* COMPARISON SLIDER COMPONENT */}
         <div 
            ref={containerRef}
            className="absolute inset-0 w-full h-full select-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
         >
              {/* Layer 1: Right Side (Redesigned / New) */}
              <img 
                 src={currentImage} 
                 alt="New" 
                 className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isGenerating ? 'opacity-50 blur-sm' : 'opacity-100'}`} 
              />
              
              {/* Layer 2: Left Side (Original / Old) - Only if we have changes and not generating */}
              {hasChanges && !isGenerating && (
                 <div 
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                 >
                    <img 
                        src={originalImage} 
                        alt="Original" 
                        className="absolute inset-0 w-full h-full object-cover max-w-none" 
                    />
                    
                    {/* Floating Label for Before */}
                    <div className="absolute top-20 left-6 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg pointer-events-none">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Original</span>
                    </div>
                 </div>
              )}

             {/* Floating Label for After (Always visible on right) */}
             {hasChanges && !isGenerating && (
                <div className="absolute top-20 right-6 bg-cyan-900/60 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-lg pointer-events-none">
                     <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Redesigned</span>
                </div>
             )}

             {/* Slider Handle */}
             {hasChanges && !isGenerating && (
                <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-cyan-500 shadow-[0_0_20px_cyan] z-30 cursor-ew-resize"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 backdrop-blur-sm border-2 border-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                        <div className="flex gap-1">
                             <div className="w-0.5 h-4 bg-white/70 rounded-full"></div>
                             <div className="w-0.5 h-4 bg-white/70 rounded-full"></div>
                        </div>
                    </div>
                </div>
             )}
         </div>

         {/* Loading Overlay */}
         {isGenerating && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
                 <div className="relative">
                     <div className="w-20 h-20 border-4 border-zinc-800 rounded-full"></div>
                     <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
                 </div>
                 <p className="mt-4 text-cyan-400 font-bold tracking-widest text-xs uppercase animate-pulse">Processing Reality...</p>
             </div>
         )}

         {/* Upcoming Feature Overlay */}
         {(activeMode === 'ar' || activeMode === 'shop') && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-20 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 border border-zinc-700">
                    <AlertCircle size={32} className="text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Feature Upcoming</h3>
                <p className="text-zinc-400 text-sm mb-6">
                    {activeMode === 'ar' ? "3D Visualization" : "Product Identification"} is currently in development for the next release.
                </p>
                <button 
                    onClick={() => setActiveMode('view')}
                    className="btn-chrome px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest"
                >
                    Return to Designer
                </button>
            </div>
         )}
      </div>

      {/* Bottom Control Deck */}
      <div className="bg-black/80 backdrop-blur-xl border-t border-white/10 rounded-t-[2.5rem] p-6 pb-8 relative z-20">
         <div className="flex justify-between items-center mb-6 px-2">
            <TabButton icon={<Layers size={20} />} label="Design" active={activeMode === 'view'} onClick={() => setActiveMode('view')} />
            <TabButton icon={<Box size={20} />} label="3D/AR" active={activeMode === 'ar'} onClick={() => handleUpcomingFeature('ar')} />
            <TabButton icon={<Edit2 size={20} />} label="Edit" active={activeMode === 'edit'} onClick={() => setActiveMode('edit')} />
            <TabButton icon={<ShoppingBag size={20} />} label="Shop" active={activeMode === 'shop'} onClick={() => handleUpcomingFeature('shop')} />
         </div>

         {activeMode === 'edit' ? (
            <div className="flex gap-3 animate-fade-in">
                <input 
                    type="text" 
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="E.g. Add a velvet rug, add a TV..." 
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-5 text-sm text-white focus:border-cyan-500 outline-none placeholder-zinc-600" 
                    onKeyDown={(e) => e.key === 'Enter' && handleTextRedesign()}
                />
                <button 
                    onClick={handleTextRedesign}
                    disabled={isGenerating}
                    className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
                >
                    {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                </button>
            </div>
         ) : activeMode === 'view' ? (
             <div className="animate-fade-in">
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 pl-2">Select Theme</p>
                 <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    <StyleCard name="Cyberpunk" img="https://picsum.photos/150/100?random=101" onClick={() => handleRedesign("Cyberpunk Futuristic")} />
                    <StyleCard name="Minimalist" img="https://picsum.photos/150/100?random=102" onClick={() => handleRedesign("Minimalist Zen")} />
                    <StyleCard name="Industrial" img="https://picsum.photos/150/100?random=103" onClick={() => handleRedesign("Raw Industrial Loft")} />
                    <StyleCard name="Biophilic" img="https://picsum.photos/150/100?random=104" onClick={() => handleRedesign("Nature Biophilic Green")} />
                    <StyleCard name="Scandinavian" img="https://picsum.photos/150/100?random=105" onClick={() => handleRedesign("Scandinavian Bright")} />
                 </div>
             </div>
         ) : (
            <div className="h-12 flex items-center justify-center">
                 <p className="text-zinc-600 text-xs italic">Select a mode to continue</p>
            </div>
         )}
      </div>
    </div>
  );
};

const TabButton: React.FC<{icon: React.ReactNode, label: string, active: boolean, onClick: () => void}> = ({icon, label, active, onClick}) => (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-cyan-400 scale-110 drop-shadow-[0_0_5px_cyan]' : 'text-zinc-600'}`}>
        <div className={`p-3 rounded-2xl ${active ? 'bg-cyan-900/20 border border-cyan-500/30' : 'bg-transparent border border-transparent'}`}>
            {icon}
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
    </button>
);

const StyleCard: React.FC<{name: string, img: string, onClick: () => void}> = ({name, img, onClick}) => (
    <div onClick={onClick} className="min-w-[120px] rounded-2xl overflow-hidden relative h-24 cursor-pointer transition-all border border-zinc-800 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] group flex-shrink-0">
        <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={name} />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 flex items-center justify-center transition-colors">
            <span className="text-white font-bold text-[10px] uppercase tracking-wider group-hover:scale-110 transition-transform">{name}</span>
        </div>
    </div>
);