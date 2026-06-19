import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import type { UserRole } from '../../store/useAuthStore';
import { Shield, Sparkles, User, Wrench, Building, Briefcase } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { user, setRole, login } = useAuthStore();
  const [expanded, setExpanded] = useState(false);

  const roles: { id: UserRole; label: string; icon: any; color: string; desc: string }[] = [
    { 
      id: 'user', 
      label: 'General User', 
      icon: User, 
      color: 'bg-blue-600 text-white', 
      desc: 'Book services, view listings, apply for jobs' 
    },
    { 
      id: 'professional', 
      label: 'Professional', 
      icon: Wrench, 
      color: 'bg-teal-600 text-white', 
      desc: 'Manage calendar, bookings, view earnings' 
    },
    { 
      id: 'business', 
      label: 'Business Owner', 
      icon: Building, 
      color: 'bg-amber-600 text-white', 
      desc: 'Directory management, leads inbox, pricing' 
    },
    { 
      id: 'recruiter', 
      label: 'Recruiter', 
      icon: Briefcase, 
      color: 'bg-purple-600 text-white', 
      desc: 'Post job descriptions, track applicants' 
    },
  ];

  const currentRole = user?.role || 'user';
  const currentRoleInfo = roles.find(r => r.id === currentRole);
  const IconComponent = currentRoleInfo?.icon || Shield;

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-2">
      {expanded && (
        <div className="bg-slate-900 border border-slate-800 text-white rounded-xl shadow-2xl p-4 w-72 animate-fade-in shrink-0">
          <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 mb-3">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Demo Environment Switcher
            </h4>
          </div>
          
          <div className="flex flex-col gap-2">
            {roles.map((r) => {
              const RoleIcon = r.icon;
              const isSelected = user?.role === r.id;
              
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    if (!user) {
                      login(`${r.id}.demo@gojobinformation.com`, r.id);
                    } else {
                      setRole(r.id);
                    }
                    setExpanded(false);
                  }}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-all ${
                    isSelected 
                      ? 'bg-slate-800 border border-slate-700 text-white shadow-md' 
                      : 'hover:bg-slate-800/50 text-slate-400 border border-transparent'
                  }`}
                >
                  <div className={`p-1.5 rounded-md ${isSelected ? r.color : 'bg-slate-800 text-slate-300'}`}>
                    <RoleIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      {r.label}
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{r.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="text-[9px] text-center text-slate-500 mt-3 pt-2 border-t border-slate-800">
            Toggles workspace view for development review.
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs py-3 px-4 rounded-full shadow-2xl border border-slate-800 transition-all hover:scale-105 select-none"
      >
        <IconComponent className="w-4 h-4 text-brand-teal" />
        <span>Mode: <strong className="text-brand-orange uppercase">{user ? user.role : 'Guest'}</strong></span>
      </button>
    </div>
  );
};
export default RoleSwitcher;
