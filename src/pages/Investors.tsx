import React, { useState } from 'react';
import { ArrowRight, TrendingUp, Target, ShieldCheck, PieChart, Briefcase, Check, MapPin, Star } from 'lucide-react';

export const Investors: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    investorType: '',
    interest: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Submit logic would go here
  };

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Container Banner Hero */}
        <div className="bg-black text-white p-8 sm:p-12 mb-10 flex flex-col md:flex-row items-center justify-between shadow-xl">
          <div className="flex-1">
            <span className="bg-white text-black px-3 py-1 text-xs font-extrabold uppercase tracking-widest inline-block mb-4 shadow-sm">
              Partner With Us
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none mb-4 drop-shadow-md">
              Invest in India's #1 local <br className="hidden lg:block" /> job & business platform
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-semibold">
              Join us in revolutionizing how 500M+ Indian workers find opportunities. We're profitable, growing 200% YoY, and ready to scale.
            </p>
          </div>
          <div className="mt-8 md:mt-0 shrink-0">
            <button 
              onClick={() => document.getElementById('investor-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black hover:bg-slate-200 font-extrabold px-8 py-4 uppercase tracking-widest text-sm transition-colors shadow-lg"
            >
              Get Pitch Deck
            </button>
          </div>
        </div>

        {/* Top Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="editorial-panel rounded-none p-6 border-t-4 border-t-black hover:-translate-y-1 transition-all">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Annual GMV</span>
            <span className="text-3xl font-black text-slate-900">₹48Cr+</span>
          </div>
          <div className="editorial-panel rounded-none p-6 border-t-4 border-t-black hover:-translate-y-1 transition-all">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Monthly Active Users</span>
            <span className="text-3xl font-black text-slate-900">2.8M+</span>
          </div>
          <div className="editorial-panel rounded-none p-6 border-t-4 border-t-brand-blue hover:-translate-y-1 transition-all">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">YoY Growth</span>
            <span className="text-3xl font-black text-brand-blue">200%</span>
          </div>
        </div>

        {/* Main Split: Form (Middle-ish Focus) & Fundamentals */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Left Column: The Form */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="editorial-panel rounded-none p-6 sm:p-8 border-t-4 border-t-brand-blue sticky top-24">
              <h3 className="text-xl font-black mb-1 uppercase tracking-tight text-slate-900">Request Information</h3>
              <p className="text-slate-500 mb-6 text-xs font-medium">Fill the form and our IR team will send you the pitch deck within 4 business hours.</p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 p-6 text-center h-48 flex flex-col items-center justify-center">
                  <Check className="w-8 h-8 text-green-600 mb-2" />
                  <h4 className="text-base font-bold text-slate-900 uppercase">Received</h4>
                  <p className="text-slate-600 text-xs mt-1">We will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      className="w-full border border-slate-200 p-2.5 text-xs font-semibold focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all rounded-none bg-slate-50/50"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full border border-slate-200 p-2.5 text-xs font-semibold focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all rounded-none bg-slate-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full border border-slate-200 p-2.5 text-xs font-semibold focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all rounded-none bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Investor Type *</label>
                    <select 
                      required
                      value={formData.investorType}
                      onChange={e => setFormData({...formData, investorType: e.target.value})}
                      className="w-full border border-slate-200 p-2.5 text-xs font-semibold focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all rounded-none bg-slate-50/50"
                    >
                      <option value="" disabled>Select...</option>
                      <option value="vc">Venture Capital Fund</option>
                      <option value="angel">Angel Investor</option>
                      <option value="family_office">Family Office</option>
                      <option value="syndicate">Syndicate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Interest / Ticket Size</label>
                    <textarea 
                      rows={2}
                      value={formData.interest}
                      onChange={e => setFormData({...formData, interest: e.target.value})}
                      className="w-full border border-slate-200 p-2.5 text-xs font-semibold focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all rounded-none bg-slate-50/50 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black text-white font-bold uppercase tracking-widest text-xs py-3.5 hover:bg-slate-800 transition-colors mt-2"
                  >
                    Get Pitch Deck
                  </button>
                  
                  <div className="border-t border-slate-100 pt-4 mt-4">
                    <p className="text-[10px] text-slate-400 font-semibold mb-1">Direct Contact (IR Team)</p>
                    <p className="text-xs text-slate-600 font-bold">investors@gojobinformation.com</p>
                    <p className="text-xs text-slate-600 font-bold">+91 91823 49889</p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Fundamentals & Backing */}
          <div className="lg:col-span-3 order-1 lg:order-2 flex flex-col gap-6">
            
            {/* Fundamentals Panel */}
            <div className="editorial-panel rounded-none p-6 sm:p-8">
              <h2 className="text-2xl font-black mb-2 text-slate-900 uppercase">Strong fundamentals. Massive market.</h2>
              <p className="text-xs text-slate-500 font-medium mb-6">We've built a capital-efficient business with clear unit economics.</p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-slate-50/50 p-4 border border-slate-100">
                  <span className="block text-xl sm:text-2xl font-black text-black">₹12.4Cr</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Revenue (FY25)</span>
                </div>
                <div className="bg-slate-50/50 p-4 border border-slate-100">
                  <span className="block text-xl sm:text-2xl font-black text-black">15,000+</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Business Partners</span>
                </div>
                <div className="bg-slate-50/50 p-4 border border-slate-100">
                  <span className="block text-xl sm:text-2xl font-black text-black">850K+</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Jobs Filled</span>
                </div>
                <div className="bg-slate-50/50 p-4 border border-slate-100">
                  <span className="block text-xl sm:text-2xl font-black text-black">4.8★</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">App Store Rating</span>
                </div>
              </div>
            </div>

            {/* Backed By Panel */}
            <div className="editorial-panel rounded-none p-6 sm:p-8">
              <h2 className="text-xl font-black mb-4 text-slate-900 uppercase">Backed by top VCs</h2>
              <p className="text-xs text-slate-500 font-medium mb-6">
                Our existing investors include leading funds who believe in our mission to democratize job access across India.
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 border-l-2 border-brand-blue pl-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Early-stage opportunity</h4>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Targeting 10x return by 2029</p>
                  </div>
                </li>
                <li className="flex items-start gap-2 border-l-2 border-brand-blue pl-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Proven team</h4>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Ex-Flipkart, Uber, Ola leaders</p>
                  </div>
                </li>
              </ul>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                {['Sequoia Capital', 'Accel Partners', 'Matrix Partners', 'Lightspeed', 'Blume'].map((vc) => (
                  <span key={vc} className="bg-slate-100 border border-slate-200 px-3 py-1.5 font-bold text-slate-700 text-[10px] uppercase tracking-wider">
                    {vc}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Why Invest - 6 Reasons Grid */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900 uppercase">Why invest in GoJobInformation?</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Six reasons that make us a compelling opportunity</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Massive TAM", desc: "India's blue/grey collar job market is $80B+. High-intent local traffic.", icon: <Target className="w-4 h-4 text-black" /> },
              { title: "Capital efficient", desc: "Profitable since Q3 2025. 60% gross margins, low CAC.", icon: <TrendingUp className="w-4 h-4 text-black" /> },
              { title: "Defensible moat", desc: "Proprietary local SEO and 2.8M user profiles create network effects.", icon: <ShieldCheck className="w-4 h-4 text-black" /> },
              { title: "Expansion ready", desc: "Validated in 12 cities. Ready to expand to 50+ cities in 18 months.", icon: <MapPin className="w-4 h-4 text-black" /> },
              { title: "Multiple revenue streams", desc: "Job ads, business listings, premium subs, recruitment fees.", icon: <PieChart className="w-4 h-4 text-black" /> },
              { title: "Clear exit path", desc: "Strategic interest from major portals; IPO potential in 5 years.", icon: <Briefcase className="w-4 h-4 text-black" /> }
            ].map((feature, idx) => (
              <div key={idx} className="editorial-panel rounded-none p-5 hover:-translate-y-1 transition-all group">
                <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-3">
                  <div className="bg-slate-100 p-1.5 rounded-none">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{feature.title}</h3>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">What our investors say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "GoJobInformation is solving a critical problem in India's employment ecosystem. Their growth metrics are exceptional.", name: "Rajiv Mehta", title: "Partner, Accel India" },
              { quote: "The team's execution capabilities and local market understanding set them apart. A generational opportunity.", name: "Priya Shah", title: "Managing Director, Matrix" },
              { quote: "I've seen hundreds of startups, but GoJobInformation's metrics and vision stand out. Definitely one to watch.", name: "Anjali Bansal", title: "Angel Investor" }
            ].map((testi, idx) => (
              <div key={idx} className="editorial-panel rounded-none p-6 border-t-4 border-slate-200 hover:border-black transition-colors flex flex-col">
                <Star className="w-4 h-4 fill-black text-black mb-3" />
                <p className="text-xs text-slate-700 italic font-medium leading-relaxed flex-grow mb-6">
                  "{testi.quote}"
                </p>
                <div className="border-t border-slate-100 pt-4 mt-auto">
                  <h4 className="font-bold text-black uppercase tracking-wider text-[11px]">{testi.name}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{testi.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Investors;
