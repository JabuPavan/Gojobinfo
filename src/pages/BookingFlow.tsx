import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Calendar, MapPin, CheckCircle, Loader2, Star, Clock } from 'lucide-react';
import { useServiceStore } from '../store/useServiceStore';
import { useAuthStore } from '../store/useAuthStore';

export const BookingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { bookingFlow, professionals, setBookingStep, setBookingAddress, submitBooking, resetBookingFlow, selectDate, selectSlot } = useServiceStore();
  
  // Find current professional details
  const professional = professionals.find(p => p.id === bookingFlow.selectedProfessionalId);

  // Form states for address
  const [fullName, setFullName] = useState(user?.name || '');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState(professional?.location.split(',')[0] || '');
  const [stateName, setStateName] = useState(professional?.location.split(',')[1]?.trim() || '');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addressError, setAddressError] = useState('');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState('UPI (Google Pay)');
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    // If no professional selected, redirect back to services directory
    if (!bookingFlow.selectedProfessionalId || !professional) {
      navigate('/services');
    }
  }, [bookingFlow.selectedProfessionalId, professional, navigate]);

  // Generate next 7 days for the calendar widget
  const next7Days = React.useMemo(() => {
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      
      const dayName = weekdays[d.getDay()];
      const dateNum = d.getDate();
      const monthName = months[d.getMonth()];
      const year = d.getFullYear();
      
      const isoStr = `${year}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(dateNum).padStart(2, '0')}`;
      
      days.push({
        iso: isoStr,
        dayName,
        dateNum,
        monthName,
        display: `${dayName}, ${monthName} ${dateNum}`
      });
    }
    return days;
  }, []);

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM'
  ];

  if (!professional) return null;

  // Handle address submit
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !street.trim() || !city.trim() || !stateName.trim() || !zipCode.trim() || !phone.trim()) {
      setAddressError('Please fill out all address fields.');
      return;
    }
    setAddressError('');
    setBookingAddress({
      fullName,
      street,
      city,
      state: stateName,
      zipCode,
      phone
    });
  };

  // Handle mock Razorpay payment processing
  const handlePaymentSubmit = () => {
    setPaying(true);
    // Mimic Razorpay payment pop-up delay
    setTimeout(() => {
      submitBooking(paymentMethod);
      setPaying(false);
    }, 2000);
  };

  const serviceCharge = professional.pricePerHour * 2;
  const bookingFee = 49;
  const totalCharge = serviceCharge + bookingFee;

  // Render progress timeline indicators
  const steps = [
    { num: 3, label: 'Schedule' },
    { num: 5, label: 'Service Address' },
    { num: 6, label: 'Payment' },
    { num: 7, label: 'Confirmation' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Step Progress Tracker bar */}
      <div className="mb-10">
        <div className="flex justify-between items-center relative">
          {/* Progress bar background line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0"></div>
          {/* Active progress bar line fill */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-black transition-all duration-300 z-0"
            style={{ 
              width: 
                bookingFlow.activeStep === 3 ? '0%' :
                bookingFlow.activeStep === 5 ? '33%' :
                bookingFlow.activeStep === 6 ? '66%' : '100%' 
            }}
          ></div>

          {steps.map((s) => {
            const isCompleted = bookingFlow.activeStep > s.num;
            const isActive = bookingFlow.activeStep === s.num;
            return (
              <div key={s.num} className="flex flex-col items-center relative z-10">
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                    isCompleted 
                      ? 'bg-black border-black text-white shadow-none' 
                      : isActive 
                      ? 'bg-white border-black text-black font-extrabold scale-110 shadow-none' 
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num - 2}
                </div>
                <span className={`text-[10px] sm:text-xs font-bold mt-2 ${isActive ? 'text-brand-teal font-extrabold' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main card contents */}
      <div className="editorial-panel rounded-none grid grid-cols-1 md:grid-cols-3">
        
        {/* Left Column (2-spans): Form step contents */}
        <div className="md:col-span-2 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-150">
          
          {/* STEP 3: INTERACTIVE SCHEDULE SELECTION */}
          {bookingFlow.activeStep === 3 && (
            <div>
              <h2 className="text-lg font-extrabold text-slate-800 mb-4">Select Appointment Schedule</h2>
              
              {/* Date Selection Grid */}
              <div className="mb-6">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-teal" /> 1. Pick a Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {next7Days.map((day) => {
                    const active = bookingFlow.selectedDate === day.iso;
                    return (
                      <button
                        key={day.iso}
                        type="button"
                        onClick={() => selectDate(day.iso)}
                        className={`flex flex-col items-center justify-center p-2 rounded-none border text-center transition-all ${
                          active 
                            ? 'border-black bg-black text-white font-extrabold shadow-none' 
                            : 'border-slate-200 text-slate-650 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-[9px] uppercase font-bold text-slate-450">{day.dayName}</span>
                        <span className="text-sm font-black leading-none mt-0.5 text-slate-800">{day.dateNum}</span>
                        <span className="text-[8px] text-slate-500 font-medium">{day.monthName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="mb-6">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-teal" /> 2. Pick a Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => {
                    const active = bookingFlow.selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => selectSlot(slot)}
                        className={`p-2.5 rounded-none border text-left text-xs font-semibold flex justify-between items-center transition-all ${
                          active 
                            ? 'border-black bg-black text-white font-extrabold shadow-none' 
                            : 'border-slate-200 text-slate-650 hover:bg-slate-50'
                        }`}
                      >
                        <span>{slot}</span>
                        {active && <span className="w-2 h-2 rounded-full bg-white"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setBookingStep(5)}
                disabled={!bookingFlow.selectedDate || !bookingFlow.selectedSlot}
                className={`w-full py-3.5 rounded-none font-bold text-xs uppercase tracking-wider transition-all text-white flex justify-center items-center shadow-none ${
                  !bookingFlow.selectedDate || !bookingFlow.selectedSlot
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-black hover:bg-slate-800 active:scale-95'
                }`}
              >
                Proceed to Address Details
              </button>
            </div>
          )}

          {/* STEP 5: ADDRESS DETAILS ENTRY */}
          {bookingFlow.activeStep === 5 && (
            <div>
              <h2 className="text-lg font-extrabold text-slate-800 mb-4">Service Delivery Address</h2>
              
              {addressError && (
                <div className="mb-4 text-xs font-semibold text-red-600 bg-red-50 border border-red-150 p-2.5 rounded-lg">
                  ⚠️ {addressError}
                </div>
              )}

              <form onSubmit={handleAddressSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pavan Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 text-slate-705 font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Street / Flat Number / Locality</label>
                  <input
                    type="text"
                    required
                    placeholder="Flat 402, Royal Enclave, Bandra West"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 text-slate-705 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">City</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 text-slate-705 font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">State</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maharashtra"
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 text-slate-705 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Pin / Zip Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 400050"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 text-slate-705 font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Contact Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 99887 76655"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 text-slate-705 font-medium"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-5 mt-3">
                  <button
                    type="button"
                    onClick={() => setBookingStep(3)}
                    className="flex items-center gap-1 text-slate-550 hover:text-slate-800 font-bold text-xs"
                  >
                    ← Adjust Schedule
                  </button>
                  <button
                    type="submit"
                    className="bg-black hover:bg-slate-800 text-white font-bold text-xs uppercase px-6 py-2.5 rounded-none shadow-none active:scale-95 transition-all"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 6: MOCK RAZORPAY PAYMENT SCREEN */}
          {bookingFlow.activeStep === 6 && (
            <div>
              <div className="border-b border-slate-150 pb-4 mb-5 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Razorpay Checkout</span>
                <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded border border-slate-200">Test Mode</span>
              </div>
              
              <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-4">Choose Payment Method</h2>

              {paying ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <Loader2 className="w-10 h-10 text-brand-blue animate-spin mb-4" />
                  <h4 className="text-sm font-bold text-slate-850">Processing Order Transaction...</h4>
                  <p className="text-xs text-slate-400 mt-1">Please do not refresh or press back.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    {[
                      { id: 'UPI (Google Pay)', label: 'UPI (GPay, PhonePe, Paytm)', desc: 'Instant transfer using VPA code' },
                      { id: 'Credit/Debit Card', label: 'Credit or Debit Card', desc: 'Visa, Mastercard, RuPay' },
                      { id: 'Net Banking', label: 'Net Banking', desc: 'SBI, HDFC, ICICI, Axis' },
                      { id: 'COD', label: 'Cash on Service Delivery (COD)', desc: 'Pay expert directly in cash after service completes' }
                    ].map((method) => {
                      const active = paymentMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`w-full p-3 border rounded-xl text-left flex justify-between items-center transition-all ${
                            active 
                              ? 'border-brand-blue bg-blue-50/10 text-brand-blue font-extrabold shadow-sm' 
                              : 'border-slate-200 hover:bg-slate-50 text-slate-650'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold">{method.label}</div>
                            <div className="text-[10px] text-slate-500 font-normal mt-0.5">{method.desc}</div>
                          </div>
                          {active && <span className="w-2.5 h-2.5 rounded-full bg-brand-blue"></span>}
                        </button>
                      );
                    })}
                  </div>

                  <div className="border-t border-slate-100 pt-5 flex justify-between items-center mt-3">
                    <button
                      onClick={() => setBookingStep(5)}
                      className="text-slate-550 hover:text-slate-850 font-bold text-xs flex items-center gap-1"
                    >
                      ← Back to Address
                    </button>
                    
                    <button
                      onClick={handlePaymentSubmit}
                      className="bg-black hover:bg-slate-800 text-white font-bold text-xs uppercase px-6 py-3 rounded-none shadow-none active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <CreditCard className="w-4 h-4" /> Pay & Confirm Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 7: CONFIRMATION SUCCESS */}
          {bookingFlow.activeStep === 7 && bookingFlow.completedBooking && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4 border border-green-200">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-800">Booking Confirmed!</h2>
              <p className="text-xs text-slate-400 mt-1">
                Your service appointment is scheduled successfully.
              </p>

              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-left my-6 text-xs sm:text-sm text-slate-600 flex flex-col gap-2 max-w-sm mx-auto">
                <div className="flex justify-between border-b border-slate-200/50 pb-2 mb-1">
                  <span className="font-bold text-slate-700">Booking ID:</span>
                  <span className="font-extrabold text-brand-orange">{bookingFlow.completedBooking.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Professional:</span>
                  <span className="font-semibold text-slate-800">{professional.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Slot:</span>
                  <span className="font-semibold text-slate-850">{bookingFlow.selectedDate} | {bookingFlow.selectedSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span>Address:</span>
                  <span className="font-semibold text-slate-800 text-right max-w-[200px] truncate">{bookingFlow.completedBooking.address.street}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200/50 pt-2 mt-1 font-bold">
                  <span className="text-slate-800">Amount Paid:</span>
                  <span className="text-brand-blue">₹{bookingFlow.completedBooking.pricePaid}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    resetBookingFlow();
                    navigate('/dashboard/user');
                  }}
                  className="bg-black hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-none shadow-none transition-all"
                >
                  Go to Bookings Dashboard
                </button>
                <button
                  onClick={() => {
                    resetBookingFlow();
                    navigate('/');
                  }}
                  className="border border-black text-black hover:bg-black hover:text-white font-bold text-xs px-5 py-2.5 rounded-none transition-colors"
                >
                  Return Home
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column (1-span): Sticky Order Summary review */}
        <div className="md:col-span-1 bg-slate-50 p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 border-b border-slate-200 pb-2.5">
              Order Summary
            </h3>
            
            <div className="flex gap-3 mb-5 pb-5 border-b border-slate-200/80">
              <img src={professional.avatarUrl} alt={professional.name} className="w-10 h-10 object-cover border border-slate-200 shrink-0 img-editorial" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">{professional.name}</h4>
                <p className="text-[10px] text-brand-teal font-semibold uppercase">{professional.category}</p>
                <div className="flex items-center gap-0.5 text-brand-orange mt-0.5">
                  <Star className="w-3 h-3 fill-brand-orange" />
                  <span className="text-[10px] font-bold text-slate-800">{professional.rating}</span>
                </div>
              </div>
            </div>

            {/* Time Slot Display snippet */}
            {bookingFlow.selectedDate && bookingFlow.selectedSlot && (
              <div className="flex flex-col gap-2.5 mb-5 pb-5 border-b border-slate-200/80 text-[11px] text-slate-500 font-semibold">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{bookingFlow.selectedDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{bookingFlow.selectedSlot}</span>
                </div>
              </div>
            )}

            {/* Price list */}
            <div className="flex flex-col gap-2 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>Base Charge (2 Hrs Est)</span>
                <span>₹{serviceCharge}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Booking Fee</span>
                <span>₹{bookingFee}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-extrabold text-slate-800 text-sm">
                <span>Total Charge</span>
                <span className="text-brand-blue">₹{totalCharge}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-4 flex gap-1.5 text-[10px] text-slate-400 leading-snug">
            <MapPin className="w-4 h-4 shrink-0 text-slate-350" />
            <span>Service dispatch happens via professional certified local squad.</span>
          </div>

        </div>

      </div>

    </div>
  );
};
export default BookingFlow;
