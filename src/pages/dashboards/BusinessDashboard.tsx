import React, { useState, useMemo } from 'react';
import { useBusinessStore } from '../../store/useBusinessStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Mail, Phone, Building, Star, Users, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BusinessDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { businesses, leads, updateLeadStatus } = useBusinessStore();

  const [activeTab, setActiveTab] = useState<'leads' | 'listing' | 'subscription'>('leads');

  // Find business details for demo (Sharma Electronics: biz-1)
  const myBizProfile = useMemo(() => {
    return businesses.find(b => b.id === 'biz-1') || businesses[0];
  }, [businesses]);

  // Direct Leads matching this business listing
  const myLeads = useMemo(() => {
    return leads.filter(l => l.businessId === myBizProfile.id);
  }, [leads, myBizProfile]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Welcome Board */}
      <div className="bg-gradient-to-r from-brand-orange to-amber-600 text-white rounded-2xl p-6 sm:p-8 shadow-md mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-100 bg-amber-950/20 px-2.5 py-1 rounded">
            Partner Workspace
          </span>
          <h1 className="text-2xl font-black mt-2">Welcome Back, {user?.name}!</h1>
          <p className="text-xs text-orange-50 mt-1">
            Managing: <strong>{myBizProfile.name}</strong> | Active Tier: <strong className="underline uppercase">{myBizProfile.tier}</strong>
          </p>
        </div>
        <Link 
          to="/subscriptions" 
          className="bg-white text-brand-orange hover:bg-slate-50 font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all select-none"
        >
          Manage Listing Subscription
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Received Enquiry Leads', val: myLeads.length + 14, desc: 'B2B quotes requested this month', icon: Mail, color: 'text-brand-orange' },
          { label: 'Directory Listing Views', val: '520', desc: 'Clicks on business detail card', icon: Users, color: 'text-brand-blue' },
          { label: 'Listing Score', val: `${myBizProfile.rating} / 5`, desc: `Based on ${myBizProfile.reviewsCount} reviews`, icon: Star, color: 'text-amber-500' },
          { label: 'Active Plan Tier', val: myBizProfile.tier, desc: 'Featured rank search visibility', icon: Layers, color: 'text-brand-teal' }
        ].map((met, i) => {
          const IconComp = met.icon;
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold text-slate-400">{met.label}</span>
                <IconComp className={`w-4 h-4 ${met.color}`} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mt-2">{met.val}</h3>
              <p className="text-[9px] text-slate-400 mt-0.5">{met.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Main split tab view */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm h-fit">
          <div className="flex flex-col gap-1 text-xs">
            {[
              { id: 'leads', label: 'Enquiry Leads Inbox', icon: Mail },
              { id: 'listing', label: 'Edit Directory Listing', icon: Building },
              { id: 'subscription', label: 'Monetization Plan status', icon: Layers }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-3 rounded-lg font-bold flex items-center gap-2.5 transition-all ${
                    active 
                      ? 'bg-orange-50 text-brand-orange font-extrabold border-l-4 border-brand-orange' 
                      : 'hover:bg-slate-50 text-slate-655'
                  }`}
                >
                  <TabIcon className="w-4.5 h-4.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Viewport content */}
        <div className="lg:col-span-3">
          
          {/* TAB 1: LEADS INBOX */}
          {activeTab === 'leads' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
                Customer Enquiry Leads Inbox
              </h3>

              {myLeads.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No quote/enquiry requests received yet.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {myLeads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className="border border-slate-200 rounded-xl p-5 hover:shadow-sm transition-shadow flex flex-col justify-between gap-3"
                    >
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-850">Client: {lead.clientName}</h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-500 font-semibold">
                            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {lead.clientPhone}</span>
                            <span className="text-slate-200">|</span>
                            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {lead.clientEmail}</span>
                          </div>
                        </div>

                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          lead.status === 'New' ? 'bg-orange-50 text-brand-orange border border-orange-100' :
                          lead.status === 'Contacted' ? 'bg-blue-50 text-brand-blue border border-blue-100' :
                          'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}>
                          {lead.status}
                        </span>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-xs text-slate-650 leading-relaxed mt-1">
                        <strong className="text-slate-800 font-bold block mb-1">Requirement Details:</strong>
                        "{lead.message}"
                      </div>

                      <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-2 text-[10px] text-slate-400 font-bold">
                        <span>Submitted on {lead.date}</span>
                        <div className="flex gap-1.5">
                          {lead.status === 'New' && (
                            <button
                              onClick={() => updateLeadStatus(lead.id, 'Contacted')}
                              className="text-[10px] border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold px-2.5 py-1 rounded transition-colors"
                            >
                              Mark Contacted
                            </button>
                          )}
                          {lead.status !== 'Closed' && (
                            <button
                              onClick={() => updateLeadStatus(lead.id, 'Closed')}
                              className="text-[10px] bg-brand-orange hover:bg-orange-600 text-white font-bold px-2.5 py-1 rounded transition-all"
                            >
                              Close Lead
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EDIT LISTING */}
          {activeTab === 'listing' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
                Edit Store Listing Profile
              </h3>

              <form onSubmit={(e) => { e.preventDefault(); alert('Business settings updated (mock)'); }} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Business/Brand Name</label>
                    <input
                      type="text"
                      defaultValue={myBizProfile.name}
                      required
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-brand-orange text-slate-705 font-bold"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Primary Contact Phone</label>
                    <input
                      type="tel"
                      defaultValue={myBizProfile.phone}
                      required
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-brand-orange text-slate-705 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Listing Category</label>
                    <input
                      type="text"
                      disabled
                      defaultValue={myBizProfile.category}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-100 text-slate-400 font-semibold cursor-not-allowed"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Public Email Address</label>
                    <input
                      type="email"
                      defaultValue={myBizProfile.email}
                      required
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-brand-orange text-slate-705 font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Shop Description</label>
                  <textarea
                    rows={4}
                    defaultValue={myBizProfile.description}
                    required
                    className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-brand-orange text-slate-705 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs py-2.5 px-5 rounded-lg shadow active:scale-95 transition-all w-fit self-end"
                >
                  Save Store Settings
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: SUBSCRIPTION PLAN */}
          {activeTab === 'subscription' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-xs text-slate-600">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
                Listing Plan Status
              </h3>

              <div className="bg-slate-50 border border-slate-150 rounded-xl p-5 mb-6 max-w-sm">
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">active membership</span>
                <div className="text-xl font-extrabold text-slate-900 mt-1 uppercase flex items-center gap-1.5">
                  ★ {myBizProfile.tier}
                </div>
                <div className="text-[10px] text-slate-450 mt-1 font-semibold">
                  Valid subscription cycle. Renewable monthly.
                </div>
              </div>

              <h4 className="font-bold text-slate-800 mb-2">Listing Benefits:</h4>
              <ul className="list-disc pl-5 space-y-2 mb-6 leading-relaxed max-w-lg">
                <li>Top directory placement in {myBizProfile.category} category results.</li>
                <li>Enabled contact phone and public maps listing visibility.</li>
                <li>Unlimited enquiry lead inbox captures.</li>
                <li>Featured badge display verifying your brand credibility.</li>
              </ul>

              <Link
                to="/subscriptions"
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs py-2.5 px-5 rounded-lg shadow transition-all block w-fit"
              >
                Change Subscription Plan
              </Link>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
export default BusinessDashboard;
