import React, { useState, useMemo } from 'react';
import { useServiceStore } from '../../store/useServiceStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Calendar, Clock, MapPin, DollarSign, Award, CheckCircle } from 'lucide-react';

export const ProfessionalDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { bookings, updateBookingStatus, professionals, setProfessionals } = useServiceStore();

  const [activeTab, setActiveTab] = useState<'requests' | 'calendar' | 'earnings'>('requests');

  // Hardcode professional association for demo: Rajesh Kumar (prof-1)
  const myProfProfile = useMemo(() => {
    return professionals.find(p => p.id === 'prof-1') || professionals[0];
  }, [professionals]);

  // Bookings requested for this professional
  const myBookingsList = useMemo(() => {
    return bookings.filter(b => b.professionalId === myProfProfile.id);
  }, [bookings, myProfProfile]);

  // Sum earnings
  const completedBookings = myBookingsList.filter(b => b.status === 'Completed');
  const earningsSum = completedBookings.reduce((sum, b) => sum + b.pricePaid, 0);

  // Toggle status
  const handleAvailabilityToggle = (status: 'Available Today' | 'Available Tomorrow' | 'Booked') => {
    const updated = professionals.map(p => p.id === myProfProfile.id ? { ...p, availability: status } : p);
    setProfessionals(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Info */}
      <div className="bg-gradient-to-r from-brand-teal to-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-md mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-teal-300 bg-teal-950/20 px-2.5 py-1 rounded">
            Professional Portal
          </span>
          <h1 className="text-2xl font-black mt-2">Welcome Back, {user?.name}!</h1>
          <p className="text-xs text-teal-100 mt-1">
            Category: <strong className="underline">{myProfProfile.category}</strong> | Experience: {myProfProfile.experience} Years
          </p>
        </div>

        {/* Quick status switch */}
        <div className="bg-slate-900/40 p-2 border border-slate-700/30 rounded-xl">
          <label className="block text-[8px] uppercase tracking-wider font-bold text-slate-350 mb-1">
            Active Availability State
          </label>
          <div className="flex gap-1">
            {['Available Today', 'Available Tomorrow', 'Booked'].map((status) => {
              const active = myProfProfile.availability === status;
              return (
                <button
                  key={status}
                  onClick={() => handleAvailabilityToggle(status as any)}
                  className={`text-[9px] font-bold px-2 py-1 rounded transition-all ${
                    active 
                      ? 'bg-brand-teal text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {status.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Estimated Earnings', val: `₹${earningsSum + 12400}`, desc: 'Total monthly earnings', icon: DollarSign, color: 'text-brand-teal' },
          { label: 'Bookings Completed', val: completedBookings.length + 12, desc: 'Jobs delivered successfully', icon: CheckCircle, color: 'text-green-500' },
          { label: 'Booking Requests', val: myBookingsList.filter(b => b.status === 'Confirmed').length, desc: 'Pending client bookings', icon: Calendar, color: 'text-brand-blue' },
          { label: 'Service Rating', val: `${myProfProfile.rating} / 5`, desc: `Based on ${myProfProfile.reviewsCount} reviews`, icon: Award, color: 'text-brand-orange' }
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
        
        {/* Navigation */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm h-fit">
          <div className="flex flex-col gap-1 text-xs">
            {[
              { id: 'requests', label: 'Booking Requests Board', icon: Calendar },
              { id: 'calendar', label: 'Hours & Settings', icon: Clock },
              { id: 'earnings', label: 'Revenue Analytics', icon: DollarSign }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-3 rounded-lg font-bold flex items-center gap-2.5 transition-all ${
                    active 
                      ? 'bg-teal-50 text-brand-teal font-extrabold border-l-4 border-brand-teal' 
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

        {/* Viewport content */}
        <div className="lg:col-span-3">
          
          {/* TAB 1: BOOKING REQUESTS */}
          {activeTab === 'requests' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
                Active Booking Requests Board
              </h3>

              {myBookingsList.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No client booking requests assigned to you yet.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {myBookingsList.map((booking) => (
                    <div 
                      key={booking.id} 
                      className="border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-sm"
                    >
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                            Client: {booking.address.fullName}
                          </h4>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            booking.status === 'Confirmed' ? 'bg-green-50 text-green-700' :
                            booking.status === 'Completed' ? 'bg-blue-50 text-brand-blue' : 'bg-red-50 text-red-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        
                        <div className="flex flex-col gap-1 mt-2 text-xs text-slate-500 font-semibold">
                          <span>Date: {booking.date}</span>
                          <span>Slot: {booking.slot}</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3.5 h-3.5 shrink-0" /> {booking.address.street}, {booking.address.city}
                          </span>
                        </div>

                        <div className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">
                          Booking ID: {booking.bookingId} | Est. Charge: ₹{booking.pricePaid}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 shrink-0 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
                        {booking.status === 'Confirmed' && (
                          <>
                            <button
                              onClick={() => updateBookingStatus(booking.bookingId, 'Cancelled')}
                              className="text-[10px] text-red-650 hover:bg-red-50 font-bold px-3 py-1.5 border border-red-100 rounded-lg transition-colors"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => updateBookingStatus(booking.bookingId, 'Completed')}
                              className="text-[10px] bg-brand-teal hover:bg-teal-700 text-white font-bold px-3 py-1.5 rounded-lg shadow transition-all active:scale-95"
                            >
                              Mark Completed
                            </button>
                          </>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: HOURS CONFIG */}
          {activeTab === 'calendar' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
                Working Slots Settings
              </h3>

              <div className="flex flex-col gap-5 text-xs text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Configure Default Daily Slots</h4>
                  <p className="mb-4">Select the timing segments you are available to receive booking requests from clients.</p>
                  
                  <div className="flex flex-col gap-2.5 max-w-sm">
                    {[
                      { id: 'morn', label: 'Morning Segment (09:00 AM - 01:00 PM)', active: true },
                      { id: 'aft', label: 'Afternoon Segment (02:00 PM - 06:00 PM)', active: true },
                      { id: 'eve', label: 'Evening Segment (06:00 PM - 08:00 PM)', active: false }
                    ].map((slot) => (
                      <label key={slot.id} className="flex items-center gap-3 p-3 border border-slate-200 bg-slate-50/50 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors select-none font-bold">
                        <input
                          type="checkbox"
                          defaultChecked={slot.active}
                          className="rounded border-slate-350 text-brand-teal focus:ring-brand-teal w-4 h-4"
                        />
                        <span>{slot.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => alert('Slot configuration saved (mock)')}
                  className="bg-brand-teal hover:bg-teal-700 text-white font-bold text-xs py-2 px-5 rounded-lg shadow w-fit mt-3"
                >
                  Save Workspace Configurations
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: REVENUE ANALYTICS */}
          {activeTab === 'earnings' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
                Monthly Revenue Analytics
              </h3>

              <p className="text-xs text-slate-400 mb-6">Track revenue gains from completed service bookings over the last 5 months.</p>

              {/* Simple CSS-based bar graph */}
              <div className="flex justify-between items-end h-40 max-w-md mx-auto gap-4 border-b border-slate-200 pb-1 px-4 mb-4">
                {[
                  { month: 'Feb', val: 9800, ht: 'h-16' },
                  { month: 'Mar', val: 11400, ht: 'h-20' },
                  { month: 'Apr', val: 14200, ht: 'h-24' },
                  { month: 'May', val: 12400, ht: 'h-22' },
                  { month: 'Jun (Est)', val: earningsSum + 12400, ht: 'h-28' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <span className="text-[9px] font-bold text-slate-700">₹{item.val.toLocaleString()}</span>
                    <div className={`w-full ${item.ht} bg-gradient-to-t from-brand-teal to-teal-400 rounded-t-md mt-1 shadow-sm`}></div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 mt-2">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
export default ProfessionalDashboard;
