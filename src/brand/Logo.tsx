import React from 'react';
import logoOrg from '../assets/logo_org.png';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  lightHeader?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  iconOnly = false,
  lightHeader = true 
}) => {
  const imgHeight = iconOnly ? 'h-8' : 'h-7 sm:h-8';
  
  // Wrap logo in a premium dark capsule if rendered on a light header to keep white text visible
  const wrapperClass = lightHeader 
    ? 'bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-900/80 shadow-md shadow-slate-950/10 hover:bg-slate-900 transition-all duration-300' 
    : '';

  return (
    <div className={`flex items-center select-none ${wrapperClass} ${className}`}>
      <img 
        src={logoOrg} 
        alt="GOJOBINFORMATION Logo" 
        className={`${imgHeight} w-auto object-contain shrink-0`}
      />
    </div>
  );
};

export default Logo;
