import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  
  // Neon active states
  const activeClass = "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"; 
  const inactiveClass = "text-zinc-500";

  const isActive = (path: string) => location.pathname === path;

  return (
    // Floating Chrome Pill Container
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[85%] z-50">
      <nav className="chrome-glass rounded-full px-2 py-3 flex justify-between items-center">
        <Link to="/home" className={`flex-1 flex flex-col items-center justify-center transition-all duration-300 ${isActive('/home') ? 'scale-105' : ''}`}>
          <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${isActive('/home') ? 'bg-white/5' : 'bg-transparent'}`}>
             <Home size={24} className={isActive('/home') ? activeClass : inactiveClass} strokeWidth={isActive('/home') ? 2.5 : 2} />
          </div>
        </Link>
        <Link to="/explore" className={`flex-1 flex flex-col items-center justify-center transition-all duration-300 ${isActive('/explore') ? 'scale-105' : ''}`}>
          <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${isActive('/explore') ? 'bg-white/5' : 'bg-transparent'}`}>
              <ShoppingBag size={24} className={isActive('/explore') ? activeClass : inactiveClass} strokeWidth={isActive('/explore') ? 2.5 : 2} />
          </div>
        </Link>
        <Link to="/search" className={`flex-1 flex flex-col items-center justify-center transition-all duration-300 ${isActive('/search') ? 'scale-105' : ''}`}>
          <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${isActive('/search') ? 'bg-white/5' : 'bg-transparent'}`}>
              <Search size={24} className={isActive('/search') ? activeClass : inactiveClass} strokeWidth={isActive('/search') ? 2.5 : 2} />
          </div>
        </Link>
        <Link to="/profile" className={`flex-1 flex flex-col items-center justify-center transition-all duration-300 ${isActive('/profile') ? 'scale-105' : ''}`}>
          <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${isActive('/profile') ? 'bg-white/5' : 'bg-transparent'}`}>
              <User size={24} className={isActive('/profile') ? activeClass : inactiveClass} strokeWidth={isActive('/profile') ? 2.5 : 2} />
          </div>
        </Link>
      </nav>
    </div>
  );
};