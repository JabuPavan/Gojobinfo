import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';
import { useServiceStore } from '../store/useServiceStore';

export const Services: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { professionals, startBookingFlow } = useServiceStore();

  // URL states
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('q') || '';
  const locationParam = searchParams.get('l') || '';

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedLocation, setSelectedLocation] = useState(locationParam);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [requireVerified, setRequireVerified] = useState<boolean>(false);
  const [onlyAvailableToday, setOnlyAvailableToday] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // List of unique categories from mock data
  const categories = useMemo(() => {
    const cats = professionals.map(p => p.category);
    return Array.from(new Set(cats));
  }, [professionals]);

  // List of unique locations from mock data
  const locations = useMemo(() => {
    const locs = professionals.map(p => p.location.split(',')[0]);
    return Array.from(new Set(locs));
  }, [professionals]);

  // Sync state from URL
  React.useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (locationParam) setSelectedLocation(locationParam);
  }, [categoryParam, locationParam]);

  // Handle filter reset
  const handleReset = () => {
    setSelectedCategory('');
    setSelectedLocation('');
    setMinExperience(0);
    setMaxPrice(500);
    setRequireVerified(false);
    setOnlyAvailableToday(false);
    setSearchParams({});
  };

  // Filter logic
  const filteredProfessionals = useMemo(() => {
    return professionals.filter((prof) => {
      // Category filter
      if (selectedCategory && prof.category !== selectedCategory) return false;
      
      // Location filter
      if (selectedLocation && !prof.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      
      // Search keyword filter (name, skills, bio)
      if (searchParam) {
        const keyword = searchParam.toLowerCase();
        const matchesName = prof.name.toLowerCase().includes(keyword);
        const matchesSkills = prof.skills.some(s => s.toLowerCase().includes(keyword));
        const matchesBio = prof.bio.toLowerCase().includes(keyword);
        if (!matchesName && !matchesSkills && !matchesBio) return false;
      }

      // Experience filter
      if (prof.experience < minExperience) return false;

      // Price filter
      if (prof.pricePerHour > maxPrice) return false;

      // Verification filter
      if (requireVerified && !prof.verified) return false;

      // Availability filter
      if (onlyAvailableToday && prof.availability !== 'Available Today') return false;

      return true;
    });
  }, [professionals, selectedCategory, selectedLocation, searchParam, minExperience, maxPrice, requireVerified, onlyAvailableToday]);

  const handleBookNow = (profId: string, category: string) => {
    startBookingFlow(profId, category);
    navigate('/services/booking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Title Bar */}
      <div className="mb-8">
        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Marketplace</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Certified Service Professionals</h1>
        <p className="text-sm text-slate-500 mt-2">
          Find and book trusted, background-verified professionals near your locality.
        </p>
      </div>

      {/* Main filter-result splits */}
      <div className="flex justify-between items-center mb-4 lg:hidden">
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-none"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Filter Sidebar */}
        <div className={`lg:col-span-1 editorial-panel rounded-none p-5 h-fit lg:sticky lg:top-24 mb-8 lg:mb-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 text-sm uppercase tracking-wider">
              <SlidersHorizontal className="w-4.5 h-4.5 text-brand-blue" /> Filters
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-brand-blue font-bold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Service Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/10"
              >
                <option value="">All Services</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/10"
              >
                <option value="">All Regions</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Max Hourly Price Filter */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <span>Max Budget (Hourly)</span>
                <span className="text-brand-blue font-extrabold">₹{maxPrice}/hr</span>
              </div>
              <input
                type="range"
                min="150"
                max="500"
                step="20"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
                <span>₹150</span>
                <span>₹500</span>
              </div>
            </div>

            {/* Experience Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 font-semibold">
                Minimum Experience
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { value: 0, label: 'Any Experience' },
                  { value: 5, label: '5+ Years Experience' },
                  { value: 8, label: '8+ Years Experience' },
                  { value: 10, label: '10+ Years Experience' }
                ].map((exp) => (
                  <button
                    key={exp.value}
                    onClick={() => setMinExperience(exp.value)}
                    className={`flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                      minExperience === exp.value 
                        ? 'bg-blue-50 text-brand-blue font-bold border border-blue-100' 
                        : 'hover:bg-slate-50 text-slate-600 border border-transparent'
                    }`}
                  >
                    <span>{exp.label}</span>
                    {minExperience === exp.value && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox filters */}
            <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={requireVerified}
                  onChange={(e) => setRequireVerified(e.target.checked)}
                  className="rounded border-slate-350 text-brand-blue focus:ring-brand-blue w-4 h-4"
                />
                <span className="text-xs font-semibold text-slate-700">Verified Providers Only</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyAvailableToday}
                  onChange={(e) => setOnlyAvailableToday(e.target.checked)}
                  className="rounded border-slate-350 text-brand-blue focus:ring-brand-blue w-4 h-4"
                />
                <span className="text-xs font-semibold text-slate-700">Available Today Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Vetted Professional List */}
        <div className="lg:col-span-3">
          
          {/* Result Summary Bar */}
          <div className="editorial-panel rounded-none p-4 mb-6 flex justify-between items-center text-xs font-semibold text-slate-500">
            <div>
              Showing <span className="text-black font-bold">{filteredProfessionals.length}</span> professionals
            </div>
            {searchParam && (
              <div>
                Keywords: "<span className="text-brand-blue font-bold">{searchParam}</span>"
              </div>
            )}
          </div>

          {/* Professionals Grid/List */}
          {filteredProfessionals.length === 0 ? (
            <div className="editorial-panel rounded-none p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                🔍
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">No professionals match your query</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try widening your budget, selecting another category, or resetting active filters to browse details.
              </p>
              <button
                onClick={handleReset}
                className="mt-5 bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 rounded-lg shadow"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {filteredProfessionals.map((prof) => (
                <div 
                  key={prof.id} 
                  className="editorial-panel rounded-none p-4 sm:p-6 flex flex-col relative border-l-4 border-l-black group"
                >
                  
                  {/* Top horizontal block (Avatar + Info) */}
                  <div className="flex flex-row gap-3 sm:gap-6">
                    {/* Provider Avatar */}
                    <div className="relative shrink-0">
                      <img src={prof.avatarUrl} alt={prof.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover border border-slate-200 img-editorial" />
                      {/* Availability Dot (Mobile optimized) */}
                      <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white rounded-full ${
                        prof.availability === 'Available Today' ? 'bg-green-500' :
                        prof.availability === 'Available Tomorrow' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} title={prof.availability}></span>
                    </div>

                    {/* Provider Info details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h3 className="text-sm sm:text-lg font-bold text-black transition-colors truncate pr-2">
                          <Link to={`/services/profile/${prof.id}`}>{prof.name}</Link>
                        </h3>
                        {prof.verified && (
                          <span className="flex items-center bg-blue-50 text-brand-blue border border-blue-100 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-inner shrink-0 mt-1 sm:mt-0">
                            <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-blue-50 text-brand-blue shrink-0 mr-0.5" /> Vetted
                          </span>
                        )}
                      </div>
                      
                      <p className="text-[10px] sm:text-xs text-black font-bold uppercase tracking-wider mt-0.5 truncate">
                        {prof.category}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3.5 gap-y-1 mt-1.5 sm:mt-2">
                        <div className="flex items-center gap-0.5 text-black shrink-0">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-black" />
                          <span className="text-[10px] sm:text-xs font-bold text-black">{prof.rating}</span>
                        </div>
                        <span className="text-[9px] sm:text-xs text-slate-400 shrink-0">({prof.reviewsCount})</span>
                        <span className="text-slate-200 hidden xs:inline">|</span>
                        <span className="text-[9px] sm:text-xs text-slate-500 font-semibold flex items-center gap-0.5 shrink-0">
                          <MapPin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-slate-400" /> <span className="truncate max-w-[80px] sm:max-w-none">{prof.location}</span>
                        </span>
                        <span className="text-slate-200 hidden xs:inline">|</span>
                        <span className="text-[9px] sm:text-xs text-slate-500 font-semibold shrink-0">Exp: {prof.experience} Yr</span>
                      </div>
                    </div>
                  </div>

                  {/* Description & Tags block (below avatar block on mobile) */}
                  <div className="mt-3 sm:mt-4 pl-0 sm:pl-[104px]">
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                      {prof.bio}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5 sm:mt-4">
                      {prof.skills.map((skill) => (
                        <span key={skill} className="text-[9px] sm:text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md font-semibold shrink-0">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Booking actions panel footer */}
                  <div className="border-t border-slate-100 pt-3 sm:pt-4 mt-4 sm:mt-5 flex justify-between items-center gap-2 sm:gap-4 pl-0 sm:pl-[104px]">
                    <div>
                      <span className="text-slate-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Service Fee</span>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-none mt-0.5">
                        ₹{prof.pricePerHour} <span className="text-[10px] sm:text-xs text-slate-400 font-normal">/ hr</span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                      <Link 
                        to={`/services/profile/${prof.id}`}
                        className="flex-1 sm:flex-none text-center px-2 sm:px-4 py-2 border border-black text-black hover:bg-black hover:text-white font-bold text-[10px] sm:text-xs rounded-none transition-colors"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => handleBookNow(prof.id, prof.category)}
                        disabled={prof.availability === 'Booked'}
                        className={`flex-1 sm:flex-none text-center px-2 sm:px-4 py-2 text-white font-bold text-[10px] sm:text-xs rounded-none transition-all ${
                          prof.availability === 'Booked' 
                            ? 'bg-slate-300 cursor-not-allowed' 
                            : 'bg-black hover:bg-slate-800'
                        }`}
                      >
                        Book Slot
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
export default Services;
