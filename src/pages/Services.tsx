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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Filter Sidebar */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5 shadow-sm h-fit sticky top-24">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
            <span className="font-bold text-slate-800 flex items-center gap-1.5 text-sm uppercase tracking-wider">
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
          <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex justify-between items-center shadow-sm text-xs font-semibold text-slate-500">
            <div>
              Showing <span className="text-slate-800 font-bold">{filteredProfessionals.length}</span> professionals
            </div>
            {searchParam && (
              <div>
                Keywords: "<span className="text-brand-blue font-bold">{searchParam}</span>"
              </div>
            )}
          </div>

          {/* Professionals Grid/List */}
          {filteredProfessionals.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
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
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 relative border-l-4 border-l-brand-teal"
                >
                  {/* Verified Badge */}
                  {prof.verified && (
                    <span className="absolute top-4 right-4 flex items-center gap-1 bg-blue-50 text-brand-blue border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-inner">
                      <ShieldCheck className="w-3.5 h-3.5 fill-blue-50 text-brand-blue shrink-0" /> Vetted Partner
                    </span>
                  )}

                  {/* Provider Avatar */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-blue via-indigo-600 to-brand-teal text-white flex items-center justify-center font-extrabold text-2xl shadow shrink-0">
                    {prof.avatar}
                  </div>

                  {/* Provider Info details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                        <h3 className="text-lg font-bold text-slate-900 hover:text-brand-blue transition-colors">
                          <Link to={`/services/profile/${prof.id}`}>{prof.name}</Link>
                        </h3>
                        <span className={`w-fit text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          prof.availability === 'Available Today' ? 'bg-green-50 text-green-700 border border-green-100' :
                          prof.availability === 'Available Tomorrow' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                          'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                          ● {prof.availability}
                        </span>
                      </div>
                      
                      <p className="text-xs text-brand-teal font-bold uppercase tracking-wider mt-0.5">
                        {prof.category}
                      </p>

                      <div className="flex flex-wrap items-center gap-3.5 mt-2">
                        <div className="flex items-center gap-0.5 text-brand-orange">
                          <Star className="w-4 h-4 fill-brand-orange" />
                          <span className="text-xs font-bold text-slate-800">{prof.rating}</span>
                        </div>
                        <span className="text-xs text-slate-400">({prof.reviewsCount} verified reviews)</span>
                        <span className="text-slate-200">|</span>
                        <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" /> {prof.location}
                        </span>
                        <span className="text-slate-200">|</span>
                        <span className="text-xs text-slate-500 font-semibold">Exp: {prof.experience} Years</span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mt-3.5 max-w-2xl">
                        {prof.bio}
                      </p>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {prof.skills.map((skill) => (
                          <span key={skill} className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Booking actions panel footer */}
                    <div className="border-t border-slate-100 pt-4 mt-5 flex justify-between items-center gap-4">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Service Fee</span>
                        <div className="text-base font-extrabold text-slate-900 leading-none mt-0.5">
                          ₹{prof.pricePerHour} <span className="text-xs text-slate-400 font-normal">/ hr</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link 
                          to={`/services/profile/${prof.id}`}
                          className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-lg transition-colors"
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={() => handleBookNow(prof.id, prof.category)}
                          disabled={prof.availability === 'Booked'}
                          className={`px-4 py-2 text-white font-bold text-xs rounded-lg transition-all shadow-md ${
                            prof.availability === 'Booked' 
                              ? 'bg-slate-300 shadow-none cursor-not-allowed' 
                              : 'bg-brand-teal hover:bg-teal-700 shadow-teal-500/10'
                          }`}
                        >
                          Book Slot Now
                        </button>
                      </div>
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
