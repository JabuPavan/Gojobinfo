import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, SlidersHorizontal, RefreshCw, Clock } from 'lucide-react';
import { useJobStore } from '../store/useJobStore';

export const Jobs: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobs } = useJobStore();

  // Search Param mapping
  const searchParam = searchParams.get('q') || '';
  const locationParam = searchParams.get('l') || '';

  // Local filter states
  const [selectedLocation, setSelectedLocation] = useState(locationParam);
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [workModeFilter, setWorkModeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state from URL params
  React.useEffect(() => {
    if (locationParam) setSelectedLocation(locationParam);
  }, [locationParam]);

  // List of unique locations from mock data
  const locations = useMemo(() => {
    const locs = jobs.map(j => j.location.split(',')[0]);
    return Array.from(new Set(locs));
  }, [jobs]);

  // Reset Filters
  const handleReset = () => {
    setSelectedLocation('');
    setJobTypeFilter('');
    setWorkModeFilter('');
    setExperienceFilter('');
    setSearchParams({});
  };

  // Filter Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Keyword search (title, company, description)
      if (searchParam) {
        const keyword = searchParam.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(keyword);
        const matchesComp = job.companyName.toLowerCase().includes(keyword);
        const matchesDesc = job.description.toLowerCase().includes(keyword);
        if (!matchesTitle && !matchesComp && !matchesDesc) return false;
      }

      // Location search
      if (selectedLocation && !job.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;

      // Job type filter
      if (jobTypeFilter && job.jobType !== jobTypeFilter) return false;

      // Work mode filter
      if (workModeFilter && job.workMode !== workModeFilter) return false;

      // Experience filter mapping
      if (experienceFilter) {
        // experienceFilter values: 'entry' (1-3 yrs), 'mid' (2-5 yrs), 'senior' (4-7 yrs / 3-6 yrs)
        const expReq = job.experienceRequired.toLowerCase();
        if (experienceFilter === 'entry' && !expReq.includes('1 - 3') && !expReq.includes('0 - 2')) return false;
        if (experienceFilter === 'mid' && !expReq.includes('2 - 5') && !expReq.includes('3 - 6') && !expReq.includes('1 - 3')) return false;
        if (experienceFilter === 'senior' && !expReq.includes('4 - 7') && !expReq.includes('3 - 6') && !expReq.includes('5 - 8')) return false;
      }

      return true;
    });
  }, [jobs, searchParam, selectedLocation, jobTypeFilter, workModeFilter, experienceFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="mb-8">
        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Jobs Portal</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Discover Career Opportunities</h1>
        <p className="text-sm text-slate-500 mt-2">
          Connect with top corporate recruiters and agencies. Find local, hybrid, or remote job roles matching your stack.
        </p>
      </div>

      {/* Main Split */}
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
        <div className={`lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5 shadow-sm h-fit lg:sticky lg:top-24 mb-8 lg:mb-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
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
            {/* Location Select Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Job Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Job Type Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Job Type
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { value: '', label: 'All Job Types' },
                  { value: 'Full-Time', label: 'Full-Time Roles' },
                  { value: 'Part-Time', label: 'Part-Time Roles' },
                  { value: 'Contract', label: 'Contract Projects' }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setJobTypeFilter(type.value)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex justify-between items-center ${
                      jobTypeFilter === type.value 
                        ? 'bg-blue-50 text-brand-blue font-bold border border-blue-100' 
                        : 'hover:bg-slate-50 text-slate-650 border border-transparent'
                    }`}
                  >
                    <span>{type.label}</span>
                    {jobTypeFilter === type.value && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Work Mode Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Work Mode
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { value: '', label: 'All Modes' },
                  { value: 'Remote', label: 'Remote Only' },
                  { value: 'Hybrid', label: 'Hybrid Model' },
                  { value: 'On-site', label: 'On-site Office' }
                ].map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => setWorkModeFilter(mode.value)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex justify-between items-center ${
                      workModeFilter === mode.value 
                        ? 'bg-blue-50 text-brand-blue font-bold border border-blue-100' 
                        : 'hover:bg-slate-50 text-slate-650 border border-transparent'
                    }`}
                  >
                    <span>{mode.label}</span>
                    {workModeFilter === mode.value && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Experience Level
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { value: '', label: 'Any Experience' },
                  { value: 'entry', label: 'Junior (1-3 yrs)' },
                  { value: 'mid', label: 'Mid-Level (2-5 yrs)' },
                  { value: 'senior', label: 'Senior (4-7+ yrs)' }
                ].map((exp) => (
                  <button
                    key={exp.value}
                    onClick={() => setExperienceFilter(exp.value)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex justify-between items-center ${
                      experienceFilter === exp.value 
                        ? 'bg-blue-50 text-brand-blue font-bold border border-blue-100' 
                        : 'hover:bg-slate-50 text-slate-655 border border-transparent'
                    }`}
                  >
                    <span>{exp.label}</span>
                    {experienceFilter === exp.value && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Listings Column */}
        <div className="lg:col-span-3">
          
          {/* Result Banner stats */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex justify-between items-center shadow-sm text-xs font-semibold text-slate-500">
            <div>
              We found <span className="text-slate-800 font-bold">{filteredJobs.length}</span> job openings
            </div>
            {searchParam && (
              <div>
                Query: "<span className="text-brand-blue font-bold">{searchParam}</span>"
              </div>
            )}
          </div>

          {/* Listings */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                💼
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">No jobs match your search parameters</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try widening your experience filter tags or search general keywords like developer, manager, or designer.
              </p>
              <button
                onClick={handleReset}
                className="mt-5 bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 rounded-lg shadow"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start gap-4"
                >
                  
                  {/* Left block Info details */}
                  <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${job.companyLogoColor} text-white flex items-center justify-center font-extrabold text-xs sm:text-sm uppercase shadow shrink-0`}>
                      {job.companyName.substring(0, 2)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 hover:text-brand-blue transition-colors truncate">
                        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-semibold truncate">{job.companyName}</p>
                      
                      {/* Grid tags */}
                      <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3.5 gap-y-1.5 mt-2 sm:mt-3 text-[10px] sm:text-xs text-slate-500">
                        <span className="flex items-center gap-1 shrink-0">
                          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" /> {job.location}
                        </span>
                        <span className="text-slate-200 hidden xs:inline">|</span>
                        <span className="flex items-center gap-1 font-semibold text-slate-700 shrink-0">
                          {job.salaryRange}
                        </span>
                        <span className="text-slate-200 hidden xs:inline">|</span>
                        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-50 border border-slate-200 px-1.5 sm:px-2 py-0.5 rounded shrink-0">
                          {job.workMode}
                        </span>
                      </div>

                      {/* Brief requirement notes snippet */}
                      <p className="text-[10px] sm:text-[11px] text-slate-500 leading-normal mt-2.5 sm:mt-3.5 line-clamp-1 sm:line-clamp-2 italic">
                        Req: {job.requirements[0]}
                      </p>
                    </div>
                  </div>

                  {/* Right block details actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between h-full sm:min-h-[80px] w-full sm:w-fit shrink-0 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 mt-1 sm:mt-0">
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-350" /> Posted {job.postedDaysAgo}d ago
                    </span>

                    <div className="flex gap-2 sm:mt-4 w-full sm:w-auto">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="flex-1 sm:flex-none text-center text-[10px] sm:text-[11px] border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold px-3 py-2 rounded-lg transition-colors"
                      >
                        Details
                      </Link>
                      <Link
                        to={`/jobs/${job.id}?apply=true`}
                        className="flex-1 sm:flex-none text-center text-[10px] sm:text-[11px] bg-brand-blue hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-lg shadow transition-all active:scale-95"
                      >
                        Apply Now
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

export default Jobs;
