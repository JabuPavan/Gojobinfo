import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, Lock, Eye, EyeOff, Sparkles, User, Wrench, Building, Briefcase } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import type { UserRole } from '../store/useAuthStore';
import { Logo } from '../brand/Logo';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuthStore();

  // Tab state
  const isRegisterParam = searchParams.get('register') === 'true';
  const [isLoginTab, setIsLoginTab] = useState(!isRegisterParam);

  // Input states
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  
  // Registration specific states
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [fullName, setFullName] = useState('');

  // Sync tab with query parameters
  useEffect(() => {
    setIsLoginTab(!isRegisterParam);
  }, [isRegisterParam]);

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loginEmail = loginMethod === 'email' ? email || 'demo@gojobinformation.com' : `${phone}@gojobinformation.com`;
    
    // Login in Zustand store
    login(loginEmail, selectedRole);

    // Redirect to respective dashboard or redirect URL after mock login
    const dashboardRoutes: Record<UserRole, string> = {
      user: '/dashboard/user',
      professional: '/dashboard/professional',
      business: '/dashboard/business',
      recruiter: '/dashboard/recruiter'
    };
    
    const redirectUrl = searchParams.get('redirect');
    if (redirectUrl) {
      navigate(redirectUrl);
    } else {
      navigate(dashboardRoutes[selectedRole]);
    }
  };

  const handleGoogleSignIn = () => {
    login('google.user@example.com', 'user');
    const redirectUrl = searchParams.get('redirect');
    if (redirectUrl) {
      navigate(redirectUrl);
    } else {
      navigate('/dashboard/user');
    }
  };

  const rolesList: { id: UserRole; label: string; icon: any; color: string }[] = [
    { id: 'user', label: 'General User', icon: User, color: 'text-black bg-slate-100 border-slate-200' },
    { id: 'professional', label: 'Service Expert', icon: Wrench, color: 'text-black bg-slate-100 border-slate-200' },
    { id: 'business', label: 'Business Owner', icon: Building, color: 'text-black bg-slate-100 border-slate-200' },
    { id: 'recruiter', label: 'Recruiter', icon: Briefcase, color: 'text-black bg-slate-100 border-slate-200' }
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-12 flex flex-col min-h-[500px] my-8">
      
      {/* Header with Logo and Single Line Quote */}
      <div className="flex flex-col items-center text-center mb-8">
        <Logo lightHeader={true} className="mb-4" />
        <p className="text-sm text-slate-600 font-medium italic">
          "Your gateway to a complete digital professional ecosystem."
        </p>
      </div>

      {/* Interactive Forms Box */}
      <div className="editorial-panel rounded-none p-6 sm:p-8 flex flex-col justify-center shadow-sm">
        
        {/* Switch Slider */}
        <div className="flex bg-slate-100 p-1 rounded-none mb-6 relative">
          <button
            onClick={() => setIsLoginTab(true)}
            className={`flex-1 text-center font-bold text-xs py-2 rounded-none transition-all ${
              isLoginTab ? 'bg-black text-white shadow-none' : 'text-slate-500'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginTab(false)}
            className={`flex-1 text-center font-bold text-xs py-2 rounded-none transition-all ${
              !isLoginTab ? 'bg-black text-white shadow-none' : 'text-slate-500'
            }`}
          >
            Register
          </button>
        </div>

        {/* Auth method selectors */}
        {isLoginTab && (
          <div className="flex gap-4 mb-4 border-b border-slate-100 pb-3">
            <button
              onClick={() => setLoginMethod('email')}
              className={`text-xs font-bold ${loginMethod === 'email' ? 'text-black border-b-2 border-black pb-1.5' : 'text-slate-400'}`}
            >
              Email Login
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`text-xs font-bold ${loginMethod === 'phone' ? 'text-black border-b-2 border-black pb-1.5' : 'text-slate-400'}`}
            >
              Mobile OTP
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Register: Full Name field */}
          {!isLoginTab && (
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Pavan Kumar"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border border-slate-200 rounded-none p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-black text-black font-medium"
              />
            </div>
          )}

          {/* Email vs Phone inputs */}
          {loginMethod === 'email' || !isLoginTab ? (
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 font-semibold">Email Address</label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-none px-3 py-2 bg-slate-50 focus-within:ring-1 focus-within:ring-black">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="e.g. name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs focus:outline-none text-black"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 font-semibold">Mobile Number</label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-none px-3 py-2 bg-slate-50 focus-within:ring-1 focus-within:ring-black">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 99887 76655"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent text-xs focus:outline-none text-black"
                />
              </div>
            </div>
          )}

          {/* Password fields */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Password</label>
            <div className="flex items-center gap-2 border border-slate-200 rounded-none px-3 py-2 bg-slate-50 focus-within:ring-1 focus-within:ring-black">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-xs focus:outline-none text-black font-medium"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="text-slate-400 hover:text-slate-600 focus:outline-none shrink-0"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Role selector panel */}
          <div className="flex flex-col gap-1 mt-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Select Active Workspace Role</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {rolesList.map((role) => {
                const RoleIcon = role.icon;
                const active = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-2.5 border rounded-none text-left flex items-center gap-2.5 transition-all ${
                      active 
                        ? 'border-black bg-slate-100 text-black font-bold shadow-none' 
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className={`p-1 rounded-none ${active ? 'bg-black text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <RoleIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold">{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-black hover:bg-slate-800 text-white font-bold text-xs uppercase py-3 rounded-none shadow-none mt-3 transition-all active:scale-95"
          >
            {isLoginTab ? 'Login to Portal' : 'Register Account'}
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-slate-200"></div>
          <span className="text-[9px] uppercase font-bold text-slate-400">Or sign in with</span>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
        </div>

        {/* Mock Google login */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full border border-slate-200 hover:bg-slate-50 text-black font-bold text-xs py-2.5 rounded-none transition-colors flex items-center justify-center gap-2 shadow-none"
        >
          {/* Simple vector Google G */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          Google Sign-In
        </button>

      </div>

    </div>
  );
};
export default Auth;
