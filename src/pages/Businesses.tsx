import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { useBusinessStore } from '../store/useBusinessStore';
import { BUSINESS_CATEGORIES } from '../utils/mockData';

export const Businesses: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { businesses } = useBusinessStore();

  // URL search params
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('q') || '';
  const locationParam = searchParams.get('l') || '';

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedLocation, setSelectedLocation] = useState(locationParam);
  const [minRating, setMinRating] = useState<number>(0);
  const [tierFilter, setTierFilter] = useState<string>('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state from URL
  React.useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (locationParam) setSelectedLocation(locationParam);
  }, [categoryParam, locationParam]);

  // List of unique locations from mock data
  const locations = useMemo(() => {
    const locs = businesses.map(b => b.location.split(',')[0]);
    return Array.from(new Set(locs));
  }, [businesses]);

  // Reset filters
  const handleReset = () => {
    setSelectedCategory('');
    setSelectedLocation('');
    setMinRating(0);
    setTierFilter('');
    setSearchParams({});
  };

  // Filter business listings
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((biz) => {
      // Category filter
      if (selectedCategory && biz.category !== selectedCategory) return false;

      // Location filter
      if (selectedLocation && !biz.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;

      // Search keyword filter (name, description, services list)
      if (searchParam) {
        const keyword = searchParam.toLowerCase();
        const matchesName = biz.name.toLowerCase().includes(keyword);
        const matchesDesc = biz.description.toLowerCase().includes(keyword);
        const matchesServices = biz.services.some(s => s.toLowerCase().includes(keyword));
        if (!matchesName && !matchesDesc && !matchesServices) return false;
      }

      // Min rating filter
      if (biz.rating < minRating) return false;

      // Subscription Tier filter
      if (tierFilter && biz.tier !== tierFilter) return false;

      return true;
    });
  }, [businesses, selectedCategory, selectedLocation, searchParam, minRating, tierFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="mb-8">
        <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Local Directory</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Explore Local Businesses</h1>
        <p className="text-sm text-slate-500 mt-2">
          Discover grocery stores, medical outlets, restaurants, showrooms, and hardware shops in your neighborhood.
        </p>
      </div>

      {/* Main filter-list layout */}
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
              <SlidersHorizontal className="w-4.5 h-4.5 text-black" /> Filters
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-black font-bold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {/* Category Select Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Business Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-orange/15"
              >
                <option value="">All Categories</option>
                {BUSINESS_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Location Select Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Location / City
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-orange/15"
              >
                <option value="">All Regions</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Minimum Rating Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Customer Rating
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { value: 0, label: 'Show All Ratings' },
                  { value: 4.5, label: '4.5 ★ & Above' },
                  { value: 4.0, label: '4.0 ★ & Above' },
                  { value: 3.5, label: '3.5 ★ & Above' }
                ].map((rat) => (
                  <button
                    key={rat.value}
                    onClick={() => setMinRating(rat.value)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex justify-between items-center ${
                      minRating === rat.value 
                        ? 'bg-orange-50 text-brand-orange font-bold border border-orange-100' 
                        : 'hover:bg-slate-50 text-slate-600 border border-transparent'
                    }`}
                  >
                    <span>{rat.label}</span>
                    {minRating === rat.value && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Subscription filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Partner Tier
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { value: '', label: 'All Partners' },
                  { value: 'Platinum', label: 'Platinum Partners Only' },
                  { value: 'Gold', label: 'Gold Partners Only' }
                ].map((tier) => (
                  <button
                    key={tier.value}
                    onClick={() => setTierFilter(tier.value)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex justify-between items-center ${
                      tierFilter === tier.value 
                        ? 'bg-amber-50 text-amber-800 font-bold border border-amber-200' 
                        : 'hover:bg-slate-50 text-slate-650 border border-transparent'
                    }`}
                  >
                    <span>{tier.label}</span>
                    {tierFilter === tier.value && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Subscription Upgrade Promotional Card */}
            <div className="border-t border-slate-100 pt-5 mt-2 bg-gradient-to-tr from-amber-50 to-orange-50 border border-orange-100/50 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-brand-orange tracking-widest block mb-1">
                Grow Your Business
              </span>
              <p className="text-[10px] text-slate-500 leading-normal mb-3">
                List your brand, capture direct quote requests, and get priority placements.
              </p>
              <Link
                to="/subscriptions"
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-[10px] uppercase py-2 px-3.5 rounded-lg shadow-sm block transition-all active:scale-95"
              >
                View Premium Plans
              </Link>
            </div>

          </div>
        </div>

        {/* Right Column: Listings grid */}
        <div className="lg:col-span-3">
          
          {/* Result count stats banner */}
          <div className="editorial-panel rounded-none p-4 mb-6 flex justify-between items-center text-xs font-semibold text-slate-500">
            <div>
              Found <span className="text-black font-bold">{filteredBusinesses.length}</span> registered businesses
            </div>
            {searchParam && (
              <div>
                Search query: "<span className="text-black font-bold">{searchParam}</span>"
              </div>
            )}
          </div>

          {/* Grid listing */}
          {filteredBusinesses.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                🏪
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">No businesses found matching criteria</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try clearing active filters or searching general keywords like electronics, clinic, or restaurant.
              </p>
              <button
                onClick={handleReset}
                className="mt-5 bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs px-5 py-2 rounded-lg shadow"
              >
                Clear Search filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBusinesses.map((biz) => (
                <div 
                  key={biz.id} 
                  className="editorial-panel rounded-none flex flex-row sm:flex-col justify-between group border-l-4 sm:border-l-0 sm:border-t-4 border-black hover:-translate-y-1 transition-all overflow-hidden"
                >
                  
                  <div className="flex flex-row sm:flex-col w-full">
                    {/* Visual Banner Block - Thumbnail on Mobile, Cover on Desktop */}
                    <div className="w-1/3 sm:w-full h-auto sm:h-28 relative shrink-0">
                      <img src={biz.coverUrl} alt={biz.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 img-editorial" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent hidden sm:block"></div>
                      <span className="absolute top-2 left-2 sm:top-3 sm:right-3 sm:left-auto text-[8px] sm:text-[10px] bg-black text-white font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-none uppercase tracking-wider shadow-sm z-10">
                        ★ {biz.tier}
                      </span>
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                      {/* Logo Initials Overlap */}
                      <div className="px-3 sm:px-5 pt-3 sm:pt-3 flex gap-2 sm:gap-3.5 relative">
                        <img src={biz.ownerAvatarUrl} alt="Owner" className="w-8 h-8 sm:w-12 sm:h-12 object-cover border border-slate-200 bg-white sm:-mt-8 relative z-10 shrink-0 img-editorial hidden sm:block" />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <h3 className="text-xs sm:text-sm font-bold text-black truncate transition-colors">
                              <Link to={`/businesses/detail/${biz.id}`}>{biz.name}</Link>
                            </h3>
                            {biz.verified && (
                              <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-black fill-slate-100 shrink-0" />
                            )}
                          </div>
                          <p className="text-[9px] sm:text-[10px] text-brand-orange font-bold uppercase tracking-wider mt-0.5">
                            {biz.category}
                          </p>
                        </div>
                      </div>

                      {/* Description body */}
                      <div className="px-3 sm:px-5 py-2 sm:py-3">
                        <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-2">
                          {biz.description}
                        </p>
                        
                        {/* Rating panel */}
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2 sm:mt-3.5">
                          <div className="flex items-center gap-0.5 text-black shrink-0">
                            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-black" />
                            <span className="text-[10px] sm:text-xs font-bold text-black">{biz.rating}</span>
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-slate-400 shrink-0">({biz.reviewsCount})</span>
                          <span className="text-slate-200 hidden xs:inline">|</span>
                          <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate flex items-center gap-0.5 min-w-0">
                            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400 shrink-0" /> <span className="truncate">{biz.location}</span>
                          </span>
                        </div>
                      </div>
                      
                      {/* Footer CTAs (Mobile: Inside flex-col, Desktop: Bottom of card) */}
                      <div className="sm:hidden px-3 pb-3 pt-1 mt-auto flex justify-between items-center gap-2">
                        <Link
                          to={`/businesses/detail/${biz.id}`}
                          className="flex-1 text-center text-[9px] border border-black text-black hover:bg-black hover:text-white font-bold px-2 py-1.5 rounded-none transition-colors"
                        >
                          Details
                        </Link>
                        <Link
                          to={`/businesses/detail/${biz.id}?quote=true`}
                          className="flex-1 text-center text-[9px] bg-black hover:bg-slate-800 text-white font-bold px-2 py-1.5 rounded-none transition-all"
                        >
                          Quote
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Footer CTAs */}
                  <div className="hidden sm:flex bg-slate-50/50 px-5 py-3 border-t border-slate-100 justify-between items-center gap-4 mt-auto">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">verified partner</span>
                    <div className="flex gap-1.5">
                      <Link
                        to={`/businesses/detail/${biz.id}`}
                        className="text-[10px] border border-black text-black hover:bg-black hover:text-white font-bold px-3 py-1.5 rounded-none transition-colors"
                      >
                        Details
                      </Link>
                      <Link
                        to={`/businesses/detail/${biz.id}?quote=true`}
                        className="text-[10px] bg-black hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-none transition-all"
                      >
                        Get Quote
                      </Link>
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
export default Businesses;
