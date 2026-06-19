import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '../utils/mockData';
import { Check, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { useBusinessStore } from '../store/useBusinessStore';

export const Subscriptions: React.FC = () => {
  const { businesses, upgradeSubscription } = useBusinessStore();
  const [upgradedBizId, setUpgradedBizId] = useState<string>('');
  const [upgradedTier, setUpgradedTier] = useState<string>('');
  const [processing, setProcessing] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Filter businesses in local store to let user test upgrading their business listing
  const myBusinesses = businesses.filter(b => b.tier === 'Basic' || b.tier === 'Premium');

  const handleUpgrade = (tier: string) => {
    if (!upgradedBizId) {
      alert('Please select a business listing to upgrade first.');
      return;
    }
    
    setProcessing(tier);
    setTimeout(() => {
      upgradeSubscription(upgradedBizId, tier as any);
      setProcessing(null);
      setUpgradedTier(tier);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Head section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-orange-50 border border-orange-105 px-3 py-1 rounded-full">
          Merchant Subscriptions
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 leading-tight">
          Supercharge Your Listing & Capture High-Priority Leads
        </h1>
        <p className="text-sm text-slate-500 mt-3 leading-relaxed">
          Upgrade your GOJOBINFORMATION business directory listing to get highlighted badge placements, homepage views, and real-time WhatsApp enquiry dispatches.
        </p>
      </div>

      {/* Interactive Playground Upgrade Panel (Highly interactive user experience) */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-16 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-orange/5 rounded-full blur-2xl"></div>
        
        <div className="max-w-xl relative z-10">
          <h3 className="text-lg font-bold flex items-center gap-1.5 text-white">
            <Sparkles className="w-5 h-5 text-brand-orange" />
            Interactive Subscription Playground
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-6 leading-relaxed">
            Select one of your registered test businesses below and upgrade their tier to see changes reflected across the local directory listings page in real-time.
          </p>

          {success && (
            <div className="mb-6 p-4 bg-green-950/80 border border-green-800 text-green-300 text-xs font-semibold rounded-xl flex items-center gap-2 animate-fade-in">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              Listing upgraded successfully! Upgraded to <strong className="text-brand-orange uppercase">{upgradedTier}</strong>. Check directory.
            </div>
          )}

          {myBusinesses.length === 0 ? (
            <div className="bg-slate-850 border border-slate-800 p-4 rounded-xl text-center text-xs text-slate-400">
              🏪 All listings are already upgraded! Upgrade tool is ready for new listings.
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center">
              <div className="flex-1 w-full">
                <label className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">
                  Select Listing to Upgrade
                </label>
                <select
                  value={upgradedBizId}
                  onChange={(e) => setUpgradedBizId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-xs text-white rounded-lg p-3 font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange"
                >
                  <option value="">-- Select Business --</option>
                  {myBusinesses.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} (Current: {b.tier})
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-xs text-slate-400 hidden sm:block">then click any plan card CTA below.</span>
            </div>
          )}
        </div>
      </div>

      {/* Pricing Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isGold = plan.id === 'sub-gold';
          const isPlatinum = plan.id === 'sub-platinum';
          
          return (
            <div 
              key={plan.id}
              className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all relative ${
                isGold ? 'ring-2 ring-brand-blue border-transparent' : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-blue text-white font-extrabold text-[9px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow border-2 border-white">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{plan.name}</h3>
                
                {/* Price block */}
                <div className="flex items-baseline mt-4 mb-6">
                  <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                  {plan.billing !== 'Forever' && (
                    <span className="text-xs text-slate-400 ml-1 font-semibold">/ {plan.billing}</span>
                  )}
                </div>

                {/* Features checklists */}
                <ul className="space-y-3.5 border-t border-slate-100 pt-5 text-xs text-slate-650 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Upgrade Trigger buttons */}
              <button
                disabled={processing !== null}
                onClick={() => {
                  if (plan.id === 'sub-basic') {
                    alert('You are already on the basic free plan.');
                    return;
                  }
                  const tierName = plan.name.split(' ')[0]; // extract Gold, Platinum, Premium
                  handleUpgrade(tierName);
                }}
                className={`w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                  isGold 
                    ? 'bg-brand-blue hover:bg-blue-700 text-white shadow-md' 
                    : isPlatinum 
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-md font-extrabold'
                    : 'border border-slate-250 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {processing === plan.name.split(' ')[0] ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Upgrading...
                  </>
                ) : (
                  plan.cta
                )}
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
};
export default Subscriptions;
