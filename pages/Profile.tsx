import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Settings as SettingsIcon, Edit3, Hexagon, Camera, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  stats: {
    projects: number;
    views: number;
    likes: number;
  }
}

const DEFAULT_PROFILE: UserProfile = {
  name: "Guest User",
  role: "Explorer",
  avatar: "https://picsum.photos/100/100?grayscale",
  stats: {
    projects: 0,
    views: 0,
    likes: 0
  }
};

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('user_profile', JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reload from local storage to discard changes
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
    } else {
        setProfile(DEFAULT_PROFILE);
    }
    setIsEditing(false);
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-black min-h-full pb-24 text-white relative">
      <div className="p-5">
        <header className="flex justify-between items-center mb-6">
            <h1 className="text-lg font-bold tracking-widest">PROFILE</h1>
            <button onClick={() => navigate('/settings')} className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-900">
                <SettingsIcon size={18} className="text-zinc-400" />
            </button>
        </header>
        
        <button onClick={() => navigate(-1)} className="mb-6 w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-900">
             <ArrowLeft size={18} className="text-zinc-400" />
        </button>
      </div>

      {/* Avatar Section */}
      <div className="px-5 flex items-center gap-5 mb-10 relative">
        <div className="relative group">
            <div className={`w-24 h-24 rounded-full p-0.5 bg-gradient-to-br from-cyan-500 to-blue-600 ${isEditing ? 'animate-pulse' : ''}`}>
                <div className="w-full h-full rounded-full overflow-hidden bg-black border-2 border-black relative">
                    <img src={profile.avatar} className="w-full h-full object-cover" alt="avatar" />
                    {isEditing && (
                        <div 
                            className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera size={20} className="text-white" />
                        </div>
                    )}
                </div>
            </div>
            
            {/* Hidden File Input */}
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />

            {!isEditing && (
                <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-1 border border-zinc-800">
                    <Hexagon size={16} className="text-cyan-400 fill-cyan-900" />
                </div>
            )}
        </div>

        <div className="flex-1">
             {isEditing ? (
                 <div className="space-y-2">
                     <input 
                        type="text" 
                        value={profile.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 text-white font-bold text-xl rounded px-2 py-1 w-full focus:outline-none focus:border-cyan-500"
                        placeholder="Name"
                     />
                     <input 
                        type="text" 
                        value={profile.role}
                        onChange={(e) => handleChange('role', e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider rounded px-2 py-1 w-full focus:outline-none focus:border-cyan-500"
                        placeholder="Title/Role"
                     />
                 </div>
             ) : (
                 <>
                    <h2 className="text-2xl font-bold text-white leading-tight">{profile.name}</h2>
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{profile.role}</p>
                 </>
             )}
        </div>

        {/* Edit Toggle Button */}
        <div className="absolute right-5 top-2">
             {isEditing ? (
                 <div className="flex gap-2">
                     <button onClick={handleCancel} className="w-8 h-8 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center border border-red-500/30">
                        <X size={14} />
                     </button>
                     <button onClick={handleSave} className="w-8 h-8 rounded-full bg-green-900/50 text-green-400 flex items-center justify-center border border-green-500/30">
                        <Save size={14} />
                     </button>
                 </div>
             ) : (
                 <button onClick={() => setIsEditing(true)} className="w-8 h-8 rounded-full bg-zinc-900 text-zinc-400 flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-colors border border-zinc-800">
                    <Edit3 size={14} />
                 </button>
             )}
        </div>
      </div>

      {/* Real Stats */}
      <div className="px-5 mb-10 grid grid-cols-3 gap-3">
         <div className="bg-zinc-900/50 border border-zinc-800/50 p-4 rounded-2xl flex flex-col items-center justify-center h-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-green-500/5"></div>
            <span className="text-2xl font-bold text-white mb-1">{profile.stats.projects}</span>
            <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Projects</span>
         </div>
         <div className="bg-zinc-900/50 border border-zinc-800/50 p-4 rounded-2xl flex flex-col items-center justify-center h-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/5"></div>
            <span className="text-2xl font-bold text-white mb-1">{profile.stats.views}</span>
            <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-widest">Views</span>
         </div>
         <div className="bg-zinc-900/50 border border-zinc-800/50 p-4 rounded-2xl flex flex-col items-center justify-center h-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-amber-500/5"></div>
            <span className="text-2xl font-bold text-white mb-1">{profile.stats.likes}</span>
            <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">Likes</span>
         </div>
      </div>

      <div className="px-5">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 ml-1">Library</h3>
        
        {profile.stats.projects > 0 ? (
             <div className="text-center py-8 border border-dashed border-zinc-800 rounded-3xl">
                 <p className="text-zinc-500 text-xs">Projects loading from local storage...</p>
             </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-zinc-900/30 rounded-[2rem] border border-dashed border-zinc-800">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-3">
                    <Hexagon size={20} className="text-zinc-600" />
                </div>
                <p className="text-zinc-400 text-sm font-bold">No Projects Yet</p>
                <p className="text-zinc-600 text-xs mt-1 mb-4">Start your first redesign today</p>
                <button 
                    onClick={() => navigate('/upload')}
                    className="px-6 py-2 bg-cyan-900/30 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-cyan-900/50 transition-colors"
                >
                    Create New
                </button>
            </div>
        )}
      </div>
    </div>
  );
};