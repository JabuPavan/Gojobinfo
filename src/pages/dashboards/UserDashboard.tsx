import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useServiceStore } from '../../store/useServiceStore';
import { useJobStore } from '../../store/useJobStore';
import { useBusinessStore } from '../../store/useBusinessStore';
import { Calendar, MapPin, Bookmark, Star, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserDashboard: React.FC = () => {
  const { user, savedJobs, savedBusinesses, savedProfessionals, toggleSaveJob, toggleSaveBusiness, toggleSaveProfessional } = useAuthStore();
  const { bookings, cancelBooking } = useServiceStore();
  const { jobs } = useJobStore();
  const { businesses } = useBusinessStore();
  const { professionals } = useServiceStore();

  const [activeTab, setActiveTab] = useState<'bookings' | 'saved' | 'profile'>('bookings');

  // Filter bookmarks
  const bookmarkedJobsList = jobs.filter(j => savedJobs.includes(j.id));
  const bookmarkedBizList = businesses.filter(b => savedBusinesses.includes(b.id));
  const bookmarkedProfsList = professionals.filter(p => savedProfessionals.includes(p.id));

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-teal text-white rounded-2xl p-6 sm:p-8 shadow-md mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-teal-350 bg-teal-950/20 px-2.5 py-1 rounded">
            Client Workspace
          </span>
          <h1 className="text-2xl font-black mt-2">Welcome Back, {user?.name}!</h1>
          <p className="text-xs text-blue-100 mt-1">
            Manage your local appointments, check application updates, and review bookmarks.
          </p>
        </div>
        <div className="flex gap-2.5 text-xs">
          <Link to="/services" className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-lg border border-white/20 transition-all select-none">
            Find Experts
          </Link>
          <Link to="/jobs" className="bg-white text-brand-blue hover:bg-slate-50 font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all select-none">
            Find Jobs
          </Link>
        </div>
      </div>

      {/* Grid Dashboard structure */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Navigation Sidebar */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm h-fit">
          <div className="flex flex-col gap-1 text-xs">
            {[
              { id: 'bookings', label: 'My Bookings & Orders', icon: Calendar },
              { id: 'saved', label: 'Bookmarks & Saved', icon: Bookmark },
              { id: 'profile', label: 'Profile Settings', icon: Star }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-3 rounded-lg font-bold flex items-center gap-2.5 transition-all ${
                    active 
                      ? 'bg-blue-50 text-brand-blue font-extrabold border-l-4 border-brand-blue' 
                      : 'hover:bg-slate-50 text-slate-650'
                  }`}
                >
                  <TabIcon className="w-4.5 h-4.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Tab Viewports */}
        <div className="lg:col-span-3">
          
          {/* TAB 1: BOOKINGS LIST */}
          {activeTab === 'bookings' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
                Appointment Tracking Inbox
              </h3>

              {bookings.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-3">📅</div>
                  <h4 className="text-xs font-bold text-slate-700">No active bookings yet</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Book professional house wiring, plumbing, or AC servicing slots.</p>
                  <Link to="/services" className="mt-4 inline-block bg-brand-teal text-white font-bold text-[10px] uppercase py-2 px-4 rounded-lg shadow">
                    Book Service Now
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {bookings.map((booking) => (
                    <div 
                      key={booking.id} 
                      className="border border-slate-200 rounded-xl p-5 hover:shadow-sm transition-shadow flex flex-col sm:flex-row justify-between gap-4"
                    >
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-teal-50 text-brand-teal flex items-center justify-center font-black shrink-0 shadow-inner">
                          ⚡
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-slate-900">{booking.professionalName}</h4>
                            <span className="text-[10px] bg-teal-50 text-brand-teal font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {booking.professionalCategory}
                            </span>
                          </div>
                          
                          <div className="flex flex-col gap-1.5 mt-3 text-xs text-slate-500 font-semibold">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Slot: {booking.date} | {booking.slot}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> Loc: {booking.address.street}, {booking.address.city}
                            </span>
                          </div>

                          <div className="flex gap-4 text-[10px] text-slate-450 mt-3 pt-3 border-t border-slate-100 font-bold uppercase tracking-wider">
                            <span>ID: <strong className="text-brand-orange">{booking.bookingId}</strong></span>
                            <span>Paid: <strong className="text-slate-700">₹{booking.pricePaid}</strong> via {booking.paymentMethod}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col justify-between items-end shrink-0 gap-2 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${
                          booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border border-green-150' :
                          booking.status === 'Cancelled' ? 'bg-red-50 text-red-700 border border-red-150' :
                          'bg-yellow-50 text-yellow-700 border border-yellow-150'
                        }`}>
                          ● {booking.status}
                        </span>

                        {booking.status === 'Confirmed' && (
                          <button
                            onClick={() => handleCancelBooking(booking.bookingId)}
                            className="text-[10px] text-red-500 hover:text-red-700 font-bold border border-red-100 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Trash className="w-3.5 h-3.5" /> Cancel Appointment
                          </button>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SAVED BOOKMARKS */}
          {activeTab === 'saved' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-8">
              
              {/* Jobs section */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Saved Job Roles</h3>
                {bookmarkedJobsList.length === 0 ? (
                  <p className="text-xs text-slate-400 py-2">No jobs bookmarked yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookmarkedJobsList.map((job) => (
                      <div key={job.id} className="border border-slate-205 rounded-xl p-4 flex justify-between items-start gap-2.5">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 hover:text-brand-blue">
                            <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                          </h4>
                          <p className="text-[10px] text-slate-400 font-semibold">{job.companyName} | {job.location}</p>
                        </div>
                        <button 
                          onClick={() => toggleSaveJob(job.id)}
                          className="text-slate-350 hover:text-red-500 transition-colors shrink-0"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Businesses section */}
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Saved Local Stores</h3>
                {bookmarkedBizList.length === 0 ? (
                  <p className="text-xs text-slate-400 py-2">No businesses bookmarked yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookmarkedBizList.map((biz) => (
                      <div key={biz.id} className="border border-slate-205 rounded-xl p-4 flex justify-between items-start gap-2.5">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 hover:text-brand-orange">
                            <Link to={`/businesses/detail/${biz.id}`}>{biz.name}</Link>
                          </h4>
                          <p className="text-[10px] text-slate-400 font-semibold">{biz.category} | {biz.location.split(',')[0]}</p>
                        </div>
                        <button 
                          onClick={() => toggleSaveBusiness(biz.id)}
                          className="text-slate-350 hover:text-red-500 transition-colors shrink-0"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Professionals section */}
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Saved Service Providers</h3>
                {bookmarkedProfsList.length === 0 ? (
                  <p className="text-xs text-slate-400 py-2">No service professionals bookmarked yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookmarkedProfsList.map((prof) => (
                      <div key={prof.id} className="border border-slate-205 rounded-xl p-4 flex justify-between items-start gap-2.5">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 hover:text-brand-teal">
                            <Link to={`/services/profile/${prof.id}`}>{prof.name}</Link>
                          </h4>
                          <p className="text-[10px] text-slate-400 font-semibold">{prof.category} | {prof.location.split(',')[0]}</p>
                        </div>
                        <button 
                          onClick={() => toggleSaveProfessional(prof.id)}
                          className="text-slate-350 hover:text-red-500 transition-colors shrink-0"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
                Client Profile Details
              </h3>

              <form onSubmit={(e) => { e.preventDefault(); alert('Profile updated (mock)'); }} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      required
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-brand-blue text-slate-705 font-bold"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Contact Number</label>
                    <input
                      type="tel"
                      defaultValue={user?.phone}
                      required
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-brand-blue text-slate-705 font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Email Address (Locked)</label>
                  <input
                    type="email"
                    disabled
                    defaultValue={user?.email}
                    className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-100 text-slate-400 font-semibold cursor-not-allowed"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-5 rounded-lg shadow w-fit active:scale-95 transition-all self-end"
                >
                  Save Modifications
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
export default UserDashboard;
