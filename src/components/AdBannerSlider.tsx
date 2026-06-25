import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useBusinessStore } from '../store/useBusinessStore';
import { Link } from 'react-router-dom';

const getAdDuration = (tier: string) => {
  switch (tier) {
    case 'Platinum': return 20000; // 20 seconds
    case 'Gold': return 15000;     // 15 seconds
    case 'Premium': return 10000;  // 10 seconds
    default: return 5000;          // 5 seconds fallback
  }
};

export const AdBannerSlider: React.FC = () => {
  const { businesses } = useBusinessStore();
  
  // Filter businesses that have bought an ad (e.g. Platinum, Gold, Premium)
  const adBusinesses = businesses.filter(b => ['Platinum', 'Gold', 'Premium'].includes(b.tier));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (adBusinesses.length === 0 || isHovered) return;

    const currentBusiness = adBusinesses[currentIndex];
    const duration = getAdDuration(currentBusiness.tier);

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % adBusinesses.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, adBusinesses, isHovered]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % adBusinesses.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + adBusinesses.length) % adBusinesses.length);
  };

  if (adBusinesses.length === 0) return null;

  const currentAd = adBusinesses[currentIndex];

  return (
    <section className="py-12 sm:py-16 px-4 border-b border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sponsored</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Featured Partners
            </h2>
          </div>
          {/* Controls outside for desktop if we want, or keep inside. Let's put simple controls inside. */}
        </div>

        <div 
          className="w-full relative overflow-hidden flex items-center rounded-none shadow-2xl group border border-slate-200 bg-black"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ height: '400px' }}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: `url(${currentAd.coverUrl})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-0"></div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            
            <div className="flex flex-col text-white max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-none border ${
                  currentAd.tier === 'Platinum' ? 'border-purple-500 text-purple-400 bg-purple-500/10' :
                  currentAd.tier === 'Gold' ? 'border-brand-orange text-brand-orange bg-brand-orange/10' : 
                  'border-blue-500 text-blue-400 bg-blue-500/10'
                }`}>
                  {currentAd.tier} Sponsor
                </span>
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <img src={currentAd.ownerAvatarUrl} alt={currentAd.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover border-2 border-white/20 bg-white" />
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {currentAd.name}
                </h3>
              </div>
              
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed hidden sm:block">
                {currentAd.description}
              </p>
              
              <div className="mt-6 flex gap-3">
                <Link 
                  to={`/businesses/detail/${currentAd.id}`}
                  className="bg-white hover:bg-slate-100 text-black font-bold px-6 py-3 text-xs sm:text-sm transition-colors flex items-center gap-2"
                >
                  View Details <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2 shrink-0 md:mb-2">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-colors border border-white/20 text-white rounded-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs text-white/70 font-bold min-w-[40px] text-center">
                {currentIndex + 1} / {adBusinesses.length}
              </span>
              <button 
                onClick={handleNext}
                className="w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-colors border border-white/20 text-white rounded-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-[4px] bg-black/20 w-full z-20">
            <div 
              className="h-full bg-blue-500 transition-all ease-linear"
              style={{ 
                width: isHovered ? '100%' : '100%',
                transitionDuration: isHovered ? '0ms' : `${getAdDuration(currentAd.tier)}ms`,
                animation: isHovered ? 'none' : `progress ${getAdDuration(currentAd.tier)}ms linear forwards`
              }}
            ></div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes progress {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}} />
        </div>

        {/* CTA to post advertisement */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between bg-white border border-slate-200 p-6 sm:p-8 rounded-none">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Want to feature your business here?</h3>
            <p className="text-sm text-slate-500 mt-1">Reach thousands of potential customers by posting your own advertisement.</p>
          </div>
          <Link 
            to="/advertise" 
            className="mt-4 sm:mt-0 bg-black hover:bg-slate-800 text-white text-sm font-bold px-8 py-3.5 rounded-none transition-colors shrink-0 uppercase tracking-widest"
          >
            Post Advertisement
          </Link>
        </div>
      </div>
    </section>
  );
};
