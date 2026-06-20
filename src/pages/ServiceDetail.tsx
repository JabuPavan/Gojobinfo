import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, Calendar, Clock, ArrowLeft, Languages, Award, CheckCircle } from 'lucide-react';
import { useServiceStore } from '../store/useServiceStore';
import { useAuthStore } from '../store/useAuthStore';

export const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { professionals, startBookingFlow, selectDate, selectSlot, addReview } = useServiceStore();
  const { isAuthenticated } = useAuthStore();

  // Find active professional
  const professional = useMemo(() => {
    return professionals.find(p => p.id === id);
  }, [professionals, id]);

  // Review states
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewName, setNewReviewName] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Booking states
  const [activeDate, setActiveDate] = useState<string>('');
  const [activeSlot, setActiveSlot] = useState<string>('');
  const [bookingError, setBookingError] = useState<string>('');

  // Generate next 7 days for the calendar widget
  const next7Days = useMemo(() => {
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
      
      // ISO format string: YYYY-MM-DD
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

  if (!professional) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Professional profile not found</h2>
        <p className="text-slate-500 mt-2">The provider ID may be incorrect or has been archived.</p>
        <Link to="/services" className="mt-5 inline-block bg-brand-blue text-white px-5 py-2 rounded-lg font-bold text-xs">
          Back to Directory
        </Link>
      </div>
    );
  }

  // Handle local reviews
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      return;
    }
    addReview(professional.id, newReviewName, newReviewRating, newReviewComment);
    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  // Submit direct calendar booking
  const handleProceedBooking = () => {
    if (!activeDate) {
      setBookingError('Please choose a date.');
      return;
    }
    if (!activeSlot) {
      setBookingError('Please choose a time slot.');
      return;
    }

    setBookingError('');
    startBookingFlow(professional.id, professional.category);
    selectDate(activeDate);
    selectSlot(activeSlot);
    
    if (!isAuthenticated) {
      navigate(`/auth?redirect=${encodeURIComponent('/services/booking')}`);
    } else {
      navigate('/services/booking');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Back button */}
      <Link 
        to="/services" 
        className="inline-flex items-center gap-1 text-slate-500 hover:text-brand-blue text-xs font-bold mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Services Directory
      </Link>

      {/* Main Grid: Info columns on left, sticky book panel on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2-spans): Profile Information details */}
        <div className="lg:col-span-2 flex flex-col gap-6 order-2 lg:order-1">
          
          {/* Header Bio Card */}
          <div className="editorial-panel rounded-none p-6 relative">
            {professional.verified && (
              <span className="absolute top-6 right-6 flex items-center gap-1 bg-blue-50 text-brand-blue border border-blue-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 fill-blue-50 text-brand-blue" /> Vetted Provider
              </span>
            )}
            
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <img src={professional.avatarUrl} alt={professional.name} className="w-20 h-20 object-cover border border-slate-200 shrink-0 img-editorial" />
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
                  {professional.name}
                </h1>
                <p className="text-sm text-brand-teal font-bold uppercase tracking-wider mt-0.5">
                  {professional.category}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2.5">
                  <div className="flex items-center gap-0.5 text-brand-orange">
                    <Star className="w-4 h-4 fill-brand-orange" />
                    <span className="text-xs font-bold text-slate-800">{professional.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400">({professional.reviewsCount} reviews)</span>
                  <span className="text-slate-200">|</span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-400" /> {professional.location}
                  </span>
                  <span className="text-slate-200">|</span>
                  <span className="text-xs text-slate-500 font-semibold">Exp: {professional.experience} Years</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 mt-6 pt-5">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Professional Bio</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                {professional.bio}
              </p>
            </div>
          </div>

          {/* Skills & Accreditations */}
          <div className="editorial-panel rounded-none p-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Qualifications & Skills</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expertise Areas</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {professional.skills.map((skill) => (
                    <span key={skill} className="text-xs bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1 rounded-lg font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Certifications & Licenses</span>
                <div className="flex flex-col gap-2">
                  {professional.certifications.map((cert) => (
                    <div key={cert} className="flex items-start gap-2 text-xs text-slate-600">
                      <Award className="w-4.5 h-4.5 text-brand-orange shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 mt-6 pt-4 flex items-center gap-3">
              <Languages className="w-4.5 h-4.5 text-slate-400" />
              <div className="text-xs text-slate-500 font-medium">
                Languages Spoken: <strong className="text-slate-700">{professional.languages.join(', ')}</strong>
              </div>
            </div>
          </div>

          {/* Portfolio Gallery Colors slider */}
          <div className="editorial-panel rounded-none p-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Project Gallery</h3>
            <div className="grid grid-cols-3 gap-4">
              {professional.portfolio.map((color, i) => (
                <div 
                  key={i} 
                  className={`h-28 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white/50 text-xs font-bold uppercase shadow-sm border border-slate-200/20`}
                >
                  Project {i+1}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Rating Feedback section */}
          <div className="editorial-panel rounded-none p-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">Customer Reviews</h3>
            
            {/* Reviews List */}
            <div className="divide-y divide-slate-100 mb-8">
              {professional.reviews.map((rev) => (
                <div key={rev.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{rev.userName}</h4>
                      <div className="flex gap-0.5 text-brand-orange mt-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={`w-3 h-3 ${idx < rev.rating ? 'fill-brand-orange text-brand-orange' : 'text-slate-200'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Leave a review Form */}
            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Leave Feedback</h4>
              
              {reviewSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 animate-fade-in">
                  <CheckCircle className="w-4 h-4 text-green-600" /> Review submitted successfully! Thank you.
                </div>
              )}

              <form onSubmit={handleAddReview} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Amit Shah"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 text-slate-700 font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Rating (1 to 5 Stars)</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 text-slate-700 font-bold"
                    >
                      <option value="5">★★★★★ (5 Stars)</option>
                      <option value="4">★★★★☆ (4 Stars)</option>
                      <option value="3">★★★☆☆ (3 Stars)</option>
                      <option value="2">★★☆☆☆ (2 Stars)</option>
                      <option value="1">★☆☆☆☆ (1 Star)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Your Review</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your service experience with this professional..."
                    required
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 text-slate-700 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs py-2 px-5 rounded-lg shadow w-fit self-end active:scale-95 transition-all"
                >
                  Submit Review
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Right Column: Sticky Booking Sidecard */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="editorial-panel rounded-none p-5 sticky top-24 h-fit">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 border-b border-slate-100 pb-2.5">
              Book Appointment
            </h3>

            {/* Price indicator banner */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center mb-6">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Service Charge</span>
              <span className="text-2xl font-extrabold text-slate-900">₹{professional.pricePerHour}</span>
              <span className="text-xs text-slate-400 font-normal"> / hour</span>
            </div>

            {bookingError && (
              <div className="mb-4 text-xs font-semibold text-red-600 bg-red-50 border border-red-150 p-2.5 rounded-lg">
                ⚠️ {bookingError}
              </div>
            )}

            {/* Step 1: Select Date */}
            <div className="mb-5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-teal" /> 1. Select Date
              </label>
              
              <div className="grid grid-cols-4 gap-2">
                {next7Days.map((day) => {
                  const active = activeDate === day.iso;
                  return (
                    <button
                      key={day.iso}
                      type="button"
                      onClick={() => setActiveDate(day.iso)}
                      className={`flex flex-col items-center justify-center p-2 rounded-none border text-center transition-all ${
                        active 
                          ? 'border-black bg-black text-white font-extrabold shadow-none' 
                          : 'border-slate-200 text-slate-650 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-[9px] uppercase font-bold text-slate-400">{day.dayName}</span>
                      <span className="text-sm font-black leading-none mt-0.5">{day.dateNum}</span>
                      <span className="text-[8px] text-slate-500 font-medium">{day.monthName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Slot */}
            <div className="mb-6">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-teal" /> 2. Available Slots
              </label>
              
              <div className="flex flex-col gap-2">
                {timeSlots.map((slot) => {
                  const active = activeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setActiveSlot(slot)}
                      className={`w-full p-2.5 rounded-none border text-left text-xs font-semibold flex justify-between items-center transition-all ${
                        active 
                          ? 'border-black bg-black text-white font-extrabold shadow-none' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{slot}</span>
                      {active && <span className="w-2 h-2 rounded-full bg-brand-teal animate-ping"></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Estimated charges */}
            <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3.5 text-xs text-slate-500 flex flex-col gap-2 mb-6">
              <div className="flex justify-between">
                <span>Base Charge (Estimated 2 Hours)</span>
                <span className="font-bold text-slate-700">₹{professional.pricePerHour * 2}</span>
              </div>
              <div className="flex justify-between">
                <span>Safety Insurance & Booking Fee</span>
                <span className="font-bold text-slate-700">₹49</span>
              </div>
              <div className="flex justify-between border-t border-slate-200/60 pt-2 font-extrabold text-slate-800 text-sm">
                <span>Estimated Total</span>
                <span className="text-brand-blue">₹{professional.pricePerHour * 2 + 49}</span>
              </div>
            </div>

            {/* Proceed to book trigger */}
            <button
              onClick={handleProceedBooking}
              disabled={professional.availability === 'Booked'}
              className={`w-full py-3 rounded-none font-bold text-xs uppercase tracking-wider transition-all text-white flex justify-center items-center gap-1.5 shadow-none border border-black ${
                professional.availability === 'Booked' 
                  ? 'bg-slate-350 border-slate-350 cursor-not-allowed text-slate-500' 
                  : 'bg-black hover:bg-slate-800 active:scale-95'
              }`}
            >
              ⚡ Proceed to Checkout
            </button>
            
            <p className="text-[10px] text-center text-slate-400 mt-3.5">
              Cancellation is free up to 3 hours before slot booking timing.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
export default ServiceDetail;
