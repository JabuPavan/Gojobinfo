import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, MapPin, Briefcase, Wrench, Building, Users, Star, 
  ArrowRight, ShieldCheck, Sparkles, Smartphone,
  Zap, Droplet, Car, Hammer, Paintbrush, BookOpen, Camera, Wind, Gift
} from 'lucide-react';
import { useJobStore } from '../store/useJobStore';
import { useServiceStore } from '../store/useServiceStore';
import { useBusinessStore } from '../store/useBusinessStore';
import { SERVICE_CATEGORIES } from '../utils/mockData';

// Map icon names to Lucide icons
const categoryIcons: Record<string, any> = {
  Zap: Zap,
  Droplet: Droplet,
  Car: Car,
  Hammer: Hammer,
  Paintbrush: Paintbrush,
  BookOpen: BookOpen,
  Wrench: Wrench,
  Camera: Camera,
  Sparkles: Sparkles,
  Wind: Wind,
  Gift: Gift
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // Search parameters
  const [searchTab, setSearchTab] = useState<'jobs' | 'services' | 'businesses'>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  // Stores
  const { jobs } = useJobStore();
  const { professionals, startBookingFlow } = useServiceStore();
  const { businesses } = useBusinessStore();

  // Animated counters
  const [counters, setCounters] = useState({ jobs: 0, professionals: 0, businesses: 0, customers: 0 });
  
  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;
    
    const targetJobs = 1520;
    const targetProfs = 8400;
    const targetBiz = 12600;
    const targetCustomers = 54000;

    const timer = setInterval(() => {
      step++;
      setCounters({
        jobs: Math.min(Math.floor((targetJobs / steps) * step), targetJobs),
        professionals: Math.min(Math.floor((targetProfs / steps) * step), targetProfs),
        businesses: Math.min(Math.floor((targetBiz / steps) * step), targetBiz),
        customers: Math.min(Math.floor((targetCustomers / steps) * step), targetCustomers)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Carousel scroll handling
  const jobsCarouselRef = useRef<HTMLDivElement>(null);
  
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (jobsCarouselRef.current) {
      const scrollAmount = 320;
      jobsCarouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // How it works workflow tabs
  const [worksTab, setWorksTab] = useState<'user' | 'professional' | 'business' | 'recruiter'>('user');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTab === 'jobs') {
      navigate(`/jobs?q=${searchQuery}&l=${locationQuery}`);
    } else if (searchTab === 'services') {
      navigate(`/services?q=${searchQuery}&l=${locationQuery}`);
    } else {
      navigate(`/businesses?q=${searchQuery}&l=${locationQuery}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent pt-24">
      
      {/* 1. Hero Section */}
      <section className="relative text-slate-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200 mb-6 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Complete Digital Ecosystem
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900">
            Find Jobs, Hire Professionals <br />
            <span className="text-slate-500">
              & Discover Businesses Near You
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            One single platform connecting ambitious job seekers, certified local service professionals, recruiters, and local commercial businesses.
          </p>

          {/* Search Box Card */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 text-slate-800 max-w-4xl mx-auto">
            {/* Search Tabs */}
            <div className="flex gap-2 mb-4 border-b border-white/40 pb-3">
              {[
                { id: 'jobs', label: 'Find Jobs', icon: Briefcase, color: 'text-slate-600' },
                { id: 'services', label: 'Hire Professionals', icon: Wrench, color: 'text-slate-600' },
                { id: 'businesses', label: 'Explore Businesses', icon: Building, color: 'text-slate-600' }
              ].map((tab) => {
                const TabIcon = tab.icon;
                const active = searchTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSearchTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${
                      active 
                        ? 'bg-slate-100 text-slate-900 border border-slate-200 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <TabIcon className={`w-4 h-4 ${tab.color}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input Fields */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder={
                    searchTab === 'jobs' ? 'Job title, keyword, or company...' :
                    searchTab === 'services' ? 'Electrician, tutor, cleaning...' :
                    'Restaurants, hardware, medical store...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="sm:w-1/3 flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="City or state..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 shrink-0 shadow-[0_4px_14px_rgba(10,132,255,0.4)] hover:shadow-[0_6px_20px_rgba(10,132,255,0.6)] hover:-translate-y-0.5 active:scale-95"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 2. Statistics Counter Section */}
      <section className="py-10 px-4 mb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center glass-panel rounded-3xl py-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          {[
            { value: counters.jobs, suffix: '+', label: 'Job Openings', desc: 'Active vacancies posted daily' },
            { value: counters.professionals, suffix: '+', label: 'Service Experts', desc: 'Vetted, certified professionals' },
            { value: counters.businesses, suffix: '+', label: 'Local Businesses', desc: 'Registered shops & agencies' },
            { value: counters.customers, suffix: '+', label: 'Happy Customers', desc: 'Trusting our local network' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-black">
                {stat.value.toLocaleString()}{stat.suffix}
              </span>
              <span className="text-sm font-bold text-slate-800 mt-1">{stat.label}</span>
              <span className="text-xs text-slate-400 mt-0.5">{stat.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Service Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Marketplace</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Popular Professional Services
            </h2>
          </div>
          <Link to="/services" className="text-slate-600 hover:text-black font-bold text-sm flex items-center gap-1">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.icon] || Wrench;
            return (
              <Link
                key={cat.id}
                to={`/services?category=${cat.name}`}
                className="glass-panel rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/60 text-slate-700 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-800 transition-colors">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Latest Jobs Carousel Slider */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Job Board</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Explore Vacant Job Roles
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/jobs" className="text-slate-600 hover:text-black font-bold text-sm flex items-center gap-1 mr-2">
                All Jobs <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex gap-2">
                <button 
                  onClick={() => scrollCarousel('left')}
                  className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors"
                >
                  ←
                </button>
                <button 
                  onClick={() => scrollCarousel('right')}
                  className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center hover:bg-white/80 text-slate-600 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Carousel viewport */}
          <div 
            ref={jobsCarouselRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-4 px-2 scrollbar-thin scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {jobs.map((job) => (
              <div 
                key={job.id} 
                className="glass-panel rounded-2xl p-6 w-[300px] shrink-0 snap-start flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400"></div>
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <img src={job.companyLogoUrl} alt={job.companyName} className="w-12 h-12 rounded-xl object-cover shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-white/50 bg-white" />
                    <span className="text-[10px] bg-white/60 backdrop-blur-md border border-white/50 text-slate-600 font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {job.jobType}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 hover:text-black truncate">
                    <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{job.companyName}</p>
                  
                  <div className="flex flex-col gap-1 mt-4 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Exp: {job.experienceRequired}</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-700 mt-1">{job.salaryRange}</div>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <Link 
                    to={`/jobs/${job.id}`}
                    className="flex-1 text-center bg-white/60 hover:bg-white border border-white text-slate-800 text-xs font-bold py-2.5 rounded-xl transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                  >
                    Quick Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Professionals & Businesses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Top Service Professionals */}
          <div>
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Marketplace</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">Top Rated Professionals</h3>
              </div>
              <Link to="/services" className="text-slate-600 hover:text-black font-bold text-xs flex items-center gap-0.5">
                Browse Professionals <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            
            <div className="flex flex-col gap-4">
              {professionals.slice(0, 3).map((prof) => (
                <div key={prof.id} className="glass-panel rounded-xl p-4 flex gap-4 hover:border-black transition-colors relative">
                  {prof.verified && (
                    <span className="absolute top-3 right-3 flex items-center gap-0.5 bg-slate-100 border border-slate-200 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                      <ShieldCheck className="w-3 h-3 text-black" /> Verified
                    </span>
                  )}
                  <img src={prof.avatarUrl} alt={prof.name} className="w-16 h-16 rounded-2xl object-cover shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/50 shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800 hover:text-black">
                      <Link to={`/services/profile/${prof.id}`}>{prof.name}</Link>
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{prof.category}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex items-center gap-0.5 text-brand-orange">
                        <Star className="w-3.5 h-3.5 fill-brand-orange" />
                        <span className="text-xs font-bold text-slate-800">{prof.rating}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">({prof.reviewsCount} reviews)</span>
                      <span className="text-[10px] text-slate-300">|</span>
                      <span className="text-[10px] text-slate-500 font-medium">Exp: {prof.experience} yrs</span>
                    </div>
                    <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-700">₹{prof.pricePerHour}/hr</span>
                      <div className="flex gap-2">
                        <Link 
                          to={`/services/profile/${prof.id}`}
                          className="text-[10px] border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          View Bio
                        </Link>
                        <Link 
                          to={`/services/${prof.id}`}
                          className="text-[10px] bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-lg transition-all"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Businesses Listings */}
          <div>
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Directory</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">Featured Businesses</h3>
              </div>
              <Link to="/businesses" className="text-slate-600 hover:text-black font-bold text-xs flex items-center gap-0.5">
                Browse Directory <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            
            <div className="flex flex-col gap-4">
              {businesses.slice(0, 3).map((biz) => (
                <div key={biz.id} className="glass-panel rounded-2xl flex flex-col hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group">
                  <div className="h-32 w-full relative">
                    <img src={biz.coverUrl} alt={biz.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span className="absolute top-3 right-3 text-[10px] bg-white/30 backdrop-blur-md border border-white/40 text-white font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                      {biz.tier}
                    </span>
                  </div>

                  <div className="p-6 relative -mt-10">
                    <img src={biz.ownerAvatarUrl} alt="Owner" className="w-16 h-16 rounded-2xl object-cover shadow-[0_4px_12px_rgba(0,0,0,0.2)] border-2 border-white bg-white mb-3" />
                    <h4 className="text-sm font-bold text-slate-800 hover:text-black">
                      <Link to={`/businesses/detail/${biz.id}`}>{biz.name}</Link>
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{biz.category}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex items-center gap-0.5 text-brand-orange">
                        <Star className="w-3.5 h-3.5 fill-brand-orange" />
                        <span className="text-xs font-bold text-slate-800">{biz.rating}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">({biz.reviewsCount} reviews)</span>
                      <span className="text-[10px] text-slate-300">|</span>
                      <span className="text-[10px] text-slate-500 truncate max-w-[120px]">{biz.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 italic">Verified Partner</span>
                      <div className="flex gap-2">
                        <Link 
                          to={`/businesses/detail/${biz.id}`}
                          className="text-[10px] border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          View Business
                        </Link>
                        <Link 
                          to={`/businesses/${biz.id}`}
                          className="text-[10px] bg-white/60 hover:bg-white border border-white text-slate-800 font-bold px-3 py-1.5 rounded-lg transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                        >
                          Get Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. How GOJOBINFORMATION Works (Switcher) */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Process Flow</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">How The Platform Empowers You</h2>
            <p className="text-slate-600 text-sm mt-3 max-w-lg mx-auto">
              Choose your profile type to see the step-by-step engagement workflow.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center border-b border-slate-200/50 pb-2 mb-10 flex-wrap gap-2">
            {[
              { id: 'user', label: 'For Users', icon: Users },
              { id: 'professional', label: 'For Professionals', icon: Wrench },
              { id: 'business', label: 'For Businesses', icon: Building },
              { id: 'recruiter', label: 'For Recruiters', icon: Briefcase }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const active = worksTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setWorksTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                    active 
                      ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-blue-600' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Workflow content */}
          <div className="glass-panel rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            {worksTab === 'user' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { step: '01', title: 'Search Listings', desc: 'Browse verified service professionals, local stores, or active job openings using geographical and category filters.' },
                  { step: '02', title: 'Compare Profiles', desc: 'Verify pricing, check star ratings, read detailed feedback, view credentials or job descriptions.' },
                  { step: '03', title: 'Book or Apply', desc: 'Select a time slot, schedule bookings via mock payment, submit quotes to stores or apply for vacancies.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-4xl font-extrabold text-slate-200 leading-none mb-4">{item.step}</span>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {worksTab === 'professional' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { step: '01', title: 'Register Profile', desc: 'Add your skills, government certifications, language capabilities, hourly service rates, and calendar slot hours.' },
                  { step: '02', title: 'Recieve Booking Requests', desc: 'Get SMS/WhatsApp notification alerts (mock) when user books a slot. Accept or reject based on availability.' },
                  { step: '03', title: 'Deliver & Earn', desc: 'Visit client, resolve task issues, collect payments, build ratings, and track monthly analytics dashboard.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-4xl font-extrabold text-slate-200 leading-none mb-4">{item.step}</span>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {worksTab === 'business' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { step: '01', title: 'Register Shop/Brand', desc: 'Create directory listing with address, telephone, services offered, email, and catalog photo gallery.' },
                  { step: '02', title: 'Upgrade Subscriptions', desc: 'Unlock Platinum, Gold, or Premium plans for maximum directory listing exposure and instant lead alerts.' },
                  { step: '03', title: 'Receive Leads & Grow', desc: 'Gather client quote requests, answer customer inquiries, and grow your local market presence.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-4xl font-extrabold text-slate-200 leading-none mb-4">{item.step}</span>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {worksTab === 'recruiter' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { step: '01', title: 'Post Vacant Jobs', desc: 'Specify job title, salary packages, experience criteria, required stack, and remote/hybrid work options.' },
                  { step: '02', title: 'Filter Applications', desc: 'Browse resumes on recruiter board. Categorize applications into Reviewing, Shortlisted, or Rejected.' },
                  { step: '03', title: 'Hire Candidates', desc: 'Coordinate online/on-site interview slots, track candidate status progress, and onboard skilled candidates.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-4xl font-extrabold text-slate-200 leading-none mb-4">{item.step}</span>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Feedback</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">What Our Users Say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Dr. Vivek Sharma', role: 'Medical Practitioner', rating: 5, quote: 'I registered my pharmacy and clinic on GOJOBINFORMATION and upgraded to Gold. The inbound patient leads and medicine orders increased by 40% in just two months.' },
            { name: 'Kiran Reddy', role: 'Job Seeker', rating: 5, quote: 'Applied to TechVibe Solutions via the job portal. The tracking pipeline is so simple—I knew when my resume was viewed, shortlisted, and scheduled. Recommended!' },
            { name: 'Ananya Deshmukh', role: 'Resident Client', rating: 5, quote: 'I booked an electrician slot for house wiring at 10 AM. Rajesh Kumar arrived at 9:55 AM, behaved extremely professionally, and completed the work cleanly. Exceptional platform.' }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel rounded-2xl p-6 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
              <div className="flex gap-1 text-brand-orange mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 fill-brand-orange" />
                ))}
              </div>
              <p className="text-slate-600 text-xs sm:text-sm italic leading-relaxed mb-6">"{item.quote}"</p>
              <div>
                <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Mobile App Promotion (Future Ready) */}
      <section className="py-16 px-4 mb-20">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-black rounded-[2rem] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="max-w-md relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/10">
              Future Ready
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Download the Mobile App</h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6">
              Get real-time job alerts, track service professional live location, and reply to client listings instantly with our upcoming iOS & Android application.
            </p>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-2.5 rounded-lg border border-slate-800 transition-all font-bold text-xs select-none">
                <Smartphone className="w-4 h-4 text-brand-teal" />
                App Store
              </button>
              <button className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-2.5 rounded-lg border border-slate-800 transition-all font-bold text-xs select-none">
                <Smartphone className="w-4 h-4 text-brand-orange" />
                Google Play
              </button>
            </div>
          </div>
          
          <div className="shrink-0 flex items-center justify-center relative">
            {/* Minimal mock smartphone screen */}
            <div className="w-[180px] h-[300px] bg-slate-900 rounded-3xl border-4 border-slate-700 p-2.5 flex flex-col justify-between shadow-2xl relative">
              <div className="w-16 h-4 bg-slate-850 rounded-full mx-auto mb-2 border border-slate-800"></div>
              
              <div className="flex-1 bg-slate-950 rounded-xl p-2.5 flex flex-col gap-2 justify-center text-center">
                <span className="text-[10px] text-brand-teal font-extrabold uppercase tracking-widest">GOJOB</span>
                <span className="text-[8px] text-slate-500">Connecting Professionals</span>
                <div className="w-8 h-8 rounded-full bg-brand-blue/30 mx-auto border border-brand-blue/50 flex items-center justify-center">
                  ⚡
                </div>
              </div>
              
              <div className="w-10 h-1 bg-slate-750 rounded-full mx-auto mt-2"></div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
export default Home;
