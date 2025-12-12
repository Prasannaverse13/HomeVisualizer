import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, CreditCard, Shield, Bell, Smartphone, ChevronRight, LogOut } from 'lucide-react';

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-black text-white">
       <header className="p-6 flex items-center gap-4 border-b border-zinc-900">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 transition-colors">
                <ArrowLeft size={20} className="text-zinc-400" />
            </button>
            <h1 className="text-lg font-bold tracking-widest">SETTINGS</h1>
       </header>

       <div className="p-6 space-y-8 overflow-y-auto pb-10">
            
            {/* Account Section */}
            <section>
                <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 ml-1">System</h2>
                <div className="space-y-2">
                    <SettingItem icon={<User size={18} />} label="Identity" sublabel="Profile & Personal" />
                    <SettingItem icon={<CreditCard size={18} />} label="Billing" />
                    <SettingItem icon={<Shield size={18} />} label="Security Protocols" />
                </div>
            </section>

             {/* Preferences */}
            <section>
                <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 ml-1">Configuration</h2>
                <div className="space-y-2">
                    <SettingItem icon={<Bell size={18} />} label="Alerts" value="On" />
                    <SettingItem icon={<Smartphone size={18} />} label="Display" value="Dark" />
                </div>
            </section>
            
            <button 
                onClick={() => navigate('/')}
                className="w-full py-4 text-red-500 font-bold text-xs uppercase tracking-widest bg-zinc-900/30 border border-zinc-800 rounded-3xl hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2"
            >
                <LogOut size={14} />
                Logout
            </button>
            
             <div className="text-center pt-4 pb-8">
                <p className="text-[10px] text-zinc-600 font-mono">sys.v.2.4.1</p>
            </div>
       </div>
    </div>
  );
};

const SettingItem: React.FC<{icon: React.ReactNode, label: string, sublabel?: string, value?: string}> = ({icon, label, sublabel, value}) => (
    <div className="flex items-center justify-between p-4 hover:bg-zinc-900 rounded-2xl cursor-pointer transition-colors group border border-transparent hover:border-zinc-800">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-900 text-zinc-500 flex items-center justify-center group-hover:text-white transition-colors">
                {icon}
            </div>
            <div>
                <p className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{label}</p>
                {sublabel && <p className="text-[10px] text-zinc-600 mt-0.5">{sublabel}</p>}
            </div>
        </div>
        <div className="flex items-center gap-2">
            {value && <span className="text-[10px] font-bold text-zinc-500 uppercase">{value}</span>}
            <ChevronRight size={16} className="text-zinc-700" />
        </div>
    </div>
);