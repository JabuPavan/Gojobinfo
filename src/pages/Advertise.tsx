import React, { useState } from 'react';
import { 
  Megaphone, Target, BarChart3, TrendingUp, BadgeCheck, MapPin, 
  Briefcase, GraduationCap, Building2, Calendar, ShoppingBag, 
  UploadCloud, CheckCircle2, Loader2, IndianRupee, Sparkles
} from 'lucide-react';

const BENEFITS = [
  { icon: Megaphone, title: 'Increase Brand Visibility', desc: 'Showcase your business to thousands of active users. Build awareness and recognition.' },
  { icon: Target, title: 'Reach the Right Audience', desc: 'Target customers based on category, location, interests, and services.' },
  { icon: BadgeCheck, title: 'Generate More Leads', desc: 'Receive inquiries from potential customers looking for products and services.' },
  { icon: TrendingUp, title: 'Boost Sales and Revenue', desc: 'Promote special offers, discounts, and new launches.' },
  { icon: IndianRupee, title: 'Cost-Effective Marketing', desc: 'Affordable advertising plans for startups, small businesses, and enterprises.' },
  { icon: BarChart3, title: 'Track Performance', desc: 'Monitor ad views, clicks, inquiries, and engagement.' }
];

const TARGET_AUDIENCE = [
  { icon: Building2, label: 'Local Businesses' },
  { icon: Briefcase, label: 'Service Providers' },
  { icon: ShoppingBag, label: 'Retail Stores' },
  { icon: TrendingUp, label: 'Startups' },
  { icon: BadgeCheck, label: 'Recruiters' },
  { icon: GraduationCap, label: 'Educational Institutions' },
  { icon: MapPin, label: 'Real Estate Agents' },
  { icon: Calendar, label: 'Event Organizers' }
];

const PLANS = [
  { id: 'free', name: 'Free Trial', price: 0, duration: '12 hours', desc: 'Test the waters for free.' },
  { id: 'basic', name: 'Basic', price: 300, duration: '1 week', desc: '7 Days Visibility, 1 Ad Slot.' },
  { id: 'standard', name: 'Standard', price: 600, duration: '1 month', desc: '30 Days Visibility, Featured.' },
  { id: 'premium', name: 'Premium', price: 900, duration: '2 months', desc: '60 Days Visibility, Premium Placement.' }
];

export const Advertise: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please confirm the guidelines checkbox.");
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const activePlan = PLANS.find(p => p.id === selectedPlan) || PLANS[0];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32">
      
      {/* Clean Header */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden bg-white border-b border-slate-200">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight relative z-10">
          Post Your Advertisement
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed relative z-10">
          Reach thousands of potential customers. Promote your business, products, services, job openings, or special offers to a highly relevant audience.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Ad Submission Form - Soft Premium Card */}
        <div className="bg-white rounded-none p-6 sm:p-10 shadow-sm border border-slate-200 border-b-[4px] border-b-black">
          {isSuccess ? (
            <div className="text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 bg-green-50 text-green-600 flex items-center justify-center rounded-none mb-6 border border-green-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Advertisement Submitted!</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
                Your ad details have been securely received. It will be reviewed by our moderation team and published shortly.
              </p>
              <button 
                onClick={() => { setIsSuccess(false); setAgreed(false); }}
                className="bg-black hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-none transition-colors"
              >
                Post Another Ad
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-none bg-slate-100 text-black flex items-center justify-center">
                  <Megaphone className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">Advertisement Details</h2>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Category</label>
                    <select required className="w-full bg-slate-50 border border-slate-300 text-sm rounded-none px-4 py-3.5 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors">
                      <option value="">Select category...</option>
                      <option value="business">Local Business</option>
                      <option value="service">Service Provider</option>
                      <option value="job">Job Opening</option>
                      <option value="offer">Special Offer / Discount</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Advertisement Title</label>
                    <input type="text" required placeholder="e.g., 50% Off Plumbing Services" className="w-full bg-slate-50 border border-slate-300 text-sm rounded-none px-4 py-3.5 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Location</label>
                    <input type="text" required placeholder="City or Area" className="w-full bg-slate-50 border border-slate-300 text-sm rounded-none px-4 py-3.5 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Website URL</label>
                    <input type="url" placeholder="https://yourwebsite.com" className="w-full bg-slate-50 border border-slate-300 text-sm rounded-none px-4 py-3.5 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone Number</label>
                    <input type="tel" required placeholder="+91 XXXXX XXXXX" className="w-full bg-slate-50 border border-slate-300 text-sm rounded-none px-4 py-3.5 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email ID</label>
                    <input type="email" required placeholder="contact@business.com" className="w-full bg-slate-50 border border-slate-300 text-sm rounded-none px-4 py-3.5 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                  </div>
                </div>
              </div>

              {/* Image Upload Area */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ad Banner / Image</label>
                <div className="border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors rounded-none p-10 flex flex-col items-center justify-center cursor-pointer group">
                  <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-black mb-4 transition-colors" />
                  <span className="text-sm font-bold text-slate-900">Click to upload image file</span>
                  <span className="text-xs text-slate-500 mt-2">PNG, JPG, JPEG up to 5MB</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Description</label>
                <textarea required rows={4} placeholder="Describe your offer, business, or job..." className="w-full bg-slate-50 border border-slate-300 text-sm rounded-none px-4 py-3.5 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"></textarea>
              </div>

              {/* Plan Selection */}
              <div className="pt-8 mt-8 border-t border-slate-200">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Select Advertising Plan</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PLANS.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <div 
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`p-5 cursor-pointer rounded-none border-2 transition-all relative ${
                          isSelected 
                            ? 'bg-slate-900 border-black text-white' 
                            : 'bg-white border-slate-200 hover:border-slate-400 text-slate-900'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 text-white">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-2 pr-6">
                          <span className="font-extrabold text-base">{plan.name}</span>
                          <span className={`font-extrabold text-base ${isSelected ? 'text-slate-300' : 'text-slate-900'}`}>
                            {plan.price === 0 ? 'FREE' : `₹${plan.price}`}
                          </span>
                        </div>
                        <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                          {plan.duration}
                        </p>
                        <p className={`text-sm leading-snug ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                          {plan.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary Checkout Area */}
              <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 mt-10 rounded-none flex flex-col sm:flex-row items-center justify-between gap-8">
                
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Amount:</span>
                    <span className="text-3xl font-extrabold text-slate-900">
                      {activePlan.price === 0 ? '₹0' : `₹${activePlan.price}`}
                    </span>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                      <input 
                        type="checkbox" 
                        required
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="peer appearance-none w-5 h-5 rounded-none border-2 border-slate-400 bg-white checked:bg-black checked:border-black transition-colors cursor-pointer"
                      />
                      <CheckCircle2 className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-600 font-medium leading-snug select-none group-hover:text-black transition-colors">
                      I confirm information is accurate and follows guidelines.
                    </span>
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-black hover:bg-slate-800 disabled:bg-slate-400 text-white font-extrabold px-10 py-4 rounded-none transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> PROCESSING</>
                  ) : (
                    'POST ADVERTISEMENT'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Benefits Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest border border-slate-300 px-3 py-1 bg-white rounded-none">Why Advertise?</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-6">Benefits for Businesses</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="bg-white rounded-none p-8 border border-slate-200 hover:border-black transition-colors">
                <div className="w-12 h-12 bg-slate-100 text-black flex items-center justify-center rounded-none mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">{benefit.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Perfect For Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-16">
        <div className="bg-white border border-slate-200 rounded-none p-10 sm:p-14 text-center">
          
          <h3 className="text-2xl font-extrabold mb-8 flex items-center justify-center gap-2 text-slate-900">
            <Sparkles className="w-6 h-6 text-slate-400" />
            Perfect For
          </h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {TARGET_AUDIENCE.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-5 py-3 rounded-none text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                  <Icon className="w-4 h-4 text-slate-500" />
                  {item.label}
                </div>
              );
            })}
          </div>
          
        </div>
      </div>

    </div>
  );
};
